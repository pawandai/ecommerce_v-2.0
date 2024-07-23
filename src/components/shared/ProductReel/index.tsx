"use client";

import { Product } from "@/payloadTypes";
import { trpc } from "@/trpc/client";
import { TQueryValidator } from "@/validators";
import Link from "next/link";
import ProductListing from "./ProductListing";

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidator;
}

const FALLBACK_LIMIT = 4;

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, href, query } = props;

  const { data: queryResults, isLoading } =
    trpc.getInfiniteProducts.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const products = queryResults?.pages.flatMap((page) => page.items);

  let map: (Product | null)[] = [];

  if (products && products.length) {
    map = products;
  } else if (isLoading) {
    map = new Array(query.limit ?? FALLBACK_LIMIT).fill(null);
  }

  console.log(queryResults);

  return (
    <div>
      <div>
        {title} and {subtitle}
        {href ? (
          <Link href={href}>
            Shop the collection <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : null}
      </div>
      <div className="max-w-[360px]">
        {map.map((product, i) => (
          <ProductListing key={i} index={i} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductReel;
