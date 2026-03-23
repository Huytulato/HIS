import { Table, Pagination } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "./Table.module.scss";

export default function DataTable({ 
  data, 
  currentView,
  totalRecords,
  rowsPerPage,
  currentPage,
  setRowsPerPage,
  setCurrentPage
}: any) {
  const isDistrict = currentView === 'district';
  const isWard = currentView === 'ward';

  const baseColumns: any = [
    { 
      title: "STT", 
      dataIndex: "index", 
      key: "index", 
      align: "center", 
      width: 60,
      render: (_: any, __: any, index: number) => (currentPage - 1) * rowsPerPage + index + 1
    }
  ];

  if (isWard) {
    baseColumns.push({ title: "Mã xã/phường", dataIndex: "code", key: "code" });
    baseColumns.push({ title: "Tên xã/phường", dataIndex: "name", key: "name" });
  } else if (isDistrict) {
    baseColumns.push({ title: "Tên tỉnh/TP", dataIndex: "provinceName", key: "provinceName" });
    baseColumns.push({ title: "Mã huyện/thị xã", dataIndex: "code", key: "code" });
    baseColumns.push({ title: "Tên huyện/thị xã", dataIndex: "name", key: "name" });
  } else {
    // province
    baseColumns.push({ title: "Mã tỉnh/TP", dataIndex: "code", key: "code" });
    baseColumns.push({ title: "Tên tỉnh/TP", dataIndex: "name", key: "name" });
  }

  // All 3 screens have Tác vụ column, per user answer: "đồng bộ cột Tác vụ cho cả 3 màn hình"
  baseColumns.push({
    title: "Tác vụ", 
    key: "action",
    align: "center",
    width: 100,
    render: () => (
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2563eb' }} title="Edit">
          <EditOutlined style={{ fontSize: 16 }} />
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }} title="Delete">
          <DeleteOutlined style={{ fontSize: 16 }} />
        </button>
      </div>
    )
  });

  return (
    <div className={styles.tableWrapper}>
      <Table 
        rowKey="id" 
        columns={baseColumns} 
        dataSource={data} 
        pagination={false}
      />
      
      <div className={styles.paginationWrapper}>
        <div className={styles.totalText}>
          Tổng: {totalRecords} bản ghi
        </div>
        
        <div className={styles.rightPagination}>
          <Pagination 
            current={currentPage}
            onChange={(page) => setCurrentPage(page)}
            defaultCurrent={1} 
            total={totalRecords} 
            pageSize={rowsPerPage}
            showSizeChanger={false}
          />
          
          <select 
            className={styles.sizeChanger}
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
             <option value="5">5 / trang</option>
             <option value="10">10 / trang</option>
             <option value="15">15 / trang</option>
             <option value="20">20 / trang</option>
             <option value="50">50 / trang</option>
          </select>
          
          <div className={styles.quickJumper}>
            <span>Đến trang</span>
            <input 
              type="text" 
              defaultValue={currentPage}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = Number(e.currentTarget.value);
                  if (val > 0) setCurrentPage(val);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
