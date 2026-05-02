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
    { id: 'initial', role: 'bot', text: "Systems online. I'm Saga, your Automotive Intelligence Guardian. I've initialized the neural link to your vehicle data. How shall we proceed today?" }
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
              text: `Context Loaded: **${car.year} ${car.make} ${car.model}**. I have processed the historical records and risk parameters. What would you like to drill down into?`
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
    <div className="h-[100dvh] bg-[#020617] flex flex-col relative overflow-hidden font-inter text-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--color-primary)] opacity-[0.15] blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--color-warning)] opacity-[0.1] blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      {/* Top Header */}
      <header className="w-full shrink-0 z-30 border-b border-white/5 bg-black/20 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button 
              onClick={() => navigate(backPath)} 
              className="p-2.5 hover:bg-white/5 rounded-2xl transition-all border border-white/5 group"
            >
              <ArrowLeft size={20} className="text-gray-400 group-hover:text-white transition-colors" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[#3b82f6] flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                <Brain size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight flex items-center gap-2">
                  Saga Core <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase tracking-widest font-extrabold animate-pulse">Live</span>
                </h1>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Neural Automotive Analyst v2.6</p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-gray-500 uppercase">Encryption</span>
                <span className="text-[12px] font-bold text-emerald-400 flex items-center gap-1.5"><ShieldCheck size={14}/> AES-256 Active</span>
             </div>
             <div className="w-px h-8 bg-white/10" />
             <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-xs font-bold text-white/60 hover:text-white transition-colors">
                <LayoutDashboard size={16} /> Dashboard
             </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden relative z-10 max-w-7xl mx-auto w-full">
        {/* Left: Chat Content */}
        <main className="flex-1 flex flex-col min-w-0 border-r border-white/5">
          <div className="flex-1 overflow-y-auto hide-scrollbar px-6 pt-10 pb-48 flex flex-col gap-10">
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex w-full gap-5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center shadow-lg ${
                    msg.role === 'user'
                      ? 'bg-white text-black'
                      : 'bg-white/5 border border-white/10 text-[var(--color-primary)]'
                  }`}>
                    {msg.role === 'user' ? <User size={18} /> : <Brain size={18} />}
                  </div>
                  
                  <div className={`relative px-6 py-4 rounded-[2rem] text-[15px] leading-[1.6] max-w-[85%] font-medium transition-all ${
                    msg.role === 'user'
                      ? 'bg-[var(--color-primary)] text-white shadow-[0_10px_30px_rgba(59,130,246,0.3)] rounded-tr-sm'
                      : 'bg-white/5 backdrop-blur-xl border border-white/10 text-gray-200 rounded-tl-sm'
                  }`}>
                    {msg.text.split('\n').map((line, i) => (
                      <p key={i} className={line.startsWith('**') ? 'text-white font-extrabold mt-1' : ''}>
                        {line}
                      </p>
                    ))}
                    <span className={`absolute bottom-[-22px] text-[9px] font-bold text-gray-600 uppercase tracking-widest ${msg.role === 'user' ? 'right-2' : 'left-2'}`}>
                      {msg.role === 'user' ? 'Authorized Input' : 'Saga Intelligence'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-5">
                <div className="w-10 h-10 flex items-center justify-center shrink-0 bg-white/5 border border-white/10 text-[var(--color-primary)] rounded-2xl">
                  <Brain size={18} />
                </div>
                <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-[2rem] rounded-tl-sm flex items-center gap-2">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Floating Input Dock */}
          <div className="absolute bottom-0 w-full px-6 pb-10 pt-16 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent">
            <div className="max-w-3xl mx-auto space-y-5">
              <div className="flex flex-wrap gap-2.5 justify-center">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(s)}
                    className="px-5 py-2.5 text-[11px] font-bold bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all flex items-center gap-2 group backdrop-blur-md"
                  >
                    <Sparkles size={13} className="text-[var(--color-primary)] group-hover:scale-125 transition-transform" />
                    {s}
                  </button>
                ))}
              </div>

              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-primary)] to-[#3b82f6] rounded-[2.5rem] opacity-30 blur-md" />
                <div className="relative glass-card p-2 rounded-[2.2rem] flex items-center bg-black/40 border border-white/10 backdrop-blur-3xl">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-gray-500">
                    <Zap size={20} className="animate-pulse" />
                  </div>
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend(input)}
                    placeholder="Inquire about vehicle status, history, or risks..."
                    className="flex-1 bg-transparent border-none text-white px-4 py-4 font-semibold focus:outline-none placeholder-gray-600 text-[15px]"
                  />
                  <button
                    onClick={() => handleSend(input)}
                    disabled={!input.trim() || !chatId || isTyping}
                    className="w-12 h-12 rounded-[1.2rem] bg-white flex items-center justify-center text-black disabled:opacity-20 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    {isTyping && !input ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <Send size={20} className="ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right: Intelligence Sidebar (Desktop Only) */}
        <aside className="hidden xl:flex w-[350px] flex-col p-8 gap-8 bg-white/2 overflow-y-auto">
          <div className="space-y-4">
             <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Car size={14}/> Vehicle Intel
             </h3>
             {carData ? (
               <div className="space-y-6">
                  <div className="p-6 rounded-[2rem] bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Zap size={60} />
                    </div>
                    <p className="text-2xl font-black text-white mb-1 leading-tight">{carData.year} {carData.make}</p>
                    <p className="text-lg font-bold text-gray-400 mb-4">{carData.model}</p>
                    
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      carData.riskLevel === 'low' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      carData.riskLevel === 'medium' ? 'bg-orange-500/10 text-orange-400 border-orange-500/30' :
                      'bg-red-500/10 text-red-400 border-red-500/30'
                    }`}>
                      {carData.riskLevel === 'low' ? <ShieldCheck size={12}/> : <AlertTriangle size={12}/>}
                      {carData.riskLevel} Risk Verified
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-3xl bg-white/5 border border-white/5">
                       <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Status</p>
                       <p className="text-sm font-bold text-white capitalize">{carData.status}</p>
                    </div>
                    <div className="p-4 rounded-3xl bg-white/5 border border-white/5">
                       <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Location</p>
                       <p className="text-sm font-bold text-white truncate">{carData.location || 'Global'}</p>
                    </div>
                  </div>
               </div>
             ) : (
               <div className="p-8 text-center bg-white/5 rounded-[2rem] border border-white/5 border-dashed">
                  <Brain size={30} className="mx-auto mb-4 text-gray-600" />
                  <p className="text-xs font-bold text-gray-500">Initialize context to load vehicle intel</p>
               </div>
             )}
          </div>

          <div className="space-y-4 pt-4 border-t border-white/5">
             <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <FileText size={14}/> Active Analysis
             </h3>
             <div className="space-y-3">
                {[
                  'Engine compression analysis',
                  'VIN history cross-ref',
                  'Challan records retrieval',
                  'Market volatility check'
                ].map((task, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs font-bold text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
                    {task}
                  </div>
                ))}
             </div>
          </div>

          <div className="mt-auto p-6 rounded-[2rem] bg-gradient-to-br from-[var(--color-primary)] to-[#3b82f6] shadow-xl shadow-[var(--color-primary-glow)]/20">
             <p className="text-xs font-black uppercase text-white/70 mb-2">Saga Pro Tip</p>
             <p className="text-xs font-bold leading-relaxed">Ask about "Negotiation Edge" to get a data-backed price strategy for this specific model.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
