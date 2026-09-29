import { useNavigate } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { Header, PrimaryButton } from "../../components/ui";
import { currentUser, formatPrice } from "../../data/mock";
import { useApp } from "../../context/AppContext";
import { cn } from "../../utils/cn";

const methods = ["Mobile Money", "Virement", "Espèces"];

export default function Confirmation() {
  const navigate = useNavigate();
  const { cart, cartTotal, deliveryDate, deliveryTime, paymentMethod, setPaymentMethod, confirmOrder } = useApp();

  return (
    <Screen>
      <Header title="Confirmation" onBack />
      <div className="px-4 pb-6 space-y-3">
        <div className="bg-white rounded-[14px] border border-[#eef1ee] p-3.5 text-[13px] space-y-2">
          <Row label="Entreprise" value={currentUser.company} />
          <Row label="Adresse" value="Lot II, Antananarivo" />
          <Row
            label="Date / Heure"
            value={`${deliveryDate === "today" ? "Aujourd'hui" : "Demain"} – ${deliveryTime}`}
          />
        </div>

        <div className="bg-white rounded-[14px] border border-[#eef1ee] p-3.5">
          <div className="text-[13px] font-semibold mb-2">Produits</div>
          {cart.map((i) => (
            <div key={i.key} className="flex justify-between py-1 text-[13px]">
              <span className="text-[#3d4f45]">
                {i.name} ×{i.quantity}
              </span>
              <span className="font-medium">{formatPrice((i.price + i.extraPrice) * i.quantity)}</span>
            </div>
          ))}
          <div className="flex justify-between mt-2 pt-2 border-t border-[#f0f2f0] text-[15px] font-bold">
            <span>Total</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
        </div>

        <div className="bg-white rounded-[14px] border border-[#eef1ee] p-3.5">
          <div className="text-[13px] font-semibold mb-2">Mode de paiement</div>
          <div className="flex flex-col gap-2">
            {methods.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setPaymentMethod(m)}
                className={cn(
                  "h-10 rounded-[10px] border text-[13px] font-medium",
                  paymentMethod === m
                    ? "border-[#1B7A4A] bg-[#e7f4ec] text-[#1B7A4A]"
                    : "border-[#e4e8e5] bg-white text-[#3d4f45]"
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <PrimaryButton
          onClick={() => {
            const order = confirmOrder();
            navigate(`/client/payment?id=${order.id}`);
          }}
          disabled={cart.length === 0}
        >
          Confirmer la commande
        </PrimaryButton>
      </div>
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-[#6b7a72]">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
