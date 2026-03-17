import { useState } from 'react';
import { Typography, Card } from 'antd';
import RoleList from '../../components/Access/RoleList';
import PermissionMatrix from '../../components/Access/PermissionMatrix';
import RoleUsers from '../../components/Access/RoleUsers';
import type { Role } from '../../types/access';

const { Title } = Typography;

type ViewMode = 'role-list' | 'permissions' | 'users';

export const AccessManagement = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('role-list');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleConfigurePermissions = (role: Role) => {
    setSelectedRole(role);
    setViewMode('permissions');
  };

  const handleManageUsers = (role: Role) => {
    setSelectedRole(role);
    setViewMode('users');
  };

  const handleBack = () => {
    setViewMode('role-list');
    setSelectedRole(null);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        Quản lý Phân quyền
      </Title>

      <Card>
        {viewMode === 'role-list' && (
          <RoleList
            onConfigurePermissions={handleConfigurePermissions}
            onManageUsers={handleManageUsers}
          />
        )}

        {viewMode === 'permissions' && (
          <PermissionMatrix
            role={selectedRole}
            onBack={handleBack}
          />
        )}

        {viewMode === 'users' && (
          <RoleUsers
            role={selectedRole}
            onBack={handleBack}
          />
        )}
      </Card>
    </div>
  );
};

export default AccessManagement;
