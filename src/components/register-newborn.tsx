"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export function RegisterNewborn() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [tob, setTob] = useState("");
  const [parentName, setParentName] = useState("");
  const [location, setLocation] = useState("");
  const [doctor, setDoctor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here (e.g., store data)
    console.log("Form submitted", { name, dob, tob, parentName, location, doctor });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-card rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-foreground mb-4">
        Register Newborn
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
            required
          />
        </div>
        <div>
          <Label htmlFor="dob">Date of Birth:</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !dob && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4"/>
                        {dob ? format(dob, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={dob}
                        onSelect={setDob}
                        disabled={(date) =>
                            date > new Date()
                        }
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
         <div>
          <Label htmlFor="tob">Time of Birth:</Label>
          <Input
            type="time"
            id="tob"
            value={tob}
            onChange={(e) => setTob(e.target.value)}
            className="w-full"
            required
          />
        </div>
        <div>
          <Label htmlFor="parentName">Parent Name:</Label>
          <Input
            type="text"
            id="parentName"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            className="w-full"
            required
          />
        </div>
        <div>
          <Label htmlFor="location">Location:</Label>
          <Textarea
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full"
            required
          />
        </div>
        <div>
          <Label htmlFor="doctor">Doctor:</Label>
          <Input
            type="text"
            id="doctor"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            className="w-full"
            required
          />
        </div>
        <Button type="submit" className="w-full bg-accent text-white hover:bg-accent-foreground">
          Register
        </Button>
      </form>
    </div>
  );
}

