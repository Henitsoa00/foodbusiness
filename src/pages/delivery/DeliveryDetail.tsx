import { useNavigate, useParams } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { Header, PrimaryButton } from "../../components/ui";
import { formatPrice } from "../../data/mock";
import { useApp } from "../../context/AppContext";

export default function DeliveryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, setOrderStatus, showToast } = useApp();
  const order = orders.find((o) => o.id === id) ?? orders[0];
  const done = order.status === "livree";

  return (
    <Screen>
      <Header title="Détail livraison" onBack={() => navigate("/delivery")} />
      <div className="px-4 pb-6">
        <div className="bg-white rounded-[14px] border border-[#eef1ee] p-4 mb-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-full bg-[#e7f4ec] text-[#1B7A4A] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <path d="M8 8h8M8 12h8" />
              </svg>
            </div>
            <div>
              <div className="text-[16px] font-bold leading-tight">{order.companyName}</div>
              <div className="text-[12px] text-[#6b7a72]">{order.address}</div>
            </div>
          </div>
          <div className="text-[13px] space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[#6b7a72]">Contact</span>
              <span className="font-medium">{order.contact ?? "034 12 345 67"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6b7a72]">Heure</span>
              <span className="font-medium">
                {order.time} – {add30(order.time)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[14px] border border-[#eef1ee] p-4 mb-4">
          <div className="text-[13px] font-semibold mb-2">Commande</div>
          {order.items.length > 0 ? (
            order.items.map((i) => (
              <div key={i.name} className="flex justify-between text-[13px] py-1">
                <span>
                  {i.name} ×{i.quantity}
                </span>
                <span className="font-medium">{formatPrice(i.price * i.quantity)}</span>
              </div>
            ))
          ) : (
            <div className="text-[13px] text-[#6b7a72]">Commande groupée · {order.meals} repas</div>
          )}
          <div className="flex justify-between mt-2 pt-2 border-t border-[#f0f2f0] text-[15px] font-bold">
            <span>Montant</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>

        {done ? (
          <div className="text-center text-[13px] font-semibold text-[#1B7A4A] bg-[#e7f4ec] rounded-[12px] py-3">
            Livraison confirmée
          </div>
        ) : (
          <PrimaryButton
            onClick={() => {
              setOrderStatus(order.id, "livree");
              showToast("Livraison confirmée");
              navigate("/delivery");
            }}
          >
            Confirmer la livraison
          </PrimaryButton>
        )}
      </div>
    </Screen>
  );
}

function add30(t: string) {
  const [h, m] = t.split(":").map(Number);
  const mm = (m + 30) % 60;
  const hh = m + 30 >= 60 ? h + 1 : h;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}
