import { useState, useMemo } from "react";
import { PROVINCES, DISTRICTS, WARDS } from "../constants";
import { ViewType } from "../types";

export const useLocationData = () => {
  const [currentView, setCurrentView] = useState<ViewType>("province");
  const [searchCode, setSearchCode] = useState("");
  const [searchName, setSearchName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const data = useMemo(() => {
    switch (currentView) {
      case "province":
        return PROVINCES;
      case "district":
        return DISTRICTS;
      case "ward":
        return WARDS;
    }
  }, [currentView]);

  const filtered = useMemo(() => {
    return data.filter(
      (item: any) =>
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
