import { User } from "@/payloadTypes";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { useRouter } from "next/navigation";
import { NextRequest } from "next/server";

export const useAuth = () => {
  const router = useRouter();

  const logOut = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error();

      console.log("Logged out successfully");

      router.push("/signin");
      router.refresh();
    } catch (error) {
      console.log("Failed to log out, Please try again");
    }
  };

  const getUser = async (
    cookies: NextRequest["cookies"] | ReadonlyRequestCookies
  ) => {
    const token = cookies.get("payload-token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { user } = (await response.json()) as { user: User | null };

    return user;
  };

  return { logOut, getUser };
};
