import { useNavigate, useParams } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { Header } from "../../components/ui";
import { companies, kitchenByCompany } from "../../data/mock";

export default function KitchenCompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const selected = kitchenByCompany.find((c) => c.companyId === id) ?? kitchenByCompany[0];

  return (
    <Screen>
      <Header title="Détail par entreprise" onBack={() => navigate("/kitchen/production")} />
      <div className="px-4 pb-6 flex flex-col gap-2.5">
        {kitchenByCompany.map((c) => {
          const co = companies.find((x) => x.id === c.companyId);
          const active = c.companyId === selected.companyId;
          return (
            <button
              key={c.companyId}
              type="button"
              onClick={() => navigate(`/kitchen/company/${c.companyId}`)}
              className={`bg-white rounded-[14px] border p-3.5 text-left ${
                active ? "border-[#1B7A4A]" : "border-[#eef1ee]"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-[14px] font-semibold">{co?.name}</div>
                  <div className="text-[12px] text-[#6b7a72]">{c.employees} employés</div>
                </div>
              </div>
              {c.items.map((i) => (
                <div key={i.name} className="flex justify-between text-[13px] py-[2px]">
                  <span className="text-[#3d4f45]">{i.name}</span>
                  <span className="font-semibold">{i.qty}</span>
                </div>
              ))}
            </button>
          );
        })}
      </div>
    </Screen>
  );
}
