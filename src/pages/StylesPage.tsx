import { useState } from 'react';
import { STYLES_DATA } from '@/data/content';
import Icon from '@/components/ui/icon';

interface StylesPageProps {
  initialStyle?: string;
  onNavigate?: (s: string, id?: string) => void;
}

export default function StylesPage({ initialStyle, onNavigate }: StylesPageProps) {
  const [activeStyle, setActiveStyle] = useState<string>(initialStyle || '');

  if (!activeStyle) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-stone)' }}>Раздел</p>
        <h1 className="font-serif text-5xl mb-4" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>Архитектурные стили</h1>
        <p className="font-sans text-sm leading-relaxed mb-12 max-w-2xl" style={{ color: 'var(--color-stone)' }}>
          Архитектура Москвы XVIII века прошла путь от пышного барокко до строгого классицизма эпохи Просвещения. Выберите направление для изучения.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {[STYLES_DATA.baroque, STYLES_DATA.classicism].map((style) => (
            <button
              key={style.id}
              onClick={() => setActiveStyle(style.id)}
              className="route-card text-left p-10 group"
              style={{ backgroundColor: 'var(--color-parchment)' }}
            >
              <div className="w-10 h-1 mb-6" style={{ backgroundColor: style.colorHex }} />
              <div className="font-sans text-xs uppercase tracking-widest mb-2" style={{ color: style.colorHex }}>
                {style.period}
              </div>
              <h2 className="font-serif text-4xl mb-3" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>{style.title}</h2>
              <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: 'var(--color-stone)' }}>
                {style.shortDesc}
              </p>
              <div className="flex items-center gap-2" style={{ color: style.colorHex }}>
                <span className="font-sans text-xs uppercase tracking-wide">Подробнее</span>
                <Icon name="ArrowRight" size={13} />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (activeStyle === 'baroque') {
    const style = STYLES_DATA.baroque;
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <button
          onClick={() => setActiveStyle('')}
          className="flex items-center gap-2 mb-10 font-sans text-sm hover:opacity-60 transition-opacity"
          style={{ color: 'var(--color-stone)' }}
        >
          <Icon name="ArrowLeft" size={14} /> Все стили
        </button>
        <div className="mb-4" style={{ width: 40, height: 4, backgroundColor: style.colorHex }} />
        <p className="font-sans text-xs uppercase tracking-widest mb-2" style={{ color: style.colorHex }}>{style.period}</p>
        <h1 className="font-serif text-5xl mb-8" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>{style.title}</h1>

        <div className="p-8 mb-10" style={{ backgroundColor: 'var(--color-parchment)', borderLeft: `3px solid ${style.colorHex}` }}>
          <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-stone)' }}>
            {style.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div>
            <p className="font-sans text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--color-stone)' }}>Характерные признаки</p>
            <ul className="space-y-2">
              {style.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: style.colorHex }} />
                  <span className="font-sans text-sm" style={{ color: 'var(--color-stone)' }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--color-stone)' }}>Примеры в Москве</p>
            <div className="flex flex-wrap gap-2">
              {style.examples.map((ex) => (
                <span key={ex} className="font-sans text-xs px-3 py-1.5" style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-ink)', border: `1px solid ${style.colorHex}40` }}>
                  {ex}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Classicism full page
  const style = STYLES_DATA.classicism;
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
      <button
        onClick={() => setActiveStyle('')}
        className="flex items-center gap-2 mb-10 font-sans text-sm hover:opacity-60 transition-opacity"
        style={{ color: 'var(--color-stone)' }}
      >
        <Icon name="ArrowLeft" size={14} /> Все стили
      </button>
      <div className="mb-4" style={{ width: 40, height: 4, backgroundColor: style.colorHex }} />
      <p className="font-sans text-xs uppercase tracking-widest mb-2" style={{ color: style.colorHex }}>{style.period}</p>
      <h1 className="font-serif text-4xl sm:text-5xl mb-4 leading-tight" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
        Классицизм в архитектуре XVIII века
      </h1>
      <p className="font-serif text-xl italic mb-8" style={{ color: 'var(--color-stone)', fontWeight: 300 }}>
        история, особенности и развитие в России
      </p>

      <div className="flex flex-wrap gap-2 mb-12">
        {style.features.map((f) => (
          <span key={f} className="font-sans text-xs px-3 py-1.5" style={{ backgroundColor: 'var(--color-parchment)', color: 'var(--color-ink)', border: `1px solid ${style.colorHex}40` }}>
            {f}
          </span>
        ))}
      </div>

      <div className="space-y-6">
        {style.sections.map((section, idx) => (
          <SectionCard key={idx} section={section} colorHex={style.colorHex} />
        ))}
      </div>

      <div className="mt-14 p-8" style={{ backgroundColor: 'var(--color-parchment)' }}>
        <p className="font-sans text-xs uppercase tracking-widest mb-2" style={{ color: style.colorHex }}>Примеры в Москве</p>
        <p className="font-serif text-xl mb-4" style={{ color: 'var(--color-ink)' }}>Объекты классицизма</p>
        <p className="font-sans text-sm mb-6" style={{ color: 'var(--color-stone)' }}>
          {style.examples.join(' · ')}
        </p>
        {onNavigate && (
          <button
            onClick={() => onNavigate('objects', 'classicism')}
            className="flex items-center gap-2 font-sans text-sm transition-opacity hover:opacity-70"
            style={{ color: style.colorHex }}
          >
            Перейти к объектам <Icon name="ArrowRight" size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

function SectionCard({ section, colorHex }: { section: { title: string; text: string; image?: string | null }; colorHex: string }) {
  const [expanded, setExpanded] = useState(false);
  const preview = section.text.slice(0, 230);
  const hasMore = section.text.length > 230;

  return (
    <div className="p-7" style={{ backgroundColor: 'var(--color-parchment)' }}>
      <h2 className="font-serif text-2xl mb-4" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>{section.title}</h2>

      {section.image && (
        <div className="mb-5 overflow-hidden" style={{ maxHeight: 280 }}>
          <img
            src={section.image}
            alt={section.title}
            className="w-full object-cover"
            style={{ maxHeight: 280 }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      )}

      <p className="font-sans text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--color-stone)' }}>
        {expanded ? section.text : preview + (hasMore && !expanded ? '...' : '')}
      </p>

      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center gap-1 font-sans text-xs uppercase tracking-wide transition-opacity hover:opacity-70"
          style={{ color: colorHex }}
        >
          {expanded ? 'Свернуть' : 'Подробнее читать'}
          <Icon name={expanded ? 'ChevronUp' : 'ChevronDown'} size={13} />
        </button>
      )}
    </div>
  );
}
