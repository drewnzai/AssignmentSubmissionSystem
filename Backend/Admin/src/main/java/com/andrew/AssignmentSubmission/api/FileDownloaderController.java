package com.andrew.AssignmentSubmission.api;


import com.andrew.AssignmentSubmission.dto.MiscRequest;
import com.andrew.AssignmentSubmission.services.AmazonService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/file/download")
@AllArgsConstructor
@Tag(name = "File Download", description = "Retrieve File from AWS S3 Bucket")
public class FileDownloaderController {

    private AmazonService amazonService;

    @PostMapping()
    public ResponseEntity<Resource> downloadFile(@RequestBody MiscRequest miscRequest, HttpServletResponse response) {

        response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
        response.setHeader("Content-Disposition", "attachment; filename=\""
                + miscRequest.getData().replace("/", "_") + ".zip\"");

       return ResponseEntity.ok()
               .header("Content-Disposition", "attachment; filename=\""
                       + miscRequest.getData().replace("/", "_") + ".zip\"")
               .contentType(MediaType.parseMediaType("application/zip"))
               .body(amazonService.download(miscRequest.getData()));
    }

}
