import { HomeNavbar } from '@/components/layout/HomeNavbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HomeNavbar />
      <main>
        <HeroSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
