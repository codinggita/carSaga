import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Send, User, Sparkles, ArrowLeft, Brain, Loader2, Info, LayoutDashboard, ShieldCheck, Zap, AlertTriangle, Car, FileText } from 'lucide-react'
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
  const [carData, setCarData] = useState<any>(null);
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
            setCarData(car);
            setMessages(prev => [...prev, {
              id: 'context',
              role: 'bot',
              text: `Context Loaded: **${car.year} ${car.make} ${car.model}**. I have processed the historical records and risk parameters for this vehicle. What would you like to check?`
            }]);
          } catch {
            // Context fail
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
      setMessages(prev => [...prev, { id: 'error', role: 'bot', text: 'Connection interrupt. Systems recalibrating...' }]);
    } finally {
      setIsTyping(false);
    }
  }

  const backPath = carId ? `/report/${carId}` : '/dashboard';

  return (
    <div className="h-screen w-full bg-[var(--color-bg-deep)] flex flex-col relative overflow-hidden font-inter text-[#0f172a]">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[var(--color-primary-light)] opacity-20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[var(--color-emerald)] opacity-[0.08] blur-[100px] pointer-events-none" />

      {/* FIXED HEADER */}
      <header className="w-full shrink-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(backPath)} 
              className="p-2.5 hover:bg-gray-100 rounded-2xl transition-all border border-gray-100 group shadow-sm bg-white"
              aria-label="Go back"
            >
              <ArrowLeft size={20} className="text-[#0f172a] group-hover:-translate-x-1 transition-transform" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center shadow-lg shadow-[var(--color-primary-glow)]">
                <Brain size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-extrabold tracking-tight">Saga AI Analyst</h1>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Verification Agent
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
             <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#0f172a] transition-colors">
                <LayoutDashboard size={16} /> Dashboard
             </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto relative overflow-hidden">
        {/* CHAT MESSAGES */}
        <main className="flex-1 flex flex-col min-w-0 bg-white/20">
          <div className="flex-1 overflow-y-auto hide-scrollbar px-4 sm:px-8 pt-8 pb-32">
            <div className="max-w-3xl mx-auto flex flex-col gap-8">
              <AnimatePresence>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`flex w-full gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-9 h-9 rounded-2xl shrink-0 flex items-center justify-center shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-[#0f172a] text-white'
                        : 'bg-white border border-gray-100 text-[var(--color-primary)]'
                    }`}>
                      {msg.role === 'user' ? <User size={16} /> : <Brain size={16} />}
                    </div>
                    
                    <div className={`relative px-5 py-4 rounded-3xl text-[14px] leading-relaxed max-w-[85%] font-medium shadow-sm transition-all ${
                      msg.role === 'user'
                        ? 'bg-[var(--color-primary)] text-white shadow-[var(--color-primary-glow)]/20 rounded-tr-sm'
                        : 'bg-white border border-gray-100 text-[#0f172a] rounded-tl-sm'
                    }`}>
                      {msg.text}
                      <span className={`absolute bottom-[-18px] text-[9px] font-bold text-gray-400 uppercase tracking-tighter ${msg.role === 'user' ? 'right-2' : 'left-2'}`}>
                        {msg.role === 'user' ? 'You' : 'Saga Intelligence'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                  <div className="w-9 h-9 flex items-center justify-center shrink-0 bg-white border border-gray-100 text-[var(--color-primary)] rounded-2xl">
                    <Brain size={16} />
                  </div>
                  <div className="bg-white border border-gray-100 px-5 py-4 rounded-3xl rounded-tl-sm flex items-center gap-1.5 shadow-sm">
                    {[0, 1, 2].map(i => (
                      <span key={i} className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* DOCKED INPUT AREA (ZERO BOTTOM GAP) */}
          <div className="w-full bg-gradient-to-t from-[var(--color-bg-deep)] to-transparent pt-10 pb-6 px-4 sm:px-8 absolute bottom-0 z-40">
            <div className="max-w-3xl mx-auto space-y-4">
              {/* Suggestions */}
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(s)}
                    className="px-4 py-2 text-[11px] font-bold bg-white/90 hover:bg-white border border-gray-100 rounded-full text-gray-500 hover:text-[#0f172a] transition-all shadow-sm flex items-center gap-2 group backdrop-blur-md"
                  >
                    <Sparkles size={12} className="text-[var(--color-primary)] group-hover:scale-110 transition-transform" />
                    {s}
                  </button>
                ))}
              </div>

              {/* Input Bar */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-warning)] rounded-[2.5rem] opacity-10 group-focus-within:opacity-20 transition-opacity blur-md" />
                <div className="relative glass-card p-2 rounded-[2.2rem] flex items-center bg-white shadow-2xl border border-white">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-gray-300">
                    <Zap size={20} />
                  </div>
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend(input)}
                    placeholder="Ask Saga about the car's history, risks, or market value..."
                    className="flex-1 bg-transparent border-none text-[#0f172a] px-4 py-4 font-semibold focus:outline-none placeholder-gray-300 text-[14px]"
                  />
                  <button
                    onClick={() => handleSend(input)}
                    disabled={!input.trim() || !chatId || isTyping}
                    className="liquid-glass-btn w-12 h-12 rounded-2xl flex items-center justify-center disabled:opacity-30 transition-all shadow-lg"
                  >
                    {isTyping && !input ? (
                      <Loader2 size={20} className="text-white animate-spin" />
                    ) : (
                      <Send size={20} className="text-white ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
              <p className="text-center text-[9px] font-bold text-gray-400 tracking-tighter uppercase opacity-60">
                AI can make mistakes. Please verify critical details.
              </p>
            </div>
          </div>
        </main>

        {/* SIDEBAR INTEL (DESKTOP) */}
        <aside className="hidden lg:flex w-80 flex-col p-8 gap-8 border-l border-gray-100 bg-white/40 overflow-y-auto">
          <div className="space-y-4">
             <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Car size={14}/> Vehicle Analysis
             </h3>
             {carData ? (
               <div className="space-y-6">
                  <div className="p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                      <Zap size={60} />
                    </div>
                    <p className="text-xl font-black text-[#0f172a] mb-1">{carData.year} {carData.make}</p>
                    <p className="text-sm font-bold text-gray-400 mb-4">{carData.model}</p>
                    
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      carData.riskLevel === 'low' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      carData.riskLevel === 'medium' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                      'bg-red-50 text-red-600 border-red-100'
                    }`}>
                      {carData.riskLevel === 'low' ? <ShieldCheck size={12}/> : <AlertTriangle size={12}/>}
                      {carData.riskLevel} Risk
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-3xl bg-white border border-gray-100 shadow-sm">
                       <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Status</p>
                       <p className="text-xs font-bold text-[#0f172a] capitalize">{carData.status}</p>
                    </div>
                    <div className="p-4 rounded-3xl bg-white border border-gray-100 shadow-sm">
                       <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Location</p>
                       <p className="text-xs font-bold text-[#0f172a] truncate">{carData.location || 'N/A'}</p>
                    </div>
                  </div>
               </div>
             ) : (
               <div className="p-8 text-center bg-gray-50/50 rounded-[2rem] border border-dashed border-gray-200">
                  <Brain size={24} className="mx-auto mb-3 text-gray-300" />
                  <p className="text-[10px] font-bold text-gray-400">Loading context...</p>
               </div>
             )}
          </div>

          <div className="mt-auto p-6 rounded-[2rem] bg-gradient-to-br from-[#0f172a] to-[#334155] shadow-xl text-white">
             <p className="text-[10px] font-black uppercase opacity-60 mb-2">Safety Pro Tip</p>
             <p className="text-[11px] font-medium leading-relaxed">Always check for service records matching the odometer readings provided in the report.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
