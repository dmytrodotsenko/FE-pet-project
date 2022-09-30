import Header from "./layout/Header/Header";
import Cart from "./components/Cart/Cart";
import AppRoutes from "./routes/routes";
import AlertDialog from "./ui/Alert";
import Modal from "./ui/Modal/Modal";


function App() {
  return (
    <>
      <Header>
        <main>
          <AppRoutes />
          {/* <Cart/> */}
        </main>
      </Header>
      <Modal />
      <AlertDialog />
    </>
  );
}

export default App;
