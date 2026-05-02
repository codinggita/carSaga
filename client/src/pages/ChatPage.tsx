import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Send, User, Sparkles, ArrowLeft, Brain, Loader2, Info } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '../services/api'

interface Message {
  id: string
  role: 'bot' | 'user'
  text: string
}

const suggestions = [
  'Summarize all risks',
  'Estimate repair costs',
  'Market value check',
  'Should I negotiate?',
]

export const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const carId = searchParams.get('car');
  
  const [chatId, setChatId] = useState<string | null>(null);
  const [carName, setCarName] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 'initial', role: 'bot', text: "Hi! I'm Saga — your AI car expert. I can review inspection reports, estimate repairs, and help you negotiate safely. How can I help you today?" }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await api.post('/chat', { reportId: carId || null });
        setChatId(data._id);

        if (carId) {
          try {
            const { data: car } = await api.get(`/cars/${carId}`);
            const name = `${car.year} ${car.make} ${car.model}`;
            setCarName(name);
            setMessages(prev => [...prev, {
              id: 'context',
              role: 'bot',
              text: `I've analyzed your **${name}**. I have the full verification report ready. What specific details can I help you with?`
            }]);
          } catch {
            // Silently fail if car context fails
          }
        }
      } catch (err) {
        console.error("Failed to initialize chat session", err);
      }
    };
    init();
  }, [carId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = async (text: string) => {
    if (!text.trim() || !chatId || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const { data } = await api.post(`/chat/${chatId}/message`, { text });
      
      const refreshedMessages = data.messages.map((m: any) => ({
        id: m._id,
        role: m.role,
        text: m.text
      }));
      
      const systemMsgs = messages.filter(m => m.id === 'initial' || m.id === 'context');
      setMessages([...systemMsgs, ...refreshedMessages]);
    } catch (err) {
      setMessages(prev => [...prev, { id: 'error', role: 'bot', text: 'Connection lost. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
  }

  const backPath = carId ? `/report/${carId}` : '/dashboard';

  return (
    <div className="h-[100dvh] bg-[var(--color-bg-deep)] flex flex-col relative overflow-hidden font-inter">
      {/* Background Decor */}
      <div className="glow-orb w-[600px] h-[600px] bg-[var(--color-primary-light)] opacity-20 top-[-150px] left-[-150px]" />
      <div className="glow-orb w-[400px] h-[400px] bg-[var(--color-emerald)] opacity-[0.06] bottom-[-100px] right-[-100px]" />

      {/* Header: Compact & Premium */}
      <header className="w-full shrink-0 z-30 bg-white/70 backdrop-blur-xl border-b border-gray-100/50 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(backPath)} 
              className="p-2 hover:bg-gray-100 rounded-xl transition-all group"
              title="Go back"
            >
              <ArrowLeft size={20} className="text-gray-600 group-hover:text-[#0f172a] transition-colors" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center shadow-md shadow-[var(--color-primary-glow)]">
                <Brain size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#0f172a] leading-tight flex items-center gap-2">
                  Saga AI
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </h1>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
                  {carName ? carName : 'Vehicle Expert'}
                </p>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="w-full h-full object-cover opacity-80" />
                  </div>
                ))}
             </div>
             <p className="text-[10px] font-bold text-gray-400">1.4k+ Helped</p>
          </div>
        </div>
      </header>

      {/* Chat Space */}
      <main className="flex-1 overflow-hidden relative flex flex-col items-center">
        <div className="w-full max-w-4xl h-full overflow-y-auto hide-scrollbar px-6 py-10 flex flex-col gap-8 pb-44">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx === 0 ? 0 : 0.05 }}
                className={`flex w-full gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-[#0f172a] text-white'
                    : 'bg-white border border-gray-100 text-[var(--color-primary)]'
                }`}>
                  {msg.role === 'user' ? <User size={18} /> : <Brain size={18} />}
                </div>
                
                <div className={`group relative px-6 py-4 rounded-3xl text-[14px] leading-relaxed max-w-[80%] font-medium transition-all ${
                  msg.role === 'user'
                    ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary-glow)] rounded-tr-md'
                    : 'bg-white border border-gray-100 text-[#0f172a] shadow-sm rounded-tl-md'
                }`}>
                  {msg.text}
                  <span className={`absolute bottom-[-18px] text-[9px] font-bold text-gray-300 uppercase tracking-tighter ${msg.role === 'user' ? 'right-2' : 'left-2'}`}>
                    {msg.role === 'user' ? 'Sent' : 'Saga AI'}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
              <div className="w-10 h-10 flex items-center justify-center shrink-0 bg-white border border-gray-100 text-[var(--color-primary)] rounded-2xl shadow-sm">
                <Brain size={18} />
              </div>
              <div className="bg-white border border-gray-100 px-6 py-4 rounded-3xl rounded-tl-md flex items-center gap-1.5 shadow-sm">
                {[0, 1, 2].map(i => (
                  <span key={i} className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Dock: Fixed at Bottom Center */}
        <div className="absolute bottom-0 w-full max-w-4xl px-6 pb-8 pt-10 bg-gradient-to-t from-[var(--color-bg-deep)] via-[var(--color-bg-deep)] to-transparent z-40">
          <div className="space-y-4">
            {/* Suggestions Chips */}
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(s)}
                  className="px-5 py-2.5 text-[11px] font-bold bg-white/80 backdrop-blur-md hover:bg-white border border-gray-100 rounded-2xl text-gray-500 hover:text-[#0f172a] hover:border-gray-300 transition-all shadow-sm flex items-center gap-2 group"
                >
                  <Sparkles size={12} className="text-[var(--color-primary)] group-hover:scale-125 transition-transform" />
                  {s}
                </button>
              ))}
            </div>

            {/* Input Container */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-warning)] rounded-[2.5rem] opacity-20 group-focus-within:opacity-40 transition-opacity blur-sm" />
              <div className="relative glass-card p-2 rounded-[2.2rem] flex items-center bg-white shadow-2xl border border-white">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-gray-400">
                  <Info size={18} />
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend(input)}
                  placeholder="Ask about maintenance, price, or history..."
                  className="flex-1 bg-transparent border-none text-[#0f172a] px-4 py-4 font-semibold focus:outline-none placeholder-gray-300 text-[14px]"
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || !chatId || isTyping}
                  className="liquid-glass-btn w-12 h-12 rounded-full flex items-center justify-center disabled:opacity-30 transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                  {isTyping && !input ? (
                    <Loader2 size={20} className="text-white animate-spin" />
                  ) : (
                    <Send size={20} className="text-white ml-0.5" />
                  )}
                </button>
              </div>
            </div>
            
            <p className="text-center text-[10px] font-bold text-gray-400 tracking-tight">
              Saga AI can make mistakes. Verify important info.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
