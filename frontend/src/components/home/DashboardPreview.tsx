import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Leaf, 
  CloudSun, 
  IndianRupee,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const dashboardCards = [
  {
    title: 'Crop Health',
    value: '92%',
    change: '+5%',
    trend: 'up',
    icon: Leaf,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    status: 'Excellent',
  },
  {
    title: 'Weather Risk',
    value: 'Low',
    change: 'Stable',
    trend: 'stable',
    icon: CloudSun,
    color: 'text-sun',
    bgColor: 'bg-sun/10',
    status: 'Clear Skies',
  },
  {
    title: 'Wheat Price',
    value: '₹2,450',
    change: '+3.2%',
    trend: 'up',
    icon: IndianRupee,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    status: 'Per Quintal',
  },
  {
    title: 'Alerts',
    value: '2',
    change: 'Active',
    trend: 'warning',
    icon: AlertTriangle,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    status: 'Requires Attention',
  },
];

const alerts = [
  { type: 'warning', message: 'Pest activity detected in north field', icon: AlertTriangle },
  { type: 'info', message: 'Optimal harvest window for tomatoes: 3 days', icon: CheckCircle2 },
];

export function DashboardPreview() {
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
            <BarChart3 className="w-4 h-4" />
            AI Dashboard
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            All Insights at a Glance
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get a comprehensive overview of your farm's health, market conditions, 
            and AI-powered recommendations.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {dashboardCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="elevated" className="h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl ${card.bgColor} flex items-center justify-center`}>
                        <card.icon className={`w-5 h-5 ${card.color}`} />
                      </div>
                      <div className={`flex items-center gap-1 text-xs font-medium ${
                        card.trend === 'up' ? 'text-accent' : 
                        card.trend === 'warning' ? 'text-destructive' : 
                        'text-muted-foreground'
                      }`}>
                        {card.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                        {card.trend === 'warning' && <AlertTriangle className="w-3 h-3" />}
                        {card.change}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {card.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {card.title}
                    </div>
                    <div className={`text-xs mt-2 ${card.color}`}>
                      {card.status}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Alerts Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Card variant="elevated">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  Active Alerts & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-4 rounded-xl ${
                        alert.type === 'warning' ? 'bg-destructive/10' : 'bg-accent/10'
                      }`}
                    >
                      <alert.icon className={`w-5 h-5 flex-shrink-0 ${
                        alert.type === 'warning' ? 'text-destructive' : 'text-accent'
                      }`} />
                      <p className="text-sm text-foreground flex-1">{alert.message}</p>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link to="/dashboard">
                    <Button variant="hero" size="lg">
                      View Full Dashboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
