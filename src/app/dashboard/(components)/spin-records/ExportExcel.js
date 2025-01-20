"use client";
import { Button } from "@/components/ui/button";
import { formatDateTimeToCustomString } from "@/lib/utils";
import { download, generateCsv, mkConfig } from "export-to-csv";

export default function ExportExcel({ data }) {
  const csvConfig = mkConfig({ useKeysAsHeaders: true });

  const transformData = data.map((item) => ({
    customerName: item.customerName,
    phone: item.phone,
    email: item.email,
    prize: item.prize.label,
    spinAt: formatDateTimeToCustomString(item.spinAt),
    totalBill: item.totalBill,
    branch: item.branch,
    billCode: item.billCode,
  }));

  const csv = generateCsv(csvConfig)(transformData);
  return (
    <Button size="sm" onClick={() => download(csvConfig)(csv)}>
      Export Excel
    </Button>
  );
}
