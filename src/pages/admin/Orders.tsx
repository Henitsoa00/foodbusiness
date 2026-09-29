import { useMemo, useState } from "react";
import { Screen } from "../../components/Layout";
import { Header, StatusBadge, Tabs } from "../../components/ui";
import { formatPrice } from "../../data/mock";
import { useApp } from "../../context/AppContext";

export default function AdminOrders() {
  const { orders, setOrderStatus } = useApp();
  const [tab, setTab] = useState("today");

  const list = useMemo(() => {
    if (tab === "pending") return orders.filter((o) => o.status === "en_attente");
    if (tab === "prep") return orders.filter((o) => o.status === "en_preparation");
    if (tab === "tomorrow") return orders.filter((o) => o.date === "2025-04-16");
    return orders;
  }, [orders, tab]);

  return (
    <Screen>
      <Header title="Gestion des commandes" />
      <div className="px-4 pb-6">
        <Tabs
          tabs={[
            { id: "today", label: "Aujourd'hui" },
            { id: "tomorrow", label: "Demain" },
            { id: "pending", label: "En attente" },
            { id: "prep", label: "En préparation" },
          ]}
          value={tab}
          onChange={setTab}
        />
        <div className="mt-3 flex flex-col gap-2.5">
          {list.map((o) => (
            <div key={o.id} className="bg-white rounded-[14px] border border-[#eef1ee] p-3.5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[13px] font-semibold">#{o.id}</div>
                  <div className="text-[14px] font-bold mt-0.5">{o.companyName}</div>
                  <div className="text-[12px] text-[#6b7a72]">
                    {o.meals} repas{o.extras ? ` + ${o.extras}` : ""}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[12px] text-[#6b7a72]">{o.time}</div>
                  <div className="text-[14px] font-bold">{formatPrice(o.total)}</div>
                </div>
              </div>
              <div className="mt-2.5 flex justify-end">
                {o.status === "en_attente" ? (
                  <button
                    type="button"
                    onClick={() => setOrderStatus(o.id, "en_preparation")}
                    className="h-8 px-3 rounded-full bg-[#1B7A4A] text-white text-[12px] font-semibold"
                  >
                    Confirmer
                  </button>
                ) : o.status === "en_preparation" ? (
                  <button
                    type="button"
                    onClick={() => setOrderStatus(o.id, "en_livraison")}
                    className="h-8 px-3 rounded-full bg-[#fff4e0] text-[#d97706] text-[12px] font-semibold"
                  >
                    En préparation
                  </button>
                ) : (
                  <StatusBadge status={o.status} />
                )}
              </div>
            </div>
          ))}
          {list.length === 0 && (
            <div className="text-center text-[13px] text-[#6b7a72] py-10">Aucune commande</div>
          )}
        </div>
      </div>
    </Screen>
  );
}
