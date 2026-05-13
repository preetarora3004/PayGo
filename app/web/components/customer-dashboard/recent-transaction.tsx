import {
  ArrowUpRight,
  ArrowDownLeft,
  ShoppingBag,
  Coffee,
  Zap,
  Utensils,
  Monitor,
} from "lucide-react";

const transactions = [
  {
    id: 1,
    name: "Preet Arora",
    category: "Sent",
    date: "Today, 6:10 PM",
    amount: -550.0,
    icon: Monitor,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
  },
  {
    id: 2,
    name: "Nikhil Sisodia",
    category: "Sent",
    date: "Today, 11:15 AM",
    amount: -550.0,
    icon: ArrowUpRight,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    id: 3,
    name: "Starbucks",
    category: "Food & Drink",
    date: "Yesterday, 4:45 PM",
    amount: -6.5,
    icon: Coffee,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    id: 4,
    name: "Electric Bill",
    category: "Utilities",
    date: "Yesterday, 9:00 AM",
    amount: -89.0,
    icon: Zap,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-500",
  },
  {
    id: 5,
    name: "Harmindar Singh",
    category: "Sent",
    date: "Apr 20, 3:20 PM",
    amount: -120.0,
    icon: ArrowUpRight,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    id: 6,
    name: "Sugreev Paaji",
    category: "Shopping",
    date: "Apr 20, 1:00 PM",
    amount: -47.99,
    icon: ShoppingBag,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
  },
  {
    id: 7,
    name: "Michael Sharma",
    category: "Received",
    date: "Apr 19, 6:30 PM",
    amount: 85.0,
    icon: ArrowDownLeft,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    id: 8,
    name: "Restaurant",
    category: "Food & Drink",
    date: "Apr 19, 12:45 PM",
    amount: -32.5,
    icon: Utensils,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

export default function RecentTransactions() {
  return (
    <div className="rounded-2xl bg-[#FFFFFF] p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#2C1810]">
          Recent Transactions
        </h3>
        <button className="flex items-center gap-1 text-xs font-medium text-[#B79863] hover:text-[#D4BA8B] transition-colors">
          View All <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>

      <div className="mt-4 space-y-1 max-h-80 overflow-y-auto">
        {transactions.map((tx) => {
          const Icon = tx.icon;
          return (
            <div
              key={tx.id}
              className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-[#F9F6F2] cursor-pointer"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tx.iconBg}`}
              >
                <Icon className={`h-4.5 w-4.5 ${tx.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#2C1810] truncate">
                  {tx.name}
                </p>
                <p className="text-xs text-[#7A6B5D]">{tx.date}</p>
              </div>
              <div className="text-right shrink-0">
                <p
                  className={`text-sm font-semibold ${
                    tx.amount > 0 ? "text-emerald-600" : "text-[#2C1810]"
                  }`}
                >
                  {tx.amount > 0 ? "+" : ""}
                  {tx.amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "INR",
                  })}
                </p>
                <p className="text-[10px] text-[#7A6B5D]">
                  {tx.category}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

