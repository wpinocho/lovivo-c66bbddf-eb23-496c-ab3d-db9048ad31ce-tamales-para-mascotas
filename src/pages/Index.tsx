import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <Header 
        cartItemsCount={getTotalItems()} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4">
            🌽 Tamales para Mascotas 🐾
          </h1>
          <p className="text-xl text-green-600 max-w-2xl mx-auto">
            Los tamales más deliciosos y nutritivos para tu mejor amigo. 
            Hechos con amor y ingredientes naturales especialmente seleccionados para cada tipo de animal.
          </p>
        </div>

        <section id="productos">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
            Nuestros Productos
          </h2>
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
    </div>
  );
};

export default Index;