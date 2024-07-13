import { useRouter } from "next/navigation";

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

  return { logOut };
};
