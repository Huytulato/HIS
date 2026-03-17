import { useState, useEffect } from 'react';
import { Table, Button, Card, Typography, message, Transfer, Modal } from 'antd';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import accessApi from '../../api/accessApi';
import type { Role, UserResponse } from '../../types/access';

const { Title, Text } = Typography;

interface RoleUsersProps {
  role: Role | null;
  onBack: () => void;
}

interface TransferItem {
  key: string;
  title: string;
  description: string;
}

const RoleUsers = ({ role, onBack }: RoleUsersProps) => {
  const [usersInRole, setUsersInRole] = useState<UserResponse[]>([]);
  const [allUsers, setAllUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (role) {
      fetchData();
    }
  }, [role]);

  const fetchData = async () => {
    if (!role) return;
    setLoading(true);
    try {
      const [usersInRoleRes, allUsersRes] = await Promise.all([
        accessApi.getUsersByRoleId(role.id),
        accessApi.getAllUsers(),
      ]);
      setUsersInRole(usersInRoleRes.data);
      setAllUsers(allUsersRes.data);
      setTargetKeys(usersInRoleRes.data.map(u => u.userId.toString()));
    } catch (error) {
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleTransferChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
  };

  const handleSave = async () => {
    if (!role) return;
    setLoading(true);
    try {
      message.success('Cập nhật thành viên thành công!');
      onBack();
    } catch (error) {
      message.error('Failed to update users');
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'userId',
      key: 'userId',
      width: 60,
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  const transferDataSource: TransferItem[] = allUsers.map(user => ({
    key: user.userId.toString(),
    title: user.username,
    description: user.email,
  }));

  return (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={4} style={{ margin: 0 }}>
              Quản lý thành viên: {role?.displayName}
            </Title>
            <Text type="secondary">Mã: {role?.code}</Text>
          </div>
          <Button onClick={onBack} icon={<ArrowLeftOutlined />}>Quay lại</Button>
        </div>
      }
      loading={loading}
    >
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Quản lý Thành viên
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={usersInRole.map(u => ({ ...u, key: u.userId }))}
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: 'Chưa có thành viên nào trong nhóm' }}
      />

      <Modal
        title={`Gán thành viên cho: ${role?.displayName}`}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
        width={700}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Transfer
          dataSource={transferDataSource}
          titles={['Danh sách người dùng', 'Thành viên nhóm']}
          targetKeys={targetKeys}
          onChange={(keys) => handleTransferChange(keys as string[])}
          render={(item) => (
            <span>
              <UserOutlined /> {item.title} - <Text type="secondary">{item.description}</Text>
            </span>
          )}
          listStyle={{ width: 280, height: 400 }}
          showSearch
          filterOption={(inputValue, item) =>
            item.title.indexOf(inputValue) !== -1 || item.description.indexOf(inputValue) !== -1
          }
        />
      </Modal>
    </Card>
  );
};

export default RoleUsers;
