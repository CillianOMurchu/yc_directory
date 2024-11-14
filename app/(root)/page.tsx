import ChatBox from "@/app/components/Chat";
import { auth } from "@/auth";

const App = async () => {
  const session = await auth();


  return (
    <div className="app">
      <ChatBox session={session} />
    </div>
  );
};

export default App;
