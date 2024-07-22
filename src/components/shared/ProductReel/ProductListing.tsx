"use client";

import { Product } from "@/payloadTypes";
import Link from "next/link";
import { useEffect, useState } from "react";

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

  if (isVisible && product) {
    return (
      <Link href={`/product/${product.id}`}>
        <h3>{product.name}</h3>
        <p>{product.category}</p>
      </Link>
    );
  }

  return <div>ProductListing</div>;
};

const ProductPlaceholder = () => {
  return <div>ProductPlaceholderSkeleton</div>;
};

export default ProductListing;
