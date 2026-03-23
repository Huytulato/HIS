package com.example.backend.category.repository;

import com.example.backend.category.entity.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WardRepository extends JpaRepository<Ward, String> {
    List<Ward> findByDistrictId(String districtId);
}