import { useNavigate, Link } from '@tanstack/react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, ShoppingBag, User as UserIcon, Search } from 'lucide-react'

export function Header() {
  const navigate = useNavigate()
  
  const userJson = localStorage.getItem('user')
  const user = userJson ? JSON.parse(userJson) : null

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate({ to: '/login' })
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#e67e7e] text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 gap-8">
        
        {/* Логотип */}
        <Link to="/" className="flex flex-col leading-tight shrink-0">
          <span className="text-sm font-bold tracking-tighter uppercase">2nd</span>
          <span className="text-sm font-bold tracking-tighter uppercase leading-[0.5]">Hand</span>
          <span className="text-sm font-bold tracking-tighter uppercase">Market</span>
        </Link>

        {/* Поиск */}
        <div className="relative flex-1 max-w-md group">
          <Input
            type="text"
            placeholder="Search products..."
            className="w-full h-10 rounded-full border-none bg-red-400/40 placeholder:text-red-100 text-white pl-6 pr-10 focus-visible:ring-1 focus-visible:ring-white/50"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-red-100 group-hover:text-white transition-colors cursor-pointer" />
        </div>

        {/* Навигационные ссылки */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className="hover:underline underline-offset-4 decoration-2">About us</Link>
          <Link to="/" className="hover:underline underline-offset-4 decoration-2">All shops</Link>
          <Link to="/" className="hover:underline underline-offset-4 decoration-2">Become a merchant</Link>
        </nav>

        {/* Иконки и Профиль */}
        <div className="flex items-center space-x-2 shrink-0">
          
          {/* Избранное */}
          <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
            <Heart className="h-6 w-6" />
            <span className="ml-1 text-sm font-bold">0</span>
          </Button>

          {/* Корзина */}
          <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
            <ShoppingBag className="h-6 w-6" />
            <span className="ml-1 text-sm font-bold">0</span>
          </Button>

          {/* Выпадающее меню профиля */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
                {user?.image ? (
                  <Avatar className="h-8 w-8 border border-white/20">
                    <AvatarImage src={user.image} />
                    <AvatarFallback>{user.username?.[0]}</AvatarFallback>
                  </Avatar>
                ) : (
                  <UserIcon className="h-6 w-6" />
                )}
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent className="w-56 mt-2 rounded-2xl" align="end">
              <DropdownMenuLabel className="font-normal p-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-xs text-slate-400 font-medium">username:</p>
                  <p className="text-2xl font-bold text-[#e67e7e] lowercase leading-none">
                    {user?.username || 'guest'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-100" />
              <DropdownMenuItem 
                onClick={handleLogout} 
                className="p-4 text-center justify-center text-lg font-bold text-slate-700 cursor-pointer focus:bg-slate-50 focus:text-slate-900"
              >
                Exit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  )
}