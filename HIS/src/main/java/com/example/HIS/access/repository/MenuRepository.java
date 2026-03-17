package com.example.HIS.access.repository;

import com.example.HIS.access.models.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findByParentIdIsNullOrderBySortOrderAsc();
    
    List<Menu> findByParentIdOrderBySortOrderAsc(Long parentId);
    
    @Query("SELECT m FROM Menu m WHERE m.isActive = true ORDER BY m.sortOrder ASC")
    List<Menu> findAllActiveMenus();
}
