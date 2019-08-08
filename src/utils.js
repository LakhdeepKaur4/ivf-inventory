import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  autoClose: 3000,
  draggable: false,
})
export function toasterMessage(type, message){
	toast[type](message)
}