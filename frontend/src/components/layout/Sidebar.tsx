import { useState } from "react";
import { Menu, Input } from "antd";
import { SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { ViewType } from "@/pages/Location/types";
import styles from "./Sidebar.module.scss";

type Props = {
  currentView: ViewType;
  onChange: (v: ViewType) => void;
};

const MENU_ITEMS = [
  { key: "loai-dat-hen", label: "Loại đặt hẹn" },
  { key: "loai-chinh-sach", label: "Loại chính sách" },
  { key: "phuong-thuc-dat-hen", label: "Phương thức đặt hẹn" },
  { key: "ly-do-tham-kham", label: "Lý do thăm khám" },
  { key: "district", label: "Huyện/thị xã" },
  { key: "ward", label: "Xã/phường" },
  { key: "province", label: "Tỉnh/thành phố" },
  { key: "danh-muc-the", label: "Danh mục thẻ" },
  { key: "huong-dieu-tri", label: "Hướng điều trị" },
  { key: "dien-bien-mau", label: "Diễn biến mẫu" },
  { key: "danh-muc-thanh-toan", label: "Danh mục thanh toán" },
  { key: "nhom-luot-chi-dinh", label: "Nhóm lượt chỉ định dịch vụ" },
  { key: "nhom-dich-vu-pt", label: "Nhóm dịch vụ phẫu thuật" },
  { key: "dich-vu-phong-kham", label: "Dịch vụ phòng khám" },
  { key: "cap-do-bao-mat", label: "Cấp độ bảo mật văn bản" },
  { key: "loai-thanh-toan", label: "Loại thanh toán" },
  { key: "trinh-do-chuyen-mon", label: "Trình độ chuyên môn" },
  { key: "nhom-thanh-toan", label: "Nhóm thanh toán" },
  { key: "trang-thai-cau-hinh", label: "Trạng thái cấu hình dịch vụ" },
  { key: "bao-lanh", label: "Bảo lãnh" },
];

export default function Sidebar({ currentView, onChange }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = (e: any) => {
    // Only trigger onChange for supported views
    if (["province", "district", "ward"].includes(e.key)) {
      onChange(e.key as ViewType);
    }
  };

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.searchWrapper}>
        <Input 
          prefix={<SearchOutlined style={{ color: "#9ca3af" }} />} 
          placeholder="Tìm kiếm" 
          style={{ borderRadius: 6, height: 36 }}
        />
      </div>

      <div className={styles.menuWrapper}>
        <Menu
          mode="inline"
          selectedKeys={[currentView]}
          onClick={handleMenuClick}
          className={styles.customMenu}
          items={MENU_ITEMS.map((item) => ({
            key: item.key,
            label: item.label,
          }))}
        />
      </div>

      <div 
        className={styles.collapseBtn} 
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
    </div>
  );
}
