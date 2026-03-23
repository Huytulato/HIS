package com.example.backend.category.service.impl;

import com.example.backend.category.dto.ProvinceDTO;
import com.example.backend.category.dto.DistrictDTO;
import com.example.backend.category.dto.WardDTO;
import com.example.backend.category.entity.Province;
import com.example.backend.category.entity.District;
import com.example.backend.category.entity.Ward;
import com.example.backend.category.repository.ProvinceRepository;
import com.example.backend.category.repository.DistrictRepository;
import com.example.backend.category.repository.WardRepository;
import com.example.backend.category.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LocationServiceImpl implements LocationService {

    private final ProvinceRepository provinceRepository;
    private final DistrictRepository districtRepository;
    private final WardRepository wardRepository;

    @Override
    public List<ProvinceDTO> getAllProvinces() {
        return provinceRepository.findAll().stream()
                .map(this::mapToProvinceDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<DistrictDTO> getAllDistricts() {
        return districtRepository.findAll().stream()
                .map(this::mapToDistrictDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<WardDTO> getAllWards() {
        return wardRepository.findAll().stream()
                .map(this::mapToWardDTO)
                .collect(Collectors.toList());
    }

    private ProvinceDTO mapToProvinceDTO(Province entity) {
        return ProvinceDTO.builder()
                .id(entity.getId())
                .code(entity.getCode())
                .name(entity.getName())
                .build();
    }

    private DistrictDTO mapToDistrictDTO(District entity) {
        return DistrictDTO.builder()
                .id(entity.getId())
                .code(entity.getCode())
                .name(entity.getName())
                .provinceId(entity.getProvince().getId())
                .provinceName(entity.getProvince().getName())
                .build();
    }

    private WardDTO mapToWardDTO(Ward entity) {
        return WardDTO.builder()
                .id(entity.getId())
                .code(entity.getCode())
                .name(entity.getName())
                .districtId(entity.getDistrict().getId())
                .districtName(entity.getDistrict().getName())
                .build();
    }
}