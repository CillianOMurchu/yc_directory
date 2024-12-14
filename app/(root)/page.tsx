import ChatBox from "@/app/components/Chat";
import PromptForm from "@/app/components/PromptForm";
import { auth } from "@/auth";

const App = async () => {
  const session = await auth();

  return (
    <div className="app">
      <PromptForm session={session} />
      <ChatBox session={session} />
    </div>
  );
};

export default App;
