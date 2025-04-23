# **App Name**: Newborn Tracker

## Core Features:

- Tab Navigation: Implement tab-based navigation to switch between registration and records views.
- Newborn Registration Form: Create a form to register newborn information such as name, date of birth, and parent details.
- Newborn Records View: Display newborn records in a clear, tabular format, including search and sort options.

## Style Guidelines:

- Primary color: Blue (#3490dc) for headers and main interactive elements.
- Secondary color: Light gray (#f7f7f7) for background and content areas.
- Accent: Teal (#64c5b1) for buttons and highlights.
- Use a clean and modern layout with clear sections for header, navigation, content, and footer.
- Use simple, recognizable icons from a library like FontAwesome for common actions.
- Subtle transitions and animations for tab switching and form submissions.

## Original User Request:
import React, { useState } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("register");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white text-xl font-bold p-4 text-center">
        Hospital Newborn Info System
      </header>

      {/* Optional Welcome Section */}
      <div className="text-center mt-4">
        <h2 className="text-2xl font-semibold">Welcome to the Newborn Info System</h2>
        <p className="text-gray-600">Easily register and manage baby records</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "register" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("register")}
        >
          Register Newborn
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "records" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("records")}
        >
          View Records
        </button>
      </div>

      {/* Content Area */}
      <main className="flex-grow p-6 bg-gray-100">
        {activeTab === "register" ? (
          <div className="text-center text-gray-700">This is the Register Newborn tab.</div>
        ) : (
          <div className="text-center text-gray-700">This is the Baby Records tab.</div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-3">
        Created by Cherri
      </footer>
    </div>
  );
}
  