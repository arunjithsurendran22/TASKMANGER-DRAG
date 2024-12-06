
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/AppRouter";
import "./App.css";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}> 
      <AppRouter />
      <Toaster position="top-center" />
    </Provider>
  );
}

export default App;
