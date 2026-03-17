package com.example.HIS.access.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleDto {
    private Integer id;
    private String code;
    private String displayName;
    private String description;
}
