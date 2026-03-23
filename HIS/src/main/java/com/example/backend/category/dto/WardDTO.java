package com.example.backend.category.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WardDTO {
    private String id;
    private String code;
    private String name;
    private String districtId;
    private String districtName;
}