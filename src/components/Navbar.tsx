import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';

type Section = string;

interface NavbarProps {
  current: Section;
  onNavigate: (s: Section, id?: string) => void;
}

export default function Navbar({ current, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stylesOpen, setStylesOpen] = useState(false);
  const [objectsOpen, setObjectsOpen] = useState(false);
  const stylesRef = useRef<HTMLDivElement>(null);
  const objectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (stylesRef.current && !stylesRef.current.contains(e.target as Node)) setStylesOpen(false);
      if (objectsRef.current && !objectsRef.current.contains(e.target as Node)) setObjectsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleNav = (s: Section, id?: string) => {
    onNavigate(s, id);
    setMenuOpen(false);
    setStylesOpen(false);
    setObjectsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--color-cream)', borderColor: 'var(--color-parchment)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <button onClick={() => handleNav('home')} className="flex items-center gap-2">
            <span className="font-serif text-lg font-medium tracking-wide" style={{ color: 'var(--color-rouge)' }}>Москва XVIII</span>
            <span className="hidden sm:inline font-sans text-xs uppercase tracking-widest" style={{ color: 'var(--color-stone)' }}>· Экскурсия</span>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {/* Стили dropdown */}
            <div ref={stylesRef} className="relative">
              <button
                onClick={() => { setStylesOpen(!stylesOpen); setObjectsOpen(false); }}
                className="flex items-center gap-1 nav-link font-sans text-sm"
                style={{ color: current === 'styles' ? 'var(--color-rouge)' : 'var(--color-ink)', fontWeight: current === 'styles' ? '500' : '400' }}
              >
                Стили
                <Icon name="ChevronDown" size={13} style={{ transition: 'transform 0.2s', transform: stylesOpen ? 'rotate(180deg)' : '' }} />
              </button>
              {stylesOpen && (
                <div className="absolute top-full left-0 mt-1 py-1 min-w-[160px] shadow-md" style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-parchment)' }}>
                  <button onClick={() => handleNav('styles', 'baroque')} className="w-full text-left px-4 py-2.5 font-sans text-sm transition-colors" style={{ color: '#8B1A1A' }}
                    onMouseEnter={e => (e.target as HTMLElement).style.backgroundColor = 'var(--color-parchment)'}
                    onMouseLeave={e => (e.target as HTMLElement).style.backgroundColor = ''}
                  >Барокко</button>
                  <button onClick={() => handleNav('styles', 'classicism')} className="w-full text-left px-4 py-2.5 font-sans text-sm transition-colors" style={{ color: '#2C5F2E' }}
                    onMouseEnter={e => (e.target as HTMLElement).style.backgroundColor = 'var(--color-parchment)'}
                    onMouseLeave={e => (e.target as HTMLElement).style.backgroundColor = ''}
                  >Классицизм</button>
                </div>
              )}
            </div>

            {/* Объекты dropdown */}
            <div ref={objectsRef} className="relative">
              <button
                onClick={() => { setObjectsOpen(!objectsOpen); setStylesOpen(false); }}
                className="flex items-center gap-1 nav-link font-sans text-sm"
                style={{ color: current === 'objects' ? 'var(--color-rouge)' : 'var(--color-ink)', fontWeight: current === 'objects' ? '500' : '400' }}
              >
                Объекты
                <Icon name="ChevronDown" size={13} style={{ transition: 'transform 0.2s', transform: objectsOpen ? 'rotate(180deg)' : '' }} />
              </button>
              {objectsOpen && (
                <div className="absolute top-full left-0 mt-1 py-1 min-w-[210px] shadow-md" style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-parchment)' }}>
                  <div className="px-4 pt-2 pb-1 font-sans text-xs uppercase tracking-widest" style={{ color: 'var(--color-stone)' }}>Классицизм</div>
                  {[
                    { id: 'pashkov', name: 'Дом Пашкова' },
                    { id: 'senatskiy', name: 'Сенатский дворец' },
                    { id: 'golitsynskaya', name: 'Голицынская больница' },
                    { id: 'tsaritsyno', name: 'Царицыно' },
                    { id: 'vospitatelny', name: 'Воспитательный дом' },
                  ].map((o) => (
                    <button key={o.id} onClick={() => handleNav('objects', o.id)}
                      className="w-full text-left px-4 py-2 font-sans text-sm transition-colors" style={{ color: 'var(--color-ink)' }}
                      onMouseEnter={e => (e.target as HTMLElement).style.backgroundColor = 'var(--color-parchment)'}
                      onMouseLeave={e => (e.target as HTMLElement).style.backgroundColor = ''}
                    >{o.name}</button>
                  ))}
                </div>
              )}
            </div>

            {[
              { id: 'routes', label: 'Маршруты' },
              { id: 'map', label: 'Карта' },
              { id: 'about', label: 'О проекте' },
            ].map((item) => (
              <button key={item.id} onClick={() => handleNav(item.id)} className="nav-link font-sans text-sm"
                style={{ color: current === item.id ? 'var(--color-rouge)' : 'var(--color-ink)', fontWeight: current === item.id ? '500' : '400' }}>
                {item.label}
              </button>
            ))}
          </nav>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={20} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t py-4 flex flex-col gap-1" style={{ borderColor: 'var(--color-parchment)' }}>
            <div className="px-3 py-1 font-sans text-xs uppercase tracking-widest" style={{ color: 'var(--color-stone)' }}>Стили</div>
            <button onClick={() => handleNav('styles', 'baroque')} className="text-left px-5 py-2 font-sans text-sm" style={{ color: '#8B1A1A' }}>Барокко</button>
            <button onClick={() => handleNav('styles', 'classicism')} className="text-left px-5 py-2 font-sans text-sm" style={{ color: '#2C5F2E' }}>Классицизм</button>
            <div className="px-3 py-1 font-sans text-xs uppercase tracking-widest mt-2" style={{ color: 'var(--color-stone)' }}>Объекты · Классицизм</div>
            {[
              { id: 'pashkov', name: 'Дом Пашкова' },
              { id: 'senatskiy', name: 'Сенатский дворец' },
              { id: 'golitsynskaya', name: 'Голицынская больница' },
              { id: 'tsaritsyno', name: 'Царицыно' },
              { id: 'vospitatelny', name: 'Воспитательный дом' },
            ].map((o) => (
              <button key={o.id} onClick={() => handleNav('objects', o.id)} className="text-left px-5 py-2 font-sans text-sm" style={{ color: 'var(--color-ink)' }}>{o.name}</button>
            ))}
            <div className="h-px my-2" style={{ backgroundColor: 'var(--color-parchment)' }} />
            {[
              { id: 'routes', label: 'Маршруты' },
              { id: 'map', label: 'Карта' },
              { id: 'about', label: 'О проекте' },
            ].map((item) => (
              <button key={item.id} onClick={() => handleNav(item.id)} className="text-left px-5 py-2 font-sans text-sm" style={{ color: 'var(--color-ink)' }}>{item.label}</button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}