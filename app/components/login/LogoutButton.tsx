import { signOut } from "@/auth";
import { Flex, Button } from "@radix-ui/themes";

export const LogoutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Flex direction="column" gap="2">
        <Button color="crimson" size="2" variant="soft">
          Logout
        </Button>
      </Flex>
    </form>
  );
};
