import { getWheelSegments } from "@/actions/get-data/getWheelSegments";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TableSegment from "./TableSegment";

export default async function SegmentList() {
  const data = await getWheelSegments();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wheel Segment List</CardTitle>
        <CardDescription>Manage all the segment in the wheel.</CardDescription>
      </CardHeader>
      <CardContent>
        {data.items.length > 0 ? (
          <TableSegment data={data.items} />
        ) : (
          <p className="text-muted">None Data</p>
        )}
      </CardContent>
    </Card>
  );
}
