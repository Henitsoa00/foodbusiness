import { useNavigate } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { Header, PrimaryButton } from "../../components/ui";
import { kitchenTotals, products } from "../../data/mock";

export default function KitchenProduction() {
  const navigate = useNavigate();
  return (
    <Screen>
      <Header title="Production du jour" menu={() => navigate("/roles")} />
      <div className="px-4 pb-6">
        <div className="bg-white rounded-[14px] border border-[#eef1ee] p-3.5 mb-3">
          {kitchenTotals.map((k, i) => {
            const img = products.find((p) => p.id === k.productId)?.image;
            return (
              <div
                key={k.productId}
                className={`flex items-center gap-3 py-2.5 ${i < kitchenTotals.length - 1 ? "border-b border-[#f0f2f0]" : ""}`}
              >
                {img && <img src={img} alt="" className="w-10 h-10 rounded-[8px] object-cover" />}
                <span className="flex-1 text-[14px] font-medium">{k.name}</span>
                <span className="text-[18px] font-bold tabular-nums">{k.qty}</span>
              </div>
            );
          })}
        </div>
        <PrimaryButton onClick={() => navigate("/kitchen/company/abc")}>Voir le détail par entreprise</PrimaryButton>
      </div>
    </Screen>
  );
}
