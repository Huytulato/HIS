package com.example.backend.category.service;

import com.example.backend.category.entity.District;
import com.example.backend.category.entity.Province;
import com.example.backend.category.entity.Ward;
import com.example.backend.category.helper.ExcelHelper;
import com.example.backend.category.repository.DistrictRepository;
import com.example.backend.category.repository.ProvinceRepository;
import com.example.backend.category.repository.WardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class LocationImportService {

    private final ProvinceRepository provinceRepository;
    private final DistrictRepository districtRepository;
    private final WardRepository wardRepository;
    private final ExcelHelper excelHelper;

    @Transactional
    public String importExcel(MultipartFile file) throws IOException {
        if (!excelHelper.hasExcelFormat(file)) {
            throw new IOException("Invalid file format. Please upload a valid Excel file.");
        }

        var dataList = excelHelper.readExcel(file);

        int provinceCount = 0;
        int districtCount = 0;
        int wardCount = 0;

        for (Object[] row : dataList) {
            String provinceId = (String) row[0];
            String provinceName = (String) row[1];
            String districtId = (String) row[2];
            String districtName = (String) row[3];
            String wardId = (String) row[4];
            String wardName = (String) row[5];

            Province province = provinceRepository.findById(provinceId).orElse(null);
            if (province == null) {
                province = Province.builder()
                        .id(provinceId)
                        .code(provinceId)
                        .name(provinceName)
                        .build();
                provinceRepository.save(province);
                provinceCount++;
            } else {
                province.setName(provinceName);
                provinceRepository.save(province);
            }

            District district = districtRepository.findById(districtId).orElse(null);
            if (district == null) {
                district = District.builder()
                        .id(districtId)
                        .code(districtId)
                        .name(districtName)
                        .province(province)
                        .build();
                districtRepository.save(district);
                districtCount++;
            } else {
                district.setName(districtName);
                district.setProvince(province);
                districtRepository.save(district);
            }

            Ward ward = wardRepository.findById(wardId).orElse(null);
            if (ward == null) {
                ward = Ward.builder()
                        .id(wardId)
                        .code(wardId)
                        .name(wardName)
                        .district(district)
                        .build();
                wardRepository.save(ward);
                wardCount++;
            } else {
                ward.setName(wardName);
                ward.setDistrict(district);
                wardRepository.save(ward);
            }
        }

        return String.format("Import thành công! Tỉnh: %d, Huyện: %d, Xã: %d", provinceCount, districtCount, wardCount);
    }
}