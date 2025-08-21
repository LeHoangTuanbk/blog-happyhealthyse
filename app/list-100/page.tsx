import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'List 100' })

type MyThing = {
  title: string
  status: '✓' | '✗' | '~'
}

const list100: MyThing[] = [
  { title: 'Learn Chinese', status: '✗' },
  { title: 'Reach advanced proficiency in English', status: '~' },
  { title: "Live in another country – I'm currently living in Japan", status: '✓' },
  {
    title: 'Visit Utah, Idaho, and Arizona, and reconnect with old friends in the US',
    status: '✗',
  },
  { title: 'Run a full marathon', status: '✗' },
  { title: 'Travel to 50 countries', status: '✗' },
  { title: 'Get married and have at least two children', status: '✗' },
  { title: 'Earn a Master of Business Administration (MBA)', status: '✗' },
  { title: 'Earn a Master of Science (MSc)', status: '✗' },
  { title: 'Launch my own software product used by over a million users', status: '✗' },
  { title: 'Earn a PhD', status: '✗' },
  { title: 'Be awesome', status: '~' },
  { title: 'Help others selflessly, without expecting anything in return', status: '~' },
  { title: 'Be kind and compassionate', status: '~' },
  { title: 'Be a speaker at an international conference', status: '✗' },
  { title: 'Get hired by a FAANG or other top tech company', status: '✗' },
]

export default function List100() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          List 100
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Đơn giản là một list những điều mà mình muốn làm trước khi chết. Sẽ còn bổ sung, update.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Update:{' '}
          {new Date('2025-08-21').toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      <div className="container py-12">
        <div className="prose dark:prose-invert max-w-none pb-8 xl:col-span-2">
          <div className="space-y-2">
            {list100.map((item, index) => {
              const getStatusColor = (status: string) => {
                switch (status) {
                  case '✓':
                    return 'text-green-500'
                  case '✗':
                    return 'text-red-500'
                  case '~':
                    return 'text-yellow-500'
                  default:
                    return 'text-gray-500'
                }
              }

              return (
                <div key={index} className="flex items-start space-x-3">
                  <span className="w-8 text-right text-sm text-gray-500 dark:text-gray-400">
                    {index + 1}.
                  </span>
                  <span className={getStatusColor(item.status)}>{item.status}</span>
                  <span>{item.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
