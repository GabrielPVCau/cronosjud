export interface ProcessEvent {
  id: string;
  date: string;
  type: "peticao" | "decisao" | "audiencia" | "outros";
  original_title: string;
  ai_summary: string;
  whatsapp_message: string;
}

export type AppState = "landing" | "loading" | "timeline";
