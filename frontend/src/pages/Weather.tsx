import { useEffect, useState } from "react";
import {
  CloudSun,
  Droplets,
  Wind,
  Gauge,
  MapPin,
} from "lucide-react";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { AppFooter } from "@/components/layout/AppFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OPENWEATHER_KEY = "8168d1810e1e58c05eee5479cd659784";

interface HourData {
  time: string;
  temp: number;
  icon: string;
}

interface DayData {
  date: string;
  condition: string;
  max: number;
  min: number;
}

export default function Weather() {
  const [city, setCity] = useState("Ludhiana");
  const [current, setCurrent] = useState<any>(null);
  const [hourly, setHourly] = useState<HourData[]>([]);
  const [weekly, setWeekly] = useState<DayData[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  
const [rainChance, setRainChance] = useState<number>(0);
const [heatRisk, setHeatRisk] = useState<string>("");
const [spraySafe, setSpraySafe] = useState<boolean>(true);

const [showLiveCard, setShowLiveCard] = useState<boolean>(false);

const [liveCoords, setLiveCoords] = useState<{
  lat: number;
  lon: number;
} | null>(null);

const [liveCity, setLiveCity] = useState<string>(""); // for live location only

  async function fetchWeather(targetCity: string) {
    try {
      // CURRENT WEATHER
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${targetCity}&units=metric&appid=${OPENWEATHER_KEY}`
      );
      const currentData = await currentRes.json();
      if (!currentData.coord) return alert("City not found");

      // FORECAST
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${targetCity}&units=metric&appid=${OPENWEATHER_KEY}`
      );
      const forecastData = await forecastRes.json();

      // NASA POWER
      const lat = currentData.coord.lat;
      const lon = currentData.coord.lon;
      const today = new Date();
      const end = today.toISOString().slice(0, 10).replace(/-/g, "");
      const start = new Date(today.setDate(today.getDate() - 6))
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");

      const nasaRes = await fetch(
        `https://power.larc.nasa.gov/api/temporal/daily/point?latitude=${lat}&longitude=${lon}&parameters=T2M,RH2M,PRECTOT&start=${start}&end=${end}&community=AG&format=JSON`
      );
      const nasaData = await nasaRes.json();

      setCurrent(currentData);

      // HOURLY
      setHourly(
        forecastData.list.slice(0, 8).map((h: any) => ({
          time: new Date(h.dt_txt).getHours() + ":00",
          temp: Math.round(h.main.temp),
          icon: h.weather[0].icon,
        }))
      );
      // ✅ FREE 7-DAY FORECAST (Open-Meteo)
const weeklyRes = await fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
);

const weeklyData = await weeklyRes.json();

setWeekly(
  weeklyData.daily.time.slice(0, 7).map((date: string, i: number) => ({
    date: new Date(date).toDateString(),
    condition: weatherCodeToText(weeklyData.daily.weathercode[i]),
    max: Math.round(weeklyData.daily.temperature_2m_max[i]),
    min: Math.round(weeklyData.daily.temperature_2m_min[i]),
  }))
);



      // INSIGHTS
      const rain: number =
  Object.values(
    nasaData?.properties?.parameter?.PRECTOT || {}
  ).reduce<number>((a, b) => a + Number(b), 0);

      if (!currentData) return;

setInsights([
  currentData.main.temp >= 18 && currentData.main.temp <= 32
    ? "🌾 Optimal temperature for crops"
    : "⚠️ Temperature stress risk",

  rain > 10
    ? "💧 Rainfall sufficient – irrigation not needed"
    : "🚿 Low rainfall – irrigation advised",

  currentData.main.humidity > 60
    ? "🌱 Good soil moisture"
    : "🌵 Dry soil – monitor moisture",

  currentData.wind.speed < 10
    ? "🚜 Safe for spraying"
    : "❌ Avoid spraying due to wind",
]);// RAIN PROBABILITY (from forecast)
const rainCount = forecastData.list.filter(
  (i: any) => i.weather[0].main.toLowerCase().includes("rain")
).length;
setRainChance(Math.round((rainCount / forecastData.list.length) * 100));

// 🌡 ADVANCED HEAT STRESS INDEX (Temp + Humidity)
const temp = currentData.main.temp;
const humidity = currentData.main.humidity;

if (temp >= 40 || (temp >= 36 && humidity > 70)) {
  setHeatRisk("🔥 Severe heat stress – avoid field activity, irrigate immediately");
} else if (temp >= 34 || (temp >= 30 && humidity > 65)) {
  setHeatRisk("🌡 Moderate heat stress – irrigation & shade advised");
} else if (temp >= 28 && humidity > 60) {
  setHeatRisk("⚠️ Mild heat stress – monitor crops");
} else {
  setHeatRisk("✅ No heat stress detected");
}


// 🚜 ADVANCED SPRAY SAFETY CHECK
const wind = currentData.wind.speed;
const humidity2 = currentData.main.humidity;
const rainExpected = rainChance > 30;

if (wind > 15 || rainExpected) {
  setSpraySafe(false);
} else if (wind > 10 || humidity2 > 85) {
  setSpraySafe(false);
} else {
  setSpraySafe(true);
}


    } catch (err) {
      console.error(err);
      alert("Weather fetch failed");
    }
    
  }
