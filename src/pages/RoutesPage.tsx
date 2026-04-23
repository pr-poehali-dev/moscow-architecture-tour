import { useState } from 'react';
import { ROUTES, OBJECTS } from '@/data/content';
import Icon from '@/components/ui/icon';

const ROUTE_IMAGES: Record<string, string> = {
  baroque: 'https://cdn.poehali.dev/projects/50bc11a2-6b27-48fd-a01b-ed2f06393134/files/df05052e-3102-41d9-bd5d-3b308f8419de.jpg',
  'mature-baroque': 'https://cdn.poehali.dev/projects/50bc11a2-6b27-48fd-a01b-ed2f06393134/files/df05052e-3102-41d9-bd5d-3b308f8419de.jpg',
  classicism: 'https://cdn.poehali.dev/projects/50bc11a2-6b27-48fd-a01b-ed2f06393134/files/22fbcfef-cad2-4979-8175-034e4517407e.jpg',
};

const ROUTE_NARRATIONS: Record<string, string[]> = {
  baroque: [
    'Наш маршрут начинается у Чистых прудов — туда, где высится стройная Меншикова башня. Этот нарядный храм, возведённый по заказу всесильного фаворита Петра I, открывает историю московского барокко. Обратите внимание на белокаменный декор, столь нетипичный для старой Москвы — это уже новая, петровская архитектура.',
    'Далее мы направляемся к месту, где когда-то стояла Сухарева башня — грандиозное сооружение, объединявшее функции крепостных ворот, учебного заведения и обсерватории. Её снос в 1930-х годах стал одной из самых болезненных утрат московского наследия.',
    'Маршрут завершается в Филях — предместье Москвы, где сохранилась церковь Покрова, давшая название целому архитектурному стилю. Идеальная ярусная композиция, нарядные наличники, красно-белая гамма — перед вами квинтэссенция нарышкинского барокко.',
  ],
  'mature-baroque': [
    'Маршрут стартует в Замоскворечье — купеческом сердце старой Москвы. Здесь возвышается церковь Климента Папы Римского — монументальный собор с пышным декором, строившийся несколько десятилетий на средства прихожан-купцов.',
    'Затем мы отправляемся в Донской монастырь — место особой исторической памяти. Стены монастыря хранят фрагменты снесённых московских храмов, а сам ансамбль демонстрирует эволюцию барокко от нарышкинских форм к зрелым.',
    'Финальная часть маршрута — загородные усадьбы. Кусково и Останкино — это Москва аристократическая, Москва роскошных праздников и крепостных театров. Здесь барокко обрело истинное величие.',
  ],
  classicism: [
    'Маршрут открывается одним из самых красивых видов Москвы: Дом Пашкова на холме, с классическим бельведером и колоннами — напротив Кремля. Это зрелище не менялось более двухсот лет.',
    'В Кремле нас ждёт Сенатский дворец Казакова — строгий и величественный, с огромным куполом. Здание воплощает идеалы Просвещения: разум, порядок, закон.',
    'Маршрут завершается на юге Москвы — в Царицыне. Этот ансамбль уникален: в нём столкнулись два художника и две эпохи — романтическая готика Баженова и строгий классицизм Казакова.',
  ],
};

interface RoutesPageProps {
  initialRoute?: string;
  onNavigate: (s: string, routeId?: string) => void;
}

export default function RoutesPage({ initialRoute, onNavigate }: RoutesPageProps) {
  const [activeRoute, setActiveRoute] = useState(initialRoute || ROUTES[0].id);
  const route = ROUTES.find((r) => r.id === activeRoute) || ROUTES[0];
  const narrations = ROUTE_NARRATIONS[route.id] || [];
  const objects = route.objects.map((id) => OBJECTS[id]).filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Route tabs */}
      <div className="flex flex-wrap gap-2 mb-12">
        {ROUTES.map((r) => (
          <button
            key={r.id}
            onClick={() => { setActiveRoute(r.id); window.scrollTo({ top: 0 }); }}
            className="px-5 py-2 font-sans text-sm tracking-wide transition-all duration-200"
            style={{
              backgroundColor: activeRoute === r.id ? r.colorHex : 'var(--color-parchment)',
              color: activeRoute === r.id ? '#F8F4EE' : 'var(--color-ink)',
              fontWeight: activeRoute === r.id ? '500' : '400',
            }}
          >
            {r.title}
          </button>
        ))}
      </div>

      {/* Route header */}
      <div className="grid md:grid-cols-2 gap-10 mb-16 items-start">
        <div>
          <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: route.colorHex }}>
            Маршрут · {route.subtitle}
          </p>
          <h1 className="font-serif text-5xl mb-4" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
            {route.title}
          </h1>
          <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: 'var(--color-stone)' }}>
            {route.description}
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={14} style={{ color: route.colorHex }} />
              <span className="font-sans text-xs" style={{ color: 'var(--color-stone)' }}>{route.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={14} style={{ color: route.colorHex }} />
              <span className="font-sans text-xs" style={{ color: 'var(--color-stone)' }}>{objects.length} объектов</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Footprints" size={14} fallback="Navigation" style={{ color: route.colorHex }} />
              <span className="font-sans text-xs" style={{ color: 'var(--color-stone)' }}>Пешеходный маршрут</span>
            </div>
          </div>
        </div>
        <div
          className="rounded-sm overflow-hidden"
          style={{ height: 280, backgroundColor: 'var(--color-parchment)' }}
        >
          <img
            src={ROUTE_IMAGES[route.id]}
            alt={route.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Narration */}
      <div className="mb-16">
        <div className="ornament mb-10">
          <span className="font-serif text-sm italic" style={{ color: 'var(--color-stone)' }}>Рассказ экскурсовода</span>
        </div>
        <div className="space-y-8">
          {narrations.map((text, i) => (
            <div key={i} className="flex gap-6">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-serif text-sm font-light"
                style={{ backgroundColor: route.colorHex, color: '#F8F4EE', marginTop: 2 }}
              >
                {i + 1}
              </div>
              <p className="font-sans text-sm leading-relaxed pt-1" style={{ color: 'var(--color-stone)' }}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Objects list */}
      <div>
        <div className="ornament mb-10">
          <span className="font-serif text-sm italic" style={{ color: 'var(--color-stone)' }}>Объекты маршрута</span>
        </div>
        <div className="space-y-4">
          {objects.map((obj, i) => (
            <div
              key={obj.id}
              className="object-card p-6 flex flex-col sm:flex-row sm:items-start gap-4 cursor-pointer"
              style={{ backgroundColor: 'var(--color-parchment)' }}
              onClick={() => onNavigate('objects', obj.id)}
            >
              <div
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center font-serif text-lg font-light"
                style={{ backgroundColor: route.colorHex, color: '#F8F4EE' }}
              >
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h3 className="font-serif text-xl" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
                    {obj.name}
                  </h3>
                  {obj.lost && (
                    <span className="font-sans text-xs px-2 py-0.5" style={{ backgroundColor: '#7A7268', color: '#F8F4EE' }}>
                      Утрачен
                    </span>
                  )}
                </div>
                <p className="font-sans text-xs mb-2" style={{ color: route.colorHex }}>
                  {obj.year} · {obj.style}
                  {obj.architect && ` · ${obj.architect}`}
                </p>
                <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-stone)' }}>
                  {obj.description.slice(0, 180)}...
                </p>
              </div>
              <Icon name="ArrowRight" size={16} style={{ color: route.colorHex, flexShrink: 0, marginTop: 4 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
