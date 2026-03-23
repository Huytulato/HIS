package com.example.backend.category.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DistrictDTO {
    private String id;
    private String code;
    private String name;
    private String provinceId;
    private String provinceName;
}