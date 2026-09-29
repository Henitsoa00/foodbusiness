import { useNavigate } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { Header, StatusBadge } from "../../components/ui";
import { formatPrice } from "../../data/mock";
import { useApp } from "../../context/AppContext";

export default function KitchenOrders() {
  const { orders, setOrderStatus } = useApp();
  const navigate = useNavigate();
  const list = orders.filter((o) => o.status !== "livree");

  return (
    <Screen>
      <Header title="Commandes cuisine" />
      <div className="px-4 pb-6 flex flex-col gap-2.5">
        {list.map((o) => (
          <div key={o.id} className="bg-white rounded-[14px] border border-[#eef1ee] p-3.5">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[13px] font-semibold">#{o.id}</div>
                <div className="text-[14px] font-bold">{o.companyName}</div>
                <div className="text-[12px] text-[#6b7a72]">
                  {o.meals} repas · {o.time}
                </div>
              </div>
              <StatusBadge status={o.status} />
            </div>
            {o.items.length > 0 && (
              <div className="mt-2 space-y-0.5">
                {o.items.map((i) => (
                  <div key={i.name} className="flex justify-between text-[12px] text-[#3d4f45]">
                    <span>
                      {i.name} ×{i.quantity}
                    </span>
                    <span>{formatPrice(i.price * i.quantity)}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-2.5 flex justify-end gap-2">
              {o.status === "en_attente" && (
                <button
                  type="button"
                  onClick={() => setOrderStatus(o.id, "en_preparation")}
                  className="h-8 px-3 rounded-full bg-[#1B7A4A] text-white text-[12px] font-semibold"
                >
                  Préparer
                </button>
              )}
              {o.status === "en_preparation" && (
                <button
                  type="button"
                  onClick={() => setOrderStatus(o.id, "en_livraison")}
                  className="h-8 px-3 rounded-full bg-[#fff4e0] text-[#d97706] text-[12px] font-semibold"
                >
                  Prêt à livrer
                </button>
              )}
              <button
                type="button"
                onClick={() => navigate(`/kitchen/company/${o.companyId}`)}
                className="h-8 px-3 rounded-full border border-[#e4e8e5] text-[12px] font-medium"
              >
                Détail
              </button>
            </div>
          </div>
        ))}
        {list.length === 0 && <div className="text-center text-[13px] text-[#6b7a72] py-10">Aucune commande</div>}
      </div>
    </Screen>
  );
}
