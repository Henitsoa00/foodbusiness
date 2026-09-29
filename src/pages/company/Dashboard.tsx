import { useNavigate } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { Card, Header, PrimaryButton, StatCard } from "../../components/ui";
import { companyGrouped, formatPrice } from "../../data/mock";

export default function CompanyDashboard() {
  const navigate = useNavigate();
  return (
    <Screen>
      <Header title="Tableau de bord" menu={() => navigate("/roles")} />
      <div className="px-4 pb-6">
        <Card className="p-3.5 mb-3 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#e7f4ec] text-[#1B7A4A] flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="4" y="3" width="16" height="18" rx="2" />
              <path d="M8 8h8M8 12h8M8 16h4" />
            </svg>
          </div>
          <div>
            <div className="text-[16px] font-bold leading-tight">ABC Call Center</div>
            <div className="text-[12px] text-[#6b7a72]">Employés 120</div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <StatCard label="Commandes du jour" value={86} />
          <StatCard label="Total consommé" value={formatPrice(540000)} />
          <StatCard label="En attente" value={12} tone="warn" />
          <StatCard label="Reste à payer" value={formatPrice(150000)} tone="danger" />
        </div>

        <div className="text-[15px] font-semibold mb-2">Commandes regroupées</div>
        <Card className="p-3.5">
          <div className="text-[12px] text-[#6b7a72] mb-2">87 employés</div>
          <div className="space-y-1.5">
            {companyGrouped.map((g) => (
              <div key={g.name} className="flex justify-between text-[13px]">
                <span className="text-[#3d4f45]">{g.name}</span>
                <span className="font-semibold tabular-nums">{g.qty}</span>
              </div>
            ))}
            <div className="flex justify-between text-[13px] pt-1 border-t border-[#f0f2f0]">
              <span className="text-[#3d4f45]">Livraison</span>
              <span className="font-semibold">12h00</span>
            </div>
          </div>
          <PrimaryButton className="mt-3 h-[42px] text-[14px]" onClick={() => navigate("/company/orders")}>
            Voir détails
          </PrimaryButton>
        </Card>
      </div>
    </Screen>
  );
}
