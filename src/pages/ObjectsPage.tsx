import { useState } from 'react';
import { CLASSICISM_OBJECTS, BAROQUE_OBJECTS } from '@/data/content';
import Icon from '@/components/ui/icon';

const CLASSICISM_COLOR = '#3d2c7e';
const BAROQUE_COLOR = '#8B1A1A';

const CLASSICISM_LIST = Object.values(CLASSICISM_OBJECTS);
const BAROQUE_LIST = Object.values(BAROQUE_OBJECTS);

interface ObjectsPageProps {
  initialObject?: string;
  onNavigate?: (s: string, id?: string) => void;
}

export default function ObjectsPage({ initialObject, onNavigate }: ObjectsPageProps) {
  const [selected, setSelected] = useState<string | null>(initialObject || null);
  const [activeStyle, setActiveStyle] = useState<'classicism' | 'baroque'>(
    BAROQUE_OBJECTS[initialObject || ''] ? 'baroque' : 'classicism'
  );
  const [activeTab, setActiveTab] = useState<string>('history');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const COLOR = activeStyle === 'classicism' ? CLASSICISM_COLOR : BAROQUE_COLOR;
  const objMap = activeStyle === 'classicism' ? CLASSICISM_OBJECTS : BAROQUE_OBJECTS;
  const currentList = activeStyle === 'classicism' ? CLASSICISM_LIST : BAROQUE_LIST;
  const obj = selected ? objMap[selected] : null;

  const handleSelect = (id: string) => {
    setSelected(id);
    setActiveTab('history');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelected(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStyleSwitch = (style: 'classicism' | 'baroque') => {
    setActiveStyle(style);
    setSelected(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lightbox
  if (lightbox) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
        onClick={() => setLightbox(null)}
      >
        <button className="absolute top-5 right-5 text-white" onClick={() => setLightbox(null)}>
          <Icon name="X" size={28} />
        </button>
        <img
          src={lightbox}
          alt=""
          className="max-w-[90vw] max-h-[88vh] object-contain"
          onClick={e => e.stopPropagation()}
        />
      </div>
    );
  }

  // Detail page
  if (obj) {
    const tabs = [
      { key: 'history', label: 'История' },
      { key: 'architecture', label: 'Архитектура' },
      { key: 'facts', label: 'Интересные факты' },
      ...(obj.tabs.extra ? [{ key: 'extra', label: obj.tabs.extra.title }] : []),
    ];
    const idx = currentList.findIndex(o => o.id === selected);

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <button onClick={handleBack} className="flex items-center gap-2 mb-8 font-sans text-sm hover:opacity-60 transition-opacity" style={{ color: 'var(--color-stone)' }}>
          <Icon name="ArrowLeft" size={14} /> Вернуться к списку
        </button>

        {/* Main image — always on top */}
        <div
          className="mb-6 overflow-hidden cursor-zoom-in"
          style={{ maxHeight: 360 }}
          onClick={() => setLightbox(obj.mainImage)}
        >
          <img
            src={obj.mainImage}
            alt={obj.name}
            className="w-full object-cover transition-transform duration-300 hover:scale-105"
            style={{ maxHeight: 360 }}
            onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
          />
        </div>

        {/* Header */}
        <div className="mb-6">
          <div className="w-10 h-1 mb-3" style={{ backgroundColor: COLOR }} />
          <p className="font-sans text-xs uppercase tracking-widest mb-1" style={{ color: COLOR }}>
            {activeStyle === 'classicism' ? 'Классицизм' : 'Барокко'} · {obj.year}
            {obj.architect && ` · ${obj.architect}`}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl mb-2" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>{obj.name}</h1>
          <p className="font-sans text-sm" style={{ color: 'var(--color-stone)' }}>{obj.shortDesc}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-8 border-b flex-wrap" style={{ borderColor: 'var(--color-parchment)' }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="px-4 py-3 font-sans text-sm transition-all whitespace-nowrap"
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
        {activeTab === 'history' && <TabContent tab={obj.tabs.history} onImg={setLightbox} />}
        {activeTab === 'architecture' && <TabContent tab={obj.tabs.architecture} onImg={setLightbox} />}
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
            {obj.tabs.facts.images.length > 0 && <ImageGallery images={obj.tabs.facts.images} onImg={setLightbox} />}
          </div>
        )}
        {activeTab === 'extra' && obj.tabs.extra && (
          <div>
            <h2 className="font-serif text-2xl mb-5" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>{obj.tabs.extra.title}</h2>
            <p className="font-sans text-sm leading-relaxed whitespace-pre-line mb-8" style={{ color: 'var(--color-stone)' }}>{obj.tabs.extra.text}</p>
            {obj.tabs.extra.images.length > 0 && <ImageGallery images={obj.tabs.extra.images} onImg={setLightbox} />}
          </div>
        )}

        {/* Prev/next */}
        <div className="mt-14 pt-8 border-t flex items-center justify-between gap-4 flex-wrap" style={{ borderColor: 'var(--color-parchment)' }}>
          {idx > 0 && (
            <button onClick={() => handleSelect(currentList[idx - 1].id)} className="flex items-center gap-2 font-sans text-sm hover:opacity-70 transition-opacity" style={{ color: COLOR }}>
              <Icon name="ArrowLeft" size={14} />{currentList[idx - 1].name}
            </button>
          )}
          <div className="flex-1" />
          {idx < currentList.length - 1 && (
            <button onClick={() => handleSelect(currentList[idx + 1].id)} className="flex items-center gap-2 font-sans text-sm hover:opacity-70 transition-opacity" style={{ color: COLOR }}>
              {currentList[idx + 1].name}<Icon name="ArrowRight" size={14} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Grid page
  const allObjects = activeStyle === 'classicism' ? CLASSICISM_LIST : BAROQUE_LIST;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <div className="w-10 h-1 mb-4" style={{ backgroundColor: COLOR }} />
        <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-stone)' }}>Раздел · Объекты</p>
        <h1 className="font-serif text-5xl mb-3" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>Памятники архитектуры</h1>
        <p className="font-sans text-sm leading-relaxed max-w-2xl mb-8" style={{ color: 'var(--color-stone)' }}>
          Выберите стиль и нажмите на объект — откроется подробная страница с вкладками История, Архитектура и Интересные факты.
        </p>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handleStyleSwitch('baroque')}
            className="px-5 py-2.5 font-sans text-sm transition-all"
            style={{
              backgroundColor: activeStyle === 'baroque' ? BAROQUE_COLOR : 'var(--color-parchment)',
              color: activeStyle === 'baroque' ? '#F8F4EE' : 'var(--color-ink)',
            }}
          >
            Маршрут №1 · Барокко
          </button>
          <button
            onClick={() => handleStyleSwitch('classicism')}
            className="px-5 py-2.5 font-sans text-sm transition-all"
            style={{
              backgroundColor: activeStyle === 'classicism' ? CLASSICISM_COLOR : 'var(--color-parchment)',
              color: activeStyle === 'classicism' ? '#F8F4EE' : 'var(--color-ink)',
            }}
          >
            Маршрут №2 · Классицизм
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {allObjects.map((o) => (
          <button
            key={o.id}
            onClick={() => handleSelect(o.id)}
            className="object-card text-left flex flex-col group"
            style={{ backgroundColor: 'var(--color-parchment)' }}
          >
            <div className="w-full overflow-hidden flex-shrink-0" style={{ height: 200 }}>
              <img
                src={o.mainImage}
                alt={o.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.backgroundColor = 'var(--color-cream)'; }}
              />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <p className="font-sans text-xs uppercase tracking-widest mb-1" style={{ color: COLOR }}>{o.year}</p>
              <h3 className="font-serif text-xl mb-2 leading-tight" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>{o.name}</h3>
              <p className="font-sans text-xs leading-relaxed mb-3 flex-1" style={{ color: 'var(--color-stone)' }}>{o.shortDesc}</p>
              <div className="flex items-center gap-1" style={{ color: COLOR }}>
                <span className="font-sans text-xs uppercase tracking-wide">Подробнее</span>
                <Icon name="ArrowRight" size={12} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TabContent({ tab, onImg }: { tab: { text: string; images: { url: string; caption?: string }[] }; onImg: (url: string) => void }) {
  return (
    <div>
      <p className="font-sans text-sm leading-relaxed whitespace-pre-line mb-8" style={{ color: 'var(--color-stone)' }}>{tab.text}</p>
      {tab.images.length > 0 && <ImageGallery images={tab.images} onImg={onImg} />}
    </div>
  );
}

function ImageGallery({ images, onImg }: { images: { url: string; caption?: string }[]; onImg: (url: string) => void }) {
  return (
    <div className={`grid gap-4 ${images.length === 1 ? '' : 'sm:grid-cols-2'}`}>
      {images.map((img, i) => (
        <figure key={i} className="m-0">
          <div
            className="overflow-hidden cursor-zoom-in"
            style={{ backgroundColor: 'var(--color-parchment)', maxHeight: 280 }}
            onClick={() => onImg(img.url)}
          >
            <img
              src={img.url}
              alt={img.caption || ''}
              className="w-full object-cover transition-transform duration-300 hover:scale-105"
              style={{ maxHeight: 280 }}
              onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
            />
          </div>
          {img.caption && (
            <figcaption className="font-sans text-xs mt-2 leading-snug" style={{ color: 'var(--color-stone)' }}>{img.caption}</figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
