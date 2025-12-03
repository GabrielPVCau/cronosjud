"use client";

import { useState } from "react";
import { AppState, ProcessEvent } from "@/types";
import { UploadZone } from "@/components/UploadZone";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Timeline } from "@/components/Timeline";
import mockData from "@/data/mock.json";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing");

  const handleFileUpload = () => {
    setAppState("loading");
  };

  const handleLoadingComplete = () => {
    setAppState("timeline");
  };

  return (
    <main className="min-h-screen bg-white">
      {appState === "landing" && (
        <UploadZone onFileUpload={handleFileUpload} />
      )}
      
      {appState === "loading" && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      
      {appState === "timeline" && (
        <Timeline events={mockData as ProcessEvent[]} />
      )}
    </main>
  );
}
