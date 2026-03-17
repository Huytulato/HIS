import { useState, useEffect } from 'react';
import { Table, Button, message, Checkbox, Card, Typography, Tooltip } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import accessApi from '../../api/accessApi';
import type { Role, Module } from '../../types/access';

const { Title, Text } = Typography;

interface PermissionMatrixProps {
  role: Role | null;
  onBack: () => void;
}

const ACTION_COLUMNS = [
  { title: 'Xem', key: 'VIEW' },
  { title: 'Thêm', key: 'CREATE' },
  { title: 'Sửa', key: 'UPDATE' },
  { title: 'Xóa', key: 'DELETE' },
];

const PermissionMatrix = ({ role, onBack }: PermissionMatrixProps) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (role) {
      fetchData();
    }
  }, [role]);

  const fetchData = async () => {
    if (!role) return;
    setLoading(true);
    try {
      const [matrixRes, permissionsRes] = await Promise.all([
        accessApi.getPermissionsMatrix(),
        accessApi.getPermissionsByRoleId(role.id),
      ]);
      setModules(matrixRes.data);
      setSelectedPermissions(permissionsRes.data);
    } catch (error) {
      message.error('Failed to fetch permissions');
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionChange = (permissionId: number, checked: boolean) => {
    if (checked) {
      setSelectedPermissions([...selectedPermissions, permissionId]);
    } else {
      setSelectedPermissions(selectedPermissions.filter(id => id !== permissionId));
    }
  };

  const handleSave = async () => {
    if (!role) return;
    setSaving(true);
    try {
      await accessApi.saveRolePermissions(role.id, { permissionIds: selectedPermissions });
      message.success('Permissions saved successfully');
    } catch (error) {
      message.error('Failed to save permissions');
    } finally {
      setSaving(false);
    }
  };

  const hasPermission = (permissionCode: string) => {
    return permissionCode.toUpperCase().includes('VIEW') ? 'VIEW' :
           permissionCode.toUpperCase().includes('CREATE') ? 'CREATE' :
           permissionCode.toUpperCase().includes('UPDATE') ? 'UPDATE' :
           permissionCode.toUpperCase().includes('DELETE') ? 'DELETE' : null;
  };

  const getPermissionByAction = (moduleName: string, actionKey: string) => {
    const module = modules.find(m => m.moduleName === moduleName);
    if (!module) return null;
    return module.permissions.find(p => hasPermission(p.code) === actionKey);
  };

  const isChecked = (moduleName: string, actionKey: string) => {
    const perm = getPermissionByAction(moduleName, actionKey);
    return perm ? selectedPermissions.includes(perm.id) : false;
  };

  return (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={4} style={{ margin: 0 }}>
              Cấu hình quyền cho: {role?.displayName}
            </Title>
            <Text type="secondary">Mã: {role?.code}</Text>
          </div>
          <Button onClick={onBack}>Quay lại</Button>
        </div>
      }
      loading={loading}
    >
      <Table
        dataSource={modules.map(m => ({ key: m.moduleName, ...m }))}
        pagination={false}
        columns={[
          {
            title: 'Module',
            dataIndex: 'moduleName',
            key: 'moduleName',
            width: 200,
            render: (text: string) => <Text strong>{text}</Text>,
          },
          ...ACTION_COLUMNS.map(action => ({
            title: action.title,
            key: action.key,
            align: 'center' as const,
            render: (_: unknown, record: Module) => {
              const perm = getPermissionByAction(record.moduleName, action.key);
              if (!perm) return <span style={{ color: '#999' }}>-</span>;
              return (
                <Tooltip title={perm.name}>
                  <Checkbox
                    checked={isChecked(record.moduleName, action.key)}
                    onChange={(e) => handlePermissionChange(perm.id, e.target.checked)}
                  />
                </Tooltip>
              );
            },
          })),
        ]}
      />

      <div style={{ marginTop: 24, textAlign: 'right' }}>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={handleSave}
          loading={saving}
          size="large"
        >
          Lưu Quyền
        </Button>
      </div>
    </Card>
  );
};

export default PermissionMatrix;
