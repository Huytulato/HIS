import { Layout, Dropdown, MenuProps } from "antd";
import { EditOutlined, LogoutOutlined } from "@ant-design/icons";
import { ViewType } from "@/pages/Location/types";
import styles from "./Header.module.scss";

const { Header: AntHeader } = Layout;

type Props = {
  currentView?: ViewType;
};

export default function Header({ currentView }: Props) {
  const getBreadcrumb = () => {
    switch (currentView) {
      case "province":
        return "Tỉnh/Thành phố";
      case "district":
        return "Huyện/Quận";
      case "ward":
        return "Xã/Phường";
      default:
        return "";
    }
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
    },
  ];

  return (
    <AntHeader className={styles.headerContainer}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>[IN]</div>
        <div className={styles.breadcrumb}>
          <span>Trang chủ</span>
          <span>/</span>
          <span className={styles.currentPath}>{getBreadcrumb()}</span>
        </div>
      </div>

      <div className={styles.rightSection}>
        <span style={{ fontWeight: 500 }}>Vinorsoft</span>
        <div className={styles.flag}></div>

        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <div className={styles.userInfo}>
            <EditOutlined style={{ fontSize: 18, color: "#ffffff" }} />
          </div>
        </Dropdown>
      </div>
    </AntHeader>
  );
}
