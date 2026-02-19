import { useState, useEffect } from 'react'
import { useCartStore } from '@/features/cart/store/use-cart-store'
import { useNavigate, Link, useSearch } from '@tanstack/react-router'
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
import { Heart, ShoppingBag, User as UserIcon, Search, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MobileMenu } from './mobile-menu'

export function Header() {
  const navigate = useNavigate()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const search = useSearch({ 
    strict: false 
  })
  const q = (search as any)?.q as string | undefined
  const [searchValue, setSearchValue] = useState(q || '')
  const userJson = localStorage.getItem('user')
  const user = userJson ? JSON.parse(userJson) : null
  const cartCount = useCartStore((state) => state.cartIds.length)
  const wishlistCount = useCartStore((state) => state.wishlistIds.length)
  

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate({ to: '/login' })
  }
  useEffect(() => {
    setSearchValue(q || '')
  }, [q])
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate({
      to: '/',
      search: (prev: any) => ({
        ...prev,
        q: searchValue || undefined,
      }),
    })
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#e67e7e] text-white py-3 lg:py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 gap-2 lg:gap-8">
        <div className="lg:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 border-none">
              <MobileMenu onClose={() => setIsSheetOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>

        <Link to="/" className="flex flex-col leading-tight shrink-0">
          <span className="text-[10px] lg:text-sm font-bold tracking-tighter uppercase">2nd</span>
          <span className="text-[10px] lg:text-sm font-bold tracking-tighter uppercase leading-[0.5]">Hand</span>
          <span className="text-[10px] lg:text-sm font-bold tracking-tighter uppercase">Market</span>
        </Link>

        <form 
          onSubmit={handleSearch} 
          className="relative flex-1 max-w-[150px] sm:max-w-xs lg:max-w-md group"
        >
          <Input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search products..."
            className="w-full h-10 rounded-full border-none bg-red-400/40 placeholder:text-red-100 text-white pl-6 pr-10 focus-visible:ring-1 focus-visible:ring-white/50"
          />
          <button type="submit" className="absolute right-3 lg:right-4 top-1/2 -translate-y-1/2">
            <Search className="h-4 w-4 lg:h-5 lg:w-5 text-red-100 group-hover:text-white transition-colors" />
          </button>
        </form>

        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className="hover:underline underline-offset-4 decoration-2">About us</Link>
          <Link to="/" className="hover:underline underline-offset-4 decoration-2">All shops</Link>
          <Link to="/" className="hover:underline underline-offset-4 decoration-2">Become a merchant</Link>
        </nav>

        <div className="flex items-center space-x-1 lg:space-x-2 shrink-0">
          
          <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10 h-8 w-8 lg:h-10 lg:w-10">
            <Heart className="h-5 w-5 lg:h-6 lg:w-6" />
            <span className="ml-1 text-sm font-bold">{wishlistCount}</span>
          </Button>

          <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
            <ShoppingBag className="h-5 w-5 lg:h-6 lg:w-6" />
            <span className="ml-1 text-sm font-bold">{cartCount}</span>
          </Button>

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