import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/payloadTypes";
import { Check, ImageIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CartItem = ({ product }: { product: Product }) => {
  const { image } = product.images[0];

  const { items, removeItem } = useCart();
  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const cartTotal = items.reduce((acc, { product }) => acc + product.price, 0);

  return (
    <div className="space-y-3 py-2">
      <div className="relative aspect-squareh-16 w-16 min-w-fit overflow-hidden rounded">
        {typeof image !== "string" && image.url ? (
          <Image
            src={image.url}
            alt={product.name}
            fill
            className="absolute object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-secondary">
            <ImageIcon
              aria-hidden="true"
              className="h-4 w-4 text-muted-foreground"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col self-start">
        <Link href={`/product/${product.id}`}>
          <span className="line-clamp-1 text-sm font-medium mb-1">
            {product.name}
          </span>
        </Link>
        <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
          {label}
        </span>

        <div className="mt-4 text-xs text-muted-foreground">
          <button onClick={() => removeItem(product.id)}>
            <X className="w-3 h-4" /> Remove
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-1 font-medium">
        <span className="ml-auto line-clamp-1 text-sm">
          {formatPrice(product.price)}
        </span>
      </div>
      <p className="mt-4 flex space-x-2 text-sm text-gray-700">
        <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
        <span>Eligible for instant delivery</span>
      </p>
      <section>
        <h2>Order Summary</h2>
        <div>
          <p>Subtotal</p>
          <p>{formatPrice(cartTotal)}</p>
        </div>
      </section>
    </div>
  );
};

export default CartItem;
