import { ConfigProvider } from "antd";
import LocationPage from "./pages/Location";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#192080",
          borderRadius: 8,
          fontFamily: "'Inter', sans-serif",
        },
        components: {
          Table: {
            headerBg: "#f1f5f9",
            headerColor: "#374151",
            headerBorderRadius: 0,
          },
        },
      }}
    >
      <LocationPage />
    </ConfigProvider>
  );
}

export default App;
