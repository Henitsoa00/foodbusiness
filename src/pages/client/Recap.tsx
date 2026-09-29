import { useNavigate } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { Header, PrimaryButton } from "../../components/ui";
import { formatPrice } from "../../data/mock";
import { useApp } from "../../context/AppContext";

export default function Recap() {
  const navigate = useNavigate();
  const { cart, cartTotal } = useApp();

  return (
    <Screen>
      <Header title="Suivi de commande" onBack />
      <div className="px-4 pb-6">
        <div className="bg-white rounded-[14px] border border-[#eef1ee] p-3.5">
          {cart.length === 0 ? (
            <p className="text-[13px] text-[#6b7a72]">Aucun article</p>
          ) : (
            <div className="divide-y divide-[#f0f2f0]">
              {cart.map((i) => (
                <div key={i.key} className="flex justify-between py-2.5 text-[13px]">
                  <span className="text-[#3d4f45]">
                    {i.name}
                    {i.quantity > 1 ? `  ×${i.quantity}` : ""}
                  </span>
                  <span className="font-semibold tabular-nums">{formatPrice((i.price + i.extraPrice) * i.quantity)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-between mt-3 px-1 text-[15px] font-bold">
          <span>Total</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
        <PrimaryButton className="mt-5" onClick={() => navigate("/client/confirmation")}>
          Continuer
        </PrimaryButton>
      </div>
    </Screen>
  );
}
