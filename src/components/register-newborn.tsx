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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const steps = ["Identity", "Details", "Confirmation"];

export function RegisterNewborn() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [tob, setTob] = useState("");
  const [motherName, setMotherName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [location, setLocation] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const { toast } = useToast();

  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dob || !tob || !motherName || !location || !doctorName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    console.log("Form submitted", { name, dob, tob, motherName, fatherName, location, doctorName });
    toast({
      title: "Success",
      description: "Newborn registered successfully!",
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-card rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-foreground mb-4">
        Register Newborn
      </h2>
      <Progress value={((step + 1) / steps.length) * 100} className="mb-4" />
      <div className="text-center text-sm text-muted-foreground mb-4">
        Step {step + 1}: {steps[step]}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 0 && (
          <>
            <div>
              <Label htmlFor="name">Name:</Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full shadow-sm"
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
                      "w-full justify-start text-left font-normal shadow-sm",
                      !dob && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dob ? format(dob, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dob}
                    onSelect={setDob}
                    disabled={(date) => date > new Date()}
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
                className="w-full shadow-sm"
                required
              />
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div>
              <Label htmlFor="motherName">Mother's Name:</Label>
              <Input
                type="text"
                id="motherName"
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
                className="w-full shadow-sm"
                required
              />
            </div>
            <div>
              <Label htmlFor="fatherName">Father's Name (Optional):</Label>
              <Input
                type="text"
                id="fatherName"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                className="w-full shadow-sm"
              />
            </div>
            <div>
              <Label htmlFor="location">Location:</Label>
              <Select onValueChange={setLocation}>
                <SelectTrigger className="w-full shadow-sm">
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hospital A, Room 101">
                    Hospital A, Room 101
                  </SelectItem>
                  <SelectItem value="Maternity Clinic B, Ward 2">
                    Maternity Clinic B, Ward 2
                  </SelectItem>
                  <SelectItem value="Home Delivery, Address XYZ">
                    Home Delivery, Address XYZ
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="doctorName">Doctor Name:</Label>
              <Input
                type="text"
                id="doctorName"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                className="w-full shadow-sm"
                required
              />
            </div>
          </>
        )}

        {step === 2 && (
          <div className="space-y-2">
            <p>Confirm the details:</p>
            <p>Name: {name}</p>
            <p>Date of Birth: {dob ? format(dob, "PPP") : "N/A"}</p>
            <p>Time of Birth: {tob}</p>
            <p>Mother's Name: {motherName}</p>
            <p>Father's Name: {fatherName || "N/A"}</p>
            <p>Location: {location}</p>
            <p>Doctor Name: {doctorName}</p>
          </div>
        )}

        <div className="flex justify-between">
          {step > 0 && (
            <Button variant="secondary" onClick={prevStep}>
              Previous
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit" className="bg-accent text-white hover:bg-accent-foreground">
              Register
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
