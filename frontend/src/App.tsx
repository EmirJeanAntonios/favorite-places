import Header from "./components/Header/Header";
import MapView from "./views/MapView/MapView";

function App() {
  return (
    <main className="h-screen grid grid-rows-[70px_auto]">
      <Header />
      <MapView />
    </main>
  );
}

export default App;
