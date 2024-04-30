package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.MiscRequest;
import com.andrew.AssignmentSubmission.services.AmazonService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/file/download")
@AllArgsConstructor
@Tag(name = "File Download", description = "Retrieve File from AWS S3 Bucket")
public class FileDownloaderController {

    private AmazonService amazonService;

    @PostMapping()
    public Resource downloadFile(@RequestBody MiscRequest miscRequest) {
        return amazonService.download(miscRequest.getData());
    }

}
