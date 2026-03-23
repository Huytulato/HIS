import { Layout } from "antd";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

import SearchFilters from "./components/filters/SearchFilters";
import DataTable from "./components/table/DataTable";

import { useLocationData } from "./hooks/useLocationData";
import styles from "./Location.module.scss";

const { Sider, Content } = Layout;

export default function LocationPage() {
  const state = useLocationData();

  return (
    <Layout className={styles.pageContainer}>
      <Sider width={250} theme="light" style={{ borderRight: '1px solid #e5e7eb' }}>
        <Sidebar
          currentView={state.currentView}
          onChange={state.setCurrentView}
        />
      </Sider>

      <Layout className={styles.mainLayout}>
        <Header currentView={state.currentView} />

        <Content className={styles.contentWrapper}>
          <div className={styles.stitchContainer}>
            <div className={styles.searchSection}>
              <SearchFilters {...state} />
            </div>

            <div className={styles.dataDisplaySection}>
              <DataTable data={state.data} currentView={state.currentView} totalRecords={state.totalRecords}
                         rowsPerPage={state.rowsPerPage} currentPage={state.currentPage}
                         setRowsPerPage={state.setRowsPerPage} setCurrentPage={state.setCurrentPage} />
            </div>
            
            <div className={styles.footerText}>
              Powered by Thong Nhat hospital and Military Bank
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
