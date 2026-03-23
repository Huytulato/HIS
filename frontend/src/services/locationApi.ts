import apiClient from "./apiClient";

export interface LocationItem {
  code: string;
  name: string;
}

export interface MessageResponse {
  message: string;
}

export const locationApi = {
  getProvinces: async (): Promise<LocationItem[]> => {
    const response = await apiClient.get("/locations/provinces");
    return response.data;
  },

  getDistricts: async (): Promise<LocationItem[]> => {
    const response = await apiClient.get("/locations/districts");
    return response.data;
  },

  getWards: async (): Promise<LocationItem[]> => {
    const response = await apiClient.get("/locations/wards");
    return response.data;
  },

  importExcel: async (file: File): Promise<MessageResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post("/locations/import", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};