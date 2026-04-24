import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Section = string;

interface FooterProps {
  onNavigate: (s: Section, id?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && message) setSent(true);
  };

  return (
    <footer className="mt-16 border-t" style={{ borderColor: 'var(--color-parchment)', backgroundColor: 'var(--color-cream)' }}>
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          {/* Logo */}
          <div>
            <p className="font-serif text-xl mb-2" style={{ color: 'var(--color-ink)' }}>Москва XVIII века</p>
            <p className="font-sans text-xs leading-relaxed" style={{ color: 'var(--color-stone)' }}>
              Цифровая интерактивная экскурсия. Три маршрута, 15 памятников, 5 объектов классицизма.
            </p>
          </div>

          {/* Разделы */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--color-stone)' }}>Разделы</p>
            <ul className="space-y-2">
              {[
                { id: 'styles', label: 'Барокко и классицизм', sub: 'baroque' },
                { id: 'objects', label: 'Объекты классицизма' },
                { id: 'routes', label: 'Маршруты' },
                { id: 'map', label: 'Карта' },
                { id: 'bibliography', label: 'Библиография' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => onNavigate(item.id, item.sub)}
                    className="font-sans text-sm hover:opacity-60 transition-opacity text-left"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Обратная связь */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--color-stone)' }}>Обратная связь</p>
            {sent ? (
              <div className="flex items-center gap-2 p-4" style={{ backgroundColor: 'var(--color-parchment)' }}>
                <Icon name="CheckCircle" size={16} style={{ color: '#2C5F2E' }} />
                <p className="font-sans text-sm" style={{ color: '#2C5F2E' }}>Сообщение отправлено!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Ваш email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-3 py-2 font-sans text-sm outline-none"
                  style={{ backgroundColor: 'var(--color-parchment)', border: '1px solid var(--color-parchment)', color: 'var(--color-ink)' }}
                />
                <textarea
                  placeholder="Ваше сообщение"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={3}
                  className="px-3 py-2 font-sans text-sm outline-none resize-none"
                  style={{ backgroundColor: 'var(--color-parchment)', border: '1px solid var(--color-parchment)', color: 'var(--color-ink)' }}
                />
                <button
                  type="submit"
                  className="px-4 py-2 font-sans text-xs uppercase tracking-widest transition-opacity hover:opacity-80"
                  style={{ backgroundColor: 'var(--color-ink)', color: '#F8F4EE' }}
                >
                  Отправить
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="ornament mb-6"><span /></div>
        <p className="font-sans text-xs text-center" style={{ color: 'var(--color-stone)' }}>
          © 2024 · Образовательный проект «Архитектурный облик Москвы XVIII века»
        </p>
      </div>
    </footer>
  );
}
