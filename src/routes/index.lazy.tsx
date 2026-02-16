import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">Welcome to Market App!</h1>
      <p className="text-muted-foreground">
        Это главная страница, созданная с помощью TanStack Router.
      </p>
    </div>
  )
}