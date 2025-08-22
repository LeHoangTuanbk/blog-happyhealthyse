import siteMetadata from '@/shared/config/site'
import { NavLogo, DesktopNav } from '@/features/navigation'
import { ThemeSwitch } from '@/features/theme-switching'
import { SearchButton } from '@/features/search'
import MobileNav from './MobileNav'

const Header = () => {
  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <NavLogo />
      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        <DesktopNav />
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
