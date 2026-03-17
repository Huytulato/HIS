import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button, Layout, theme } from 'antd';
import { LogOut, User } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { authApi } from '../../api/authApi';

const { Header, Content } = Layout;

export const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error', error);
    } finally {
      logout();
      navigate('/login');
    }
  };

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header className="flex items-center justify-between px-6 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#138BFB] flex items-center justify-center text-white font-bold text-lg">
            H
          </div>
          <span className="text-xl font-bold text-white-800">HIS Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <User size={18} />
            <span className="font-medium">{user?.username}</span>
          </div>
          <Button
            type="text"
            icon={<LogOut size={18} />}
            onClick={handleLogout}
            className="flex items-center text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            Logout
          </Button>
        </div>
      </Header>
      <Content className="p-6">
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
          className="shadow-sm"
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};