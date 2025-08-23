import Link from 'shared/ui/components/link'
import Image from 'next/image'
import siteMetadata from '@/shared/config/site'

export const NavLogo = () => {
  return (
    <Link href="/" aria-label={siteMetadata.headerTitle}>
      <div className="flex items-center justify-between">
        <div className="mr-3 h-10 w-10">
          <Image src="/static/images/logo.png" alt="Logo" width={40} height={40} />
        </div>
        {typeof siteMetadata.headerTitle === 'string' ? (
          <div className="hidden h-6 text-2xl font-semibold sm:block">
            {siteMetadata.headerTitle}
          </div>
        ) : (
          siteMetadata.headerTitle
        )}
      </div>
    </Link>
  )
}