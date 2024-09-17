import { DateInfo } from "./dateInfo";
import { Product } from "./product";
import { Ticket } from "./themPark";

export default interface CartItem {
  id: number;
  product: Product;
  ticket: Ticket;
  date: DateInfo;
  quantity: number;
  totalPrice: number;
}
