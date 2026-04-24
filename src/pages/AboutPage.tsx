import { BIBLIOGRAPHY } from '@/data/content';
import Icon from '@/components/ui/icon';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* About */}
      <div className="mb-16">
        <div className="w-10 h-1 mb-4" style={{ backgroundColor: 'var(--color-rouge)' }} />
        <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-stone)' }}>О проекте</p>
        <h1 className="font-serif text-5xl mb-6" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>Цифровая экскурсия</h1>
        <div className="p-8 mb-6" style={{ backgroundColor: 'var(--color-parchment)' }}>
          <p className="font-sans text-sm leading-relaxed mb-4" style={{ color: 'var(--color-stone)' }}>
            Этот сайт — цифровая интерактивная экскурсия по архитектурным памятникам Москвы XVIII века. Два маршрута охватывают ключевые объекты барокко и классицизма: от нарышкинских церквей до Дома Пашкова и Царицыно.
          </p>
          <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-stone)' }}>
            Каждый объект — отдельная страница с историческими текстами, архитектурными описаниями, иллюстрациями и интересными фактами. Раздел «Стили» объясняет художественные принципы барокко и классицизма, раздел «Маршруты» помогает спланировать прогулку, а интерактивная карта показывает все объекты на плане Москвы.
          </p>
        </div>
      </div>

      {/* Bibliography */}
      <div>
        <div className="ornament mb-10">
          <span className="font-serif text-sm italic" style={{ color: 'var(--color-stone)' }}>Источники</span>
        </div>
        <h2 className="font-serif text-3xl mb-3" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>Библиография</h2>
        <p className="font-sans text-xs mb-8" style={{ color: 'var(--color-stone)' }}>
          Оформление по ГОСТ Р 7.0.5–2008. Дата обращения к электронным ресурсам указана после каждой ссылки.
        </p>
        <ol className="space-y-3" style={{ listStyle: 'none', padding: 0 }}>
          {BIBLIOGRAPHY.map((ref) => (
            <li key={ref.num} className="flex gap-4 p-5" style={{ backgroundColor: 'var(--color-parchment)' }}>
              <span className="font-serif text-base font-light flex-shrink-0 pt-0.5" style={{ color: 'var(--color-rouge)', minWidth: 26 }}>
                {ref.num}.
              </span>
              <div>
                <p className="font-sans text-sm leading-relaxed mb-1" style={{ color: 'var(--color-ink)' }}>
                  {ref.text}
                  {ref.url && (
                    <>
                      {' – URL: '}
                      <a href={ref.url} target="_blank" rel="noopener noreferrer" className="underline transition-opacity hover:opacity-70 break-all" style={{ color: 'var(--color-navy, #1C3557)' }}>
                        {ref.url}
                      </a>
                      {ref.accessed && ` (дата обращения: ${ref.accessed}).`}
                    </>
                  )}
                </p>
                {ref.url && (
                  <a href={ref.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-sans text-xs transition-opacity hover:opacity-70" style={{ color: 'var(--color-stone)' }}>
                    <Icon name="ExternalLink" size={11} /> Открыть источник
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 p-5" style={{ backgroundColor: 'var(--color-parchment)', borderLeft: '3px solid var(--color-stone)' }}>
          <p className="font-sans text-xs leading-relaxed" style={{ color: 'var(--color-stone)' }}>
            Библиографические записи оформлены в соответствии с ГОСТ Р 7.0.5–2008 «Библиографическая ссылка. Общие требования и правила составления».
          </p>
        </div>
      </div>
    </div>
  );
}
