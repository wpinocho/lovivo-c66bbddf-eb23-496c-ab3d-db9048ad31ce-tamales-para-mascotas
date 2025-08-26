import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TamaleQuotation } from "@/components/TamaleQuotation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowDown, Star, Heart, Award } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  animalType: string;
  ingredients: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Tamal Canino Clásico",
    description: "Delicioso tamal hecho con pollo, arroz y verduras especiales para perros",
    price: 25.00,
    image: "🐕",
    animalType: "Perros",
    ingredients: ["Pollo", "Arroz", "Zanahoria", "Calabaza"]
  },
  {
    id: 2,
    name: "Tamal Felino Gourmet",
    description: "Tamal premium con salmón y quinoa, perfecto para gatos exigentes",
    price: 30.00,
    image: "🐱",
    animalType: "Gatos",
    ingredients: ["Salmón", "Quinoa", "Espinaca", "Aceite de coco"]
  },
  {
    id: 3,
    name: "Tamal Aviar Nutritivo",
    description: "Tamal especial con semillas y frutas para aves domésticas",
    price: 20.00,
    image: "🦜",
    animalType: "Aves",
    ingredients: ["Semillas de girasol", "Mijo", "Manzana", "Avena"]
  },
  {
    id: 4,
    name: "Tamal Roedor Deluxe",
    description: "Tamal miniatura con vegetales frescos para hamsters y conejos",
    price: 15.00,
    image: "🐹",
    animalType: "Roedores",
    ingredients: ["Brócoli", "Zanahoria", "Apio", "Perejil"]
  },
  {
    id: 5,
    name: "Tamal Reptil Especial",
    description: "Tamal con proteínas e insectos para reptiles y anfibios",
    price: 35.00,
    image: "🦎",
    animalType: "Reptiles",
    ingredients: ["Grillos", "Gusanos", "Calabacín", "Calcio"]
  },
  {
    id: 6,
    name: "Tamal Acuático",
    description: "Tamal flotante con algas y proteínas marinas para peces",
    price: 18.00,
    image: "🐠",
    animalType: "Peces",
    ingredients: ["Algas", "Camarón", "Espirulina", "Vitaminas"]
  }
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  const addToCart = (product: Product) => {
    console.log("Adding product to cart:", product);
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        const updatedItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log("Updated cart items:", updatedItems);
        return updatedItems;
      } else {
        const newItems = [...prevItems, { ...product, quantity: 1 }];
        console.log("New cart items:", newItems);
        return newItems;
      }
    });

    toast({
      title: "¡Producto agregado!",
      description: `${product.name} se agregó al carrito`,
    });
  };

  const removeFromCart = (productId: number) => {
    console.log("Removing product from cart:", productId);
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== productId);
      console.log("Cart after removal:", updatedItems);
      return updatedItems;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    console.log("Updating quantity for product:", productId, "to:", quantity);
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      console.log("Cart after quantity update:", updatedItems);
      return updatedItems;
    });
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const scrollToProducts = () => {
    const element = document.getElementById('productos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCotizador = () => {
    const element = document.getElementById('cotizador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <Header 
        cartItemsCount={getTotalItems()} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-400 via-green-500 to-yellow-400">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Floating emojis */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 text-4xl animate-bounce animation-delay-1000">🌽</div>
          <div className="absolute top-32 right-32 text-3xl animate-bounce animation-delay-2000">🐕</div>
          <div className="absolute bottom-40 left-40 text-3xl animate-bounce animation-delay-3000">🐱</div>
          <div className="absolute bottom-20 right-20 text-4xl animate-bounce animation-delay-4000">🦜</div>
          <div className="absolute top-1/2 left-10 text-2xl animate-bounce animation-delay-5000">🐹</div>
          <div className="absolute top-1/3 right-10 text-2xl animate-bounce animation-delay-6000">🦎</div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl animate-fade-in">
              🌽 Tamales Pet 🐾
            </h1>
            <div className="flex justify-center items-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-8 w-8 text-yellow-300 fill-current animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
              ))}
            </div>
          </div>

          <p className="text-2xl md:text-3xl text-white mb-8 drop-shadow-lg font-medium leading-relaxed animate-slide-up">
            Los tamales más <span className="text-yellow-200 font-bold">deliciosos</span> y <span className="text-yellow-200 font-bold">nutritivos</span> para tu mejor amigo
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-300" />
              100% Natural
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-300" />
              Aprobado por Veterinarios
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold">
              🚚 Entrega Gratis
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={scrollToProducts}
              size="lg" 
              className="bg-white text-green-600 hover:bg-green-50 text-xl px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 font-bold"
            >
              Ver Productos 🛍️
            </Button>
            <Button 
              onClick={scrollToCotizador}
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-green-600 text-xl px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 font-bold"
            >
              Cotizar Pedido 🧮
            </Button>
            <Button 
              onClick={() => setIsCartOpen(true)}
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-green-600 text-xl px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 font-bold"
            >
              Mi Carrito ({getTotalItems()})
            </Button>
          </div>

          <div className="animate-bounce">
            <ArrowDown className="h-8 w-8 text-white mx-auto cursor-pointer" onClick={scrollToProducts} />
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 fill-green-50">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </</div>
      </section>

      <main className="container mx-auto px-4 py-16">
        {/* Cotizador Section */}
        <div id="cotizador">
          <TamaleQuotation />
        </div>

        <section id="productos">
          <h2 className="text-4xl font-bold text-green-800 mb-4 text-center">
            Nuestros Productos Especiales
          </h2>
          <p className="text-xl text-green-600 text-center mb-12 max-w-3xl mx-auto">
            Cada tamal está cuidadosamente elaborado con ingredientes frescos y naturales, 
            formulados específicamente para las necesidades nutricionales de cada tipo de mascota.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
            ¿Por qué elegir nuestros tamales?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">100% Natural</h3>
              <p className="text-gray-600">Ingredientes frescos y naturales, sin conservadores artificiales</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">👨‍⚕️</div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">Aprobado por Veterinarios</h3>
              <p className="text-gray-600">Formulados con la supervisión de especialistas en nutrición animal</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">Hecho con Amor</h3>
              <p className="text-gray-600">Cada tamal es preparado artesanalmente pensando en la felicidad de tu mascota</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        totalPrice={getTotalPrice()}
      />

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.5s both;
        }
        
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-5000 { animation-delay: 5s; }
        .animation-delay-6000 { animation-delay: 6s; }
      `}</style>
    </div>
  );
};

export default Index;