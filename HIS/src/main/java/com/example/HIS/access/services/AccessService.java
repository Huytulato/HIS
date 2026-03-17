package com.example.HIS.access.services;

import com.example.HIS.access.dto.*;
import com.example.HIS.access.models.Menu;
import com.example.HIS.access.models.Permission;
import com.example.HIS.access.models.RolePermission;
import com.example.HIS.access.repository.MenuRepository;
import com.example.HIS.access.repository.PermissionRepository;
import com.example.HIS.access.repository.RolePermissionRepository;
import com.example.HIS.auth.models.Role;
import com.example.HIS.auth.models.User;
import com.example.HIS.auth.repository.RoleRepository;
import com.example.HIS.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccessService {
    private final RoleRepository roleRepository;
    private final MenuRepository menuRepository;
    private final PermissionRepository permissionRepository;
    private final RolePermissionRepository rolePermissionRepository;
    private final UserRepository userRepository;

    public List<RoleDto> getAllRoles() {
        return roleRepository.findAll().stream()
                .map(this::convertToRoleDto)
                .collect(Collectors.toList());
    }

    public RoleDto getRoleById(Integer id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        return convertToRoleDto(role);
    }

    @Transactional
    public RoleDto createRole(RoleDto dto) {
        Role role = new Role();
        role.setCode(dto.getCode());
        role.setDisplayName(dto.getDisplayName());
        role.setDescription(dto.getDescription());
        Role saved = roleRepository.save(role);
        return convertToRoleDto(saved);
    }

    @Transactional
    public RoleDto updateRole(Integer id, RoleDto dto) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        role.setCode(dto.getCode());
        role.setDisplayName(dto.getDisplayName());
        role.setDescription(dto.getDescription());
        Role updated = roleRepository.save(role);
        return convertToRoleDto(updated);
    }

    @Transactional
    public void deleteRole(Integer id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        rolePermissionRepository.deleteAllByRole(role);
        roleRepository.delete(role);
    }

    public List<MenuTreeDto> getAllMenusTree() {
        List<Menu> allMenus = menuRepository.findAll();
        return buildMenuTree(allMenus);
    }

    public List<MenuTreeDto> getMenusByRoleId(Integer roleId) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        
        List<Permission> permissions = rolePermissionRepository.findPermissionsByRole(role);
        Set<Long> menuIds = permissions.stream()
                .map(p -> p.getMenu().getId())
                .collect(Collectors.toSet());
        
        menuIds.addAll(getParentMenuIds(menuIds, menuRepository.findAll()));
        
        List<Menu> roleMenus = menuRepository.findAllById(menuIds);
        return buildMenuTree(roleMenus);
    }

    private Set<Long> getParentMenuIds(Set<Long> menuIds, List<Menu> allMenus) {
        Set<Long> parentIds = new HashSet<>();
        Map<Long, Menu> menuMap = allMenus.stream()
                .collect(Collectors.toMap(Menu::getId, m -> m));
        
        for (Long menuId : menuIds) {
            Menu menu = menuMap.get(menuId);
            while (menu != null && menu.getParentId() != null) {
                parentIds.add(menu.getParentId());
                menu = menuMap.get(menu.getParentId());
            }
        }
        return parentIds;
    }

    private List<MenuTreeDto> buildMenuTree(List<Menu> menus) {
        Map<Long, MenuTreeDto> menuMap = menus.stream()
                .map(this::convertToMenuTreeDto)
                .collect(Collectors.toMap(MenuTreeDto::getId, m -> m));
        
        List<MenuTreeDto> roots = new ArrayList<>();
        
        for (MenuTreeDto menu : menuMap.values()) {
            if (menu.getParentId() == null) {
                roots.add(menu);
            } else {
                MenuTreeDto parent = menuMap.get(menu.getParentId());
                if (parent != null) {
                    parent.getChildren().add(menu);
                }
            }
        }
        
        roots.sort(Comparator.comparing(MenuTreeDto::getSortOrder));
        return roots;
    }

    public List<ModuleDto> getAllModulesWithPermissions() {
        List<Permission> permissions = permissionRepository.findAll();
        Map<String, List<PermissionDto>> grouped = permissions.stream()
                .map(this::convertToPermissionDto)
                .collect(Collectors.groupingBy(PermissionDto::getModuleName));
        
        return grouped.entrySet().stream()
                .map(entry -> new ModuleDto(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    public Set<Long> getPermissionIdsByRoleId(Integer roleId) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        List<Permission> permissions = rolePermissionRepository.findPermissionsByRole(role);
        return permissions.stream()
                .map(Permission::getId)
                .collect(Collectors.toSet());
    }

    @Transactional
    public void saveRolePermissions(Integer roleId, RolePermissionRequestDto dto) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        
        rolePermissionRepository.deleteAllByRole(role);
        
        List<Permission> permissions = permissionRepository.findByIdIn(dto.getPermissionIds());
        
        for (Permission permission : permissions) {
            RolePermission rp = new RolePermission(role, permission);
            rolePermissionRepository.save(rp);
        }
    }

    public Set<String> getPermissionCodesByRoleId(Integer roleId) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        return rolePermissionRepository.findPermissionCodesByRole(role);
    }

    public List<RoleUserDto> getUsersByRoleId(Integer roleId) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        
        List<User> users = userRepository.findByRoleId(roleId);
        
        return users.stream()
                .map(user -> new RoleUserDto(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail()
                ))
                .collect(Collectors.toList());
    }

    public Set<String> getPermissionCodesByUserId(Long userId) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Set<String> allPermissions = new HashSet<>();
        
        for (Role role : user.getRoles()) {
            Set<String> perms = rolePermissionRepository.findPermissionCodesByRole(role);
            allPermissions.addAll(perms);
        }
        
        return allPermissions;
    }

    private RoleDto convertToRoleDto(Role role) {
        return new RoleDto(
                role.getId(),
                role.getCode(),
                role.getDisplayName(),
                role.getDescription()
        );
    }

    private MenuTreeDto convertToMenuTreeDto(Menu menu) {
        return new MenuTreeDto(
                menu.getId(),
                menu.getParentId(),
                menu.getName(),
                menu.getPath(),
                menu.getIcon(),
                menu.getSortOrder(),
                new ArrayList<>()
        );
    }

    private PermissionDto convertToPermissionDto(Permission permission) {
        return new PermissionDto(
                permission.getId(),
                permission.getCode(),
                permission.getName(),
                permission.getModuleName(),
                permission.getMenu() != null ? permission.getMenu().getId() : null,
                permission.getMenu() != null ? permission.getMenu().getName() : null
        );
    }
}
