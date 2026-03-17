import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../api/authApi';
import { useAuthStore } from '../../store/useAuthStore';

const { Title, Text } = Typography;

export const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await authApi.login({
        username: values.username,
        password: values.password,
      });
      
      const { token, refreshToken, ...userInfo } = response;
      login(userInfo as any, token, refreshToken);
      
      message.success('Đăng nhập thành công!');
      navigate('/');
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại!';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden"
      >
        <div className="bg-[#138BFB] p-8 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <span className="text-[#138BFB] text-2xl font-bold">HIS</span>
          </div>
          <Title level={3} style={{ color: 'white', margin: 0 }}>Chào mừng trở lại</Title>
          <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Đăng nhập để quản lý hệ thống</Text>
        </div>

        <div className="p-8">
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Vui lòng nhập Email/Tên đăng nhập!' }]}
            >
              <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Email / Tên đăng nhập" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Mật khẩu" />
            </Form.Item>

            <div className="flex justify-between items-center mb-6">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ tôi</Checkbox>
              </Form.Item>
              <a className="text-[#138BFB] hover:text-blue-700" href="">
                Quên mật khẩu?
              </a>
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full bg-[#138BFB] hover:bg-[#0f71d1]" loading={loading}>
                Đăng nhập
              </Button>
            </Form.Item>
            
            <div className="text-center mt-4">
              <Text className="text-gray-500">Chưa có tài khoản? </Text>
              <Link to="/register" className="text-[#138BFB] font-medium hover:text-blue-700">
                Đăng ký ngay
              </Link>
            </div>
          </Form>
        </div>
      </motion.div>
    </div>
  );
};