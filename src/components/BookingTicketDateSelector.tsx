import { DateInfo } from "@/types/dateInfo";

interface Props {
  selectedDate: DateInfo | null; // Pass the selectedDate as a prop
  setSelectedDate: (date: DateInfo) => void;
}

const BookingTicketDateSelector: React.FC<Props> = ({
  selectedDate,
  setSelectedDate,
}) => {
  // Generate future dates for the next 6 days
  const today = new Date();
  const futureDates: DateInfo[] = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }), // Short weekday format
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }), // Short month and day format
    };
  });

  // Handle date selection
  const handleSelectDate = (day: DateInfo) => {
    setSelectedDate(day);
  };

  return (
    <div className="flex flex-row gap-2">
      {futureDates.map((day, index) => (
        <button
          key={index}
          className={`p-4 rounded text-center hover:shadow-md ${
            selectedDate?.day === day.day ? "border-2 border-blue-500" : ""
          }`}
          onClick={() => handleSelectDate(day)}
        >
          <div className="text-lg">{day.day}</div>
          <div className="text-xs text-gray-600">{day.date}</div>
        </button>
      ))}
    </div>
  );
};

export default BookingTicketDateSelector;
