import { useNavigate } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { Card, Header, SectionTitle } from "../../components/ui";
import { companies, kitchenByCompany, kitchenTotals, products } from "../../data/mock";

export default function AdminKitchen() {
  const navigate = useNavigate();
  return (
    <Screen>
      <Header title="Cuisine / Production" />
      <div className="px-4 pb-6">
        <SectionTitle>Quantités totales à préparer</SectionTitle>
        <Card className="p-3.5 mb-4">
          <div className="space-y-2">
            {kitchenTotals.map((k) => {
              const img = products.find((p) => p.id === k.productId)?.image;
              return (
                <div key={k.productId} className="flex items-center gap-3">
                  {img && <img src={img} alt="" className="w-9 h-9 rounded-[8px] object-cover" />}
                  <span className="flex-1 text-[13px]">{k.name}</span>
                  <span className="text-[15px] font-bold tabular-nums">{k.qty}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <SectionTitle>Détail par entreprise</SectionTitle>
        <div className="flex flex-col gap-2.5">
          {kitchenByCompany.map((c) => {
            const co = companies.find((x) => x.id === c.companyId);
            return (
              <Card key={c.companyId} className="p-3.5" onClick={() => navigate(`/kitchen/company/${c.companyId}`)}>
                <div className="text-[14px] font-semibold mb-1.5">{co?.name}</div>
                {c.items.map((i) => (
                  <div key={i.name} className="flex justify-between text-[13px] py-[2px]">
                    <span className="text-[#3d4f45]">{i.name}</span>
                    <span className="font-semibold">{i.qty}</span>
                  </div>
                ))}
              </Card>
            );
          })}
        </div>
      </div>
    </Screen>
  );
}
