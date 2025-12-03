"use client";

import { useCallback } from "react";
import { Upload, FileText } from "lucide-react";

interface UploadZoneProps {
  onFileUpload: () => void;
}

export function UploadZone({ onFileUpload }: UploadZoneProps) {
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      // Aceita qualquer arquivo (dummy upload)
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        onFileUpload();
      }
    },
    [onFileUpload]
  );

  const handleClick = useCallback(() => {
    // Simula upload ao clicar
    onFileUpload();
  }, [onFileUpload]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
      {/* Logo */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
          Cronos<span className="text-blue-600">Jud</span>
        </h1>
        <p className="text-slate-500 text-sm">Inteligência Jurídica</p>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        className="relative w-full max-w-xl aspect-[4/3] border-2 border-dashed border-slate-300 
                   rounded-2xl bg-gradient-to-b from-slate-50 to-white
                   hover:border-blue-400 hover:bg-blue-50/30
                   transition-all duration-300 ease-out cursor-pointer
                   flex flex-col items-center justify-center gap-6 p-8
                   group shadow-sm hover:shadow-md"
      >
        {/* Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-all duration-300" />
          <div className="relative bg-white p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <Upload className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text */}
        <div className="text-center space-y-2">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-800">
            Arraste o PDF do processo aqui
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-sm">
            O CronosJud organiza o caos do Projudi em segundos
          </p>
        </div>

        {/* File Types */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <FileText className="w-4 h-4" />
          <span>PDF, DOC, TXT</span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 border-2 border-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Demo Hint */}
      <p className="mt-6 text-xs text-slate-400">
        Clique ou arraste qualquer arquivo para ver a demonstração
      </p>
    </div>
  );
}
