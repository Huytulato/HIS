export interface Province {
  id: string;
  code: string;
  name: string;
}

export interface District {
  id: string;
  code: string;
  name: string;
  provinceId: string;
  provinceName: string;
}

export interface Ward {
  id: string;
  code: string;
  name: string;
  districtId: string;
  districtName: string;
}

export type ViewType = "province" | "district" | "ward";
