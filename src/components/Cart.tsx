import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/pages/Index";
import { useToast } from "@/hooks/use-toast";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  totalPrice: number;
}

export const Cart = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemoveItem, 
  onUpdateQuantity, 
  totalPrice 
}: CartProps) => {
  const { toast } = useToast();

  console.log("Cart rendered with items:", items);

  const handleCheckout = () => {
    console.log("Checkout initiated with items:", items);
    toast({
      title: "¡Pedido realizado!",
      description: `Tu pedido por $${totalPrice.toFixed(2)} ha sido procesado. ¡Gracias por tu compra!`,
    });
    // Clear cart after checkout
    items.forEach(item => onRemoveItem(item.id));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-xl">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-green-800 flex items-center gap-2">
              <ShoppingBag className="h-6 w-6" />
              Carrito
            </h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
              <p className="text-gray-400 mt-2">¡Agrega algunos tamales deliciosos para tu mascota!</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50">
                    <div className="text-3xl">{item.image}</div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-green-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.animalType}</p>
                      <p className="font-bold text-green-600">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                      <Button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      onClick={() => onRemoveItem(item.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold text-green-800">Total:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                >
                  Realizar Pedido
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};