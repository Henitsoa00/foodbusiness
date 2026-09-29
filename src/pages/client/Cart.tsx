import { useNavigate } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { Header, PrimaryButton, QtySelector } from "../../components/ui";
import { formatPrice } from "../../data/mock";
import { useApp } from "../../context/AppContext";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, updateQty, cartTotal, deliveryDate, deliveryTime } = useApp();

  return (
    <Screen>
      <Header title="Panier" onBack={() => navigate("/client/menu")} />
      <div className="px-4 pb-6">
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-[15px] font-semibold mb-1">Votre panier est vide</div>
            <p className="text-[13px] text-[#6b7a72] mb-4">Ajoutez des plats depuis le menu</p>
            <button
              type="button"
              onClick={() => navigate("/client/menu")}
              className="text-[#1B7A4A] font-semibold text-[14px]"
            >
              Voir le menu
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2.5 mb-4">
              {cart.map((item) => (
                <div
                  key={item.key}
                  className="bg-white rounded-[14px] border border-[#eef1ee] p-2.5 flex gap-3 items-center"
                >
                  <img src={item.image} alt="" className="w-14 h-14 rounded-[10px] object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold truncate">{item.name}</div>
                    {item.optionLabel && <div className="text-[11px] text-[#6b7a72]">{item.optionLabel}</div>}
                    <div className="text-[12px] text-[#6b7a72]">{formatPrice(item.price + item.extraPrice)}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <QtySelector value={item.quantity} onChange={(n) => updateQty(item.key, n)} min={0} />
                    <div className="text-[13px] font-bold">
                      {formatPrice((item.price + item.extraPrice) * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-[14px] border border-[#eef1ee] p-3.5 mb-3">
              <div className="flex justify-between text-[14px] font-semibold">
                <span>Sous-total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <div className="bg-white rounded-[14px] border border-[#eef1ee] p-3.5 mb-4 text-[13px] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#6b7a72]">Date de livraison</span>
                <span className="font-medium">{deliveryDate === "today" ? "Aujourd'hui" : "Demain"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6b7a72]">Heure de livraison</span>
                <span className="font-medium">
                  {deliveryTime} – {hourPlus(deliveryTime)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6b7a72]">Adresse de livraison</span>
                <span className="font-medium text-right">Lot II, Antananarivo</span>
              </div>
            </div>

            <PrimaryButton onClick={() => navigate("/client/delivery")}>Continuer</PrimaryButton>
          </>
        )}
      </div>
    </Screen>
  );
}

function hourPlus(t: string) {
  const [h, m] = t.split(":").map(Number);
  const nh = (h + 0) % 24;
  const mm = (m + 30) % 60;
  const hh = m + 30 >= 60 ? nh + 1 : nh;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}
