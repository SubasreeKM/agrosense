import { motion } from 'framer-motion';
import { 
  ScanLine, 
  CloudSun, 
  Bot, 
  MapPin, 
  ListTodo, 
  BookOpen, 
  BarChart3, 
  Shield,
  Sparkles
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: ScanLine,
    title: 'Disease Detection',
    description: 'Upload leaf images for instant AI-powered disease identification with treatment recommendations.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: CloudSun,
    title: 'Weather Forecast',
    description: 'Get accurate 7-day forecasts with agricultural insights for irrigation and pest management.',
    color: 'text-sun',
    bgColor: 'bg-sun/10',
  },
  {
    icon: Bot,
    title: 'AI Assistant',
    description: 'Chat with our intelligent farming assistant for personalized advice and recommendations.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: MapPin,
    title: 'Shop Locator',
    description: 'Find nearby fertilizer shops and agricultural supplies with directions and contact info.',
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
  },
  {
    icon: ListTodo,
    title: 'Task Manager',
    description: 'Organize your farming activities with our intuitive task management system.',
    color: 'text-earth',
    bgColor: 'bg-earth/10',
  },
  {
    icon: BookOpen,
    title: 'Farmer Blogs',
    description: 'Share knowledge and learn from experienced farmers in our community blog.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: BarChart3,
    title: 'Market Prices',
    description: 'Track real-time commodity prices to make informed selling decisions.',
    color: 'text-sun',
    bgColor: 'bg-sun/10',
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'Your data is protected with enterprise-grade security and encryption.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Powerful Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need for Smart Farming
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools modern farmers need 
            to increase yields and reduce risks.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card variant="feature" className="h-full">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
