import { useNavigate } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { Header, StatusBadge } from "../../components/ui";
import { formatPrice } from "../../data/mock";
import { useApp } from "../../context/AppContext";

export default function History() {
  const navigate = useNavigate();
  const { orders } = useApp();
  const mine = orders.filter((o) => o.companyId === "abc");

  return (
    <Screen>
      <Header title="Historique des commandes" onBack={() => navigate("/client/home")} />
      <div className="px-4 pb-6 flex flex-col gap-2.5">
        {mine.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => navigate(`/client/payment?id=${o.id}`)}
            className="bg-white rounded-[14px] border border-[#eef1ee] p-3.5 text-left shadow-[0_1px_3px_rgba(16,40,24,0.04)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[14px] font-semibold">#{o.id}</div>
                <div className="text-[12px] text-[#6b7a72] mt-0.5">{o.dateLabel}</div>
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
