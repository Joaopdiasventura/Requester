import { HeaderComponent } from "./components/header";
import { MainComponent } from "./components/main";
import { SideBar } from "./components/sideBars";
import { RequestProvider } from "./contexts/requests";

function App(): JSX.Element {
  return (
    <div className="bg-zinc-950 text-zinc-50 flex flex-col gap-1 flex-wrap w-screen h-screen p-2 border border-white/30">
      <HeaderComponent />
      <div className="flex flex-row flex-grow gap-2">
        <RequestProvider>
          <SideBar />
          <MainComponent />
        </RequestProvider>
      </div>
    </div>
  );
}

export default App;
