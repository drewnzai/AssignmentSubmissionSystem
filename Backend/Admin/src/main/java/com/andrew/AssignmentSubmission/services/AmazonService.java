package com.andrew.AssignmentSubmission.services;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.util.IOUtils;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Year;
import java.time.ZoneId;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AmazonService {

    @Value("${aws.bucket.name}")
    private String bucketName;

    private final AmazonS3 amazonS3;

    @Async
    public void save(MultipartFile multipartFile, String username, String courseCode) throws IOException {
        int year = Year.now(ZoneId.systemDefault()).getValue();


        String folderKey = year + "/" + courseCode + "/" + username + "/";

        String fileName = UUID.randomUUID().toString() + "_" + multipartFile.getOriginalFilename();
        String objectKey = folderKey + fileName;

        
        ObjectMetadata metadata = new ObjectMetadata();
        
        metadata.setContentType("plain/"+ FilenameUtils.getExtension(fileName));
        metadata.addUserMetadata("Title", "File Upload - " + fileName);
        metadata.setContentLength(multipartFile.getSize());

        PutObjectRequest request = new PutObjectRequest(bucketName, objectKey, multipartFile.getInputStream(), metadata);

        amazonS3.putObject(request);

    }



    public byte[] download(String path, String key) {
        try {
            S3Object object = amazonS3.getObject(path, key);
            return IOUtils.toByteArray(object.getObjectContent());

        } catch (AmazonServiceException | IOException e) {
            throw new IllegalStateException("Failed to download file from s3", e);
        }
    }
}
