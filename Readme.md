# Hệ Thống Thông Tin Bệnh Viện (HIS - Hospital Information System)

Dự án Hệ thống thông tin bệnh viện được xây dựng dựa trên kiến trúc hiện đại, bao gồm phần Backend mạnh mẽ với Spring Boot và Frontend tương tác cao với ReactJS.

## 🚀 Công Nghệ Sử Dụng

### Frontend (`/frontend`)
- **Framework:** React 19 + TypeScript
- **Công cụ Build:** Vite
- **Thư viện UI:** Ant Design (antd)
- **Quản lý trạng thái & Fetch Data:** SWR, Axios
- **Routing:** React Router DOM
- **Icon & Styling:** Lucide React, Sass/SCSS

### Backend (`/HIS`)
- **Framework:** Spring Boot (Java 17)
- **Cơ sở dữ liệu:** PostgreSQL với Spring Data JPA
- **Bảo mật:** Spring Security + JWT (JSON Web Tokens)
- **Tài liệu API:** OpenAPI / Swagger UI (springdoc)
- **Tiện ích:** Lombok, Apache POI (Hỗ trợ xuất/nhập Excel)

## 📁 Cấu Trúc Dự Án

```text
/
├── frontend/   # Chứa mã nguồn ứng dụng giao diện (React + Vite)
└── HIS/        # Chứa mã nguồn ứng dụng máy chủ (Spring Boot + Maven)
```

## ⚙️ Yêu Cầu Hệ Thống
Để chạy được dự án này, máy tính của bạn cần cài đặt:
- Node.js (phiên bản 18 trở lên)
- Java 17 (JDK)
- Maven
- Hệ quản trị cơ sở dữ liệu PostgreSQL

## 🛠️ Hướng Dẫn Cài Đặt và Chạy Dự Án

### 1. Cài đặt và Chạy Backend
1. Mở terminal và di chuyển vào thư mục backend:
   ```bash
   cd HIS
   ```
2. Cấu hình thông tin kết nối Database PostgreSQL và JWT Secret (nếu cần) trong file cấu hình (`src/main/resources/application.properties` hoặc `.yml`).
3. Khởi chạy ứng dụng bằng Maven Wrapper:
   ```bash
   ./mvnw spring-boot:run
   ```
4. Sau khi khởi động thành công, bạn có thể xem tài liệu API (Swagger UI) tại đường dẫn mặc định (thường là `http://localhost:8080/swagger-ui.html`).

### 2. Cài đặt và Chạy Frontend
1. Mở một terminal mới và di chuyển vào thư mục frontend:
   ```bash
   cd frontend
   ```
2. Cài đặt các thư viện phụ thuộc (dependencies):
   ```bash
   npm install
   # hoặc sử dụng yarn
   yarn install
   ```
3. Chạy server phát triển (Development Server):
   ```bash
   npm run dev
   # hoặc
   yarn dev
   ```
4. Ứng dụng sẽ tự động mở hoặc bạn có thể truy cập thông qua trình duyệt (thường là `http://localhost:5173`).

## 📜 Các Lệnh Hữu Ích Khác (Scripts)

**Dành cho Frontend (`/frontend`):**
- `npm run dev`: Chạy môi trường phát triển (Vite)
- `npm run build`: Biên dịch TypeScript và đóng gói ứng dụng
- `npm run lint`: Chạy ESLint để kiểm tra chất lượng mã nguồn
- `npm run preview`: Xem trước bản build trên local

**Dành cho Backend (`/HIS`):**
- `./mvnw clean install`: Xóa các bản build cũ, biên dịch và đóng gói ứng dụng
- `./mvnw test`: Chạy toàn bộ Unit Test của dự án
