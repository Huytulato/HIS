package com.example.backend.category.repository;

import com.example.backend.category.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DistrictRepository extends JpaRepository<District, String> {
    List<District> findByProvinceId(String provinceId);
}