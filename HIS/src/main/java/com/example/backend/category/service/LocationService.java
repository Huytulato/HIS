package com.example.backend.category.service;

import com.example.backend.category.dto.ProvinceDTO;
import com.example.backend.category.dto.DistrictDTO;
import com.example.backend.category.dto.WardDTO;
import java.util.List;

public interface LocationService {
    List<ProvinceDTO> getAllProvinces();
    List<DistrictDTO> getAllDistricts();
    List<WardDTO> getAllWards();
}