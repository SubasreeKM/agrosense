import { motion } from 'framer-motion';
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  Thermometer, 
  Sun, 
  CloudRain,
  Cloud,
  Gauge,
  Sunrise,
  Sunset,
  AlertTriangle,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { AppNavbar } from '@/components/layout/AppNavbar';
import { AppFooter } from '@/components/layout/AppFooter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const weekForecast = [
  { day: 'Mon', date: '2', icon: Sun, high: 32, low: 22, condition: 'Sunny', rain: 0 },
  { day: 'Tue', date: '3', icon: CloudSun, high: 30, low: 21, condition: 'Partly Cloudy', rain: 10 },
  { day: 'Wed', date: '4', icon: CloudSun, high: 29, low: 20, condition: 'Partly Cloudy', rain: 15 },
  { day: 'Thu', date: '5', icon: CloudRain, high: 26, low: 19, condition: 'Rainy', rain: 80 },
  { day: 'Fri', date: '6', icon: CloudRain, high: 24, low: 18, condition: 'Heavy Rain', rain: 90 },
  { day: 'Sat', date: '7', icon: Cloud, high: 27, low: 19, condition: 'Cloudy', rain: 40 },
  { day: 'Sun', date: '8', icon: Sun, high: 31, low: 21, condition: 'Sunny', rain: 5 },
];

const hourlyForecast = [
  { time: '6 AM', temp: 22, icon: Sunrise },
  { time: '9 AM', temp: 26, icon: Sun },
  { time: '12 PM', temp: 31, icon: Sun },
  { time: '3 PM', temp: 32, icon: Sun },
  { time: '6 PM', temp: 28, icon: Sunset },
  { time: '9 PM', temp: 24, icon: Cloud },
];

const farmingInsights = [
  { 
    title: 'Irrigation', 
    recommendation: 'Skip watering today - sufficient soil moisture',
    status: 'good',
    icon: Droplets,
  },
  { 
    title: 'Fertilizer Application', 
    recommendation: 'Ideal conditions - low wind, no rain expected',
    status: 'good',
    icon: CheckCircle2,
  },
  { 
    title: 'Pest Risk', 
    recommendation: 'Medium risk - high humidity may increase fungal activity',
    status: 'warning',
    icon: AlertTriangle,
  },
  { 
    title: 'Spraying', 
    recommendation: 'Good conditions until Thursday - plan accordingly',
    status: 'good',
    icon: Wind,
  },
];

export default function Weather() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppNavbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sun/10 text-sun text-sm font-medium mb-4">
              <CloudSun className="w-4 h-4" />
              Weather Forecast
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Agricultural Weather Insights
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" />
              Farmville, Punjab, India
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <Card variant="elevated" className="overflow-hidden">
                <div className="gradient-sun p-8 text-sun-foreground">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <p className="text-sun-foreground/70 mb-2">Today, December 2</p>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-7xl font-bold">32°C</span>
                        <Sun className="w-24 h-24 text-sun-foreground/80" />
                      </div>
                      <p className="text-2xl font-medium mb-2">Sunny & Clear</p>
                      <p className="text-sun-foreground/70">
                        Feels like 35°C - Perfect for outdoor farming activities
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-sun-foreground/10 backdrop-blur-sm text-center">
                        <Thermometer className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm opacity-70">High / Low</p>
                        <p className="text-xl font-semibold">32° / 22°</p>
                      </div>
                      <div className="p-4 rounded-xl bg-sun-foreground/10 backdrop-blur-sm text-center">
                        <Droplets className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm opacity-70">Humidity</p>
                        <p className="text-xl font-semibold">45%</p>
                      </div>
                      <div className="p-4 rounded-xl bg-sun-foreground/10 backdrop-blur-sm text-center">
                        <Wind className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm opacity-70">Wind Speed</p>
                        <p className="text-xl font-semibold">12 km/h</p>
                      </div>
                      <div className="p-4 rounded-xl bg-sun-foreground/10 backdrop-blur-sm text-center">
                        <Gauge className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm opacity-70">Pressure</p>
                        <p className="text-xl font-semibold">1013 hPa</p>
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-4">Today's Hourly Forecast</h4>
                  <div className="flex justify-between overflow-x-auto gap-4 pb-2">
                    {hourlyForecast.map((hour, i) => (
                      <div key={i} className="flex-1 min-w-[80px] text-center p-3 rounded-xl hover:bg-muted transition-colors">
                        <p className="text-sm text-muted-foreground mb-2">{hour.time}</p>
                        <hour.icon className="w-8 h-8 mx-auto mb-2 text-sun" />
                        <p className="text-lg font-semibold text-foreground">{hour.temp}°</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle>7-Day Forecast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {weekForecast.map((day, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                            i === 0 ? 'bg-accent/10 border border-accent/20' : 'hover:bg-muted/50'
                          }`}
                        >
                          <div className="w-16 text-center">
                            <p className="font-semibold text-foreground">{day.day}</p>
                            <p className="text-sm text-muted-foreground">Dec {day.date}</p>
                          </div>
                          <day.icon className={`w-10 h-10 ${
                            day.condition.includes('Rain') ? 'text-blue-500' : 'text-sun'
                          }`} />
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{day.condition}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Droplets className="w-4 h-4 text-blue-500" />
                              <span className="text-sm text-muted-foreground">{day.rain}% rain</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-foreground">{day.high}°</p>
                            <p className="text-sm text-muted-foreground">{day.low}°</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card variant="elevated" className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Thermometer className="w-5 h-5 text-accent" />
                      Farming Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {farmingInsights.map((insight, i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-xl ${
                          insight.status === 'warning' ? 'bg-sun/10' : 'bg-accent/10'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <insight.icon className={`w-5 h-5 ${
                            insight.status === 'warning' ? 'text-sun' : 'text-accent'
                          }`} />
                          <span className="font-medium text-foreground">{insight.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
