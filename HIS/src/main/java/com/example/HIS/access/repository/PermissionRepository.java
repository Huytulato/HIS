package com.example.HIS.access.repository;

import com.example.HIS.access.models.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {
    Permission findByCode(String code);
    
    List<Permission> findByMenuId(Long menuId);
    
    @Query("SELECT DISTINCT p FROM Permission p WHERE p.moduleName = :moduleName")
    List<Permission> findByModuleName(String moduleName);
    
    @Query("SELECT DISTINCT p FROM Permission p JOIN p.menu m WHERE m.id = :menuId")
    List<Permission> findPermissionsByMenuId(Long menuId);
    
    List<Permission> findByIdIn(Set<Long> ids);
}
