"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface NewbornRecord {
  id: string;
  name: string;
  dob: string;
  parentName: string;
  location: string;
  doctor: string;
}

const mockRecords: NewbornRecord[] = [
  { id: "1", name: "Alice", dob: "2024-01-20", parentName: "Bob", location: "Hospital A, Room 101", doctor: "Dr. Smith" },
  { id: "2", name: "Bob Jr.", dob: "2024-02-15", parentName: "Alice", location: "Maternity Clinic B, Ward 2", doctor: "Dr. Johnson" },
  { id: "3", name: "Charlie", dob: "2024-03-10", parentName: "David", location: "Home Delivery, Address XYZ", doctor: "Dr. Williams" },
];

export function ViewRecords() {
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState(mockRecords);

  const filteredRecords = records.filter((record) =>
    record.name.toLowerCase().includes(search.toLowerCase()) ||
    record.parentName.toLowerCase().includes(search.toLowerCase()) ||
    record.location.toLowerCase().includes(search.toLowerCase()) ||
    record.doctor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search records..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md shadow-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Parent Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Doctor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.name}</TableCell>
                <TableCell>{record.dob}</TableCell>
                <TableCell>{record.parentName}</TableCell>
                <TableCell>{record.location}</TableCell>
                <TableCell>{record.doctor}</TableCell>
              </TableRow>
            ))}
             {filteredRecords.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">No records found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

