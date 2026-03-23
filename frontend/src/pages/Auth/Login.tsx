import { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { authApi, type LoginRequest } from "../../services/authApi";
import styles from "./Auth.module.scss";

const { Title, Text } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: LoginRequest) => {
    setLoading(true);
    try {
      const response = await authApi.login(values);
      localStorage.setItem("token", response.token);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("user", JSON.stringify({
        id: response.id,
        username: response.username,
        email: response.email,
        roles: response.roles
      }));
      message.success("Đăng nhập thành công!");
      navigate("/");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      message.error(err.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <Card className={styles.authCard}>
        <div className={styles.authHeader}>
          <img src="/vite.svg" alt="Logo" className={styles.logo} />
          <Title level={3} className={styles.authTitle}>
            Đăng nhập hệ thống
          </Title>
        </div>

        <Form
          name="login_form"
          className={styles.authForm}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.submitButton}
              loading={loading}
              block
            >
              Đăng nhập
            </Button>
          </Form.Item>

          <div className={styles.authFooter}>
            <Text type="secondary">Chưa có tài khoản? </Text>
            <Link to="/register">Đăng ký ngay</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
