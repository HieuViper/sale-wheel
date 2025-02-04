import { getSpinRecord } from "@/actions/get-data/getSpinRecord";
import PaginationSection from "@/components/PaginationSection";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DatePicker from "./(components)/spin-records/DatePicker";
import ExportExcel from "./(components)/spin-records/ExportExcel";
import TableSpinRecord from "./(components)/spin-records/TableSpinRecord";

export default async function DashboardPage({ searchParams }) {
  const pageSize = (await searchParams).pageSize || 2;
  const pageIndex = (await searchParams).pageIndex || 1;

  const startDate = (await searchParams).startDate || null;
  const endDate = (await searchParams).endDate || null;

  const data = await getSpinRecord(pageSize, pageIndex, startDate, endDate);
  // console.log("🚀 ~ DashboardPage ~ data:", data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spin Records List</CardTitle>
        <CardDescription>Manage all results of the wheel.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-2">
          <div className="">
            <DatePicker startDate={startDate} endDate={endDate} />
            {/* <ButtonClearData /> */}
          </div>
          {data.items.length > 0 && (
            <ExportExcel data={JSON.parse(JSON.stringify(data.items))} />
          )}
        </div>
        {data.items.length > 0 ? (
          <TableSpinRecord data={data.items} />
        ) : (
          <p className="text-muted">None Data</p>
        )}
      </CardContent>
      <CardFooter>
        <PaginationSection
          pageIndex={pageIndex}
          pageSize={pageSize}
          total={data?.itemCount}
          searchParams={await searchParams}
          objectName="Spin Records"
        />
      </CardFooter>
    </Card>
  );
}
