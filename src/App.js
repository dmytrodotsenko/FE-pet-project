import Header from "./layout/Header/Header";
import Cart from "./components/Cart/Cart";
import AppRoutes from "./routes/routes";
import AlertDialog from "./ui/Dialog";
import Modal from "./ui/Modal/Modal";
import { ToastContainer } from "react-toastify";


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
      <ToastContainer />
    </>
  );
}

export default App;
