import InputField from "@/addListing/components/InputField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

function FinancialCalulator({ carDetail }) {
  const [carPrice, setCarPrice] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [downPayment, setDwonPayment] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const calculateMonthlyPayment = () => {
    const Principal = carPrice - downPayment;
    const MonthlyInterestRate = interestRate / 1200;
    const MonthlyPayment =
      (Principal *
        MonthlyInterestRate *
        Math.pow(1 + MonthlyInterestRate, loanTerm)) /
      (Math.pow(1 + MonthlyInterestRate, loanTerm) - 1);
    setMonthlyPayment(Math.round(MonthlyPayment, 1));
  };
  return (
    <div className="p-10 border rounded-xl shadow-md mt-7">
      <h2 className="font-medium text-2xl">Financial Calculator</h2>
      <div className="flex gap-5 mt-5">
        <div className="w-full">
          <label htmlFor="">Price $</label>
          <Input
            type="number"
            onChange={(val) => setCarPrice(val.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="">Interest Rate</label>
          <Input
            type="number"
            onChange={(val) => setInterestRate(val.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-5 mt-5">
        <div className="w-full">
          <label htmlFor="">Long Term (Months)</label>
          <Input
            type="number"
            onChange={(val) => setLoanTerm(val.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="">Down Payment</label>
          <Input
            type="number"
            onChange={(val) => setDwonPayment(val.target.value)}
          />
        </div>
      </div>
      {
        monthlyPayment>0 &&
        <h2 className="font-medium text-2xl mt-5">
          Your Monthly Payment Is :{" "}
          <span className="text-4xl font-bold">{monthlyPayment} $</span>
        </h2>
      }
      <Button
        onClick={calculateMonthlyPayment}
        className="w-full mt-5"
        size="lg"
      >
        Calculate
      </Button>
    </div>
  );
}

export default FinancialCalulator;
