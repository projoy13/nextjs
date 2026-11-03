
"use client";

import { useState } from "react";

interface RentDateSelectorProps {
  pricePerDay: string;
  stock: number;
}

const RentDateSelector = ({
  pricePerDay,
  stock,
}: RentDateSelectorProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const price = Number(pricePerDay);

  // Calculate rental days
  const rentalDays =
    startDate && endDate
      ? Math.max(
          1,
          Math.round(
            (Date.parse(endDate + "T00:00:00Z") -
              Date.parse(startDate + "T00:00:00Z")) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const totalPrice = rentalDays * price;

  return (
    <div className="mt-8">
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        disabled={stock <= 0}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold"
      >
        {showCalendar ? "Close Calendar" : "Rent Now"}
      </button>

      {showCalendar && (
        <div className="mt-6 border rounded-xl p-6 shadow-sm max-w-md">
          <h2 className="text-xl font-bold mb-4">
            Select Rental Dates
          </h2>

          <p className="text-gray-600 mb-4">
            Price per day: €{price.toFixed(2)}
          </p>

          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-2">
                Start Date
              </label>

              <input
                type="date"
                min={minDate}
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);

                  if (endDate && e.target.value > endDate) {
                    setEndDate("");
                  }
                }}
                className="border rounded-lg p-3 w-full"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                End Date
              </label>

              <input
                type="date"
                min={startDate || minDate}
                value={endDate}
                disabled={!startDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded-lg p-3 w-full disabled:bg-gray-100"
              />
            </div>
          </div>

          {rentalDays > 0 && (
            <div className="mt-6 bg-gray-100 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span>Rental duration:</span>
                <strong>{rentalDays} days</strong>
              </div>

              <div className="flex justify-between mb-2">
                <span>Price per day:</span>
                <strong>€{price.toFixed(2)}</strong>
              </div>

              <hr className="my-3" />

              <div className="flex justify-between text-lg">
                <strong>Total Price:</strong>
                <strong className="text-green-600">
                  €{totalPrice.toFixed(2)}
                </strong>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RentDateSelector;
