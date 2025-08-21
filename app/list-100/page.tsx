import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'List 100' })
import { list100, updatedDateAt } from './list-100'

export default function List100() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          List 100
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Đơn giản là một list những điều mà mình muốn làm trước khi chết.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Updated at:{' '}
          {updatedDateAt.toLocaleDateString('en-US', {
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
                <div key={index} className="flex space-x-2 sm:space-x-3">
                  <span className="w-6 flex-shrink-0 text-right text-sm leading-6 text-gray-500 sm:w-8 dark:text-gray-400">
                    {index + 1}.
                  </span>
                  <span className={`${getStatusColor(item.status)} flex-shrink-0 leading-6`}>
                    {item.status}
                  </span>
                  <span className="flex-1 leading-6">{item.title}</span>
                </div>
              )
            })}
            <div className="flex space-x-2 sm:space-x-3">
              <span className="w-6 sm:w-8 flex-shrink-0 text-right text-sm text-gray-500 dark:text-gray-400 leading-6">
                {list100.length + 1}.
              </span>
              <span className="flex-shrink-0 text-gray-500 dark:text-gray-400 leading-6">~</span>
              <span className="flex-1 leading-6">Update later...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