function getLiveLocation() {
  setShowLiveCard(true);

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const { latitude, longitude } = pos.coords;

      setLiveCoords({
        lat: latitude,
        lon: longitude,
      });

      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${OPENWEATHER_KEY}`
      );
      const geo = await geoRes.json();

      if (geo[0]?.name) {
        setLiveCity(geo[0].name); // only update liveCity
        fetchWeather(geo[0].name); // fetch data for live card
      }
    },
    () => alert("Location permission denied")
  );
}


  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <>
      <AppNavbar />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-10">

        <h1 className="text-4xl font-bold text-center">
          🌤 Agricultural Weather Insights
        </h1>
        <p className="text-center text-green-600 mt-2 flex justify-center gap-2">
          <MapPin size={18} /> {city}
        </p>
{/* SEARCH */}
<div className="flex justify-center mt-6 gap-2">
  <input
    value={city}
    onChange={(e) => setCity(e.target.value)}
    className="px-4 py-2 border rounded-l-lg w-72"
    placeholder="Search city"
  />

  <button
    onClick={() => fetchWeather(city)}
    className="bg-green-600 text-white px-6 rounded-r-lg"
  >
    Search
  </button>

  <button
    type="button"
    onClick={getLiveLocation}
    className="bg-green-100 px-4 rounded-lg"
  >
    📍 Live
  </button>
</div>
{/* LIVE LOCATION CARD */}
{showLiveCard && (
  <div className="mt-8 max-w-sm mx-auto bg-white rounded-2xl p-6 shadow-lg text-center animate-fade-in">
    <h3 className="text-xl font-bold mb-2">
      📍 Your Current Location
    </h3>

    <p className="text-green-700 text-lg">
      {liveCity || "Fetching..."}
    </p>

    {liveCoords && (
      <p className="text-gray-500 text-sm mt-1">
        Lat: {liveCoords.lat.toFixed(4)} | Lon: {liveCoords.lon.toFixed(4)}
      </p>
    )}

    <button
      type="button"
      onClick={getLiveLocation}
      className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition"
    >
      Refresh Location
    </button>
  </div>
)}
{/* TODAY */}
{current && (
  <Card className="mt-10 bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg rounded-xl">
    <CardContent className="p-8 grid md:grid-cols-3 gap-8">

      {/* LEFT – TEMPERATURE */}
      <div>
        <p className="uppercase text-sm opacity-80 tracking-wide">
          Current Weather
        </p>

        <h2 className="text-6xl font-bold flex items-center gap-3 mt-2">
          <CloudSun size={42} />
          {Math.round(current.main.temp)}°C
        </h2>

        <p className="capitalize text-lg mt-1">
          {current.weather[0].description}
        </p>

        <p className="text-sm opacity-90">
          Feels like {current.main.feels_like.toFixed(1)}°C
        </p>
      </div>

      {/* CENTER – ATMOSPHERE */}
      <div className="space-y-3">
        <div className="flex justify-between border border-white/30 rounded-lg p-3">
          <span className="flex gap-2 items-center">
            <Droplets size={18} /> Humidity
          </span>
          <span className="font-semibold">
            {current.main.humidity}%
          </span>
        </div>

        <div className="flex justify-between border border-white/30 rounded-lg p-3">
          <span className="flex gap-2 items-center">
            <Wind size={18} /> Wind
          </span>
          <span className="font-semibold">
            {current.wind.speed} km/h
          </span>
        </div>

        <div className="flex justify-between border border-white/30 rounded-lg p-3">
          <span className="flex gap-2 items-center">
            <Gauge size={18} /> Pressure
          </span>
          <span className="font-semibold">
            {current.main.pressure} hPa
          </span>
        </div>
      </div>

      {/* RIGHT – RANGE */}
      <div className="space-y-3">
        <div className="flex justify-between border border-white/30 rounded-lg p-3">
          <span>High</span>
          <span className="font-semibold">
            {current.main.temp_max.toFixed(1)}°
          </span>
        </div>

        <div className="flex justify-between border border-white/30 rounded-lg p-3">
          <span>Low</span>
          <span className="font-semibold">
            {current.main.temp_min.toFixed(1)}°
          </span>
        </div>
      </div>

    </CardContent>
  </Card>
)}

        {/* QUICK WEATHER STATS */}
<div className="grid md:grid-cols-3 gap-6 mt-8">
  <Card>
    <CardHeader>
      <CardTitle>🌧 Rain Probability</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold">{rainChance}%</p>
      <p className="text-sm text-gray-600">
        Chance of rainfall in next 24 hours
      </p>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>🌡 Heat Stress Index</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="font-semibold">{heatRisk}</p>
      <p className="text-sm text-gray-600 mt-1">
        Based on temperature & humidity
      </p>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>🚜 Spray Safety</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">
        {spraySafe ? "✅ Safe" : "❌ Unsafe"}
      </p>
      <p className="text-sm text-gray-600">
        Wind-based spraying recommendation
      </p>
    </CardContent>
  </Card>
</div>


        {/* HOURLY */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>⏰ Hourly Forecast</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-6 overflow-x-auto">
            {hourly.map((h, i) => (
              <div key={i} className="text-center min-w-[90px]">
                <p>{h.time}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${h.icon}@2x.png`}
                />
                <p className="font-bold">{h.temp}°C</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* WEEKLY + INSIGHTS */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>📅 7-Day Forecast</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {weekly.map((d, i) => (
                  <div key={i} className="flex justify-between bg-green-50 p-3 rounded">
                    <span>{d.date}</span>
                    <span>{d.condition}</span>
                    <span>{d.max}° / {d.min}°</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>🌱 Smart Farming Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {insights.map((i, idx) => (
                <div key={idx} className="bg-green-50 p-3 rounded">
                  {i}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
</div>
      <AppFooter />
    </>
  );
}
function weatherCodeToText(code: number): string {
  const map: Record<number, string> = {
    0: "Clear",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Cloudy",
    45: "Fog",
    48: "Fog",
    51: "Drizzle",
    61: "Rain",
    71: "Snow",
    80: "Rain Showers",
    95: "Thunderstorm",
  };

  return map[code] || "Unknown";
}
