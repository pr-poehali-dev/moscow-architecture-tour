import { useState } from 'react';
import { CLASSICISM_OBJECTS } from '@/data/content';
import Icon from '@/components/ui/icon';

const COLOR = '#2C5F2E';
const OBJECT_LIST = Object.values(CLASSICISM_OBJECTS);
const TAB_LABELS: Record<string, string> = {
  history: 'История',
  architecture: 'Архитектура',
  facts: 'Интересные факты',
};

interface ObjectsPageProps {
  initialObject?: string;
  onNavigate?: (s: string, id?: string) => void;
}

export default function ObjectsPage({ initialObject, onNavigate }: ObjectsPageProps) {
  const [selected, setSelected] = useState<string | null>(initialObject || null);
  const [activeTab, setActiveTab] = useState<string>('history');

  const obj = selected ? CLASSICISM_OBJECTS[selected] : null;

  const handleSelect = (id: string) => {
    setSelected(id);
    setActiveTab('history');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelected(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Detail page
  if (obj) {
    const tabs = [
      { key: 'history', label: 'История' },
      { key: 'architecture', label: 'Архитектура' },
      { key: 'facts', label: 'Интересные факты' },
      ...(obj.tabs.extra ? [{ key: 'extra', label: obj.tabs.extra.title }] : []),
    ];

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 mb-8 font-sans text-sm hover:opacity-60 transition-opacity"
          style={{ color: 'var(--color-stone)' }}
        >
          <Icon name="ArrowLeft" size={14} /> Вернуться к списку объектов
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="w-10 h-1 mb-4" style={{ backgroundColor: COLOR }} />
          <p className="font-sans text-xs uppercase tracking-widest mb-2" style={{ color: COLOR }}>
            Классицизм · {obj.year}
            {obj.architect && ` · ${obj.architect}`}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl mb-2" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>{obj.name}</h1>
          <p className="font-sans text-sm" style={{ color: 'var(--color-stone)' }}>{obj.shortDesc}</p>
        </div>

        {/* Main image */}
        <div className="mb-8 overflow-hidden" style={{ maxHeight: 340 }}>
          <img
            src={obj.mainImage}
            alt={obj.name}
            className="w-full object-cover"
            style={{ maxHeight: 340 }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-8 border-b" style={{ borderColor: 'var(--color-parchment)' }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="px-4 py-3 font-sans text-sm transition-all"
              style={{
                color: activeTab === tab.key ? COLOR : 'var(--color-stone)',
                borderBottom: activeTab === tab.key ? `2px solid ${COLOR}` : '2px solid transparent',
                fontWeight: activeTab === tab.key ? '500' : '400',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'history' && (
          <TabContent tab={obj.tabs.history} colorHex={COLOR} />
        )}
        {activeTab === 'architecture' && (
          <TabContent tab={obj.tabs.architecture} colorHex={COLOR} />
        )}
        {activeTab === 'facts' && (
          <div>
            <ul className="space-y-3 mb-8">
              {obj.tabs.facts.items.map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-4" style={{ backgroundColor: 'var(--color-parchment)' }}>
                  <span className="font-serif text-lg flex-shrink-0" style={{ color: COLOR }}>{i + 1}.</span>
                  <span className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-stone)' }}>{item}</span>
                </li>
              ))}
            </ul>
            {obj.tabs.facts.images.length > 0 && (
              <ImageGallery images={obj.tabs.facts.images} />
            )}
          </div>
        )}
        {activeTab === 'extra' && obj.tabs.extra && (
          <div>
            <h2 className="font-serif text-2xl mb-5" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>{obj.tabs.extra.title}</h2>
            <p className="font-sans text-sm leading-relaxed whitespace-pre-line mb-8" style={{ color: 'var(--color-stone)' }}>
              {obj.tabs.extra.text}
            </p>
            {obj.tabs.extra.images.length > 0 && (
              <ImageGallery images={obj.tabs.extra.images} />
            )}
          </div>
        )}

        {/* Navigation between objects */}
        <div className="mt-14 pt-8 border-t flex items-center justify-between gap-4 flex-wrap" style={{ borderColor: 'var(--color-parchment)' }}>
          {OBJECT_LIST.findIndex((o) => o.id === selected) > 0 && (
            <button
              onClick={() => handleSelect(OBJECT_LIST[OBJECT_LIST.findIndex((o) => o.id === selected) - 1].id)}
              className="flex items-center gap-2 font-sans text-sm hover:opacity-70 transition-opacity"
              style={{ color: COLOR }}
            >
              <Icon name="ArrowLeft" size={14} />
              {OBJECT_LIST[OBJECT_LIST.findIndex((o) => o.id === selected) - 1].name}
            </button>
          )}
          <div className="flex-1" />
          {OBJECT_LIST.findIndex((o) => o.id === selected) < OBJECT_LIST.length - 1 && (
            <button
              onClick={() => handleSelect(OBJECT_LIST[OBJECT_LIST.findIndex((o) => o.id === selected) + 1].id)}
              className="flex items-center gap-2 font-sans text-sm hover:opacity-70 transition-opacity"
              style={{ color: COLOR }}
            >
              {OBJECT_LIST[OBJECT_LIST.findIndex((o) => o.id === selected) + 1].name}
              <Icon name="ArrowRight" size={14} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // List page
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-12">
        <div className="w-10 h-1 mb-4" style={{ backgroundColor: COLOR }} />
        <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: COLOR }}>Раздел · Объекты</p>
        <h1 className="font-serif text-5xl mb-3" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>Классицизм</h1>
        <p className="font-sans text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--color-stone)' }}>
          Пять ключевых памятников классицизма в Москве. Каждый объект — отдельная страница с вкладками: История, Архитектура, Интересные факты.
        </p>
      </div>

      <div className="space-y-4">
        {OBJECT_LIST.map((obj, i) => (
          <button
            key={obj.id}
            onClick={() => handleSelect(obj.id)}
            className="object-card w-full text-left flex flex-col sm:flex-row sm:items-center gap-5 p-6"
            style={{ backgroundColor: 'var(--color-parchment)' }}
          >
            <div
              className="flex-shrink-0 w-12 h-12 flex items-center justify-center font-serif text-xl font-light"
              style={{ backgroundColor: COLOR, color: '#F8F4EE' }}
            >
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-xs uppercase tracking-widest mb-1" style={{ color: COLOR }}>
                {obj.year}{obj.architect && ` · ${obj.architect}`}
              </p>
              <h3 className="font-serif text-xl mb-1" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>{obj.name}</h3>
              <p className="font-sans text-sm" style={{ color: 'var(--color-stone)' }}>{obj.shortDesc}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {['История', 'Архитектура', 'Факты', ...(obj.tabs.extra ? [obj.tabs.extra.title] : [])].map((label) => (
                  <span key={label} className="font-sans text-xs px-2 py-0.5" style={{ backgroundColor: COLOR + '15', color: COLOR }}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <div
                className="w-9 h-9 flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: 'var(--color-cream)' }}
              >
                <img
                  src={obj.mainImage}
                  alt={obj.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            </div>
            <Icon name="ArrowRight" size={16} style={{ color: COLOR, flexShrink: 0 }} />
          </button>
        ))}
      </div>

      {onNavigate && (
        <div className="mt-10">
          <button
            onClick={() => onNavigate('styles', 'classicism')}
            className="flex items-center gap-2 font-sans text-sm hover:opacity-70 transition-opacity"
            style={{ color: 'var(--color-stone)' }}
          >
            <Icon name="ArrowLeft" size={14} /> К странице «Классицизм»
          </button>
        </div>
      )}
    </div>
  );
}

function TabContent({ tab, colorHex }: { tab: { text: string; images: { url: string; caption?: string }[] }; colorHex: string }) {
  return (
    <div>
      <p className="font-sans text-sm leading-relaxed whitespace-pre-line mb-8" style={{ color: 'var(--color-stone)' }}>
        {tab.text}
      </p>
      {tab.images.length > 0 && <ImageGallery images={tab.images} />}
    </div>
  );
}

function ImageGallery({ images }: { images: { url: string; caption?: string }[] }) {
  return (
    <div className={`grid gap-4 ${images.length === 1 ? '' : 'sm:grid-cols-2'}`}>
      {images.map((img, i) => (
        <figure key={i} className="m-0">
          <div className="overflow-hidden" style={{ backgroundColor: 'var(--color-parchment)', maxHeight: 280 }}>
            <img
              src={img.url}
              alt={img.caption || ''}
              className="w-full object-cover"
              style={{ maxHeight: 280 }}
              onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
            />
          </div>
          {img.caption && (
            <figcaption className="font-sans text-xs mt-2 leading-snug" style={{ color: 'var(--color-stone)' }}>
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
