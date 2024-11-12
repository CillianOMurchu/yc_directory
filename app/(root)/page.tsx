import ChatBox from "@/app/components/Chat";
import { auth } from "@/auth";

const App = async () => {
  const session = await auth();
  return <ChatBox session={session} />;
};

export default App;
