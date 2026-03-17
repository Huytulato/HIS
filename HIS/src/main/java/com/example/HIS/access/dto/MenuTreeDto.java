package com.example.HIS.access.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuTreeDto {
    private Long id;
    private Long parentId;
    private String name;
    private String path;
    private String icon;
    private Integer sortOrder;
    private List<MenuTreeDto> children = new ArrayList<>();
}
