package com.example.backend.category.controller;

import com.example.backend.category.dto.ProvinceDTO;
import com.example.backend.category.dto.DistrictDTO;
import com.example.backend.category.dto.WardDTO;
import com.example.backend.category.service.LocationImportService;
import com.example.backend.category.service.LocationService;
import com.example.backend.auth.payload.response.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/locations")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;
    private final LocationImportService locationImportService;

    @GetMapping("/provinces")
    public ResponseEntity<List<ProvinceDTO>> getProvinces() {
        return ResponseEntity.ok(locationService.getAllProvinces());
    }

    @GetMapping("/districts")
    public ResponseEntity<List<DistrictDTO>> getDistricts() {
        return ResponseEntity.ok(locationService.getAllDistricts());
    }

    @GetMapping("/wards")
    public ResponseEntity<List<WardDTO>> getWards() {
        return ResponseEntity.ok(locationService.getAllWards());
    }

    @PostMapping("/import")
    public ResponseEntity<?> importExcel(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: File is empty!"));
        }
        try {
            String message = locationImportService.importExcel(file);
            return ResponseEntity.ok(new MessageResponse(message));
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new MessageResponse("Error: Import failed - " + e.getMessage()));
        }
    }
}