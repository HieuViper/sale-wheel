import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTimeToCustomString } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import ButtonDelete from "../wheel-segments/ButtonDelete";

export default function TableSpinRecord({ data }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Prize</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Total Bill</TableHead>
          <TableHead>Branch</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium">{item.prize.label}</TableCell>
              <TableCell className="font-medium">
                {formatDateTimeToCustomString(new Date(item.spinAt))}
              </TableCell>
              <TableCell className="font-medium">{item.customerName}</TableCell>
              <TableCell className="font-medium">{item.phone}</TableCell>
              <TableCell className="font-medium">
                {item.totalBill.toLocaleString("en-US")}
              </TableCell>
              <TableCell className="font-medium">{item.branch}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <ButtonDelete id={JSON.parse(JSON.stringify(item._id))} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
