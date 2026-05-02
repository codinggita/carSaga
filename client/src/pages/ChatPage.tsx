import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Send, Bot, User, Sparkles, ArrowLeft, Brain, Loader2 } from 'lucide-react'
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
        // Create a chat session
        const { data } = await api.post('/chat', { reportId: null });
        setChatId(data._id);

        // If we have a car context, fetch the car name
        if (carId) {
          try {
            const { data: car } = await api.get(`/cars/${carId}`);
            const name = `${car.year} ${car.make} ${car.model}`;
            setCarName(name);
            // Add context message
            setMessages(prev => [...prev, {
              id: 'context',
              role: 'bot',
              text: `I can see you're asking about your **${name}**. I have the full verification report loaded. What would you like to know?`
            }]);
          } catch {
            // Car not found, continue without context
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
    if (!text.trim() || !chatId) return;

    const tempId = Date.now().toString();
    setMessages(prev => [...prev, { id: tempId, role: 'user', text }]);
    setInput('');
    setIsTyping(true);

    try {
      const { data } = await api.post(`/chat/${chatId}/message`, { text });
      
      const refreshedMessages = data.messages.map((m: any) => ({
        id: m._id,
        role: m.role,
        text: m.text
      }));
      
      // Preserve welcome + context messages
      const systemMsgs = messages.filter(m => m.id === 'initial' || m.id === 'context');
      setMessages([...systemMsgs, ...refreshedMessages]);
    } catch (err) {
      console.error("Sending message failed", err);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'bot', text: 'Error connecting to AI Server. Please try again later.' }]);
    } finally {
      setIsTyping(false);
    }
  }

  const backPath = carId ? `/report/${carId}` : '/dashboard';
  const backLabel = carId ? 'Back to Report' : 'Back to Dashboard';

  return (
    <div className="h-[100dvh] bg-[var(--color-bg-deep)] flex flex-col relative overflow-hidden">
      {/* Background Orbs */}
      <div className="glow-orb w-[500px] h-[500px] bg-[var(--color-primary-light)] opacity-20 top-[-10%] left-[-10%]" />
      <div className="glow-orb w-[400px] h-[400px] bg-[var(--color-emerald)] opacity-[0.08] bottom-[-10%] right-[-10%]" />

      {/* Header - Matching other pages */}
      <header className="w-full shrink-0 px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 border-b border-[var(--color-border-glass)] bg-white/50 backdrop-blur-md">
        <div className="flex items-center gap-4 max-w-5xl mx-auto w-full">
          <button onClick={() => navigate(backPath)} className="ghost-btn p-2.5 rounded-xl transition-colors bg-white shadow-sm border border-gray-100 hover:border-gray-300">
            <ArrowLeft size={18} className="text-[#0f172a]" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-extrabold tracking-tight text-[#0f172a]">
                {carName ? `Saga AI: ${carName}` : 'Saga AI Expert'}
              </h1>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 border border-emerald-100 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">Online</span>
              </div>
            </div>
            <p className="text-[var(--color-text-muted)] text-sm font-medium">
              Ask questions about maintenance, negotiation, or reports
            </p>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="flex-1 w-full max-w-3xl mx-auto flex flex-col relative z-10 overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto hide-scrollbar px-6 pt-8 pb-40 flex flex-col gap-6">
          <AnimatePresence>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-9 h-9 rounded-2xl shrink-0 flex items-center justify-center shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] text-white'
                    : 'bg-white border border-gray-100 text-[var(--color-primary)]'
                }`}>
                  {msg.role === 'user' ? <User size={16} /> : <Brain size={16} />}
                </div>
                <div className={`px-5 py-4 rounded-3xl text-sm leading-relaxed max-w-[85%] font-medium ${
                  msg.role === 'user'
                    ? 'bg-[var(--color-primary)] text-white shadow-md rounded-tr-sm'
                    : 'bg-white border border-gray-100 text-[#0f172a] shadow-sm rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-9 h-9 flex items-center justify-center shrink-0 bg-white border border-gray-100 text-[var(--color-primary)] rounded-2xl shadow-sm">
                <Brain size={16} />
              </div>
              <div className="bg-white border border-gray-100 px-5 py-4 rounded-3xl rounded-tl-sm flex items-center gap-1.5 shadow-sm">
                {[0, 1, 2].map(i => (
                  <span key={i} className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce opacity-70" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Dock */}
        <div className="absolute bottom-0 w-full px-6 pb-6 pt-8 bg-gradient-to-t from-[var(--color-bg-deep)] via-[var(--color-bg-deep)] to-transparent z-20">
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mb-3 justify-center">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s)}
                className="px-4 py-2 text-xs font-bold bg-white hover:bg-gray-50 border border-gray-100 rounded-full text-[var(--color-text-secondary)] hover:text-[#0f172a] transition-all shadow-sm"
              >
                <Sparkles size={12} className="inline mr-1.5 text-[var(--color-primary)]" />{s}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="glass-card p-2 rounded-3xl flex items-center shadow-lg bg-white border border-gray-100">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend(input)}
              placeholder="Ask about maintenance, negotiation tips..."
              className="flex-1 bg-transparent border-none text-[#0f172a] px-5 py-3 font-medium focus:outline-none placeholder-[var(--color-text-muted)] text-sm"
            />
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim() || !chatId || isTyping}
              className="liquid-glass-btn w-12 h-12 rounded-2xl flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-transform active:scale-95"
            >
              {isTyping && !input ? <Loader2 size={18} className="text-white animate-spin" /> : <Send size={18} className="text-white" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
