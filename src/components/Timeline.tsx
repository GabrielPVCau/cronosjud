"use client";

import { useState } from "react";
import { ProcessEvent } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WhatsAppModal } from "./WhatsAppModal";
import { 
  MessageCircle, 
  Scale, 
  FileText, 
  Calendar, 
  MoreHorizontal,
  CheckCircle2
} from "lucide-react";

interface TimelineProps {
  events: ProcessEvent[];
}

const typeConfig = {
  decisao: {
    label: "Decisão",
    variant: "destructive" as const,
    icon: Scale,
  },
  peticao: {
    label: "Petição",
    variant: "default" as const,
    icon: FileText,
  },
  audiencia: {
    label: "Audiência",
    variant: "warning" as const,
    icon: Calendar,
  },
  outros: {
    label: "Movimentação",
    variant: "secondary" as const,
    icon: MoreHorizontal,
  },
};

export function Timeline({ events }: TimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<ProcessEvent | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleWhatsAppClick = (event: ProcessEvent) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white animate-fade-in">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-slate-900">
              Cronos<span className="text-blue-600">Jud</span>
            </h1>
            <Badge variant="outline" className="text-xs">
              <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" />
              Sentença Proferida
            </Badge>
          </div>
        </div>
      </header>

      {/* Process Info */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-slate-900 text-white rounded-xl p-6 shadow-lg">
          <p className="text-xs text-slate-400 mb-1">PROCESSO</p>
          <h2 className="text-lg md:text-xl font-semibold mb-2">
            5002819-88.2024.8.16.0001
          </h2>
          <p className="text-slate-300 text-sm">
            Extravio de Bagagem | Danos Morais
          </p>
          <div className="flex items-center gap-4 mt-4 text-xs text-slate-400">
            <span>📍 1ª Vara Cível</span>
            <span>📅 5 eventos</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <ScrollArea className="max-w-2xl mx-auto px-4 pb-8">
        <div className="space-y-4">
          {events.map((event, index) => {
            const config = typeConfig[event.type];
            const Icon = config.icon;
            const isLast = index === events.length - 1;

            return (
              <Card
                key={event.id}
                className={`relative p-4 md:p-6 transition-all duration-300 hover:shadow-md
                  ${isLast ? "ring-2 ring-green-500/20 bg-green-50/30" : ""}
                `}
              >
                {/* Timeline Line */}
                {index < events.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-8 bg-slate-200 -mb-4" />
                )}

                <div className="flex gap-4">
                  {/* Date Column */}
                  <div className="flex-shrink-0 text-center">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2
                      ${isLast ? "bg-green-500 text-white" : "bg-slate-100 text-slate-600"}
                    `}>
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <p className="text-xs font-bold text-slate-900">
                      {event.date.split(" ")[0]}
                    </p>
                    <p className="text-[10px] text-slate-500 uppercase">
                      {event.date.split(" ").slice(1).join(" ")}
                    </p>
                  </div>

                  {/* Content Column */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge 
                        variant={config.variant}
                        className="text-[10px] uppercase tracking-wide"
                      >
                        {config.label}
                      </Badge>
                    </div>

                    <p className="text-xs text-slate-400 mb-1">
                      {event.original_title}
                    </p>
                    
                    <p className={`text-sm md:text-base leading-relaxed
                      ${isLast ? "text-green-800 font-semibold" : "text-slate-700"}
                    `}>
                      {event.ai_summary}
                    </p>
                  </div>

                  {/* WhatsApp Button */}
                  <div className="flex-shrink-0">
                    <Button
                      size="icon"
                      className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full w-10 h-10 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                      onClick={() => handleWhatsAppClick(event)}
                    >
                      <MessageCircle className="w-5 h-5" fill="currentColor" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>

      {/* WhatsApp Modal */}
      <WhatsAppModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        event={selectedEvent}
      />
    </div>
  );
}
