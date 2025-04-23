"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileDown, File } from "lucide-react";

interface NewbornRecord {
  id: string;
  name: string;
  dob: string;
  motherName: string;
  fatherName?: string;
  location: string;
  doctorName: string;
}

const mockRecords: NewbornRecord[] = [
  { id: "1", name: "Alice", dob: "2024-01-20", motherName: "Jane Doe", fatherName: "John Doe", location: "Hospital A, Room 101", doctorName: "Dr. Smith" },
  { id: "2", name: "Bob Jr.", dob: "2024-02-15", motherName: "Alice Smith", location: "Maternity Clinic B, Ward 2", doctorName: "Dr. Johnson" },
  { id: "3", name: "Charlie", dob: "2024-03-10", motherName: "Emily White", fatherName: "David White", location: "Home Delivery, Address XYZ", doctorName: "Dr. Williams" },
];

export function ViewRecords() {
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState(mockRecords);

  const filteredRecords = records.filter((record) =>
    record.name.toLowerCase().includes(search.toLowerCase()) ||
    record.motherName.toLowerCase().includes(search.toLowerCase()) ||
    (record.fatherName && record.fatherName.toLowerCase().includes(search.toLowerCase())) ||
    record.location.toLowerCase().includes(search.toLowerCase()) ||
    record.doctorName.toLowerCase().includes(search.toLowerCase())
  );

   const handleExport = (format: string) => {
    // Implement export logic here, e.g., using a library like jsPDF or exceljs
    console.log(`Exporting records to ${format}...`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Search records..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md shadow-sm"
        />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="space-x-2">
                <FileDown className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport("pdf")}>
                <File className="mr-2 h-4 w-4" />
                <span>Export to PDF</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("excel")}>
                <File className="mr-2 h-4 w-4" />
                <span>Export to Excel</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Mother's Name</TableHead>
               <TableHead>Father's Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Doctor Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.name}</TableCell>
                <TableCell>{record.dob}</TableCell>
                <TableCell>{record.motherName}</TableCell>
                 <TableCell>{record.fatherName}</TableCell>
                <TableCell>{record.location}</TableCell>
                <TableCell>{record.doctorName}</TableCell>
              </TableRow>
            ))}
             {filteredRecords.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">No records found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
