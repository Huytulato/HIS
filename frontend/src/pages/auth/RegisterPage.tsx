import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../api/authApi';

const { Title, Text } = Typography;

export const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Backend doesn't support full_name right now, so we only send what's supported
      await authApi.register({
        username: values.username,
        email: values.email,
        password: values.password,
        role: ["user"], // default role or let backend handle it
      });
      message.success('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login');
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại!';
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
        className="w-full max-w-4xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden flex flex-col md:flex-row"
      >
        <div className="md:w-5/12 bg-[#138BFB] p-10 flex flex-col justify-center items-center text-center text-white">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
            <span className="text-[#138BFB] text-3xl font-bold">HIS</span>
          </div>
          <Title level={2} style={{ color: 'white', marginBottom: '16px' }}>Tạo tài khoản mới</Title>
          <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
            Tham gia cùng chúng tôi để trải nghiệm hệ thống quản lý chuyên nghiệp và hiệu quả nhất.
          </Text>
        </div>

        <div className="md:w-7/12 p-10">
          <div className="mb-8">
            <Title level={3} className="text-gray-800 m-0">Đăng ký</Title>
            <Text className="text-gray-500">Điền thông tin của bạn vào form dưới đây</Text>
          </div>

          <Form
            name="register"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            className="grid grid-cols-1 md:grid-cols-2 gap-x-4"
          >
            <Form.Item
              name="fullname"
              label="Họ và tên"
              rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
            >
              <Input prefix={<IdcardOutlined className="text-gray-400" />} placeholder="Ví dụ: Nguyễn Văn A" />
            </Form.Item>

            <Form.Item
              name="username"
              label="Tên đăng nhập"
              rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
            >
              <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Ví dụ: nguyenvana" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              className="md:col-span-2"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' }
              ]}
            >
              <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="Ví dụ: email@domain.com" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Mật khẩu" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Xác nhận mật khẩu" />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              className="md:col-span-2"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Bạn phải đồng ý với điều khoản!')),
                },
              ]}
            >
              <Checkbox>
                Tôi đồng ý với <a href="#" className="text-[#138BFB]">Điều khoản dịch vụ</a> và <a href="#" className="text-[#138BFB]">Chính sách bảo mật</a>
              </Checkbox>
            </Form.Item>

            <Form.Item className="md:col-span-2 mb-0">
              <Button type="primary" htmlType="submit" className="w-full bg-[#138BFB] hover:bg-[#0f71d1] h-12 text-lg" loading={loading}>
                Đăng ký tài khoản
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-6">
            <Text className="text-gray-500">Đã có tài khoản? </Text>
            <Link to="/login" className="text-[#138BFB] font-medium hover:text-blue-700">
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};