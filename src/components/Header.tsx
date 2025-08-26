import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemsCount, onCartClick }: HeaderProps) => {
  console.log("Header rendered with cart items count:", cartItemsCount);
  
  return (
    <header className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🌽</span>
            <h1 className="text-2xl font-bold">Tamales Pet</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#productos" className="hover:text-green-200 transition-colors">Productos</a>
            <a href="#nosotros" className="hover:text-green-200 transition-colors">Nosotros</a>
            <a href="#contacto" className="hover:text-green-200 transition-colors">Contacto</a>
          </nav>

          <Button
            onClick={onCartClick}
            variant="outline"
            size="sm"
            className="relative bg-white text-green-600 hover:bg-green-50"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};