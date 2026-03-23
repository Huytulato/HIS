import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { locationApi } from "../../../services/locationApi";
import { ViewType } from "../types";

export const useLocationData = () => {
  const { view } = useParams<{ view: string }>();
  const navigate = useNavigate();
  const currentView = (view || "province") as ViewType;

  // Use a function to trigger navigation
  const setCurrentView = (newView: ViewType) => {
    navigate(`/location/${newView}`);
  };
  const [searchCode, setSearchCode] = useState("");
  const [searchName, setSearchName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Use SWR for data fetching and deduplication based on Vercel React best practices (`client-swr-dedup`)
  const { data: provinces = [] } = useSWR(
    currentView === "province" ? "/api/locations/provinces" : null,
    locationApi.getProvinces
  );

  const { data: districts = [] } = useSWR(
    currentView === "district" ? "/api/locations/districts" : null,
    locationApi.getDistricts
  );

  const { data: wards = [] } = useSWR(
    currentView === "ward" ? "/api/locations/wards" : null,
    locationApi.getWards
  );

  const data = useMemo(() => {
    switch (currentView) {
      case "province":
        return provinces;
      case "district":
        return districts;
      case "ward":
        return wards;
      default:
        return [];
    }
  }, [currentView, provinces, districts, wards]);

  const filtered = useMemo(() => {
    return data.filter(
      (item: { code: string; name: string }) =>
        item.code.toLowerCase().includes(searchCode.toLowerCase()) &&
        item.name.toLowerCase().includes(searchName.toLowerCase()),
    );
  }, [data, searchCode, searchName]);

  const totalRecords = filtered.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const paginatedData = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return {
    currentView,
    setCurrentView,
    searchCode,
    setSearchCode,
    searchName,
    setSearchName,
    rowsPerPage,
    setRowsPerPage,
    currentPage,
    setCurrentPage,
    data: paginatedData,
    totalPages,
    totalRecords,
  };
};
