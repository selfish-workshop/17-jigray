"use client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalPaymentProps {
  amount: number;
  description: string;
  onSuccess: (details: Record<string, unknown>) => void;
  onError: (err: unknown) => void;
}

export default function PayPalPayment({ amount, description, onSuccess, onError }: PayPalPaymentProps) {
  const usdAmount = (amount / 1350).toFixed(2); // KRW → USD 근사 환율

  return (
    <PayPalScriptProvider
      options={{
        clientId: "test", // Sandbox mode — "test" triggers PayPal sandbox
        currency: "USD",
        intent: "capture",
      }}
    >
      <div className="space-y-3">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
          <p className="font-medium text-amber-800">PayPal Sandbox Mode</p>
          <p className="text-amber-600 text-xs mt-1">
            This is a demo. No real payment will be processed.
          </p>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Description</span>
            <span className="font-medium text-slate-700">{description}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Amount (KRW)</span>
            <span className="font-medium">&#8361;{amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-2">
            <span className="text-slate-500">Amount (USD)</span>
            <span className="font-bold text-blue-600">${usdAmount}</span>
          </div>
          <p className="text-xs text-slate-400">Exchange rate: ~1,350 KRW/USD (approximate)</p>
        </div>

        <PayPalButtons
          style={{
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "pay",
            height: 45,
          }}
          createOrder={(_data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: description,
                  amount: {
                    currency_code: "USD",
                    value: usdAmount,
                  },
                },
              ],
            });
          }}
          onApprove={async (_data, actions) => {
            if (actions.order) {
              const details = await actions.order.capture();
              onSuccess(details as unknown as Record<string, unknown>);
            }
          }}
          onError={(err) => {
            console.error("PayPal error:", err);
            onError(err);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}
