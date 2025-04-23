"use client";

import { useState } from "react";
import { RegisterNewborn } from "@/components/register-newborn";
import { ViewRecords } from "@/components/view-records";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const [activeTab, setActiveTab] = useState("register");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white text-2xl font-bold p-4 text-center shadow-md">
        Newborn Tracker
      </header>

      {/* Optional Welcome Section */}
      <div className="text-center mt-4">
        <h2 className="text-2xl font-semibold">Welcome to the Newborn Info System</h2>
        <p className="text-gray-600">Easily register and manage baby records</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          className={`px-4 py-2 rounded shadow-sm ${
            activeTab === "register"
              ? "bg-accent text-white"
              : "bg-secondary text-foreground hover:bg-accent hover:text-white transition-colors"
          }`}
          onClick={() => setActiveTab("register")}
        >
          Register Newborn
        </button>
        <button
          className={`px-4 py-2 rounded shadow-sm ${
            activeTab === "records"
              ? "bg-accent text-white"
              : "bg-secondary text-foreground hover:bg-accent hover:text-white transition-colors"
          }`}
          onClick={() => setActiveTab("records")}
        >
          View Records
        </button>
      </div>

      {/* Content Area */}
      <main className="flex-grow p-6 bg-background">
        {activeTab === "register" ? (
          <RegisterNewborn />
        ) : (
          <ViewRecords />
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-muted-foreground py-3 shadow-top">
        Created by Cherri
      </footer>
      <Toaster />
    </div>
  );
}

