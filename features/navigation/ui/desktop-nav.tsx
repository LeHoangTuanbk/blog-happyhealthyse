'use client'

import { Link } from '@/shared/ui/components'
import { useNavigation } from '../lib/use-navigation'

export const DesktopNav = () => {
  const { navLinks } = useNavigation()
  
  return (
    <div className="no-scrollbar hidden max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
      {navLinks.map((link) => (
        <Link
          key={link.title}
          href={link.href}
          className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
        >
          {link.title}
        </Link>
      ))}
    </div>
  )
}