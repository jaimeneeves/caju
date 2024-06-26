import Router from "~/router";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Header>
        <h1>Caju Board</h1>
      </Header>
      <Router />
    </>
  );
}

export default App;
