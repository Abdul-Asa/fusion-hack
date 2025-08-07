import React from "react";

interface CurrencyBadgeProps {
  currency: string;
  symbol: string;
  className?: string;
}

const CurrencyBadge: React.FC<CurrencyBadgeProps> = ({
  currency,
  symbol,
  className = "",
}) => {
  return (
    <div
      className={`inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 text-sm font-medium hover:bg-emerald-500/30 transition-colors ${className}`}
    >
      <span className="mr-1">{symbol}</span>
      <span>{currency}</span>
    </div>
  );
};

export default CurrencyBadge;
