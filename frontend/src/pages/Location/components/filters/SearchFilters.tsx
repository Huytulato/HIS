import { Input, Button, Select, Upload, message } from "antd";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { locationApi } from "../../../../services/locationApi";
import styles from "./SearchFilters.module.scss";

interface SearchFiltersProps {
  searchCode: string;
  setSearchCode: (val: string) => void;
  searchName: string;
  setSearchName: (val: string) => void;
  currentView: string;
}

export default function SearchFilters({
  searchCode,
  setSearchCode,
  searchName,
  setSearchName,
  currentView,
}: SearchFiltersProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { mutate } = useSWRConfig();

  const getParentLabel = () => {
    switch (currentView) {
      case "district":
        return "Tên tỉnh/TP";
      case "ward":
        return "Tỉnh/TP";
      default:
        return "Trạng thái";
    }
  };

  const getMainLabel = () => {
    switch (currentView) {
      case "province":
        return "Tên tỉnh/TP";
      case "district":
        return "Tên huyện/ quận";
      case "ward":
        return "Tên xã/phường";
      default:
        return "Tìm kiếm";
    }
  };

  const handleImport = async (file: File) => {
    setIsUploading(true);
    try {
      const res = await locationApi.importExcel(file);
      message.success(res.message || "Import thành công!");
      
      // Refresh data
      mutate((key: string | readonly unknown[]) => typeof key === 'string' && key.startsWith('/api/locations/'));
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      message.error(err.response?.data?.message || "Import thất bại!");
    } finally {
      setIsUploading(false);
    }
    return false;
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.inputsGroup}>
        {/* Only show parent dropdown if district or ward, matching mockup */}
        {currentView !== "province" && (
          <div className={styles.inputWrapper}>
            <label>{getParentLabel()}</label>
            <Select
              value={searchCode}
              onChange={setSearchCode}
              className={styles.formInput}
              placeholder="Chọn"
              options={[
                { value: "", label: "Chọn" },
                { value: "Ha Noi", label: "Hà Nội" },
              ]}
              style={{ width: "100%" }}
            />
          </div>
        )}

        {/* Main search input */}
        <div
          className={styles.inputWrapper}
          style={{ maxWidth: currentView === "province" ? "400px" : "300px" }}
        >
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
        <Upload
          beforeUpload={handleImport}
          showUploadList={false}
          accept=".xls,.xlsx"
          disabled={isUploading}
        >
          <Button className={styles.btnImport} icon={<DownloadOutlined />} loading={isUploading}>
            Import file
          </Button>
        </Upload>
        <Button
          type="primary"
          className={styles.btnSearch}
          icon={<SearchOutlined />}
        >
          Tìm kiếm
        </Button>
      </div>
    </div>
  );
}
