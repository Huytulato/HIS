package com.example.backend.category.helper;

import com.example.backend.category.entity.District;
import com.example.backend.category.entity.Province;
import com.example.backend.category.entity.Ward;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Component
public class ExcelHelper {

    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    public boolean hasExcelFormat(MultipartFile file) {
        return TYPE.equals(file.getContentType());
    }

    public List<Object[]> readExcel(MultipartFile file) throws IOException {
        List<Object[]> dataList = new ArrayList<>();

        try (InputStream is = file.getInputStream();
             Workbook workbook = new XSSFWorkbook(is)) {

            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();

            // Skip header
            if (rows.hasNext()) {
                rows.next();
            }

            while (rows.hasNext()) {
                Row row = rows.next();
                String provinceId = getCellValueAsString(row.getCell(0));
                String provinceName = getCellValueAsString(row.getCell(1));
                String districtId = getCellValueAsString(row.getCell(2));
                String districtName = getCellValueAsString(row.getCell(3));
                String wardId = getCellValueAsString(row.getCell(4));
                String wardName = getCellValueAsString(row.getCell(5));

                if (provinceId != null && !provinceId.isEmpty()) {
                    dataList.add(new Object[]{provinceId, provinceName, districtId, districtName, wardId, wardName});
                }
            }
        }

        return dataList;
    }

    private String getCellValueAsString(Cell cell) {
        if (cell == null) {
            return "";
        }
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                } else {
                    return String.valueOf((long) cell.getNumericCellValue());
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula();
            default:
                return "";
        }
    }
}