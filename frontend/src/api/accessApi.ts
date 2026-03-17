import axiosClient from './axiosClient';
import type { Role, Menu, Module, RolePermissionRequest, UserResponse } from '../types/access';

const accessApi = {
  // Role APIs
  getAllRoles: () => axiosClient.get<Role[]>('/api/access/roles'),
  getRoleById: (id: number) => axiosClient.get<Role>(`/api/access/roles/${id}`),
  createRole: (data: Role) => axiosClient.post<Role>('/api/access/roles', data),
  updateRole: (id: number, data: Role) => axiosClient.put<Role>(`/api/access/roles/${id}`, data),
  deleteRole: (id: number) => axiosClient.delete(`/api/access/roles/${id}`),

  // Menu APIs
  getAllMenusTree: () => axiosClient.get<Menu[]>('/api/access/menus/tree'),
  getMenusByRoleId: (roleId: number) => axiosClient.get<Menu[]>(`/api/access/roles/${roleId}/menus`),

  // Permission APIs
  getPermissionsMatrix: () => axiosClient.get<Module[]>('/api/access/permissions/matrix'),
  getPermissionsByRoleId: (roleId: number) => axiosClient.get<number[]>(`/api/access/roles/${roleId}/permissions`),
  saveRolePermissions: (roleId: number, data: RolePermissionRequest) => 
    axiosClient.post(`/api/access/roles/${roleId}/permissions`, data),

  // User APIs
  getUsersByRoleId: (roleId: number) => axiosClient.get<UserResponse[]>(`/api/access/roles/${roleId}/users`),
  getAllUsers: () => axiosClient.get<UserResponse[]>('/api/users'),
};

export default accessApi;
