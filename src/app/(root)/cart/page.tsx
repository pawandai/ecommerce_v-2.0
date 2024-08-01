"use client";

import Cart from "@/components/shared/Cart";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { trpc } from "@/trpc/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { items } = useCart();
  const router = useRouter();

  const { mutate: createCheckoutSession, isPending } =
    trpc.payment.createSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) router.push(url);
      },
    });

  const productIds = items.map(({ product }) => product.id);

  return (
    <div>
      <Cart />
      <div className="mt-6">
        <Button
          disabled={isPending || items.length === 0}
          className="w-full"
          size={"lg"}
          onClick={() => createCheckoutSession({ productIds })}
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
          ) : null}
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
