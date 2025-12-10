import { motion } from 'framer-motion';
import { CloudSun, Droplets, Wind, Thermometer, Sun, CloudRain, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const weekForecast = [
  { day: 'Mon', icon: Sun, temp: 32, condition: 'Sunny' },
  { day: 'Tue', icon: CloudSun, temp: 30, condition: 'Partly Cloudy' },
  { day: 'Wed', icon: CloudSun, temp: 29, condition: 'Partly Cloudy' },
  { day: 'Thu', icon: CloudRain, temp: 26, condition: 'Rain' },
  { day: 'Fri', icon: CloudRain, temp: 24, condition: 'Heavy Rain' },
  { day: 'Sat', icon: CloudSun, temp: 27, condition: 'Partly Cloudy' },
  { day: 'Sun', icon: Sun, temp: 31, condition: 'Sunny' },
];

const insights = [
  { icon: Droplets, label: 'Irrigation', value: 'Skip Today', status: 'good' },
  { icon: AlertTriangle, label: 'Pest Risk', value: 'Medium', status: 'warning' },
  { icon: Wind, label: 'Spray Conditions', value: 'Ideal', status: 'good' },
];

export function WeatherPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sun/10 text-sun text-sm font-medium mb-4">
            <CloudSun className="w-4 h-4" />
            Weather Forecast
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Agricultural Weather Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get 7-day forecasts with smart farming recommendations 
            for irrigation, pest management, and more.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Current Weather */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card variant="elevated" className="overflow-hidden h-full">
                <div className="gradient-sun p-6 text-sun-foreground">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sun-foreground/70 mb-1">Today's Weather</p>
                      <h3 className="text-4xl font-bold">32°C</h3>
                      <p className="text-lg">Sunny & Clear</p>
                    </div>
                    <Sun className="w-20 h-20 text-sun-foreground/80" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-3 rounded-lg bg-sun-foreground/10">
                      <Thermometer className="w-5 h-5 mx-auto mb-1" />
                      <p className="text-xs opacity-70">Feels Like</p>
                      <p className="font-semibold">35°C</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-sun-foreground/10">
                      <Droplets className="w-5 h-5 mx-auto mb-1" />
                      <p className="text-xs opacity-70">Humidity</p>
                      <p className="font-semibold">45%</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-sun-foreground/10">
                      <Wind className="w-5 h-5 mx-auto mb-1" />
                      <p className="text-xs opacity-70">Wind</p>
                      <p className="font-semibold">12 km/h</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-4">7-Day Forecast</h4>
                  <div className="flex justify-between overflow-x-auto gap-2">
                    {weekForecast.map((day, i) => (
                      <div
                        key={i}
                        className={`flex-1 min-w-[60px] text-center p-3 rounded-xl transition-colors ${
                          i === 0 ? 'bg-accent/10 border border-accent/20' : 'hover:bg-muted'
                        }`}
                      >
                        <p className="text-xs text-muted-foreground mb-2">{day.day}</p>
                        <day.icon className={`w-6 h-6 mx-auto mb-2 ${i === 0 ? 'text-accent' : 'text-muted-foreground'}`} />
                        <p className="font-semibold text-foreground">{day.temp}°</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Agricultural Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card variant="elevated" className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Farming Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {insights.map((insight, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-4 p-4 rounded-xl ${
                        insight.status === 'warning' ? 'bg-sun/10' : 'bg-accent/10'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        insight.status === 'warning' ? 'bg-sun/20' : 'bg-accent/20'
                      }`}>
                        <insight.icon className={`w-5 h-5 ${
                          insight.status === 'warning' ? 'text-sun' : 'text-accent'
                        }`} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{insight.label}</p>
                        <p className={`font-semibold ${
                          insight.status === 'warning' ? 'text-sun' : 'text-accent'
                        }`}>
                          {insight.value}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Link to="/weather" className="block">
                    <Button variant="outline" className="w-full mt-4">
                      View Full Forecast
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
