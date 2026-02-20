import { Heart, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import { Link } from "@tanstack/react-router";
import { useCartStore } from "@/features/cart/store/use-cart-store";

interface ProductCardProps {
    product: Product;
    isNew?: boolean;
    isReserved?: boolean;
}

export function ProductCard( { product, isNew, isReserved }: ProductCardProps) {
    // const [isFavorite, setIsFavorite] = useState(false);
    // const [isAdded, setIsAdded] = useState(false);
    const formattedPrice = new Intl.NumberFormat( 'de-DE', {
        minimumFractionDigits: 2,
    }).format(product.price);
    const { cartIds, wishlistIds, toggleWishlist, addToCart } = useCartStore()
    const isFavorite = wishlistIds.includes(product.id)
    const isAdded = cartIds.includes(product.id)

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault(); 
        e.stopPropagation();
        toggleWishlist(product.id)
    };
    const handleCartClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product.id)
    };

    return (
        <Link
            to="/product/$productId"
            params={{ productId: product.id.toString() }}
            className="group flex-col ..."
        >
            <div className="group flex flex-col bg-white rounded-[32px] p-2 transition-all">
            <div className="relative aspect-square rounded-[28px] bg-[#f7f7f7] overflow-hidden flex items-center justify-center p-6">
                <img 
                    src={product.thumbnail} 
                    alt={product.title}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />

                <button 
                    onClick={handleFavoriteClick}
                    className="absolute top-4 right-4 p-1 transition-transform active:scale-125"
                >
                    <Heart 
                        className={cn(
                        "h-6 w-6 transition-colors",
                        isFavorite ? "fill-red-500 text-red-500" : "text-black"
                        )} 
                    />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {isNew && (
                        <Badge className="bg-[#8cdcfc] hover:bg-[#8cdcfc] text-white px-5 py-1 rounded-full border-none text-xs font-bold">
                            New
                        </Badge>
                    )}
                    {isReserved && (
                        <Badge className="bg-[#fcdca4] hover:bg-[#fcdca4] text-[#8c6c3c] px-4 py-1 rounded-full border-none text-xs font-bold">
                            Reserved
                        </Badge>
                    )}
                </div>
            </div>

            <div className="mt-4 px-2 pb-2 flex flex-col flex-1">
                <h3 className="text-[15px] text-slate-500 font-normal line-clamp-2 leading-tight min-h-[40px]">
                <span className="font-bold text-slate-900">
                    {product.title}
                </span>
                <span className="text-slate-500 font-normal">
                    {" "}- {product.description}
                </span>
                </h3>

                <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-[22px] font-bold text-slate-900">
                        {formattedPrice}$
                    </span>

                    <button 
                        onClick={handleCartClick}
                        className="transition-all active:scale-95"
                    >
                        {isAdded ? (
                            <span className="text-[#e67e7e] font-semibold text-[15px] pr-2">Added</span>
                        ) : (
                            <div className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50">
                                <ShoppingBag className="h-5 w-5 text-slate-400" />
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </div>
        </Link>
    )
}