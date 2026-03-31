import { useState } from 'react';
import { useLiveAPI } from '../hooks/useLiveAPI';
import { Mic, MicOff, X, Loader2, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function LiveGuideModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { isConnected, isSpeaking, error, connect, disconnect } = useLiveAPI();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleToggleConnect = async () => {
    if (isConnected) {
      disconnect();
    } else {
      setIsConnecting(true);
      await connect();
      setIsConnecting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#fdfbf7]">
              <h3 className="font-serif text-2xl font-semibold text-olive">Hướng Dẫn Viên Ảo</h3>
              <button onClick={() => { disconnect(); onClose(); }} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
              {error ? (
                <div className="text-red-500 mb-4">{error}</div>
              ) : (
                <p className="text-gray-600 mb-8 max-w-xs">
                  {isConnected 
                    ? "Tôi đang lắng nghe. Hãy hỏi tôi bất cứ điều gì về Quảng Trị!" 
                    : "Nhấn nút bên dưới để bắt đầu trò chuyện trực tiếp với hướng dẫn viên ảo."}
                </p>
              )}

              <button
                onClick={handleToggleConnect}
                disabled={isConnecting}
                className={`relative flex items-center justify-center w-24 h-24 rounded-full transition-all duration-300 ${
                  isConnected ? 'bg-red-50 text-red-500' : 'bg-olive text-white hover:bg-olive-dark'
                }`}
              >
                {isConnecting ? (
                  <Loader2 size={32} className="animate-spin" />
                ) : isConnected ? (
                  <MicOff size={32} />
                ) : (
                  <Mic size={32} />
                )}
                
                {/* Ripple effect when speaking */}
                {isConnected && isSpeaking && (
                  <motion.div
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 rounded-full bg-red-400"
                  />
                )}
              </button>
              
              <div className="mt-6 text-sm font-medium text-gray-500 flex items-center gap-2">
                {isConnected && (
                  <>
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    Đã kết nối
                    {isSpeaking && <Volume2 size={16} className="ml-2 text-olive animate-pulse" />}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
