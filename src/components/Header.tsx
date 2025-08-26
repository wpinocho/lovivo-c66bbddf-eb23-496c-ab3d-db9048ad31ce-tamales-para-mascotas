import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemsCount, onCartClick }: HeaderProps) => {
  const location = useLocation();
  console.log("Header rendered with cart items count:", cartItemsCount);
  
  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      // Si no estamos en la página principal, navegar primero
      window.location.href = `/#${sectionId}`;
    } else {
      // Si estamos en la página principal, hacer scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <header className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:text-green-200 transition-colors">
            <span className="text-2xl">🌽</span>
            <h1 className="text-2xl font-bold">Tamales Pet</h1>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('productos')}
              className="hover:text-green-200 transition-colors"
            >
              Productos
            </button>
            <Link to="/nosotros" className="hover:text-green-200 transition-colors">
              Nosotros
            </Link>
            <Link to="/contacto" className="hover:text-green-200 transition-colors">
              Contacto
            </Link>
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