import { getServerSideUser } from "@/lib/utils";
import { getPayloadClient } from "@/payload";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

interface ThankYouPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const ThankYouPage = async ({ searchParams }: ThankYouPageProps) => {
  const orderId = searchParams.orderId;
  const nextCookies = cookies();

  const {} = await getServerSideUser(nextCookies);
  const payload = await getPayloadClient();

  const { docs: orders } = await payload.find({
    collection: "orders",
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  });

  const [order] = orders;

  if (!order) return notFound();

  const orderUserId =
    typeof order.user === "string" ? order.user : order.user.id;

  if (orderUserId !== user?.id)
    return redirect(`/signin?origin=thankyou?orderId=${orderId}`);

  return (
    <main className="relative lg:min-h-full">
      Thank you for your purchase{" "}
      <div>{order._isPaid ? <p>Your order was processed</p> : <p></p>}</div>
    </main>
  );
};

export default ThankYouPage;
