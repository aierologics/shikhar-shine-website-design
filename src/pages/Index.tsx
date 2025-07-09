
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import NoticeBoardSection from '@/components/NoticeBoardSection';
import AchievementsSection from '@/components/AchievementsSection';
import SchoolLifeSection from '@/components/SchoolLifeSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <div className="space-y-0">
        <NoticeBoardSection />
        <AchievementsSection />
        <SchoolLifeSection />
        <FacilitiesSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
