"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isLoading) return <div>Verifying...</div>;

  if (isError)
    return (
      <div>
        Something went wrong. The token is not valid or might be expired.
      </div>
    );

  if (data?.success)
    return (
      <div>
        Email Verified Successfully. <Button>Continue to App</Button>
      </div>
    );
};

export default VerifyEmail;
