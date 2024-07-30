import AddToCartButton from "@/components/shared/AddToCartButton";
import ImageSlider from "@/components/shared/ImageSlider";
import ProductReel from "@/components/shared/ProductReel";
import Container from "@/components/ui/container";
import { PRODUCT_CATEGORIES } from "@/config";
import { formatPrice } from "@/lib/utils";
import { getPayloadClient } from "@/payload";
import { Check, Shield } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    productId: string;
  };
}

const BREADCRUMBS = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Products", href: "/products" },
];

const ProductDetails = async ({ params }: PageProps) => {
  const { productId } = params;
  const payload = await getPayloadClient();

  const { docs: products } = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: "approved",
      },
    },
  });

  const [product] = products;

  if (!product) return notFound();

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const imageUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  return (
    <Container>
      {BREADCRUMBS.map((breadcrumb, i) => (
        <li key={i}>
          <Link href={breadcrumb.href}>{breadcrumb.name}</Link>
          {i !== BREADCRUMBS.length - 1 ? (
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
          ) : null}
        </li>
      ))}
      <h2>{product.name as string}</h2>
      <p>{formatPrice(product.price as number)}</p>
      <p>{label}</p>
      <p>{product.description as string}</p>
      <div>
        <Check
          aria-hidden="true"
          className="h-5 w-5 flex-shrink-0 text-green-500"
        />
        <p>Eligible for instant delivery</p>
      </div>

      <div className="mt-10">
        <ImageSlider urls={imageUrls} />
      </div>

      <div>
        <AddToCartButton product={product} />
        <div></div>
        <div>
          <Shield aria-hidden="true" className="h-5 w-5" />
          <span>30 days return guarantee</span>
        </div>
      </div>

      <ProductReel
        href="/products"
        query={{ category: product.category as string, limit: 4 }}
        title={`Similar ${label}`}
        subtitle={`Browse Similar high quqlity ${label} just  like '${product.name}'`}
      />
    </Container>
  );
};

export default ProductDetails;
