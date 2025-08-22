'use client'

import { usePathname } from 'next/navigation'
import type { PaginationProps } from '@/entities/blog'

export const usePagination = ({ totalPages, currentPage }: PaginationProps) => {
  const pathname = usePathname()
  const segments = pathname.split('/')
  
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+\/?$/, '') // Remove any trailing /page
    .replace(/\/$/, '') // Remove trailing slash
  
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages
  
  const getPrevPageUrl = () => {
    return currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`
  }
  
  const getNextPageUrl = () => {
    return `/${basePath}/page/${currentPage + 1}`
  }

  return {
    prevPage,
    nextPage,
    getPrevPageUrl,
    getNextPageUrl,
    currentPage,
    totalPages
  }
}