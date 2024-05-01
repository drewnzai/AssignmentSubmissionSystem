package com.andrew.AssignmentSubmission.services;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ListObjectsV2Request;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
@RequiredArgsConstructor
public class AmazonService {

    @Value("${aws.bucket.name}")
    private String bucketName;

    private final AmazonS3 amazonS3;

    public Resource download(String path){
        try {
            ListObjectsV2Request req = new ListObjectsV2Request().withBucketName(bucketName).withPrefix(path);
            ListObjectsV2Result result = amazonS3.listObjectsV2(req);

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ZipOutputStream zos = new ZipOutputStream(baos);

            // Create zip entries for each file found
            for (S3ObjectSummary objectSummary : result.getObjectSummaries()) {
                S3Object s3Object = amazonS3.getObject(bucketName, objectSummary.getKey());
                ZipEntry zipEntry = new ZipEntry(objectSummary.getKey().substring(path.length()));
                zos.putNextEntry(zipEntry);
                s3Object.getObjectContent().transferTo(zos);
                zos.closeEntry();
            }

            zos.close();

            return new InputStreamResource(new ByteArrayInputStream(baos.toByteArray()));
        } catch (IOException e) {
            throw new RuntimeException("Failed to create zip file", e);
        }
    }
}
