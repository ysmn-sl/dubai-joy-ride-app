import { useRouter } from "next/router";

const EmptyCart: React.FC = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-full py-32">
      <i className="fa fa-solid fa-basket-shopping  fa-3x text-gray-400"></i>
      <h1 className="mt-6 text-xl font-semibold text-gray-700">
        Your cart is empty
      </h1>
      <p className="mt-2 text-gray-500 text-center">
        Looks like you haven&#39;t added anything to your cart yet.
      </p>
      <button
        className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none"
        onClick={() => {
          router.push("/parks");
        }}
      >
        Start Shopping
      </button>
    </div>
  );
};

export default EmptyCart;
