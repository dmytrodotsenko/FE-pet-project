import Header from "./layout/Header/Header";
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
        </main>
      </Header>
      <Modal />
      <AlertDialog />
      <ToastContainer />
    </>
  );
}

export default App;
