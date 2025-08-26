import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Cart } from "@/components/Cart";
import { CartItem } from "./Index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contacto = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const { toast } = useToast();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    
    toast({
      title: "¡Mensaje enviado!",
      description: "Gracias por contactarnos. Te responderemos pronto.",
    });

    // Limpiar formulario
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      mensaje: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <Header 
        cartItemsCount={getTotalItems()} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
              Contáctanos 📞
            </h1>
            <p className="text-xl text-green-600">
              Estamos aquí para ayudarte y responder todas tus preguntas
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Formulario de contacto */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-green-800 mb-6">
                Envíanos un mensaje
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo
                  </label>
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    placeholder="Tu nombre completo"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Correo electrónico
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    placeholder="tu@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <Input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <Textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    required
                    className="w-full h-32"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Enviar mensaje
                </Button>
              </form>
            </div>

            {/* Información de contacto */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Ubicación
                </h3>
                <p className="text-gray-600">
                  Av. Mascotas 123<br />
                  Colonia Pet Friendly<br />
                  Ciudad Pet, CP 12345<br />
                  México
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Teléfono
                </h3>
                <p className="text-gray-600">
                  <strong>Ventas:</strong> (555) 123-4567<br />
                  <strong>Atención al cliente:</strong> (555) 123-4568<br />
                  <strong>WhatsApp:</strong> (555) 123-4569
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Correo electrónico
                </h3>
                <p className="text-gray-600">
                  <strong>General:</strong> info@tamalespet.com<br />
                  <strong>Ventas:</strong> ventas@tamalespet.com<br />
                  <strong>Soporte:</strong> soporte@tamalespet.com
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Horarios de atención
                </h3>
                <div className="text-gray-600 space-y-1">
                  <p><strong>Lunes - Viernes:</strong> 8:00 AM - 8:00 PM</p>
                  <p><strong>Sábados:</strong> 9:00 AM - 6:00 PM</p>
                  <p><strong>Domingos:</strong> 10:00 AM - 4:00 PM</p>
                  <p className="text-sm text-green-600 mt-2">
                    *Entregas a domicilio disponibles en horario extendido
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Preguntas frecuentes */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
              Preguntas Frecuentes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-green-700 mb-2">
                  ¿Los tamales son seguros para todas las mascotas?
                </h4>
                <p className="text-gray-600 mb-4">
                  Sí, cada tamal está formulado específicamente para el tipo de animal. 
                  Todos nuestros productos están aprobados por veterinarios.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-green-700 mb-2">
                  ¿Hacen entregas a domicilio?
                </h4>
                <p className="text-gray-600 mb-4">
                  Sí, entregamos en toda la ciudad. Los pedidos se entregan 
                  en 24-48 horas con refrigeración incluida.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-green-700 mb-2">
                  ¿Cuánto tiempo duran los tamales?
                </h4>
                <p className="text-gray-600 mb-4">
                  Refrigerados duran hasta 5 días, y congelados hasta 3 meses. 
                  Incluimos instrucciones de conservación con cada pedido.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-green-700 mb-2">
                  ¿Ofrecen descuentos por volumen?
                </h4>
                <p className="text-gray-600 mb-4">
                  Sí, ofrecemos descuentos especiales para pedidos grandes 
                  y suscripciones mensuales. ¡Contáctanos para más información!
                </p>
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

export default Contacto;