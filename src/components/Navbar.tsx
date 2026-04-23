import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Section = 'home' | 'routes' | 'objects' | 'styles' | 'map' | 'about' | 'team' | 'bibliography';

interface NavbarProps {
  current: Section;
  onNavigate: (s: Section) => void;
}

const NAV_ITEMS: { id: Section; label: string }[] = [
  { id: 'home', label: 'Главная' },
  { id: 'routes', label: 'Маршруты' },
  { id: 'objects', label: 'Объекты' },
  { id: 'styles', label: 'Стили' },
  { id: 'map', label: 'Карта' },
  { id: 'about', label: 'О проекте' },
];

export default function Navbar({ current, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (s: Section) => {
    onNavigate(s);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-cream border-b border-parchment" style={{ backgroundColor: 'var(--color-cream)', borderColor: 'var(--color-parchment)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 group"
          >
            <span className="text-lg font-serif font-medium tracking-wide" style={{ color: 'var(--color-rouge)' }}>
              Москва XVIII
            </span>
            <span className="text-xs font-sans uppercase tracking-widest" style={{ color: 'var(--color-stone)' }}>
              · Экскурсия
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`nav-link text-sm font-sans tracking-wide transition-colors ${
                  current === item.id
                    ? 'active'
                    : ''
                }`}
                style={{
                  color: current === item.id ? 'var(--color-rouge)' : 'var(--color-ink)',
                  fontWeight: current === item.id ? '500' : '400',
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <Icon name={menuOpen ? 'X' : 'Menu'} size={20} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t py-4 flex flex-col gap-3" style={{ borderColor: 'var(--color-parchment)' }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="text-left px-2 py-1 text-sm font-sans"
                style={{ color: current === item.id ? 'var(--color-rouge)' : 'var(--color-ink)' }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
