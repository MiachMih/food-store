import Navbar from "./components/UI/Navbar";
import PlaceOrderList from "./components/Order/PlaceOrderList";
import Summary from "./components/Order/Summary";

function App() {
  return (
    <div>
      <Navbar />
      <Summary />
      <PlaceOrderList />
    </div>
  );
}

export default App;
