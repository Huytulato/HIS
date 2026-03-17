# Tương tác hoạt chất - Design System

Tài liệu này mô tả hệ thống thiết kế (Design System) cho dự án **Tương tác hoạt chất** - Hệ thống quản lý dữ liệu y tế (Project ID: 347604186106672990).
Dự án được ứng dụng các tiêu chuẩn thiết kế hiện đại, đảm bảo tính trực quan, mức độ tin cậy cao và thân thiện với người dùng (nghiệp vụ y tế, quản trị hệ thống).

## 1. Tổng quan các màn hình (Screens)
Hệ thống bao gồm các nhóm màn hình chính:
- **Xác thực**: Đăng nhập, Đăng ký, Quên mật khẩu.
- **Quản lý tài khoản**: Danh sách tài khoản, Phân quyền người dùng.
- **Quản lý quyền**: Danh sách nhóm quyền, Phân quyền chức năng, Phân quyền menu, Gán tài khoản vào nhóm.
- **Tài liệu**: Product Requirements Document (PRD).

## 2. Typography
Sử dụng font chữ không chân (sans-serif) chuyên nghiệp để tối ưu hóa khả năng đọc dữ liệu dày đặc.
- **Font-family**: `'Inter', 'Roboto', sans-serif`
- **Cấu trúc kích thước (Font-size)**:
  - H1 (Tiêu đề trang): `24px` / `Semi-bold`
  - H2 (Tiêu đề khối / Modal): `20px` / `Medium`
  - H3 (Tiêu đề phụ): `16px` / `Medium`
  - Body Text (Nội dung chính): `14px` / `Regular`
  - Caption (Ghi chú, label phụ): `12px` / `Regular`
- **Line-height**: `1.5` cho body text, `1.2` cho headings.

## 3. Color Palette (Bảng màu)
Vì đây là hệ thống y tế và quản lý, màu sắc chủ đạo cần mang lại sự chuyên nghiệp, tin cậy.

### Brand Colors (Màu thương hiệu)
- **Primary Color**: `#1890FF` (Blue) - Mặc định cho các nút bấm chính, links, các trạng thái active.
- **Primary Hover**: `#40A9FF`
- **Primary Active**: `#096DD9`

### Neutral Colors (Màu trung tính - Dùng cho Text & Background)
- **Text Primary**: `#262626` (Màu tối, dành cho Heading và nội dung chính)
- **Text Secondary**: `#595959` (Nội dung phụ, mô tả)
- **Text Placeholder**: `#8C8C8C` (Placeholder trong form, text disable)
- **Background Base**: `#F0F2F5` (Màu nền hệ thống, nằm dưới các card trắng)
- **Background Container**: `#FFFFFF` (Màu nền của các Box, Card, Form)
- **Border**: `#D9D9D9` (Viền bảng, viền input)

### Semantic Colors (Màu trạng thái)
- **Success**: `#52C41A` (Green - Thông báo thành công, trạng thái Active)
- **Warning**: `#FAAD14` (Orange - Cảnh báo)
- **Error/Danger**: `#FF4D4F` (Red - Lỗi, Cảnh báo xóa, Thông báo thất bại)
- **Info**: Mặc định dùng Primary Color (`#1890FF`).

## 4. Layout & Grid System
- **Cấu trúc tổng thể**: 
  - **Sidebar Navigation**: Fixed bên trái, chiều rộng `256px` (hoặc thu gọn `80px`).
  - **Top Menu / Header**: Chiều cao `64px`, chứa logo (nếu sidebar ẩn), thông tin user dropdown.
  - **Content Area**: Vùng hiển thị nội dung, padding tiêu chuẩn `24px` ở mọi phía.
- **Grid System**: Sử dụng chuẩn 24 cột (Ant Design standard) hoặc 12 cột (Bootstrap standard) cho các lưới form, khoảng cách gutter `16px` hoặc `24px`.

## 5. UI Components

### 5.1. Buttons
- **Primary Button**: Nền `#1890FF`, chữ `#FFFFFF`. Chữ bo góc (Border-radius): `6px` hoặc `8px`.
- **Default/Outline Button**: Nền trắng, viền `#D9D9D9`, chữ `#262626`.
- **Danger Button**: Nền chữ `#FF4D4F`, trắng hoặc Nền trắng, viền/chữ `#FF4D4F`.
- **States**: Cần có các trạng thái Hover, Active, Disabled, Loading bổ trợ.

### 5.2. Forms & Inputs
Sử dụng rộng rãi ở màn hình *Đăng nhập*, *Đăng ký* và các Modal *Thêm mới/Gán quyền*.
- **Input Field**: Nền `#FFFFFF`, viền `#D9D9D9`, padding: `8px 12px`, border-radius `6px`.
- **Label**: Font `14px`, `Medium`, khoảng cách tới input là `8px`.
- Khi focus: Viền chuyển sang Primary (`#1890FF`) và có box-shadow mờ.

### 5.3. Data Tables (Bảng dữ liệu)
Được dùng chính ở các trang *Danh sách nhóm quyền*, *Danh sách tài khoản*:
- **Header**: Nền xám nhạt (`#FAFAFA`), chữ đậm (`Medium`).
- **Row Hover**: Khi di chuột vào dòng, đổi màu nền sang `#F5F5F5`.
- **Pagination (Phân trang)**: Bố trí góc dưới cùng bên phải.
- **Actions**: Các hành động Sửa/Xóa/Phân quyền trên từng dòng hiển thị dạng Text link hoặc Icon button.

### 5.4. Modals & Dialogs
Được dùng ở *Phân quyền*, *Gán tài khoản vào nhóm*.
- Có overlay đen mờ (opacity: 0.45).
- Background của Modal là trắng (`#FFFFFF`), có bo góc `8px`, đổ bóng (box-shadow) lớn để nổi bật.
- Cấu trúc: Header (Tiêu đề + nút Close) -> Body (Nội dung) -> Footer (Nút Hủy / Lưu).

## 6. Iconography
- Sử dụng bộ Icon đồng nhất, có đường nét (Line icons) rõ ràng (ví dụ: Feather Icons, Tabler Icons, hoặc Phosphor Icons).
- Kích thước icon tiêu chuẩn: `16px`, `20px` hoặc `24px`.
