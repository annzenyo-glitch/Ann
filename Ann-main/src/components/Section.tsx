import { ReactNode } from 'react';
import { useTTS } from '../hooks/useTTS';
import { Volume2, Square, Loader2 } from 'lucide-react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  children?: ReactNode;
}

export function Section({ id, title, subtitle, content, imageSrc, imageAlt, reverse = false, children }: SectionProps) {
  const { playText, stop, isPlaying, loading } = useTTS();

  return (
    <section id={id} className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-olive/10 rounded-[32px] transform translate-x-4 translate-y-4"></div>
              <img 
                src={imageSrc} 
                alt={imageAlt} 
                className="relative w-full h-[500px] object-cover rounded-[32px] shadow-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            {subtitle && <span className="text-rust font-medium tracking-widest uppercase text-sm mb-4 block">{subtitle}</span>}
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-olive mb-6">{title}</h2>
            
            <div className="prose prose-lg text-gray-600 mb-8 whitespace-pre-line">
              {content}
            </div>
            
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => playText(content)}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-olive text-olive hover:bg-olive hover:text-white transition-colors font-medium"
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : isPlaying ? (
                  <>
                    <Square size={20} className="fill-current" />
                    Dừng đọc
                  </>
                ) : (
                  <>
                    <Volume2 size={20} />
                    Nghe đọc bài
                  </>
                )}
              </button>
            </div>

            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
