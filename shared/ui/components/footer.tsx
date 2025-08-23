import { Link } from './link'
import siteMetadata from '@/shared/config/site'

export const Footer = () => {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link
            href="https://github.com/LeHoangTuanbk/blog-happyhealthyse"
            className="hover:underline"
          >
            View source
          </Link>
        </div>
      </div>
    </footer>
  )
}
