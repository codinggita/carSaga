import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Sparkles, Navigation } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Message {
  id: string
  role: 'bot' | 'user'
  text: string
}

const suggestions = [
  "Should I negotiate this price?",
  "What should I inspect during test drive?",
  "Is the 2019 model reliable?"
]

export const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'bot', text: 'Hi! I am your AI Car Expert. I have reviewed your report for the Toyota Prius. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: 'Based on the report, the asking price is $1,200 below market average due to the scratched fender. Yes, you have room to negotiate.'
      }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="h-screen bg-stone-900 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#84cc16]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="absolute top-6 left-6 z-10">
         <button onClick={() => navigate('/report/123')} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
           <Navigation className="w-4 h-4 rotate-[-90deg]" /> Back to Report
         </button>
      </div>

      <div className="text-center mb-8 z-10 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-[#84cc16]/30 rounded-full text-[#84cc16] text-xs font-medium mb-4 shadow-[0_0_10px_rgba(132,204,22,0.2)]">
          <Sparkles className="w-3 h-3" /> AI Expert
        </div>
        <h1 className="text-3xl font-heading font-bold text-slate-50 mb-2">Ask about your vehicle</h1>
        <p className="text-slate-400">Get negotiation tips, mechanical advice, and market insights.</p>
      </div>

      {/* Chat Container */}
      <div className="w-full max-w-2xl flex-1 max-h-[60vh] overflow-y-auto hide-scrollbar px-4 pb-32 z-10 flex flex-col gap-6">
        <AnimatePresence>
          {messages.map(msg => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-[#84cc16] text-black' : 'bg-white/10 text-slate-300'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[80%] ${msg.role === 'user' ? 'bg-[#84cc16]/10 border border-[#84cc16]/20 text-slate-100' : 'glass-card text-slate-300'}`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
            <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-white/10 text-slate-300">
              <Bot className="w-4 h-4" />
            </div>
            <div className="glass-card p-4 rounded-2xl flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Floating 21st.dev style Dock */}
      <div className="fixed bottom-8 w-full max-w-2xl px-4 z-20">
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {suggestions.map((s, idx) => (
            <button 
              key={idx} 
              onClick={() => handleSend(s)}
              className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-slate-300 transition-colors backdrop-blur-md"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="glass-card p-2 rounded-full flex items-center shadow-2xl ring-1 ring-white/10">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend(input)}
            placeholder="Ask about the maintenance cost..."
            className="flex-1 bg-transparent border-none text-slate-50 px-4 py-2 focus:outline-none placeholder-slate-500 text-sm"
          />
          <button 
            onClick={() => handleSend(input)}
            disabled={!input.trim()}
            className="bg-[#84cc16] hover:bg-[#65a30d] disabled:opacity-50 disabled:hover:bg-[#84cc16] text-black w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
