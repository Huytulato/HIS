import { Input, Button, Select } from "antd";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import styles from "./SearchFilters.module.scss";

export default function SearchFilters({
  searchCode,
  setSearchCode,
  searchName,
  setSearchName,
  currentView
}: any) {
  // Mockup shows multiple inputs based on view.
  // E.g. Tỉnh/Thành phố shows Dropdown "Tên tỉnh/TP" + Input "Mã tỉnh/TP".
  // Let's implement dynamic labels based on the current view closely mimicking the mockup screenshots.
  
  const getParentLabel = () => {
    switch(currentView) {
      case 'district': return 'Tên tỉnh/TP';
      case 'ward': return 'Tỉnh/TP';
      default: return 'Trạng thái'; // Just a placeholder for province if needed
    }
  };

  const getMainLabel = () => {
    switch(currentView) {
      case 'province': return 'Tên tỉnh/TP';
      case 'district': return 'Tên huyện/ thị xã';
      case 'ward': return 'Tên xã/phường';
      default: return 'Tìm kiếm';
    }
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.inputsGroup}>
        {/* Only show parent dropdown if district or ward, matching mockup */}
        {currentView !== 'province' && (
          <div className={styles.inputWrapper}>
            <label>{getParentLabel()}</label>
            <Select 
              value={searchCode} 
              onChange={setSearchCode} 
              className={styles.formInput}
              placeholder="Chọn"
              options={[
                { value: "", label: "Chọn" },
                { value: "Ha Noi", label: "Hà Nội" }
              ]}
              style={{ width: '100%' }}
            />
          </div>
        )}
        
        {/* Main search input */}
        <div className={styles.inputWrapper} style={{ maxWidth: currentView === 'province' ? '400px' : '300px' }}>
          <label>{getMainLabel()}</label>
          <Input
            placeholder="Nhập"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className={styles.formInput}
          />
        </div>
      </div>

      <div className={styles.buttonsGroup}>
        <Button className={styles.btnImport} icon={<DownloadOutlined />}>
          Import file
        </Button>
        <Button type="primary" className={styles.btnSearch} icon={<SearchOutlined />}>
          Tìm kiếm
        </Button>
      </div>
    </div>
  );
}
