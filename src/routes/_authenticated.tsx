import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { Header } from '@/components/header'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ location }) => {
    const isAuthenticated = !!localStorage.getItem('token')
    
    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: () => (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  ),
})