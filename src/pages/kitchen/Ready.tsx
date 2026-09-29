import { useNavigate } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { Header, StatusBadge } from "../../components/ui";
import { formatPrice } from "../../data/mock";
import { useApp } from "../../context/AppContext";

export default function KitchenReady() {
  const { orders } = useApp();
  const navigate = useNavigate();
  const list = orders.filter((o) => o.status === "en_livraison" || o.status === "livree");

  return (
    <Screen>
      <Header title="Livraisons" />
      <div className="px-4 pb-6 flex flex-col gap-2.5">
        {list.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => navigate(`/kitchen/company/${o.companyId}`)}
            className="bg-white rounded-[14px] border border-[#eef1ee] p-3.5 text-left"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[14px] font-bold">{o.companyName}</div>
                <div className="text-[12px] text-[#6b7a72]">{o.address}</div>
                <div className="text-[12px] text-[#6b7a72] mt-0.5">
                  {o.time} · {o.meals} repas
                </div>
              </div>
              <div className="text-right">
                <div className="text-[13px] font-bold mb-1">{formatPrice(o.total)}</div>
                <StatusBadge status={o.status} kind="delivery" />
              </div>
            </div>
          </button>
        ))}
        {list.length === 0 && <div className="text-center text-[13px] text-[#6b7a72] py-10">Aucune tournée</div>}
      </div>
    </Screen>
  );
}
