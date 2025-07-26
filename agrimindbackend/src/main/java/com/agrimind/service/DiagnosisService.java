package com.agrimind.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class DiagnosisService {

    public Map<String, String> diagnoseImage(MultipartFile image) throws IOException {
       

        Map<String, String> result = new HashMap<>();
        result.put("disease", "Leaf Blight");
        result.put("description", "This fungal infection causes brown lesions. Use antifungal treatment.");
        return result;
    }
}
