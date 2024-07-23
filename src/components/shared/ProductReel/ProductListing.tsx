"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/payloadTypes";
import Link from "next/link";
import { useEffect, useState } from "react";
import ImageSlider from "../ImageSlider";

interface ProductListingProps {
  product: Product | null;
  index: number;
}

const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductPlaceholder />;

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const imageUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  if (product && isVisible) {
    return (
      <Link href={`/product/${product.id}`}>
        <ImageSlider urls={imageUrls} />
        <h3>{product.name}</h3>
        <p>{label}</p>
        <p>{formatPrice(product.price)}</p>
      </Link>
    );
  }

  return <div>ProductListing</div>;
};

const ProductPlaceholder = () => {
  return <div>ProductPlaceholderSkeleton</div>;
};

export default ProductListing;
