import ProductReel from "@/components/shared/ProductReel";
import Container from "@/components/ui/container";

export default function Home() {
  return (
    <Container>
      <div>Hello World</div>
      <ProductReel
        query={{ sort: "desc", limit: 4 }}
        title="New Product"
        href="/products"
      />
    </Container>
  );
}
