import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";

const Header = () => {
  return (
    <div className="bg-slate-300 shadow-md">
      <Container>
        Hello Header <Button>Button</Button>
      </Container>
    </div>
  );
};

export default Header;
