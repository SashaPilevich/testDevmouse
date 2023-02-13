import { Provider } from "react-redux";
import "./App.css";
import { ListOfOrder } from "./components/calculation";
import { NewEntry } from "./components/newEntry";
import { store } from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <NewEntry />
        <ListOfOrder />
      </Provider>
    </div>
  );
}

export default App;
