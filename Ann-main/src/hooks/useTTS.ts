import { useState } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';

export function useTTS() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [loading, setLoading] = useState(false);

  const playText = async (text: string) => {
    if (isPlaying && audio) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const binary = atob(base64Audio);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        const newAudio = new Audio(url);
        newAudio.onended = () => setIsPlaying(false);
        newAudio.play();
        setAudio(newAudio);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("TTS Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const stop = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return { playText, stop, isPlaying, loading };
}
