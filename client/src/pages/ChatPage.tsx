import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Send, Bot, User, Sparkles, ArrowLeft, Brain } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

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
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'bot', text: "Hi! I'm Sage — your AI car expert. I've reviewed the report for the 2021 Porsche 911. I noticed a service history discrepancy at 32k miles. How can I help you today?" }
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

    setTimeout(() => {
      const responses = [
        'Based on the report, the asking price is $1,200 below market average. The scratched fender repair estimate is $300-$500 at a certified shop. You have solid negotiation leverage here.',
        'The service gap between 28k and 35k miles is concerning — it could indicate deferred maintenance. I recommend requesting the dealer\'s service records before proceeding.',
        'Compared to similar 2021 models in your area, this one is priced competitively. The depreciation curve suggests it will hold value well over the next 3 years.',
      ]
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: responses[Math.floor(Math.random() * responses.length)]
      }])
      setIsTyping(false)
    }, 1800)
  }

  return (
    <div className="h-screen bg-[var(--color-bg-deep)] flex flex-col items-center relative overflow-hidden">
      {/* Background Orbs */}
      <div className="glow-orb w-[500px] h-[500px] bg-[var(--color-primary)] opacity-[0.04] top-[-10%] left-[-10%]" />
      <div className="glow-orb w-[400px] h-[400px] bg-[var(--color-emerald)] opacity-[0.03] bottom-[-10%] right-[-10%]" />

      {/* Header */}
      <div className="w-full max-w-3xl px-6 pt-6 pb-4 flex items-center justify-between relative z-10">
        <button onClick={() => navigate('/report/123')} className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-white transition-colors">
          <ArrowLeft size={16} /> Back to Report
        </button>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--color-emerald)] animate-pulse" />
          <span className="text-xs text-[var(--color-text-muted)]">Sage AI Online</span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-6 z-10 px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-glass)] border border-[var(--color-border-glass)] rounded-full text-sm mb-4 backdrop-blur-xl">
          <Brain size={14} className="text-[var(--color-primary-light)]" />
          <span className="text-[var(--color-text-secondary)]">Sage AI Expert</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Ask about your vehicle</h1>
      </div>

      {/* Messages */}
      <div className="w-full max-w-3xl flex-1 overflow-y-auto hide-scrollbar px-6 pb-40 z-10 flex flex-col gap-5">
        <AnimatePresence>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-emerald)] text-white'
                  : 'bg-[var(--color-bg-glass)] border border-[var(--color-border-glass)] text-[var(--color-text-secondary)]'
              }`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`px-5 py-4 rounded-2xl text-sm leading-relaxed max-w-[80%] ${
                msg.role === 'user'
                  ? 'bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-white'
                  : 'glass-card text-[var(--color-text-secondary)]'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center bg-[var(--color-bg-glass)] border border-[var(--color-border-glass)] text-[var(--color-text-secondary)]">
              <Bot size={14} />
            </div>
            <div className="glass-card px-5 py-4 rounded-2xl flex items-center gap-1.5">
              {[0, 1, 2].map(i => (
                <span key={i} className="w-2 h-2 rounded-full bg-[var(--color-text-muted)] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Dock */}
      <div className="fixed bottom-0 w-full max-w-3xl px-6 pb-6 pt-4 bg-gradient-to-t from-[var(--color-bg-deep)] via-[var(--color-bg-deep)]/95 to-transparent z-20">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mb-3 justify-center">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(s)}
              className="px-4 py-2 text-xs bg-[var(--color-bg-glass)] hover:bg-[var(--color-bg-glass-hover)] border border-[var(--color-border-glass)] rounded-full text-[var(--color-text-secondary)] hover:text-white transition-all backdrop-blur-xl"
            >
              <Sparkles size={10} className="inline mr-1.5 text-[var(--color-primary-light)]" />{s}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="glass-card p-2 rounded-2xl flex items-center shadow-2xl">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend(input)}
            placeholder="Ask about maintenance costs, negotiation tips..."
            className="flex-1 bg-transparent border-none text-white px-4 py-3 focus:outline-none placeholder-[var(--color-text-muted)] text-sm"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim()}
            className="liquid-glass-btn w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none"
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
