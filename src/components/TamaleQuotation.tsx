import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calculator, PawPrint } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuotationData {
  animalType: string;
  quantity: number;
  premium: boolean;
  delivery: boolean;
  subscription: boolean;
}

const animalPrices = {
  perros: 25.00,
  gatos: 30.00,
  aves: 20.00,
  roedores: 15.00,
  reptiles: 35.00,
  peces: 18.00
};

export const TamaleQuotation = () => {
  const [quotation, setQuotation] = useState<QuotationData>({
    animalType: '',
    quantity: 1,
    premium: false,
    delivery: false,
    subscription: false
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  console.log("TamaleQuotation rendered with data:", quotation);

  const calculatePrice = () => {
    console.log("Calculating price for:", quotation);
    
    if (!quotation.animalType) {
      toast({
        title: "Error",
        description: "Por favor selecciona el tipo de animal",
        variant: "destructive"
      });
      return;
    }

    let basePrice = animalPrices[quotation.animalType as keyof typeof animalPrices] || 0;
    let total = basePrice * quotation.quantity;

    // Aplicar descuentos y recargos
    if (quotation.premium) {
      total *= 1.3; // 30% más por ingredientes premium
    }
    
    if (quotation.delivery) {
      total += 50; // Costo fijo de entrega
    }
    
    if (quotation.subscription) {
      total *= 0.85; // 15% descuento por suscripción
    }

    // Descuento por volumen
    if (quotation.quantity >= 20) {
      total *= 0.9; // 10% descuento
    } else if (quotation.quantity >= 10) {
      total *= 0.95; // 5% descuento
    }

    console.log("Calculated total price:", total);
    setTotalPrice(total);
    setShowResult(true);

    toast({
      title: "¡Cotización calculada!",
      description: `El precio total es $${total.toFixed(2)}`,
    });
  };

  const handleInputChange = (field: keyof QuotationData, value: any) => {
    console.log(`Updating ${field} to:`, value);
    setQuotation(prev => ({
      ...prev,
      [field]: value
    }));
    setShowResult(false);
  };

  const resetQuotation = () => {
    console.log("Resetting quotation");
    setQuotation({
      animalType: '',
      quantity: 1,
      premium: false,
      delivery: false,
      subscription: false
    });
    setTotalPrice(0);
    setShowResult(false);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-yellow-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800 mb-4 flex items-center justify-center gap-3">
            <Calculator className="h-10 w-10" />
            Cotizador de Tamales
          </h2>
          <p className="text-xl text-green-600 max-w-2xl mx-auto">
            Calcula el precio perfecto para los tamales de tu mascota
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulario de cotización */}
            <Card className="shadow-xl border-2 border-green-100">
              <CardHeader className="bg-green-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <PawPrint className="h-6 w-6" />
                  Configurar Pedido
                </CardTitle>
                <CardDescription className="text-green-100">
                  Personaliza tu pedido para obtener el mejor precio
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label htmlFor="animalType" className="text-green-800 font-semibold">
                    Tipo de Animal
                  </Label>
                  <Select onValueChange={(value) => handleInputChange('animalType', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecciona el tipo de animal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perros">🐕 Perros - $25.00 c/u</SelectItem>
                      <SelectItem value="gatos">🐱 Gatos - $30.00 c/u</SelectItem>
                      <SelectItem value="aves">🦜 Aves - $20.00 c/u</SelectItem>
                      <SelectItem value="roedores">🐹 Roedores - $15.00 c/u</SelectItem>
                      <SelectItem value="reptiles">🦎 Reptiles - $35.00 c/u</SelectItem>
                      <SelectItem value="peces">🐠 Peces - $18.00 c/u</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="quantity" className="text-green-800 font-semibold">
                    Cantidad
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max="100"
                    value={quotation.quantity}
                    onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Descuentos: 10+ tamales (5% off), 20+ tamales (10% off)
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="premium"
                      checked={quotation.premium}
                      onCheckedChange={(checked) => handleInputChange('premium', checked)}
                    />
                    <Label htmlFor="premium" className="text-green-800">
                      Ingredientes Premium (+30%)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="delivery"
                      checked={quotation.delivery}
                      onCheckedChange={(checked) => handleInputChange('delivery', checked)}
                    />
                    <Label htmlFor="delivery" className="text-green-800">
                      Entrega a domicilio (+$50.00)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="subscription"
                      checked={quotation.subscription}
                      onCheckedChange={(checked) => handleInputChange('subscription', checked)}
                    />
                    <Label htmlFor="subscription" className="text-green-800">
                      Suscripción mensual (-15%)
                    </Label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={calculatePrice}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Calcular Precio
                  </Button>
                  <Button
                    onClick={resetQuotation}
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Limpiar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Resultado de la cotización */}
            <Card className="shadow-xl border-2 border-yellow-100">
              <CardHeader className="bg-yellow-500 text-white">
                <CardTitle>Resumen de Cotización</CardTitle>
                <CardDescription className="text-yellow-100">
                  Tu pedido personalizado
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {showResult ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-2xl font-bold text-green-800 mb-4">
                        Detalles del Pedido
                      </h3>
                      <div className="space-y-2 text-green-700">
                        <p><strong>Animal:</strong> {quotation.animalType}</p>
                        <p><strong>Cantidad:</strong> {quotation.quantity} tamales</p>
                        <p><strong>Precio base:</strong> ${(animalPrices[quotation.animalType as keyof typeof animalPrices] * quotation.quantity).toFixed(2)}</p>
                        
                        {quotation.premium && (
                          <p className="text-purple-600">✨ Ingredientes Premium (+30%)</p>
                        )}
                        {quotation.delivery && (
                          <p className="text-blue-600">🚚 Entrega a domicilio (+$50.00)</p>
                        )}
                        {quotation.subscription && (
                          <p className="text-orange-600">📅 Suscripción mensual (-15%)</p>
                        )}
                        {quotation.quantity >= 10 && (
                          <p className="text-green-600">
                            🎉 Descuento por volumen (-{quotation.quantity >= 20 ? '10' : '5'}%)
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
                      <div className="text-center">
                        <p className="text-lg text-yellow-800 mb-2">Precio Total</p>
                        <p className="text-4xl font-bold text-yellow-600">
                          ${totalPrice.toFixed(2)}
                        </p>
                        <p className="text-sm text-yellow-700 mt-2">
                          IVA incluido
                        </p>
                      </div>
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
                      Agregar al Carrito
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🧮</div>
                    <p className="text-gray-500 text-lg">
                      Configura tu pedido y calcula el precio
                    </p>
                    <p className="text-gray-400 mt-2">
                      Selecciona las opciones arriba para ver tu cotización
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">
            ¿Por qué nuestros precios son justos?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🌱</div>
              <h4 className="font-semibold text-green-700 mb-2">Ingredientes Frescos</h4>
              <p className="text-gray-600 text-sm">
                Utilizamos solo ingredientes frescos y naturales, sin conservadores
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">👨‍🍳</div>
              <h4 className="font-semibold text-green-700 mb-2">Elaboración Artesanal</h4>
              <p className="text-gray-600 text-sm">
                Cada tamal es preparado a mano por nuestros expertos chefs
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🏆</div>
              <h4 className="font-semibold text-green-700 mb-2">Calidad Premium</h4>
              <p className="text-gray-600 text-sm">
                Supervisión veterinaria y control de calidad en cada lote
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};