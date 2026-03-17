package com.example.HIS.access.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RolePermissionRequestDto {
    private Set<Long> permissionIds;
}
