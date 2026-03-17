export interface Role {
  id: number;
  code: string;
  displayName: string;
  description: string;
}

export interface Menu {
  id: number;
  parentId: number | null;
  name: string;
  path: string;
  icon?: string;
  sortOrder: number;
  children?: Menu[];
}

export interface Permission {
  id: number;
  code: string;
  name: string;
  moduleName: string;
  menuId: number | null;
  menuName?: string;
}

export interface Module {
  moduleName: string;
  permissions: Permission[];
}

export interface RolePermissionRequest {
  permissionIds: number[];
}

export interface UserResponse {
  userId: number;
  username: string;
  email: string;
}
