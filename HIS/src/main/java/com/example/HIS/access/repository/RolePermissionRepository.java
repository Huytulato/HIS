package com.example.HIS.access.repository;

import com.example.HIS.access.models.Permission;
import com.example.HIS.access.models.RolePermission;
import com.example.HIS.auth.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface RolePermissionRepository extends JpaRepository<RolePermission, Long> {
    List<RolePermission> findByRole(Role role);
    
    @Query("SELECT rp.permission FROM RolePermission rp WHERE rp.role = :role")
    List<Permission> findPermissionsByRole(Role role);
    
    @Query("SELECT rp.permission.code FROM RolePermission rp WHERE rp.role = :role")
    Set<String> findPermissionCodesByRole(Role role);
    
    void deleteByRole(Role role);
    
    @Modifying
    @Query("DELETE FROM RolePermission rp WHERE rp.role = :role")
    void deleteAllByRole(Role role);
    
    boolean existsByRoleAndPermission(Role role, Permission permission);
}
