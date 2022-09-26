import Header from "./layout/Header/Header";
import AppRoutes from "./routes/routes";
import AlertDialog from "./ui/Alert";
import Modal from "./ui/Modal/Modal";

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
    </>
  );
}

export default App;
