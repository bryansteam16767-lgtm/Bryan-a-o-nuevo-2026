
export interface TimeZoneData {
  id: string;
  name: string;
  offset: number; // in hours from UTC
  isCelebrated?: boolean;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFinished: boolean;
}

export interface GeminiResponsePart {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
}
