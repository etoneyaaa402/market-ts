import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { authApi } from '@/api/auth'
import { createFileRoute } from '@tanstack/react-router'

type LoginSearch = {
    redirect?: string
}

export const Route = createFileRoute('/login')({
    validateSearch: (search: Record<string, unknown>): LoginSearch => {
      return {
        redirect: (search.redirect as string) || '/',
      }
    },
    component: LoginPageContent,
})

export function LoginPageContent() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('emilys')
  const [password, setPassword] = useState('emilyspass')

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data))
      navigate({ to: '/' })
    },
    onError: (error) => {
      alert('Ошибка при входе: ' + error.message)
    }
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    loginMutation.mutate({ username, password })
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-[400px] border-none shadow-xl rounded-[32px] bg-white p-2">
        <CardHeader className="space-y-1 items-center pt-8 pb-6">
          <CardTitle className="text-3xl font-bold tracking-tight">Welcome back</CardTitle>
          <p className="text-slate-400 text-sm">Please enter your details to sign in</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Username</label>
              <Input 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-xl py-6 bg-slate-50 border-none focus-visible:ring-1 focus-visible:ring-slate-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Password</label>
              <Input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl py-6 bg-slate-50 border-none focus-visible:ring-1 focus-visible:ring-slate-200"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  className="h-5 w-5 rounded-md border-slate-200 bg-white data-[state=checked]:bg-[#e67e7e] data-[state=checked]:border-[#e67e7e]" 
                />
                <label htmlFor="remember" className="text-sm font-medium text-slate-600 cursor-pointer">
                  Remember me
                </label>
              </div>
              <Button 
                variant="link" 
                type="button" 
                className="text-sm font-semibold text-[#e67e7e] hover:no-underline p-0 h-auto"
              >
                Forgot password?
              </Button>
            </div>

            <Button 
              type="submit" 
              disabled={loginMutation.isPending}
              className="w-full bg-[#e67e7e] hover:bg-[#d66e6e] text-white py-7 rounded-2xl text-lg font-bold transition-all mt-2 shadow-lg shadow-red-100"
            >
              {loginMutation.isPending ? "Signing in..." : "Sign in"}
            </Button>

            <div className="text-center text-sm text-slate-400 pt-2">
              Don't have an account? 
              <Button 
                variant="link" 
                type="button" 
                className="text-[#e67e7e] font-bold hover:no-underline p-0 h-auto ml-1"
              >
                Create one for free
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}