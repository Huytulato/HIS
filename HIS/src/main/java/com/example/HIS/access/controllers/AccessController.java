package com.example.HIS.access.controllers;

import com.example.HIS.access.dto.*;
import com.example.HIS.access.services.AccessService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/access")
@RequiredArgsConstructor
public class AccessController {
    private final AccessService accessService;

    @GetMapping("/roles")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<List<RoleDto>> getAllRoles() {
        return ResponseEntity.ok(accessService.getAllRoles());
    }

    @GetMapping("/roles/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<RoleDto> getRoleById(@PathVariable Integer id) {
        return ResponseEntity.ok(accessService.getRoleById(id));
    }

    @PostMapping("/roles")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<RoleDto> createRole(@RequestBody RoleDto dto) {
        return ResponseEntity.ok(accessService.createRole(dto));
    }

    @PutMapping("/roles/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<RoleDto> updateRole(@PathVariable Integer id, @RequestBody RoleDto dto) {
        return ResponseEntity.ok(accessService.updateRole(id, dto));
    }

    @DeleteMapping("/roles/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteRole(@PathVariable Integer id) {
        accessService.deleteRole(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/menus/tree")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<List<MenuTreeDto>> getAllMenusTree() {
        return ResponseEntity.ok(accessService.getAllMenusTree());
    }

    @GetMapping("/roles/{roleId}/menus")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<List<MenuTreeDto>> getMenusByRoleId(@PathVariable Integer roleId) {
        return ResponseEntity.ok(accessService.getMenusByRoleId(roleId));
    }

    @GetMapping("/permissions/matrix")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<List<ModuleDto>> getPermissionsMatrix() {
        return ResponseEntity.ok(accessService.getAllModulesWithPermissions());
    }

    @GetMapping("/roles/{roleId}/permissions")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<Set<Long>> getPermissionsByRoleId(@PathVariable Integer roleId) {
        return ResponseEntity.ok(accessService.getPermissionIdsByRoleId(roleId));
    }

    @PostMapping("/roles/{roleId}/permissions")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<Void> saveRolePermissions(
            @PathVariable Integer roleId,
            @RequestBody RolePermissionRequestDto dto) {
        accessService.saveRolePermissions(roleId, dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/roles/{roleId}/users")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<List<RoleUserDto>> getUsersByRoleId(@PathVariable Integer roleId) {
        return ResponseEntity.ok(accessService.getUsersByRoleId(roleId));
    }
}
