import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Send, User, Sparkles, ArrowLeft, Brain, Loader2, Zap, LayoutDashboard } from 'lucide-react'
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
      setMessages(prev => [...prev, { id: 'error', role: 'bot', text: 'Connection interrupt. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
  }

  const backPath = carId ? `/report/${carId}` : '/dashboard';

  return (
    <div className="fixed inset-0 bg-[var(--color-bg-deep)] flex flex-col overflow-hidden font-inter">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[var(--color-primary)] opacity-10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[var(--color-warning)] opacity-10 blur-[100px] rounded-full" />
      </div>

      {/* HEADER: FIXED TO TOP */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center z-[100] px-6 shadow-sm">
        <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button 
              onClick={() => navigate(backPath)} 
              className="p-3 bg-white border border-gray-200 rounded-2xl hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all shadow-sm active:scale-95 group"
            >
              <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center shadow-lg shadow-[var(--color-primary-glow)]">
                <Brain size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 leading-tight">Saga AI</h1>
                <p className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
                  Live Expert Mode
                </p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/dashboard')}
            className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[var(--color-primary)] transition-colors"
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>
        </div>
      </header>

      {/* MESSAGES AREA: SCROLLABLE MIDDLE */}
      <main className="flex-1 overflow-y-auto pt-24 pb-48 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-10">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex w-full gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-[var(--color-primary-light)] text-white' 
                    : 'bg-white border border-gray-100 text-[var(--color-primary)]'
                }`}>
                  {msg.role === 'user' ? <User size={18} /> : <Brain size={18} />}
                </div>
                <div className={`px-6 py-4 rounded-[2rem] text-[15px] leading-relaxed max-w-[80%] font-medium shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-[var(--color-primary)] text-white rounded-tr-sm shadow-[var(--color-primary-glow)]' 
                    : 'bg-white border border-gray-100 text-slate-800 rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-[var(--color-primary)] shadow-sm"><Brain size={18} /></div>
              <div className="bg-white border border-gray-100 px-6 py-4 rounded-[2rem] rounded-tl-sm flex items-center gap-1.5 shadow-sm">
                {[0, 1, 2].map(i => <span key={i} className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />)}
              </div>
            </div>
          )}
          <div ref={bottomRef} className="h-4" />
        </div>
      </main>

      {/* INPUT DOCK: FIXED TO BOTTOM */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-bg-deep)] via-[var(--color-bg-deep)]/95 to-transparent pt-10 pb-8 px-6 z-[100]">
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          {/* Quick Suggestions */}
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s)}
                className="px-5 py-2.5 text-[11px] font-bold bg-white border border-gray-200 rounded-full text-slate-500 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all shadow-sm flex items-center gap-2 group"
              >
                <Sparkles size={12} className="text-[var(--color-primary)] group-hover:scale-110 transition-transform" />
                {s}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-warning)] rounded-[2.5rem] opacity-20 blur-md group-focus-within:opacity-40 transition-opacity" />
            <div className="relative flex items-center bg-white border border-gray-200 rounded-[2.2rem] p-2 shadow-2xl">
              <div className="w-12 h-12 flex items-center justify-center text-slate-300"><Zap size={20} /></div>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend(input)}
                placeholder="Ask about car history, price, or mechanical risks..."
                className="flex-1 bg-transparent border-none text-slate-900 px-4 py-4 font-semibold focus:outline-none placeholder-slate-300 text-[15px]"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || !chatId || isTyping}
                className="liquid-glass-btn w-12 h-12 rounded-[1.2rem] text-white flex items-center justify-center disabled:opacity-30 transition-all shadow-lg"
              >
                {isTyping && !input ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className="ml-1" />}
              </button>
            </div>
          </div>
          <p className="text-center text-[10px] font-bold text-slate-400 tracking-tight">Saga AI can make mistakes. Verify critical info.</p>
        </div>
      </div>
    </div>
  )
}
