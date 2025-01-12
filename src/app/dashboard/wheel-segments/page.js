import { getWheelSegmentsByID } from "@/actions/get-data/getWheelSegments";
import FormNewSegment from "../(components)/wheel-segments/FormNewSegment";
import SegmentList from "../(components)/wheel-segments/SegmentList";

export default async function WheelSegments({ searchParams }) {
  const editObjectID = (await searchParams)?.editObject;
  let editObject;
  if (editObjectID) {
    const rs = await getWheelSegmentsByID(editObjectID);
    rs.success && (editObject = rs.item);
  }

  return (
    <div className="p-4">
      <div className="flex flex-col w-full">
        <h1 className="text-3xl font-semibold tracking-tight">
          Manage Wheel Segments
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="col-span-5">
            <FormNewSegment
              editObject={editObject && JSON.parse(JSON.stringify(editObject))}
            />
          </div>
          <div className="col-span-7">
            <SegmentList />
          </div>
        </div>
      </div>
    </div>
  );
}
