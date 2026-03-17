package com.example.HIS.access.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModuleDto {
    private String moduleName;
    private List<PermissionDto> permissions = new ArrayList<>();
}
