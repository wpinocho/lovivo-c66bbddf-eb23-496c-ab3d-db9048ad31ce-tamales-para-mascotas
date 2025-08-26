import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/pages/Index";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  console.log("ProductCard rendered for:", product.name);

  const handleAddToCart = () => {
    console.log("Add to cart clicked for:", product.name);
    onAddToCart(product);
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300 bg-white border-2 border-green-100">
      <CardHeader className="text-center pb-4">
        <div className="text-6xl mb-4">{product.image}</div>
        <CardTitle className="text-xl font-bold text-green-800">{product.name}</CardTitle>
        <Badge variant="secondary" className="w-fit mx-auto bg-green-100 text-green-800">
          {product.animalType}
        </Badge>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <CardDescription className="text-gray-600 mb-4 text-center">
          {product.description}
        </CardDescription>
        
        <div className="mb-4">
          <h4 className="font-semibold text-green-700 mb-2">Ingredientes:</h4>
          <div className="flex flex-wrap gap-1">
            {product.ingredients.map((ingredient, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {ingredient}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between pt-4 border-t">
        <div className="text-2xl font-bold text-green-600">
          ${product.price.toFixed(2)}
        </div>
        <Button 
          onClick={handleAddToCart}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
};