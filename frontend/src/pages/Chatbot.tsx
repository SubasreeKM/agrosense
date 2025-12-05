import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Send, 
  User, 
  Loader2, 
  Sparkles,
  Leaf,
  Trash2,
  Plus,
  MessageSquare
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestionQuestions = [
  "What's the best fertilizer for wheat?",
  "How to control aphids naturally?",
  "When should I water my crops?",
  "Signs of nitrogen deficiency?",
];

const aiResponses: Record<string, string> = {
  fertilizer: `For wheat cultivation, I recommend a balanced approach:

**Basal Dose (at sowing):**
- DAP: 100 kg/hectare
- MOP: 50 kg/hectare

**Top Dressing:**
- First: 40 kg Urea/ha at 21 days (first irrigation)
- Second: 40 kg Urea/ha at 45 days (second irrigation)

**Tips:**
• Apply Zinc Sulphate (25 kg/ha) if zinc deficient
• Use organic manure 10-15 tonnes/ha before sowing
• Consider soil testing for precise recommendations`,

  aphid: `Here are effective natural methods to control aphids:

**Immediate Actions:**
1. **Neem Oil Spray** - Mix 2 tbsp neem oil + 1 tbsp soap in 1 gallon water, spray in evening
2. **Strong Water Spray** - Dislodge aphids with strong water jets
3. **Garlic Spray** - Blend 2 garlic bulbs with 1 quart water, strain and spray

**Biological Control:**
• Introduce ladybugs (1,500 per 100 sq ft)
• Encourage lacewings and parasitic wasps
• Plant companion herbs like mint, fennel, dill

**Prevention:**
• Remove heavily infested leaves
• Avoid over-fertilizing (excess nitrogen attracts aphids)
• Maintain good air circulation`,

  water: `Optimal irrigation timing depends on crop stage and weather:

**Best Time to Water:**
• **Morning (6-10 AM)** - Most efficient, reduces disease
• Avoid evening watering - promotes fungal growth

**Watering Frequency by Crop:**
| Crop | Summer | Winter |
|------|--------|--------|
| Wheat | 5-6 irrigations | 4-5 irrigations |
| Rice | Continuous flooding | - |
| Vegetables | Daily/alternate days | 2-3 times/week |

**Signs of Water Stress:**
• Wilting in afternoon
• Leaf curling
• Dull green color
• Stunted growth`,

  nitrogen: `**Signs of Nitrogen Deficiency in Crops:**

**Visual Symptoms:**
1. Yellowing of older/lower leaves first
2. Stunted plant growth
3. Thin, spindly stems
4. Pale green to yellow leaf color
5. Premature leaf drop

**Correction Methods:**
• Apply Urea (46-0-0) at 30-50 kg/acre
• Use Ammonium Sulfate for quick absorption
• Apply calcium ammonium nitrate for immediate needs

**Organic Options:**
• Blood meal (12% N)
• Fish emulsion
• Composted manure
• Legume cover crops

**Prevention:**
Regular soil testing and balanced fertilization program`,
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AgroSense AI assistant. I can help you with:\n\n• Crop disease identification & treatment\n• Fertilizer recommendations\n• Pest control strategies\n• Irrigation scheduling\n• Weather-based farming advice\n\nHow can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('fertilizer') || lowerMessage.includes('wheat')) {
      return aiResponses.fertilizer;
    } else if (lowerMessage.includes('aphid') || lowerMessage.includes('pest') || lowerMessage.includes('control')) {
      return aiResponses.aphid;
    } else if (lowerMessage.includes('water') || lowerMessage.includes('irrigat')) {
      return aiResponses.water;
    } else if (lowerMessage.includes('nitrogen') || lowerMessage.includes('deficien') || lowerMessage.includes('yellow')) {
      return aiResponses.nitrogen;
    }
    return `Thank you for your question about "${userMessage}". As your farming assistant, I'd recommend consulting with local agricultural extension services for specific advice tailored to your region. However, I can help with general guidance on crop management, pest control, and fertilization strategies. Could you provide more details about your specific situation?`;
  };

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(messageText);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const clearChat = () => {
    setMessages([{
      id: Date.now().toString(),
      role: 'assistant',
      content: "Chat cleared. How can I help you with your farming questions?",
      timestamp: new Date(),
    }]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Bot className="w-4 h-4" />
                AI Assistant
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                AgroSense AI Chatbot
              </h1>
              <p className="text-lg text-muted-foreground">
                Get instant expert advice for all your farming questions
              </p>
            </motion.div>

            {/* Chat Container */}
            <Card variant="elevated" className="overflow-hidden">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center">
                    <Bot className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">AgroSense AI</h3>
                    <p className="text-xs text-accent flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      Online - Powered by Gemini
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={clearChat}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="h-[500px] p-4" ref={scrollRef}>
                <div className="space-y-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'user'
                            ? 'bg-primary/10'
                            : 'gradient-hero'
                        }`}>
                          {message.role === 'user'
                            ? <User className="w-5 h-5 text-primary" />
                            : <Bot className="w-5 h-5 text-primary-foreground" />
                          }
                        </div>
                        <div className={`max-w-[80%] p-4 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                            : 'bg-muted text-foreground rounded-tl-none'
                        }`}>
                          <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                          <p className={`text-xs mt-2 ${
                            message.role === 'user' ? 'text-primary-foreground/60' : 'text-muted-foreground'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center">
                        <Bot className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="bg-muted p-4 rounded-2xl rounded-tl-none">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {/* Suggestions */}
              {messages.length <= 2 && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground mb-2">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestionQuestions.map((question, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(question)}
                        className="px-3 py-1.5 rounded-full bg-muted text-sm text-foreground hover:bg-accent/10 hover:text-accent transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-border">
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex gap-3"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about farming, crops, pests, fertilizers..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button type="submit" variant="hero" disabled={isTyping || !input.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
