import { motion } from 'framer-motion';
import { 
  Leaf, 
  CloudSun, 
  IndianRupee, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ScanLine,
  Bot,
  ListTodo,
  BarChart3,
  Calendar,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

const statsCards = [
  {
    title: 'Crop Health Score',
    value: '92%',
    change: '+5% from last week',
    trend: 'up',
    icon: Leaf,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    title: 'Weather Risk',
    value: 'Low',
    change: 'Next 7 days clear',
    trend: 'stable',
    icon: CloudSun,
    color: 'text-sun',
    bgColor: 'bg-sun/10',
  },
  {
    title: 'Wheat Price (MSP)',
    value: '₹2,275',
    change: '+₹125 from last month',
    trend: 'up',
    icon: IndianRupee,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    title: 'Active Alerts',
    value: '3',
    change: '2 high priority',
    trend: 'warning',
    icon: AlertTriangle,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
  },
];

const quickActions = [
  { title: 'Scan Crop', icon: ScanLine, href: '/disease-detector', color: 'bg-accent/10 text-accent' },
  { title: 'Ask AI', icon: Bot, href: '/chatbot', color: 'bg-primary/10 text-primary' },
  { title: 'View Tasks', icon: ListTodo, href: '/todos', color: 'bg-earth/10 text-earth' },
  { title: 'Weather', icon: CloudSun, href: '/weather', color: 'bg-sun/10 text-sun' },
];

const recentScans = [
  { crop: 'Tomato', status: 'Healthy', confidence: 96, date: 'Today' },
  { crop: 'Wheat', status: 'Early Blight', confidence: 89, date: 'Yesterday' },
  { crop: 'Rice', status: 'Healthy', confidence: 94, date: '2 days ago' },
];

const upcomingTasks = [
  { task: 'Apply fertilizer to wheat field', due: 'Today', priority: 'high' },
  { task: 'Check irrigation system', due: 'Tomorrow', priority: 'medium' },
  { task: 'Harvest ripe tomatoes', due: 'Wed', priority: 'low' },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, Farmer! 👋
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your farm today.
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <Button variant="outline" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="elevated" className="h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center`}>
                        <card.icon className={`w-6 h-6 ${card.color}`} />
                      </div>
                      {card.trend === 'up' && <TrendingUp className="w-5 h-5 text-accent" />}
                      {card.trend === 'warning' && <AlertTriangle className="w-5 h-5 text-destructive" />}
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {card.value}
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">
                      {card.title}
                    </div>
                    <div className={`text-xs ${
                      card.trend === 'up' ? 'text-accent' : 
                      card.trend === 'warning' ? 'text-destructive' : 
                      'text-muted-foreground'
                    }`}>
                      {card.change}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.href}>
                  <Card variant="feature" className="text-center cursor-pointer">
                    <CardContent className="p-6">
                      <div className={`w-14 h-14 rounded-xl ${action.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                        <action.icon className="w-7 h-7" />
                      </div>
                      <p className="font-medium text-foreground">{action.title}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Scans */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-2"
            >
              <Card variant="elevated">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <ScanLine className="w-5 h-5 text-accent" />
                    Recent Crop Scans
                  </CardTitle>
                  <Link to="/disease-detector">
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentScans.map((scan, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          scan.status === 'Healthy' ? 'bg-accent/10' : 'bg-destructive/10'
                        }`}>
                          <Leaf className={`w-6 h-6 ${
                            scan.status === 'Healthy' ? 'text-accent' : 'text-destructive'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-foreground">{scan.crop}</h4>
                            <span className={`text-sm font-medium ${
                              scan.status === 'Healthy' ? 'text-accent' : 'text-destructive'
                            }`}>
                              {scan.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <Progress value={scan.confidence} className="h-2 flex-1 mr-4" />
                            <span className="text-xs text-muted-foreground">{scan.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming Tasks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card variant="elevated" className="h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <ListTodo className="w-5 h-5 text-earth" />
                    Upcoming Tasks
                  </CardTitle>
                  <Link to="/todos">
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingTasks.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          item.priority === 'high' ? 'bg-destructive' :
                          item.priority === 'medium' ? 'bg-sun' :
                          'bg-accent'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{item.task}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3" />
                            {item.due}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
