import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import RoutesPage from '@/pages/RoutesPage';
import ObjectsPage from '@/pages/ObjectsPage';
import StylesPage from '@/pages/StylesPage';
import MapPage from '@/pages/MapPage';
import AboutPage from '@/pages/AboutPage';

type Section = 'home' | 'routes' | 'objects' | 'styles' | 'map' | 'about' | 'team' | 'bibliography';

export default function Index() {
  const [section, setSection] = useState<Section>('home');
  const [routeId, setRouteId] = useState<string | undefined>(undefined);
  const [objectId, setObjectId] = useState<string | undefined>(undefined);

  const handleNavigate = (s: string, id?: string) => {
    setSection(s as Section);
    if (s === 'routes') setRouteId(id);
    if (s === 'objects') setObjectId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (section) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'routes':
        return <RoutesPage initialRoute={routeId} onNavigate={handleNavigate} />;
      case 'objects':
        return <ObjectsPage initialObject={objectId} />;
      case 'styles':
        return <StylesPage />;
      case 'map':
        return <MapPage />;
      case 'about':
      case 'team':
      case 'bibliography':
        return <AboutPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-cream)' }}>
      <Navbar current={section} onNavigate={(s) => handleNavigate(s)} />
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>
      <Footer onNavigate={(s) => handleNavigate(s)} />
    </div>
  );
}
