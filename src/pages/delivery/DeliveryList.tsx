import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { Header, StatusBadge, Tabs } from "../../components/ui";
import { formatPrice } from "../../data/mock";
import { useApp } from "../../context/AppContext";

export default function DeliveryList() {
  const { orders } = useApp();
  const [tab, setTab] = useState("todo");
  const navigate = useNavigate();

  const list = useMemo(() => {
    if (tab === "todo") return orders.filter((o) => o.status === "en_attente" || o.status === "en_preparation");
    if (tab === "going") return orders.filter((o) => o.status === "en_livraison");
    return orders.filter((o) => o.status === "livree");
  }, [orders, tab]);

  return (
    <Screen>
      <Header title="Mes livraisons" menu={() => navigate("/roles")} />
      <div className="px-4 pb-6">
        <Tabs
          tabs={[
            { id: "todo", label: "À livrer" },
            { id: "going", label: "En cours" },
            { id: "done", label: "Livré" },
          ]}
          value={tab}
          onChange={setTab}
        />
        <div className="mt-3 flex flex-col gap-2.5">
          {list.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => navigate(`/delivery/${o.id}`)}
              className="bg-white rounded-[14px] border border-[#eef1ee] p-3.5 text-left"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e7f4ec] text-[#1B7A4A] flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7" />
                    <circle cx="6.5" cy="17.5" r="1.5" />
                    <circle cx="17.5" cy="17.5" r="1.5" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <div className="text-[14px] font-semibold truncate">{o.companyName}</div>
                    <StatusBadge status={o.status} kind="delivery" />
                  </div>
                  <div className="text-[12px] text-[#6b7a72]">{o.address}</div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[12px] text-[#6b7a72]">{o.time}</span>
                    <span className="text-[13px] font-bold">{formatPrice(o.total)}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
          {list.length === 0 && <div className="text-center text-[13px] text-[#6b7a72] py-10">Aucune livraison</div>}
        </div>
      </div>
    </Screen>
  );
}
