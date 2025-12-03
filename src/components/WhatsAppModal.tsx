"use client";

import { useState, useEffect } from "react";
import { ProcessEvent } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Copy, Check, ExternalLink } from "lucide-react";

interface WhatsAppModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: ProcessEvent | null;
}

export function WhatsAppModal({ open, onOpenChange, event }: WhatsAppModalProps) {
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (event) {
      setMessage(event.whatsapp_message);
    }
  }, [event]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" fill="white" />
            </div>
            Mensagem para o Cliente
          </DialogTitle>
          <DialogDescription>
            Edite a mensagem abaixo e envie via WhatsApp
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Event Info */}
          <div className="bg-slate-50 rounded-lg p-3 text-sm">
            <p className="text-slate-500 text-xs mb-1">Referente a:</p>
            <p className="font-medium text-slate-700">{event.original_title}</p>
            <p className="text-xs text-slate-400 mt-1">{event.date}</p>
          </div>

          <Separator />

          {/* Editable Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Mensagem
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full min-h-[120px] p-3 text-sm border border-slate-200 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         resize-none bg-white"
              placeholder="Digite sua mensagem..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="flex-1"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar
                </>
              )}
            </Button>

            <Button
              asChild
              className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] text-white"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 mr-2" fill="currentColor" />
                Enviar
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
