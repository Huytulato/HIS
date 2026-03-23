package com.example.backend.category.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProvinceDTO {
    private String id;
    private String code;
    private String name;
}