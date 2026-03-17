package com.example.HIS.access.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PermissionDto {
    private Long id;
    private String code;
    private String name;
    private String moduleName;
    private Long menuId;
    private String menuName;
}
