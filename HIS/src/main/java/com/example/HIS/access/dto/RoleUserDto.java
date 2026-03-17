package com.example.HIS.access.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleUserDto {
    private Long userId;
    private String username;
    private String email;
}
