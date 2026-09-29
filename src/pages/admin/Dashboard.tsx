import { useNavigate } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { Card, Header, StatCard } from "../../components/ui";
import { formatPrice, salesWeek } from "../../data/mock";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const max = Math.max(...salesWeek.map((s) => s.value));

  return (
    <Screen>
      <Header
        title="Dashboard admin"
        menu={() => navigate("/roles")}
        right={
          <button type="button" onClick={() => navigate("/admin/finances")} className="p-1.5 text-[#1B7A4A]" aria-label="Finances">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="6" width="18" height="12" rx="2" />
              <path d="M3 10h18" />
            </svg>
          </button>
        }
      />
      <div className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-2.5 mb-3">
          <StatCard label="Commandes du jour" value={245} onClick={() => navigate("/admin/orders")} />
          <StatCard label="Chiffre d'affaires" value={formatPrice(1850000)} onClick={() => navigate("/admin/finances")} />
          <StatCard label="Repas à préparer" value={18} onClick={() => navigate("/admin/kitchen")} />
          <StatCard label="Livraisons en cours" value={18} onClick={() => navigate("/admin/deliveries")} />
          <StatCard label="Commandes en attente" value={27} tone="warn" onClick={() => navigate("/admin/orders")} />
          <StatCard label="Paiements reçus" value={formatPrice(1200000)} onClick={() => navigate("/admin/finances")} />
        </div>

        <Card className="p-3.5 mb-3">
          <div className="text-[12px] text-[#6b7a72]">Montants restant à payer</div>
          <div className="text-[20px] font-bold text-[#dc2626] mt-0.5">{formatPrice(650000)}</div>
        </Card>

        <div className="text-[15px] font-semibold mb-2">Évolution des ventes</div>
        <Card className="p-3.5">
          <div className="flex items-end gap-2 h-[120px]">
            {salesWeek.map((s) => (
              <div key={s.day} className="flex-1 flex flex-col items-center justify-end h-full">
                <div
                  className="w-full rounded-t-[6px] bg-[#1B7A4A]"
                  style={{ height: `${(s.value / max) * 100}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-1.5">
            {salesWeek.map((s) => (
              <div key={s.day} className="flex-1 text-center text-[10px] text-[#6b7a72]">
                {s.day}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Screen>
  );
}
