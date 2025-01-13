"use client";
import { Button } from "@/components/ui/button";
import { formatDateTimeToCustomString } from "@/lib/utils";
import { download, generateCsv, mkConfig } from "export-to-csv";

export default function ExportExcel({ data }) {
  const csvConfig = mkConfig({ useKeysAsHeaders: true });

  const transformData = data.map((item) => ({
    branch: item.branch,
    customerName: item.customerName,
    phone: item.phone,
    prize: item.prize.label,
    spinAt: formatDateTimeToCustomString(new Date(item.spinAt)),
    totalBill: item.totalBill,
  }));

  const csv = generateCsv(csvConfig)(transformData);
  return (
    <Button size="sm" onClick={() => download(csvConfig)(csv)}>
      Export Excel
    </Button>
  );
}
