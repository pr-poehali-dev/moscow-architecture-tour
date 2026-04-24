import { useState } from 'react';
import { MAP_POINTS, MapPoint } from '@/data/content';
import Icon from '@/components/ui/icon';

const BAROQUE_COLOR = '#8B1A1A';
const CLASSICISM_COLOR = '#2C5F2E';

// Moscow bounding box for SVG projection
// lat: 55.60 – 55.78, lng: 37.48 – 37.72
const LAT_MIN = 55.60;
const LAT_MAX = 55.78;
const LNG_MIN = 37.48;
const LNG_MAX = 37.72;
const SVG_W = 800;
const SVG_H = 520;

function lngToX(lng: number) {
  return ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * SVG_W;
}
function latToY(lat: number) {
  return ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * SVG_H;
}

const ROUTE_ORDER: Record<string, string[]> = {
  baroque: ['menshikov', 'petrovskiy', 'troyekurov', 'kliment', 'novodevichiy', 'pokrovka'],
  classicism: ['pashkov', 'senatskiy', 'vospitatelny', 'golitsynskaya', 'tsaritsyno'],
};

export default function MapPage() {
  const [hovered, setHovered] = useState<MapPoint | null>(null);
  const [selected, setSelected] = useState<MapPoint | null>(null);
  const [filter, setFilter] = useState<'all' | 'classicism' | 'baroque'>('all');

  const visible = MAP_POINTS.filter(p => filter === 'all' || p.routeId === filter);

  const baroquePoints = MAP_POINTS.filter(p => p.routeId === 'baroque');
  const classicismPoints = MAP_POINTS.filter(p => p.routeId === 'classicism');

  const getPolylinePoints = (ids: string[]) =>
    ids
      .map(id => MAP_POINTS.find(p => p.id === id))
      .filter(Boolean)
      .map(p => `${lngToX(p!.lng)},${latToY(p!.lat)}`)
      .join(' ');

  const active = hovered || selected;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="w-10 h-1 mb-4" style={{ backgroundColor: 'var(--color-rouge)' }} />
        <p className="font-sans text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-stone)' }}>Навигация</p>
        <h1 className="font-serif text-5xl mb-3" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>Интерактивная карта</h1>
        <p className="font-sans text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--color-stone)' }}>
          Все объекты двух маршрутов на карте Москвы. Наводите на точку — появится краткая сводка. Нажмите — чтобы закрепить.
        </p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {([['all', 'Все объекты', '#444'], ['baroque', 'Маршрут №2 · Барокко', BAROQUE_COLOR], ['classicism', 'Маршрут №1 · Классицизм', CLASSICISM_COLOR]] as const).map(([val, label, color]) => (
          <button
            key={val}
            onClick={() => setFilter(val)}
            className="px-4 py-2 font-sans text-xs uppercase tracking-wide transition-all"
            style={{
              backgroundColor: filter === val ? color : 'var(--color-parchment)',
              color: filter === val ? '#F8F4EE' : 'var(--color-ink)',
              border: `1px solid ${filter === val ? color : 'transparent'}`,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Main layout */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* SVG Map */}
        <div className="lg:col-span-2">
          <div
            className="relative w-full overflow-hidden"
            style={{ backgroundColor: '#f0ede6', border: '1px solid var(--color-parchment)', paddingBottom: '65%' }}
          >
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              className="absolute inset-0 w-full h-full"
              style={{ cursor: 'default' }}
            >
              {/* Background texture */}
              <rect width={SVG_W} height={SVG_H} fill="#EDE8DF" />

              {/* Moscow River approximate path */}
              <path
                d="M 50 310 Q 150 340 220 320 Q 300 300 380 290 Q 450 285 520 300 Q 580 315 630 310 Q 680 305 720 295 Q 760 285 800 280"
                fill="none"
                stroke="#B8D4E8"
                strokeWidth="18"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d="M 50 310 Q 150 340 220 320 Q 300 300 380 290 Q 450 285 520 300 Q 580 315 630 310 Q 680 305 720 295 Q 760 285 800 280"
                fill="none"
                stroke="#C8DCF0"
                strokeWidth="12"
                strokeLinecap="round"
                opacity="0.5"
              />
              {/* River label */}
              <text x="390" y="278" fontFamily="Georgia, serif" fontSize="9" fill="#7aaec8" opacity="0.8" textAnchor="middle">Москва-река</text>

              {/* Grid lines (streets) */}
              {[100, 200, 300, 400, 500, 600, 700].map(x => (
                <line key={x} x1={x} y1={0} x2={x} y2={SVG_H} stroke="#DDD8CF" strokeWidth="0.5" />
              ))}
              {[100, 200, 300, 400].map(y => (
                <line key={y} x1={0} y1={y} x2={SVG_W} y2={y} stroke="#DDD8CF" strokeWidth="0.5" />
              ))}

              {/* Route polylines */}
              {(filter === 'all' || filter === 'baroque') && (
                <polyline
                  points={getPolylinePoints(ROUTE_ORDER.baroque)}
                  fill="none"
                  stroke={BAROQUE_COLOR}
                  strokeWidth="2"
                  strokeDasharray="6,4"
                  opacity="0.45"
                />
              )}
              {(filter === 'all' || filter === 'classicism') && (
                <polyline
                  points={getPolylinePoints(ROUTE_ORDER.classicism)}
                  fill="none"
                  stroke={CLASSICISM_COLOR}
                  strokeWidth="2"
                  strokeDasharray="6,4"
                  opacity="0.45"
                />
              )}

              {/* Points */}
              {visible.map(p => {
                const x = lngToX(p.lng);
                const y = latToY(p.lat);
                const isActive = active?.id === p.id;
                const color = p.routeId === 'baroque' ? BAROQUE_COLOR : CLASSICISM_COLOR;
                return (
                  <g
                    key={p.id}
                    onMouseEnter={() => setHovered(p)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setSelected(selected?.id === p.id ? null : p)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Pulse ring on active */}
                    {isActive && (
                      <circle cx={x} cy={y} r="18" fill={color} opacity="0.15" />
                    )}
                    <circle
                      cx={x} cy={y} r={isActive ? 9 : 7}
                      fill={color}
                      stroke="#F8F4EE"
                      strokeWidth={isActive ? 2.5 : 1.5}
                      style={{ transition: 'r 0.15s' }}
                    />
                    {/* Route number */}
                    <text
                      x={x} y={y + 4}
                      textAnchor="middle"
                      fontFamily="Georgia, serif"
                      fontSize="8"
                      fill="#F8F4EE"
                      style={{ pointerEvents: 'none', userSelect: 'none' }}
                    >
                      {(p.routeId === 'baroque' ? ROUTE_ORDER.baroque : ROUTE_ORDER.classicism).indexOf(p.id) + 1}
                    </text>
                    {/* Label */}
                    {isActive && (
                      <text
                        x={x}
                        y={y - 14}
                        textAnchor="middle"
                        fontFamily="Georgia, serif"
                        fontSize="10"
                        fill={color}
                        fontWeight="600"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {p.name.length > 22 ? p.name.slice(0, 20) + '…' : p.name}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Compass */}
              <text x="770" y="30" fontSize="20" fill="#9A9590" textAnchor="middle">↑</text>
              <text x="770" y="48" fontFamily="Georgia, serif" fontSize="10" fill="#9A9590" textAnchor="middle">С</text>
            </svg>

            {/* Tooltip overlay */}
            {active && (
              <div
                className="absolute top-3 left-3 p-4 max-w-xs shadow-lg pointer-events-none"
                style={{ backgroundColor: 'rgba(248,244,238,0.97)', border: `2px solid ${active.colorHex}` }}
              >
                <p className="font-sans text-xs uppercase tracking-widest mb-1" style={{ color: active.colorHex }}>
                  {active.routeId === 'baroque' ? 'Маршрут №2 · Барокко' : 'Маршрут №1 · Классицизм'}
                  {active.year && ` · ${active.year}`}
                </p>
                <p className="font-serif text-base mb-2" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>{active.name}</p>
                <p className="font-sans text-xs leading-snug mb-1" style={{ color: 'var(--color-stone)' }}>{active.shortDesc}</p>
                <p className="font-sans text-xs" style={{ color: active.colorHex }}>{active.address}</p>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: BAROQUE_COLOR }} />
              <span className="font-sans text-xs" style={{ color: 'var(--color-stone)' }}>Барокко (маршрут №2)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CLASSICISM_COLOR }} />
              <span className="font-sans text-xs" style={{ color: 'var(--color-stone)' }}>Классицизм (маршрут №1)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 border-t-2 border-dashed" style={{ borderColor: '#888' }} />
              <span className="font-sans text-xs" style={{ color: 'var(--color-stone)' }}>Маршрут</span>
            </div>
          </div>
        </div>

        {/* Right panel: point list */}
        <div className="space-y-1 max-h-[540px] overflow-y-auto pr-1">
          <p className="font-sans text-xs uppercase tracking-widest mb-3 sticky top-0 py-1" style={{ color: 'var(--color-stone)', backgroundColor: 'var(--color-cream)' }}>
            {visible.length} объектов
          </p>
          {visible.map(p => {
            const isActive = active?.id === p.id;
            return (
              <button
                key={p.id}
                className="w-full text-left px-3 py-3 flex gap-3 items-start transition-all"
                style={{
                  backgroundColor: isActive ? p.colorHex + '15' : 'var(--color-parchment)',
                  borderLeft: `3px solid ${isActive ? p.colorHex : 'transparent'}`,
                }}
                onMouseEnter={() => setHovered(p)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(selected?.id === p.id ? null : p)}
              >
                <div
                  className="flex-shrink-0 w-6 h-6 flex items-center justify-center font-serif text-xs"
                  style={{ backgroundColor: p.colorHex, color: '#F8F4EE', marginTop: 1 }}
                >
                  {(p.routeId === 'baroque' ? ROUTE_ORDER.baroque : ROUTE_ORDER.classicism).indexOf(p.id) + 1}
                </div>
                <div className="min-w-0">
                  <p className="font-sans text-sm leading-tight mb-0.5 font-medium" style={{ color: 'var(--color-ink)' }}>{p.name}</p>
                  <p className="font-sans text-xs" style={{ color: p.colorHex }}>
                    {p.routeId === 'baroque' ? 'Барокко' : 'Классицизм'}
                    {p.year && ` · ${p.year}`}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expanded info panel when selected */}
      {selected && (
        <div className="p-6 mt-2" style={{ backgroundColor: 'var(--color-parchment)', borderLeft: `4px solid ${selected.colorHex}` }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest mb-1" style={{ color: selected.colorHex }}>
                {selected.routeId === 'baroque' ? 'Маршрут №2 · Барокко' : 'Маршрут №1 · Классицизм'}
                {selected.year && ` · ${selected.year}`}
              </p>
              <h2 className="font-serif text-2xl mb-2" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>{selected.name}</h2>
              <p className="font-sans text-xs mb-2" style={{ color: 'var(--color-stone)' }}>{selected.address}</p>
              <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-stone)' }}>{selected.shortDesc}</p>
            </div>
            <button onClick={() => setSelected(null)} className="flex-shrink-0 p-1 hover:opacity-60 transition-opacity">
              <Icon name="X" size={16} style={{ color: 'var(--color-stone)' }} />
            </button>
          </div>
        </div>
      )}

      {/* Yandex Maps links */}
      <div className="mt-10 grid sm:grid-cols-2 gap-4">
        <a
          href="https://yandex.ru/maps/213/moscow/?ll=37.640775%2C55.689098&mode=routes&rtext=55.760902%2C37.641441~55.753200%2C37.619221~55.749263%2C37.636267~55.723283%2C37.600337~55.615396%2C37.682108&rtt=pd&z=11.29"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-5 transition-opacity hover:opacity-80"
          style={{ backgroundColor: CLASSICISM_COLOR, color: '#F8F4EE' }}
        >
          <Icon name="Map" size={18} />
          <div>
            <p className="font-sans text-xs uppercase tracking-wide mb-0.5">Маршрут №1</p>
            <p className="font-serif text-base">Классицизм на Яндекс Картах</p>
          </div>
          <Icon name="ExternalLink" size={14} style={{ marginLeft: 'auto' }} />
        </a>
        <a
          href="https://yandex.ru/maps/213/moscow/?ll=37.602780%2C55.737535&mode=routes&rtext=55.763214%2C37.639004~55.766870%2C37.615741~55.758465%2C37.615733~55.740708%2C37.627376~55.726842%2C37.559501~55.750726%2C37.510240&rtt=mt&z=11.97"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-5 transition-opacity hover:opacity-80"
          style={{ backgroundColor: BAROQUE_COLOR, color: '#F8F4EE' }}
        >
          <Icon name="Map" size={18} />
          <div>
            <p className="font-sans text-xs uppercase tracking-wide mb-0.5">Маршрут №2</p>
            <p className="font-serif text-base">Барокко на Яндекс Картах</p>
          </div>
          <Icon name="ExternalLink" size={14} style={{ marginLeft: 'auto' }} />
        </a>
      </div>
    </div>
  );
}
