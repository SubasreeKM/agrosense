import { motion } from 'framer-motion';
import { Target, Users, Sprout, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  { icon: Users, value: '50,000+', label: 'Active Farmers' },
  { icon: Sprout, value: '1M+', label: 'Crops Analyzed' },
  { icon: Target, value: '98%', label: 'Accuracy Rate' },
  { icon: Award, value: '15+', label: 'Awards Won' },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sprout className="w-4 h-4" />
              About AgroSense AI
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Empowering Farmers with Smart Technology
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              AgroSense AI is a revolutionary agricultural platform that combines 
              artificial intelligence, satellite data, and real-time weather monitoring 
              to help farmers make data-driven decisions.
            </p>
            <p className="text-muted-foreground mb-8">
              Our mission is to democratize access to advanced farming technology, 
              making it accessible to farmers of all scales. From disease detection 
              to market insights, we provide the tools you need to increase yields 
              and reduce risks.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="outline" className="text-center">
                    <CardContent className="p-4">
                      <stat.icon className="w-8 h-8 text-accent mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=700&fit=crop
"
                alt="Modern farming with technology"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-primary-foreground text-xl font-semibold">
                  "AgroSense AI helped me increase my yield by 40% in just one season."
                </p>
                <p className="text-primary-foreground/80 mt-2">
                  — Ramesh Singh, Wheat Farmer, Punjab
                </p>
              </div>
            </div>
            
            {/* Floating card */}
            <motion.div
              className="absolute -bottom-6 -left-6 z-10"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Card variant="elevated" className="shadow-xl">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center">
                    <Award className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Best AgriTech</p>
                    <p className="text-sm text-muted-foreground">Innovation Award 2024</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
