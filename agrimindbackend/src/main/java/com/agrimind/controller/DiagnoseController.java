package com.agrimind.controller;

import com.agrimind.service.DiagnosisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DiagnoseController {

    @Autowired
    private DiagnosisService diagnosisService;

    @PostMapping("/diagnose")
    public ResponseEntity<Map<String, String>> diagnose(@RequestParam("image") MultipartFile image) {
        try {
            Map<String, String> result = diagnosisService.diagnoseImage(image);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to process image"));
        }
    }
}
