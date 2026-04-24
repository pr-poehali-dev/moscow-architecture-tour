import { useState } from 'react';
import { STYLES_DATA } from '@/data/content';
import Icon from '@/components/ui/icon';

interface StylesPageProps {
  initialStyle?: string;
  onNavigate?: (s: string, id?: string) => void;
}

const BAROQUE_SECTIONS = [
  {
    title: 'Формирование барокко',
    text: 'Барокко в русской архитектуре представляет собой процесс освоения западноевропейского художественного стиля, сформировавшегося вне отечественной традиции и постепенно адаптированного к местным условиям. В отличие от предыдущих этапов развития архитектуры, где формы складывались преимущественно внутри национальной культуры, барокко стало результатом восприятия уже сложившейся системы художественных приёмов и её переосмысления в русском контексте.',
    image: null,
  },
  {
    title: 'Основные характеристики барокко',
    text: 'В композиционном отношении барокко характеризуется усложнением архитектурной структуры и отказом от строгой монолитности объёмов. Здания строятся как сочетание отдельных масс, каждая из которых обладает относительной самостоятельностью. При этом элементы композиции не сливаются полностью, а соединяются, создавая сложную и живописную систему. Такое построение усиливает динамику формы и делает архитектуру более выразительной.\n\nХарактерной особенностью является сочетание единства и расчленённости. С одной стороны, здание воспринимается как целостный архитектурный организм, с другой — его части сохраняют индивидуальность и не теряют своей композиционной роли. Массы часто организуются преимущественно по горизонтали, тогда как вертикальная связность выражена слабее. Это придаёт архитектуре барокко особую пластическую напряжённость и многослойность.\n\nЗначительную роль играет декоративное оформление. Декор используется не только как украшение, но и как средство выявления структуры здания. Архитектурные элементы — карнизы, колонны, наличники и другие детали — подчёркивают членение объёма и усиливают выразительность композиции. При этом декор, заимствованный из западноевропейской традиции, перерабатывается и приобретает особенности, соответствующие русской архитектуре, что приводит к формированию своеобразного национального варианта барокко.',
    image: null,
  },
  {
    title: 'Распространение барокко в России',
    text: 'Освоение барокко происходило неравномерно и включало несколько этапов. На начальном этапе появляются отдельные постройки с элементами нового стиля, однако их распространение остаётся ограниченным. Далее следует период активного внедрения, связанный с усилением культурных контактов с Западной Европой, когда новые формы начинают использоваться шире, но ещё не становятся господствующими. Наибольшее развитие барокко получает во второй половине XVIII века, когда оно становится одним из ведущих направлений архитектуры. Впоследствии наблюдается постепенное снижение интенсивности строительства, и к первой половине XIX века стиль утрачивает своё доминирующее значение.\n\nРаспространение барокко по территории России происходило неравномерно. Наибольшее развитие стиль получил в Москве и прилегающих регионах, где существовала развитая строительная и художественная традиция. В дальнейшем барокко распространяется на другие территории, где приобретает локальные особенности, обусловленные региональными условиями и традициями.',
    image: null,
  },
];

