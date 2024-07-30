"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/hooks/useCart";
import CartItem from "./CartItem";

const Cart = () => {
  const { items } = useCart();
  const itemCount = items.length;

  let fee = 1;

  const cartTotal = items.reduce((acc, { product }) => acc + product.price, 0);
  return (
    <div>
      <h1>Cart</h1>
      <ScrollArea>
        {items.map(({ product }) => (
          <CartItem key={product.id} product={product} />
        ))}
      </ScrollArea>
      <p>{itemCount} items</p>
      <p>Total: {cartTotal + fee}</p>
    </div>
  );
};

export default Cart;
