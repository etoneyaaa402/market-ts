import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/')({
  component: Index,
})

function Index() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-white">
      <h1 className="text-xl font-medium text-slate-600">
        Это главная страница, созданная с помощью TanStack Router.
      </h1>
    </div>
  )
}