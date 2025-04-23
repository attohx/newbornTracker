"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileDown, File, Eye, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface NewbornRecord {
  id: string;
  name: string;
  dob: string;
  tob: string;
  motherName: string;
  fatherName?: string;
  location: string;
  doctorName: string;
  notes?: string;
}

const mockRecords: NewbornRecord[] = [
  {
    id: "1",
    name: "Alice",
    dob: "2024-01-20",
    tob: "10:30",
    motherName: "Jane Doe",
    fatherName: "John Doe",
    location: "Hospital A, Room 101",
    doctorName: "Dr. Smith",
    notes: "Healthy baby girl",
  },
  {
    id: "2",
    name: "Bob Jr.",
    dob: "2024-02-15",
    tob: "14:45",
    motherName: "Alice Smith",
    location: "Maternity Clinic B, Ward 2",
    doctorName: "Dr. Johnson",
    notes: "Slight jaundice observed",
  },
  {
    id: "3",
    name: "Charlie",
    dob: "2024-03-10",
    tob: "03:15",
    motherName: "Emily White",
    fatherName: "David White",
    location: "Home Delivery, Address XYZ",
    doctorName: "Dr. Williams",
    notes: "Normal delivery",
  },
];

export function ViewRecords() {
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState(mockRecords);
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<NewbornRecord | null>(
    null
  );
  const { toast } = useToast();

  const filteredRecords = records.filter(
    (record) =>
      record.name.toLowerCase().includes(search.toLowerCase()) ||
      record.motherName.toLowerCase().includes(search.toLowerCase()) ||
      (record.fatherName &&
        record.fatherName.toLowerCase().includes(search.toLowerCase())) ||
      record.location.toLowerCase().includes(search.toLowerCase()) ||
      record.doctorName.toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = (format: string) => {
    console.log(`Exporting records to ${format}...`);
  };

  const handleDelete = (id: string) => {
    setRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));
    toast({
      title: "Success",
      description: "Record deleted successfully!",
    });
  };

  const handleRecordClick = (record: NewbornRecord) => {
    setSelectedRecord(record);
    setOpen(true);
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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  <Button variant="link" onClick={() => handleRecordClick(record)}>
                    {record.name}
                  </Button>
                </TableCell>
                <TableCell>{record.dob}</TableCell>
                <TableCell>{record.motherName}</TableCell>
                <TableCell>{record.fatherName}</TableCell>
                <TableCell>{record.location}</TableCell>
                <TableCell>{record.doctorName}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDelete(record.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredRecords.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Newborn Details</DialogTitle>
            <DialogDescription>
              View and manage detailed information about the newborn.
            </DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  defaultValue={selectedRecord.name}
                  className="col-span-3 shadow-sm"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dob" className="text-right">
                  Date of Birth
                </Label>
                <Input
                  type="text"
                  id="dob"
                  defaultValue={selectedRecord.dob}
                  className="col-span-3 shadow-sm"
                  readOnly
                />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tob" className="text-right">
                  Time of Birth
                </Label>
                <Input
                  type="text"
                  id="tob"
                  defaultValue={selectedRecord.tob}
                  className="col-span-3 shadow-sm"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="motherName" className="text-right">
                  Mother's Name
                </Label>
                <Input
                  type="text"
                  id="motherName"
                  defaultValue={selectedRecord.motherName}
                  className="col-span-3 shadow-sm"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fatherName" className="text-right">
                  Father's Name
                </Label>
                <Input
                  type="text"
                  id="fatherName"
                  defaultValue={selectedRecord.fatherName}
                  className="col-span-3 shadow-sm"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  type="text"
                  id="location"
                  defaultValue={selectedRecord.location}
                  className="col-span-3 shadow-sm"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doctorName" className="text-right">
                  Doctor's Name
                </Label>
                <Input
                  type="text"
                  id="doctorName"
                  defaultValue={selectedRecord.doctorName}
                  className="col-span-3 shadow-sm"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  defaultValue={selectedRecord.notes}
                  className="col-span-3 shadow-sm"
                  readOnly
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
