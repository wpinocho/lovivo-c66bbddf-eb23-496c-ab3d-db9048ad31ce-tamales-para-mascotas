import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Cart } from "@/components/Cart";
import { CartItem } from "./Index";

const Nosotros = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems => 
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <Header 
        cartItemsCount={getTotalItems()} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
              Sobre Nosotros 🐾
            </h1>
            <p className="text-xl text-green-600">
              Conoce la historia detrás de Tamales Pet
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-green-800 mb-4">Nuestra Historia</h2>
                <p className="text-gray-600 mb-4">
                  Tamales Pet nació del amor por nuestras mascotas y la tradición culinaria mexicana. 
                  En 2020, cuando nuestra fundadora María González notó que su perro Max no disfrutaba 
                  de su comida habitual, decidió crear algo especial.
                </p>
                <p className="text-gray-600 mb-4">
                  Combinando recetas tradicionales de tamales con ingredientes nutritivos y seguros 
                  para animales, creamos los primeros tamales especializados para mascotas en México.
                </p>
                <p className="text-gray-600">
                  Hoy, somos la empresa líder en alimentación artesanal para mascotas, 
                  sirviendo a más de 10,000 familias felices en todo el país.
                </p>
              </div>
              <div className="text-center">
                <div className="text-8xl mb-4">👩‍🍳</div>
                <h3 className="text-xl font-semibold text-green-700">María González</h3>
                <p className="text-gray-600">Fundadora y Chef Principal</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-green-800 mb-2">Premio Nacional</h3>
              <p className="text-gray-600">
                Mejor Innovación en Alimentación Animal 2023
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-green-800 mb-2">100% Orgánico</h3>
              <p className="text-gray-600">
                Certificación orgánica en todos nuestros ingredientes
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-green-800 mb-2">10,000+ Clientes</h3>
              <p className="text-gray-600">
                Mascotas felices en todo México
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
              Nuestros Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">🌿</div>
                <div>
                  <h4 className="text-lg font-semibold text-green-700 mb-2">Sostenibilidad</h4>
                  <p className="text-gray-600">
                    Utilizamos ingredientes locales y empaques biodegradables para cuidar nuestro planeta.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-2xl">🔬</div>
                <div>
                  <h4 className="text-lg font-semibold text-green-700 mb-2">Calidad</h4>
                  <p className="text-gray-600">
                    Cada producto pasa por rigurosos controles de calidad y supervisión veterinaria.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-2xl">🤝</div>
                <div>
                  <h4 className="text-lg font-semibold text-green-700 mb-2">Compromiso</h4>
                  <p className="text-gray-600">
                    Estamos comprometidos con la salud y felicidad de todas las mascotas.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-2xl">💝</div>
                <div>
                  <h4 className="text-lg font-semibold text-green-700 mb-2">Amor</h4>
                  <p className="text-gray-600">
                    Cada tamal está hecho con amor, como si fuera para nuestra propia mascota.
                  </p>
                </div>
              </div>
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

export default Nosotros;