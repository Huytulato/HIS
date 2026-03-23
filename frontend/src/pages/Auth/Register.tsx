import { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { authApi, type RegisterRequest } from "../../services/authApi";
import styles from "./Auth.module.scss";

const { Title, Text } = Typography;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: RegisterRequest) => {
    setLoading(true);
    try {
      await authApi.register(values);
      message.success("Đăng ký thành công!");
      navigate("/login");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      message.error(
        err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại!",
      );
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
            Đăng ký tài khoản
          </Title>
        </div>

        <Form
          name="register_form"
          className={styles.authForm}
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp!"),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Xác nhận mật khẩu"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.submitButton}
              loading={loading}
              block
            >
              Đăng ký
            </Button>
          </Form.Item>

          <div className={styles.authFooter}>
            <Text type="secondary">Đã có tài khoản? </Text>
            <Link to="/login">Đăng nhập</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
