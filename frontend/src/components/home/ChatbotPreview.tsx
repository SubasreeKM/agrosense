import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const sampleResponses = [
  {
    question: "What fertilizer for tomatoes?",
    answer: "For tomatoes, use a balanced NPK fertilizer (10-10-10) during early growth, then switch to a high-phosphorus blend (5-10-10) during flowering. Apply 1-2 tablespoons per plant every 2 weeks."
  },
  {
    question: "Best time to water crops?",
    answer: "The ideal time is early morning (6-10 AM). This allows plants to absorb water before heat increases evaporation. Avoid evening watering as it can promote fungal diseases."
  },
  {
    question: "How to control aphids?",
    answer: "Try neem oil spray (2 tbsp per gallon) weekly. You can also introduce ladybugs as natural predators, or use a strong water spray to dislodge them. For severe cases, use insecticidal soap."
  }
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatbotPreview() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I\'m your AgroSense AI assistant. Ask me anything about farming, crop care, or pest management!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = sampleResponses.find(r => 
        userMessage.toLowerCase().includes(r.question.split(' ')[0].toLowerCase())
      ) || sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.answer }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Bot className="w-4 h-4" />
            AI Assistant
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Your Personal Farming Expert
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant answers to all your farming questions from our 
            AI-powered assistant.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <Card variant="elevated">
            <CardContent className="p-0">
              {/* Chat Header */}
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">AgroSense AI</h4>
                  <p className="text-xs text-accent flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    Online
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI Powered
                  </span>
                </div>
              </div>

              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user' 
                          ? 'bg-primary/10' 
                          : 'gradient-hero'
                      }`}>
                        {message.role === 'user' 
                          ? <User className="w-4 h-4 text-primary" />
                          : <Bot className="w-4 h-4 text-primary-foreground" />
                        }
                      </div>
                      <div className={`max-w-[80%] p-3 rounded-xl ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-tr-none'
                          : 'bg-muted text-foreground rounded-tl-none'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div className="bg-muted p-3 rounded-xl rounded-tl-none">
                        <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex gap-2"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about farming, crops, pests..."
                    className="flex-1"
                  />
                  <Button type="submit" variant="hero" size="icon" disabled={isTyping}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Try: "Best fertilizer for rice?" or "How to prevent fungal diseases?"
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <Link to="/chatbot">
              <Button variant="outline" size="lg">
                Open Full AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
