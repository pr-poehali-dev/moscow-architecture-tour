import { BIBLIOGRAPHY } from '@/data/content';
import Icon from '@/components/ui/icon';

export default function BibliographyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <div className="mb-12">
        <div className="w-10 h-1 mb-4" style={{ backgroundColor: 'var(--color-rouge)' }} />
        <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-stone)' }}>
          Список источников
        </p>
        <h1 className="font-serif text-5xl mb-4" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>Библиография</h1>
        <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-stone)' }}>
          Оформление по ГОСТ Р 7.0.5–2008. Дата обращения к электронным ресурсам: 24.04.2026.
        </p>
      </div>

      <ol className="space-y-4" style={{ listStyle: 'none', padding: 0 }}>
        {BIBLIOGRAPHY.map((ref) => (
          <li key={ref.num} className="flex gap-4 p-6" style={{ backgroundColor: 'var(--color-parchment)' }}>
            <span className="font-serif text-xl font-light flex-shrink-0 pt-0.5" style={{ color: 'var(--color-rouge)', minWidth: 28 }}>
              {ref.num}.
            </span>
            <div>
              <p className="font-sans text-sm leading-relaxed mb-2" style={{ color: 'var(--color-ink)' }}>
                {ref.text}
                {ref.url && (
                  <>
                    {' – URL: '}
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline transition-opacity hover:opacity-70"
                      style={{ color: 'var(--color-navy, #1C3557)' }}
                    >
                      {ref.url}
                    </a>
                    {ref.accessed && ` (дата обращения: ${ref.accessed}).`}
                  </>
                )}
              </p>
              {ref.url && (
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-sans text-xs transition-opacity hover:opacity-70"
                  style={{ color: 'var(--color-stone)' }}
                >
                  <Icon name="ExternalLink" size={11} />
                  Открыть источник
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 p-6" style={{ backgroundColor: 'var(--color-parchment)', borderLeft: '3px solid var(--color-stone)' }}>
        <p className="font-sans text-xs leading-relaxed" style={{ color: 'var(--color-stone)' }}>
          Библиографические записи оформлены в соответствии с ГОСТ Р 7.0.5–2008 «Библиографическая ссылка. Общие требования и правила составления».
        </p>
      </div>
    </div>
  );
}
