import { useCart } from "@/context/CartContext";
import CartItem from "@/types/cartItem";
import Image from "next/image";

interface Props {
  item: CartItem;
}

const CartItemCard: React.FC<Props> = ({ item }) => {
  const { removeFromCart, updateCartItemQuantity } = useCart();
  const handleQuantityChange = (itemId: number, quantity: number) => {
    updateCartItemQuantity(itemId, quantity);
  };

  return (
    <div className="relative flex w-full pb-4 mb-4 rounded-md shadow border border-gray-70">
      {/* Image Column */}
      <div className="flex-initial p-4">
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          width={128}
          height={90}
          className="w-[128px] h-[90px] object-cover rounded-sm md:w-[182px] md:h-[121px]"
        />
      </div>

      {/* Description Column */}
      <div className="flex-grow p-4 flex  md:flex-col relative">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-2 md:mb-0">
          <div className="flex flex-col">
            <a
              href={`/parks/${item.product.id}`}
              className="text-lg font-semibold text-gray-800"
            >
              {item.product.name}
            </a>

            <div className="flex items-center text-gray-500 mt-2  text-sm lg:text-lg">
              <i className="fas fa-ticket mr-2"></i>
              <p> {item.ticket.type}</p>
            </div>

            <div className="flex items-center text-gray-500 mt-2 text-sm lg:text-lg">
              <i className="fas fa-calendar-alt mr-2"></i>
              <p>
                {item.date.day} {item.date.date}
              </p>
            </div>
          </div>

          {/* Total Amount */}
          <div className="flex items-center px-2 py-4">
            <div className="flex items-center border border-gray-200 rounded px-4 mr-2">
              <span className="text-gray-800 mr-1 text-sm lg:text-lg">Qty</span>
              <div className="relative">
                <select
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  className="appearance-none bg-transparent focus:outline-none pr-6 text-sm lg:text-lg"
                >
                  {Array.from({ length: 4 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <i className="fas fa-chevron-down text-gray-700"></i>
                </div>
              </div>
            </div>

            <p className="text-sm lg:text-lg font-semibold text-gray-800 md:ml-4">
              AED {item.totalPrice}
            </p>
          </div>
        </div>
        <button
          className="absolute text-xl px-4 bottom-0 right-0 text-blue-600"
          onClick={() => removeFromCart(item.id)}
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
