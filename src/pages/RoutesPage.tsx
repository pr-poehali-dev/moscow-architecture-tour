import { useState } from 'react';
import { DETAILED_ROUTES } from '@/data/content';
import Icon from '@/components/ui/icon';

interface RoutesPageProps {
  initialRoute?: string;
  onNavigate: (s: string, id?: string) => void;
}

export default function RoutesPage({ initialRoute, onNavigate }: RoutesPageProps) {
  const defaultId = initialRoute && DETAILED_ROUTES.find(r => r.id === initialRoute)
    ? initialRoute
    : DETAILED_ROUTES[0].id;
  const [activeId, setActiveId] = useState(defaultId);
  const route = DETAILED_ROUTES.find(r => r.id === activeId) || DETAILED_ROUTES[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Route selector tabs */}
      <div className="flex gap-2 mb-10 flex-wrap">
        {DETAILED_ROUTES.map(r => (
          <button
            key={r.id}
            onClick={() => setActiveId(r.id)}
            className="px-5 py-2.5 font-sans text-sm tracking-wide transition-all duration-200"
            style={{
              backgroundColor: activeId === r.id ? r.colorHex : 'var(--color-parchment)',
              color: activeId === r.id ? '#F8F4EE' : 'var(--color-ink)',
              fontWeight: activeId === r.id ? '500' : '400',
            }}
          >
            {r.title} · {r.subtitle}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="w-10 h-1 mb-4" style={{ backgroundColor: route.colorHex }} />
        <p className="font-sans text-xs uppercase tracking-widest mb-2" style={{ color: route.colorHex }}>
          {route.title}
        </p>
        <h1 className="font-serif text-5xl mb-3" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
          {route.subtitle}
        </h1>
        <p className="font-sans text-sm leading-relaxed italic mb-6 max-w-2xl" style={{ color: 'var(--color-stone)' }}>
          {route.styleDescription}
        </p>

        {/* Duration + map link */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 px-4 py-2" style={{ backgroundColor: 'var(--color-parchment)' }}>
            <Icon name="Bus" size={14} style={{ color: route.colorHex }} />
            <span className="font-sans text-xs" style={{ color: 'var(--color-stone)' }}>На транспорте:</span>
            <span className="font-sans text-sm font-medium" style={{ color: 'var(--color-ink)' }}>{route.durationTransit}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2" style={{ backgroundColor: 'var(--color-parchment)' }}>
            <Icon name="Footprints" fallback="Navigation" size={14} style={{ color: route.colorHex }} />
            <span className="font-sans text-xs" style={{ color: 'var(--color-stone)' }}>Пешком:</span>
            <span className="font-sans text-sm font-medium" style={{ color: 'var(--color-ink)' }}>{route.durationWalk}</span>
          </div>
          <a
            href={route.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 font-sans text-sm transition-opacity hover:opacity-80"
            style={{ backgroundColor: route.colorHex, color: '#F8F4EE' }}
          >
            <Icon name="Map" size={14} />
            Открыть маршрут на Яндекс Картах
            <Icon name="ExternalLink" size={12} />
          </a>
        </div>
      </div>

      {/* Stops timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-5 top-0 bottom-0 w-0.5"
          style={{ backgroundColor: route.colorHex + '30' }}
        />

        <div className="space-y-0">
          {route.stops.map((stop, i) => (
            <div key={stop.num}>
              {/* Stop card */}
              <div className="flex gap-6 relative">
                {/* Number dot */}
                <div className="flex-shrink-0 relative z-10">
                  <div
                    className="w-10 h-10 flex items-center justify-center font-serif text-base font-light"
                    style={{ backgroundColor: route.colorHex, color: '#F8F4EE' }}
                  >
                    {stop.num}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-0 pt-1">
                  <div className="p-6 mb-0" style={{ backgroundColor: 'var(--color-parchment)' }}>
                    <p className="font-sans text-xs uppercase tracking-widest mb-1" style={{ color: route.colorHex }}>
                      {stop.styleNote}
                      {stop.address && ` · ${stop.address}`}
                    </p>
                    <h2 className="font-serif text-2xl mb-3" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
                      {stop.name}
                    </h2>
                    <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-stone)' }}>
                      {stop.historicalNote}
                    </p>
                  </div>
                </div>
              </div>

              {/* Transit arrow between stops */}
              {stop.transit && i < route.stops.length - 1 && (
                <div className="flex gap-6 my-3">
                  <div className="flex-shrink-0 w-10 flex justify-center">
                    <div className="w-0.5 h-full" style={{ backgroundColor: route.colorHex + '30' }} />
                  </div>
                  <div className="flex-1">
                    <div
                      className="flex items-start gap-3 px-5 py-3"
                      style={{ backgroundColor: route.colorHex + '0D', border: `1px dashed ${route.colorHex}40` }}
                    >
                      <Icon name="ArrowDown" size={14} style={{ color: route.colorHex, flexShrink: 0, marginTop: 1 }} />
                      <p className="font-sans text-xs leading-relaxed" style={{ color: 'var(--color-stone)' }}>
                        {stop.transit}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Spacing between stop + transit block */}
              {i < route.stops.length - 1 && <div className="h-4" />}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-14 p-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between" style={{ backgroundColor: 'var(--color-parchment)' }}>
        <div>
          <p className="font-sans text-xs uppercase tracking-widest mb-1" style={{ color: route.colorHex }}>Готов к маршруту?</p>
          <p className="font-serif text-xl" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
            Открыть маршрут на карте
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <a
            href={route.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 font-sans text-sm transition-opacity hover:opacity-80"
            style={{ backgroundColor: route.colorHex, color: '#F8F4EE' }}
          >
            <Icon name="Map" size={15} />
            Яндекс Карты
          </a>
          <button
            onClick={() => onNavigate('map')}
            className="flex items-center gap-2 px-6 py-3 font-sans text-sm transition-opacity hover:opacity-80"
            style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-ink)', border: '1px solid var(--color-stone)' }}
          >
            <Icon name="MapPin" size={15} />
            Карта сайта
          </button>
        </div>
      </div>

      {/* Switch to other route */}
      <div className="mt-6 text-center">
        {DETAILED_ROUTES.filter(r => r.id !== activeId).map(other => (
          <button
            key={other.id}
            onClick={() => { setActiveId(other.id); window.scrollTo({ top: 0 }); }}
            className="font-sans text-sm flex items-center gap-1 mx-auto hover:opacity-70 transition-opacity"
            style={{ color: 'var(--color-stone)' }}
          >
            Посмотреть {other.title}: {other.subtitle} <Icon name="ArrowRight" size={13} />
          </button>
        ))}
      </div>
    </div>
  );
}
