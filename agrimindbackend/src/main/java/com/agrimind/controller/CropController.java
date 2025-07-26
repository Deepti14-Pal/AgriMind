package com.agrimind.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CropController {

    @GetMapping("/")
    public String home() {
        return "AgriMind backend is running!";
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadCropImage() {
        // Abhi ke liye dummy response
        return ResponseEntity.ok("Image received and processed (dummy response)");
    }
}
