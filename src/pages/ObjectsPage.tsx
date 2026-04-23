import { useState } from 'react';
import { OBJECTS, ROUTES } from '@/data/content';
import Icon from '@/components/ui/icon';

const STYLE_COLORS: Record<string, string> = {
  baroque: '#8B1A1A',
  'mature-baroque': '#1C3557',
  classicism: '#2C5F2E',
};

interface ObjectsPageProps {
  initialObject?: string;
}

export default function ObjectsPage({ initialObject }: ObjectsPageProps) {
  const [selected, setSelected] = useState<string | null>(initialObject || null);
  const [filter, setFilter] = useState<string>('all');

  const allObjects = Object.values(OBJECTS);
  const filtered = filter === 'all' ? allObjects : allObjects.filter((o) => o.styleId === filter);
  const selectedObj = selected ? OBJECTS[selected] : null;

  if (selectedObj) {
    const color = STYLE_COLORS[selectedObj.styleId] || '#8B1A1A';
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 mb-8 font-sans text-sm transition-opacity hover:opacity-70"
          style={{ color: 'var(--color-stone)' }}
        >
          <Icon name="ArrowLeft" size={14} />
          Все объекты
        </button>

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <p className="font-sans text-xs uppercase tracking-widest" style={{ color }}>
              {selectedObj.style}
            </p>
            {selectedObj.lost && (
              <span className="font-sans text-xs px-2 py-0.5" style={{ backgroundColor: '#7A7268', color: '#F8F4EE' }}>
                Утрачен
              </span>
            )}
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl mb-3" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
            {selectedObj.name}
          </h1>
          <p className="font-sans text-sm" style={{ color: 'var(--color-stone)' }}>
            {selectedObj.year}
            {selectedObj.architect && ` · Архитектор: ${selectedObj.architect}`}
          </p>
        </div>

        <div
          className="w-full rounded-sm flex items-center justify-center mb-10"
          style={{ height: 280, backgroundColor: 'var(--color-parchment)', border: '1px dashed var(--color-stone)' }}
        >
          <div className="text-center">
            <div className="text-4xl mb-2">🏛️</div>
            <p className="font-sans text-xs" style={{ color: 'var(--color-stone)' }}>Иллюстрация</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-serif text-2xl mb-4" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
            Описание
          </h2>
          <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-stone)' }}>
            {selectedObj.description}
          </p>
        </div>

        <div
          className="p-6 rounded-sm"
          style={{ backgroundColor: 'var(--color-parchment)', borderLeft: `3px solid ${color}` }}
        >
          <p className="font-sans text-xs uppercase tracking-widest mb-2" style={{ color }}>
            Интересный факт
          </p>
          <p className="font-serif text-lg italic leading-relaxed" style={{ color: 'var(--color-ink)', fontWeight: 300 }}>
            «{selectedObj.fact}»
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-12">
        <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-stone)' }}>
          Каталог
        </p>
        <h1 className="font-serif text-5xl mb-2" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
          Объекты экскурсии
        </h1>
        <p className="font-sans text-sm" style={{ color: 'var(--color-stone)' }}>
          15 памятников архитектуры Москвы XVIII века
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setFilter('all')}
          className="px-4 py-1.5 font-sans text-xs tracking-wide transition-all"
          style={{
            backgroundColor: filter === 'all' ? 'var(--color-ink)' : 'var(--color-parchment)',
            color: filter === 'all' ? '#F8F4EE' : 'var(--color-ink)',
          }}
        >
          Все ({allObjects.length})
        </button>
        {ROUTES.map((r) => (
          <button
            key={r.id}
            onClick={() => setFilter(r.id)}
            className="px-4 py-1.5 font-sans text-xs tracking-wide transition-all"
            style={{
              backgroundColor: filter === r.id ? r.colorHex : 'var(--color-parchment)',
              color: filter === r.id ? '#F8F4EE' : 'var(--color-ink)',
            }}
          >
            {r.title} ({allObjects.filter((o) => o.styleId === r.id).length})
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((obj) => {
          const color = STYLE_COLORS[obj.styleId] || '#8B1A1A';
          return (
            <button
              key={obj.id}
              onClick={() => { setSelected(obj.id); window.scrollTo({ top: 0 }); }}
              className="object-card text-left p-6 flex flex-col"
              style={{ backgroundColor: 'var(--color-parchment)' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-8 h-1 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {obj.lost && (
                  <span className="font-sans text-xs px-2 py-0.5" style={{ backgroundColor: '#7A7268', color: '#F8F4EE' }}>
                    Утрачен
                  </span>
                )}
              </div>
              <h3 className="font-serif text-xl mb-1 leading-tight" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
                {obj.name}
              </h3>
              <p className="font-sans text-xs mb-3" style={{ color }}>
                {obj.year}
              </p>
              <p className="font-sans text-xs leading-relaxed flex-1 mb-4" style={{ color: 'var(--color-stone)' }}>
                {obj.description.slice(0, 100)}...
              </p>
              <div className="flex items-center gap-1" style={{ color }}>
                <span className="font-sans text-xs">Подробнее</span>
                <Icon name="ArrowRight" size={12} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
