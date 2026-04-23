import { TEAM, BIBLIOGRAPHY } from '@/data/content';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* About project */}
      <div className="mb-20">
        <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-stone)' }}>
          О проекте
        </p>
        <h1 className="font-serif text-5xl mb-6" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
          Цифровая экскурсия
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="font-serif text-2xl mb-3" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
              Цель проекта
            </h2>
            <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-stone)' }}>
              Проект создан с целью популяризации знаний об архитектурном наследии Москвы XVIII века. Мы стремимся сделать академические знания доступными для широкой аудитории — через удобный интерфейс, живые экскурсионные тексты и наглядную структуру маршрутов.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl mb-3" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
              Задачи
            </h2>
            <ul className="space-y-2">
              {[
                'Систематизировать памятники архитектуры XVIII века',
                'Представить три ключевых архитектурных стиля',
                'Создать удобные маршруты для самостоятельных прогулок',
                'Рассказать о судьбе утраченных памятников',
              ].map((task) => (
                <li key={task} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: 'var(--color-rouge)' }} />
                  <span className="font-sans text-sm" style={{ color: 'var(--color-stone)' }}>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-8" style={{ backgroundColor: 'var(--color-parchment)' }}>
          <h2 className="font-serif text-2xl mb-4" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
            Формат
          </h2>
          <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-stone)' }}>
            Сайт организован как цифровой аудиогид: каждый маршрут сопровождается текстом экскурсовода, написанным живым языком. Карточки объектов содержат исторические сведения и занимательные факты. Пользователь может следовать одному из трёх маршрутов или изучать памятники в произвольном порядке через каталог объектов.
          </p>
        </div>
      </div>

      {/* Team */}
      <div className="mb-20">
        <div className="ornament mb-10">
          <span className="font-serif text-sm italic" style={{ color: 'var(--color-stone)' }}>Команда</span>
        </div>
        <h2 className="font-serif text-3xl mb-8 text-center" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
          Авторы проекта
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="p-8 text-center"
              style={{ backgroundColor: 'var(--color-parchment)' }}
            >
              <div className="text-4xl mb-4">{member.icon}</div>
              <h3 className="font-serif text-xl mb-1" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
                {member.name}
              </h3>
              <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-rouge)' }}>
                {member.role}
              </p>
              <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-stone)' }}>
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bibliography */}
      <div>
        <div className="ornament mb-10">
          <span className="font-serif text-sm italic" style={{ color: 'var(--color-stone)' }}>Источники</span>
        </div>
        <h2 className="font-serif text-3xl mb-8" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
          Библиография
        </h2>
        <div className="space-y-4">
          {BIBLIOGRAPHY.map((ref, i) => (
            <div
              key={i}
              className="flex gap-4 p-5"
              style={{ backgroundColor: 'var(--color-parchment)' }}
            >
              <span
                className="font-serif text-lg font-light flex-shrink-0"
                style={{ color: 'var(--color-rouge)', minWidth: 24 }}
              >
                {i + 1}.
              </span>
              <div>
                <p className="font-sans text-sm font-medium mb-0.5" style={{ color: 'var(--color-ink)' }}>
                  {ref.author}
                </p>
                <p className="font-serif text-base italic mb-1" style={{ color: 'var(--color-ink)' }}>
                  {ref.title}
                </p>
                <p className="font-sans text-xs" style={{ color: 'var(--color-stone)' }}>
                  {ref.publisher}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
