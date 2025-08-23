import { Inter } from 'next/font/google'
import SectionContainer from '@/shared/ui/components/section-container'
import Footer from '@/shared/ui/components/footer'
import { ReactNode } from 'react'
import Header from '@/shared/ui/components/header'

interface Props {
  children: ReactNode
}

const inter = Inter({
  subsets: ['latin'],
})

const LayoutWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <div className={`${inter.className} flex h-screen flex-col justify-between font-sans`}>
        <Header />
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
