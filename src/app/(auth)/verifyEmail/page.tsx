import VerifyEmail from "@/components/auth/VerifyEmail";
import Container from "@/components/ui/container";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const VerifyEmailPage = ({ searchParams }: PageProps) => {
  const token = searchParams.token;
  const toEmail = searchParams.to;

  return (
    <Container className="items-center">
      {token && typeof token === "string" ? (
        <div className="grid grid-cols-6">
          <VerifyEmail token={token} />
        </div>
      ) : (
        <div className="">
          <h3>Check your email</h3>
          {toEmail ? (
            <p>
              We&apos;ve sent a verification link to <span>{toEmail}</span>.
            </p>
          ) : (
            <p>We&apos;ve sent a verification link to your email.</p>
          )}
        </div>
      )}
    </Container>
  );
};

export default VerifyEmailPage;