export default function StylesPage({ initialStyle, onNavigate }: StylesPageProps) {
  const [activeStyle, setActiveStyle] = useState<string>(initialStyle || '');
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (lightbox) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.92)' }} onClick={() => setLightbox(null)}>
        <button className="absolute top-5 right-5 text-white" onClick={() => setLightbox(null)}><Icon name="X" size={28} /></button>
        <img src={lightbox} alt="" className="max-w-[90vw] max-h-[88vh] object-contain" onClick={e => e.stopPropagation()} />
      </div>
    );
  }

  // Landing: both cards visible
  if (!activeStyle) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-stone)' }}>Раздел</p>
        <h1 className="font-serif text-5xl mb-4" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>Архитектурные стили</h1>
        <p className="font-sans text-sm leading-relaxed mb-12 max-w-2xl" style={{ color: 'var(--color-stone)' }}>
          Архитектура Москвы XVIII века прошла путь от пышного барокко до строгого классицизма эпохи Просвещения. Нажмите на стиль, чтобы изучить его подробно.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {[STYLES_DATA.baroque, STYLES_DATA.classicism].map((style) => (
            <button
              key={style.id}
              onClick={() => setActiveStyle(style.id)}
              className="route-card text-left group overflow-hidden flex flex-col"
              style={{ backgroundColor: 'var(--color-parchment)' }}
            >
              <div className="w-full h-1.5" style={{ backgroundColor: style.colorHex }} />
              <div className="p-8 flex flex-col flex-1">
                <div className="font-sans text-xs uppercase tracking-widest mb-2" style={{ color: style.colorHex }}>{style.period}</div>
                <h2 className="font-serif text-4xl mb-3" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>{style.title}</h2>
                <p className="font-sans text-sm leading-relaxed mb-5 flex-1" style={{ color: 'var(--color-stone)' }}>{style.shortDesc}</p>
                <ul className="space-y-1 mb-6">
                  {style.features.slice(0, 3).map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: style.colorHex }} />
                      <span className="font-sans text-xs" style={{ color: 'var(--color-stone)' }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2" style={{ color: style.colorHex }}>
                  <span className="font-sans text-xs uppercase tracking-wide">Читать подробнее</span>
                  <Icon name="ArrowRight" size={13} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ---- Baroque ----
  if (activeStyle === 'baroque') {
    const style = STYLES_DATA.baroque;
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <button onClick={() => setActiveStyle('')} className="flex items-center gap-2 mb-10 font-sans text-sm hover:opacity-60 transition-opacity" style={{ color: 'var(--color-stone)' }}>
          <Icon name="ArrowLeft" size={14} /> Все стили
        </button>
        <div className="mb-4" style={{ width: 40, height: 4, backgroundColor: style.colorHex }} />
        <p className="font-sans text-xs uppercase tracking-widest mb-2" style={{ color: style.colorHex }}>{style.period}</p>
        <h1 className="font-serif text-5xl mb-8" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>Барокко в русской архитектуре</h1>

        <div className="p-8 mb-8" style={{ backgroundColor: 'var(--color-parchment)', borderLeft: `3px solid ${style.colorHex}` }}>
          <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-stone)' }}>{style.description}</p>
        </div>

        <div className="space-y-6 mb-10">
          {BAROQUE_SECTIONS.map((section, idx) => (
            <SectionCard key={idx} section={section} colorHex={style.colorHex} onImg={setLightbox} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
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
            <div className="flex flex-wrap gap-2 mb-6">
              {style.examples.map((ex) => (
                <span key={ex} className="font-sans text-xs px-3 py-1.5" style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-ink)', border: `1px solid ${style.colorHex}40` }}>{ex}</span>
              ))}
            </div>
            {onNavigate && (
              <button onClick={() => onNavigate('objects', 'baroque')} className="flex items-center gap-2 font-sans text-sm transition-opacity hover:opacity-70" style={{ color: style.colorHex }}>
                Перейти к объектам барокко <Icon name="ArrowRight" size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---- Classicism ----
  const style = STYLES_DATA.classicism;
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
      <button onClick={() => setActiveStyle('')} className="flex items-center gap-2 mb-10 font-sans text-sm hover:opacity-60 transition-opacity" style={{ color: 'var(--color-stone)' }}>
        <Icon name="ArrowLeft" size={14} /> Все стили
      </button>
      <div className="mb-4" style={{ width: 40, height: 4, backgroundColor: style.colorHex }} />
      <p className="font-sans text-xs uppercase tracking-widest mb-2" style={{ color: style.colorHex }}>{style.period}</p>
      <h1 className="font-serif text-4xl sm:text-5xl mb-4 leading-tight" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>Классицизм в архитектуре XVIII века</h1>
      <p className="font-serif text-xl italic mb-8" style={{ color: 'var(--color-stone)', fontWeight: 300 }}>история, особенности и развитие в России</p>
      <div className="flex flex-wrap gap-2 mb-10">
        {style.features.map((f) => (
          <span key={f} className="font-sans text-xs px-3 py-1.5" style={{ backgroundColor: 'var(--color-parchment)', color: 'var(--color-ink)', border: `1px solid ${style.colorHex}40` }}>{f}</span>
        ))}
      </div>
      <div className="space-y-6">
        {style.sections.map((section, idx) => (
          <SectionCard key={idx} section={section} colorHex={style.colorHex} onImg={setLightbox} />
        ))}
      </div>
      <div className="mt-14 p-8" style={{ backgroundColor: 'var(--color-parchment)' }}>
        <p className="font-sans text-xs uppercase tracking-widest mb-2" style={{ color: style.colorHex }}>Примеры в Москве</p>
        <p className="font-serif text-xl mb-4" style={{ color: 'var(--color-ink)' }}>Объекты классицизма</p>
        <p className="font-sans text-sm mb-6" style={{ color: 'var(--color-stone)' }}>{style.examples.join(' · ')}</p>
        {onNavigate && (
          <button onClick={() => onNavigate('objects', 'classicism')} className="flex items-center gap-2 font-sans text-sm transition-opacity hover:opacity-70" style={{ color: style.colorHex }}>
            Перейти к объектам <Icon name="ArrowRight" size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

function SectionCard({ section, colorHex, onImg }: { section: { title: string; text: string; image?: string | null }; colorHex: string; onImg: (url: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const preview = section.text.slice(0, 230);
  const hasMore = section.text.length > 230;

  return (
    <div className="p-7" style={{ backgroundColor: 'var(--color-parchment)' }}>
      <h2 className="font-serif text-2xl mb-4" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>{section.title}</h2>
      {section.image && (
        <div className="mb-5 overflow-hidden cursor-zoom-in" style={{ maxHeight: 260 }} onClick={() => onImg(section.image!)}>
          <img src={section.image} alt={section.title} className="w-full object-cover transition-transform duration-300 hover:scale-105" style={{ maxHeight: 260 }}
            onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }} />
        </div>
      )}
      <p className="font-sans text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--color-stone)' }}>
        {expanded ? section.text : preview + (hasMore && !expanded ? '...' : '')}
      </p>
      {hasMore && (
        <button onClick={() => setExpanded(!expanded)} className="mt-3 flex items-center gap-1 font-sans text-xs uppercase tracking-wide transition-opacity hover:opacity-70" style={{ color: colorHex }}>
          {expanded ? 'Свернуть' : 'Читать полностью'}
          <Icon name={expanded ? 'ChevronUp' : 'ChevronDown'} size={13} />
        </button>
      )}
    </div>
  );
}
