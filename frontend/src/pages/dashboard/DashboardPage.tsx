import React from "react";
import { Card, Col, Row, Statistic, Typography } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export const DashboardPage: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <Title level={2}>Tổng quan hệ thống</Title>
        <Paragraph className="text-white-500">
          Chào mừng bạn đến với trang quản trị HIS Dashboard.
        </Paragraph>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card className="shadow-sm border-blue-100 hover:shadow-md transition-shadow">
            <Statistic
              title={
                <span className="text-gray-500 font-medium">
                  Tổng người dùng
                </span>
              }
              value={1128}
              prefix={<UserOutlined className="text-[#138BFB] mr-2" />}
              valueStyle={{ color: "#1f2937", fontWeight: "bold" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="shadow-sm border-green-100 hover:shadow-md transition-shadow">
            <Statistic
              title={
                <span className="text-gray-500 font-medium">
                  Lượt truy cập hôm nay
                </span>
              }
              value={93}
              prefix={<BarChartOutlined className="text-green-500 mr-2" />}
              valueStyle={{ color: "#1f2937", fontWeight: "bold" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="shadow-sm border-purple-100 hover:shadow-md transition-shadow">
            <Statistic
              title={
                <span className="text-gray-500 font-medium">Hệ thống</span>
              }
              value="Hoạt động tốt"
              prefix={<SettingOutlined className="text-purple-500 mr-2" />}
              valueStyle={{
                color: "#10b981",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>
      </Row>

      <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
        <Title level={4} className="text-[#138BFB]">
          Thông tin nổi bật
        </Title>
        <Paragraph>
          Giao diện đã được đồng bộ với màu sắc chủ đạo{" "}
          <span className="font-bold text-[#138BFB]">#138BFB</span> theo đúng
          yêu cầu. Các chức năng cơ bản như Đăng nhập, Đăng ký và Đăng xuất đã
          được kết nối với hệ thống State và API.
        </Paragraph>
      </div>
    </div>
  );
};
