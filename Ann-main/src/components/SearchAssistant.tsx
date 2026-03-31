import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Search, Loader2, ExternalLink } from 'lucide-react';
import Markdown from 'react-markdown';
import { motion } from 'motion/react';

export function SearchAssistant() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState<string[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setResponse('');
    setUrls([]);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Tìm hiểu thông tin về Quảng Trị: ${query}`,
        config: {
          tools: [{ googleSearch: {} }],
        }
      });
      
      setResponse(result.text || '');
      
      const chunks = result.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        const extractedUrls = chunks.map(c => c.web?.uri).filter(Boolean) as string[];
        setUrls(Array.from(new Set(extractedUrls)));
      }
    } catch (err) {
      console.error(err);
      setResponse("Xin lỗi, đã có lỗi xảy ra khi tìm kiếm.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto my-12 border border-gray-100">
      <h3 className="font-serif text-3xl font-semibold text-olive mb-2">Tìm Hiểu Thêm</h3>
      <p className="text-gray-600 mb-6">Hỏi bất cứ điều gì về Quảng Trị, hệ thống sẽ tìm kiếm thông tin mới nhất trên Google.</p>
      
      <form onSubmit={handleSearch} className="relative mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ví dụ: Thời tiết Quảng Trị hôm nay thế nào?"
          className="w-full pl-5 pr-14 py-4 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-2 top-2 bottom-2 aspect-square bg-olive text-white rounded-full flex items-center justify-center hover:bg-olive-dark disabled:opacity-50 transition-colors"
        >
          {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
        </button>
      </form>

      {response && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-sand p-6 rounded-2xl"
        >
          <div className="markdown-body text-gray-800">
            <Markdown>{response}</Markdown>
          </div>
          
          {urls.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-sm text-gray-500 uppercase tracking-wider mb-3">Nguồn tham khảo</h4>
              <ul className="space-y-2">
                {urls.map((url, idx) => (
                  <li key={idx}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-rust hover:underline flex items-center gap-2 text-sm">
                      <ExternalLink size={14} />
                      <span className="truncate">{url}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
