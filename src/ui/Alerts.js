import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const succsessAlert = () => {
    toast.success("This item added to the cart", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
}
export const succsessBuy = () => {
    toast.success("Your items is proceed. Check your email for invoice", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
}