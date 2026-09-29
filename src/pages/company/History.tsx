import { useNavigate } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { Header, StatusBadge } from "../../components/ui";
import { formatPrice, initialOrders } from "../../data/mock";

export default function CompanyHistory() {
  const navigate = useNavigate();
  const list = initialOrders.filter((o) => o.companyId === "abc");
  return (
    <Screen>
      <Header title="Historique" />
      <div className="px-4 pb-6 flex flex-col gap-2.5">
        {list.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => navigate("/company/orders")}
            className="bg-white rounded-[14px] border border-[#eef1ee] p-3.5 text-left"
          >
            <div className="flex justify-between">
              <div>
                <div className="text-[14px] font-semibold">#{o.id}</div>
                <div className="text-[12px] text-[#6b7a72]">{o.dateLabel}</div>
              </div>
              <div className="text-right">
                <div className="text-[13px] font-bold mb-1">{formatPrice(o.total)}</div>
                <StatusBadge status={o.status} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </Screen>
  );
}
