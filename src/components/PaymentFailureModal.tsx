interface Props {
  setShowFailureModal: (showFailureModal: Boolean) => void;
}

const PaymentFailureModal: React.FC<Props> = ({ setShowFailureModal }) => {
  const handleCloseModal = () => {
    setShowFailureModal(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-lg">
        <p className="text-red-500 text-lg font-semibold">
          Payment failed or canceled.
        </p>
        <p className="">Please try again or use a different payment method.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleCloseModal}
        >
          ok
        </button>
      </div>
    </div>
  );
};

export default PaymentFailureModal;
