import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bucket } from "@aws-sdk/client-s3";

const columns = [
  {
    Header: "Bucket Name",
    accessor: "Name",
  },
  {
    Header: "Created At",
    accessor: "CreationDate",
  },
];

export function BucketTable({ buckets }: { buckets: Bucket[] | undefined }) {
  return (
    buckets && (
      <Table>
        <TableCaption>Your S3 Buckets</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Bucket Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {buckets.map((bucket: Bucket) => (
            <TableRow key={bucket.Name}>
              {columns.map((column) => (
                <TableCell key={column.accessor as keyof Bucket}>
                  {String(bucket[column.accessor as keyof Bucket])}
                </TableCell>
              ))}
              <TableCell>
                <Button variant={"destructive"}>Action</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  );
}
