import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import RoutesPage from '@/pages/RoutesPage';
import ObjectsPage from '@/pages/ObjectsPage';
import StylesPage from '@/pages/StylesPage';
import MapPage from '@/pages/MapPage';
import AboutPage from '@/pages/AboutPage';
export default function Index() {
  const [section, setSection] = useState('home');
  const [subId, setSubId] = useState<string | undefined>(undefined);

  const handleNavigate = (s: string, id?: string) => {
    setSection(s);
    setSubId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (section) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'routes':
        return <RoutesPage initialRoute={subId} onNavigate={handleNavigate} />;
      case 'objects':
        return <ObjectsPage initialObject={subId} onNavigate={handleNavigate} />;
      case 'styles':
        return <StylesPage initialStyle={subId} onNavigate={handleNavigate} />;
      case 'map':
        return <MapPage />;
      case 'bibliography':
      case 'about':
      case 'team':
        return <AboutPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-cream)' }}>
      <Navbar current={section} onNavigate={handleNavigate} />
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}