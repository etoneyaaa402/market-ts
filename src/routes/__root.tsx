import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 font-sans antialiased">
      <Outlet /> 
      <TanStackRouterDevtools />
    </div>
  ),
})