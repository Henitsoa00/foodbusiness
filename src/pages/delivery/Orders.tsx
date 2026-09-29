import { useNavigate } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { Header, StatusBadge } from "../../components/ui";
import { formatPrice } from "../../data/mock";
import { useApp } from "../../context/AppContext";

export default function DeliveryOrders() {
  const { orders } = useApp();
  const navigate = useNavigate();

  return (
    <Screen>
      <Header title="Commandes à livrer" />
      <div className="px-4 pb-6">
        <p className="text-[12px] text-[#6b7a72] mb-3">
          {orders.length} commandes assignées aujourd'hui
        </p>
        <div className="flex flex-col gap-2.5">
          {orders.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => navigate(`/delivery/${o.id}`)}
              className="bg-white rounded-[14px] border border-[#eef1ee] p-3.5 text-left"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold">#{o.id}</div>
                  <div className="text-[14px] font-bold truncate">{o.companyName}</div>
                  <div className="text-[12px] text-[#6b7a72]">{o.address}</div>
                  {o.items.length > 0 && (
                    <div className="text-[11px] text-[#5b6b62] mt-1">
                      {o.items.map((i) => `${i.name} ×${i.quantity}`).join(" · ")}
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[12px] text-[#6b7a72]">{o.time}</div>
                  <div className="text-[13px] font-bold my-1">{formatPrice(o.total)}</div>
                  <StatusBadge status={o.status} kind="delivery" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Screen>
  );
}
