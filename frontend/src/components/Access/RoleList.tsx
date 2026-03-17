import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm, message, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
import accessApi from '../../api/accessApi';
import type { Role } from '../../types/access';

interface RoleListProps {
  onConfigurePermissions: (role: Role) => void;
  onManageUsers: (role: Role) => void;
}

const RoleList = ({ onConfigurePermissions, onManageUsers }: RoleListProps) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [form] = Form.useForm();

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await accessApi.getAllRoles();
      setRoles(response.data);
    } catch (error) {
      message.error('Failed to fetch roles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingRole) {
        await accessApi.updateRole(editingRole.id, values);
        message.success('Role updated successfully');
      } else {
        await accessApi.createRole(values);
        message.success('Role created successfully');
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingRole(null);
      fetchRoles();
    } catch (error) {
      message.error('Operation failed');
    }
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    form.setFieldsValue(role);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await accessApi.deleteRole(id);
      message.success('Role deleted successfully');
      fetchRoles();
    } catch (error) {
      message.error('Failed to delete role');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'Mã Quyền',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Tên Nhóm Quyền',
      dataIndex: 'displayName',
      key: 'displayName',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: unknown, record: Role) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<SettingOutlined />} 
            onClick={() => onConfigurePermissions(record)}
            title="Cấu hình quyền"
          />
          <Button 
            type="text" 
            icon={<TeamOutlined />} 
            onClick={() => onManageUsers(record)}
            title="Quản lý thành viên"
          />
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => {
            setEditingRole(null);
            form.resetFields();
            setIsModalOpen(true);
          }}
        >
          Thêm Nhóm Quyền
        </Button>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={roles} 
        rowKey="id" 
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingRole ? 'Cập nhật Nhóm Quyền' : 'Thêm Nhóm Quyền'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setEditingRole(null);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="code"
            label="Mã Quyền"
            rules={[{ required: true, message: 'Vui lòng nhập mã quyền' }]}
          >
            <Input placeholder="VD: ROLE_ADMIN" />
          </Form.Item>
          <Form.Item
            name="displayName"
            label="Tên Nhóm Quyền"
            rules={[{ required: true, message: 'Vui lòng nhập tên nhóm quyền' }]}
          >
            <Input placeholder="VD: Quản trị viên" />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea placeholder="Mô tả nhóm quyền..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoleList;
