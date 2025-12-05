import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { DiseaseDetectorPreview } from '@/components/home/DiseaseDetectorPreview';
import { WeatherPreview } from '@/components/home/WeatherPreview';
import { ChatbotPreview } from '@/components/home/ChatbotPreview';
import { TodoPreview } from '@/components/home/TodoPreview';
import { BlogPreview } from '@/components/home/BlogPreview';
import { ShopFinderPreview } from '@/components/home/ShopFinderPreview';
import { DashboardPreview } from '@/components/home/DashboardPreview';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <DiseaseDetectorPreview />
        <WeatherPreview />
        <ChatbotPreview />
        <TodoPreview />
        <BlogPreview />
        <ShopFinderPreview />
        <DashboardPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
