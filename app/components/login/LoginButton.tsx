import { signIn } from "@/auth";
import { Button } from "@radix-ui/themes";

type LoginButtonProps = {
  provider: {
    name: string;
  };
};

export const LoginButton = ({ provider }: LoginButtonProps) => {
  return (
    <div>
      {provider?.name ? (
        <form
          action={async () => {
            "use server";
            await signIn(provider.name);
          }}
        >
          <Button type="submit" color="green" size="2" variant="soft">
            Login With{" "}
            {provider.name.charAt(0).toUpperCase() + provider.name.slice(1)}
          </Button>
        </form>
      ) : (
        <>
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <Button type="submit" color="green" size="2" variant="soft">
              Login With Google
            </Button>
          </form>
        </>
      )}
    </div>
  );
};
