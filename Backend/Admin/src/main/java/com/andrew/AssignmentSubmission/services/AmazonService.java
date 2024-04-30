package com.andrew.AssignmentSubmission.services;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AmazonService {

    @Value("${aws.bucket.name}")
    private String bucketName;

    private final AmazonS3 amazonS3;

    public Resource download(String path){
        try {
            S3Object s3Object = amazonS3.getObject(bucketName, path);
            return new UrlResource(s3Object.getObjectContent().getHttpRequest().getURI().toURL());
        } catch (Exception e) {
            throw new RuntimeException("Failed to download file", e);
        }
    }
}
