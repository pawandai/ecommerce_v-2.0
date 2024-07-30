import Cart from "@/components/shared/Cart";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  return (
    <div>
      <Cart />
      <div className="mt-6">
        <Button className="w-full" size={"lg"}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
