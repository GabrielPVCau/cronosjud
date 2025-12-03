"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { FileSearch, Brain, Sparkles, CheckCircle } from "lucide-react";

// Tempo de loading em ms (fácil de alterar)
const LOADING_DURATION = 2500;

const loadingSteps = [
  { text: "Lendo 350 páginas…", icon: FileSearch, progress: 25 },
  { text: "Identificando padrões…", icon: Brain, progress: 55 },
  { text: "Resumindo eventos…", icon: Sparkles, progress: 85 },
  { text: "Concluído!", icon: CheckCircle, progress: 100 },
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepDuration = LOADING_DURATION / loadingSteps.length;
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, stepDuration);

    // Animação suave do progresso
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const target = loadingSteps[currentStep]?.progress || 0;
        if (prev < target) {
          return Math.min(prev + 2, target);
        }
        return prev;
      });
    }, 30);

    // Completa após o tempo total
    const timeout = setTimeout(() => {
      onComplete();
    }, LOADING_DURATION + 300);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [onComplete, currentStep]);

  const CurrentIcon = loadingSteps[currentStep]?.icon || FileSearch;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
      {/* Logo */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          Cronos<span className="text-blue-600">Jud</span>
        </h1>
      </div>

      {/* Loading Container */}
      <div className="w-full max-w-md space-y-8">
        {/* Icon Animation */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative bg-white p-8 rounded-full shadow-xl animate-bounce-slow">
              <CurrentIcon 
                className="w-12 h-12 text-blue-600 transition-all duration-300" 
                strokeWidth={1.5} 
              />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <Progress value={progress} className="h-2 bg-slate-100" />
          <div className="flex justify-between text-xs text-slate-400">
            <span>Analisando processo</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Current Step Text */}
        <div className="text-center">
          <p className="text-lg font-medium text-slate-700 animate-pulse">
            {loadingSteps[currentStep]?.text}
          </p>
        </div>

        {/* Steps Indicator */}
        <div className="flex justify-center gap-2">
          {loadingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index <= currentStep 
                  ? "bg-blue-600 scale-100" 
                  : "bg-slate-200 scale-75"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
