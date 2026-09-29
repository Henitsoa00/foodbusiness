import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { Card, Header, StatCard } from "../../components/ui";
import { formatPrice, payments } from "../../data/mock";

export default function AdminFinances() {
  const navigate = useNavigate();
  const [showInvoices, setShowInvoices] = useState(false);
  return (
    <Screen>
      <Header title="Finances" onBack={() => navigate("/admin/dashboard")} />
      <div className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-2.5 mb-3">
          <StatCard label="Chiffre d'affaires" value={formatPrice(1850000)} />
          <StatCard label="Paiements reçus" value={formatPrice(1200000)} tone="ok" />
          <StatCard label="Commandes non payées" value={formatPrice(650000)} tone="danger" />
          <StatCard label="Restes à payer" value={formatPrice(420000)} tone="warn" />
        </div>

        <div className="text-[15px] font-semibold mb-2">Historique des paiements</div>
        <div className="flex flex-col gap-2 mb-3">
          {payments.map((p) => (
            <Card key={p.id} className="p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-[#e7f4ec] text-[#1B7A4A] flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="6" width="18" height="12" rx="2" />
                  <path d="M3 10h18" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-semibold">{p.method}</div>
                <div className="text-[11px] text-[#6b7a72]">
                  {p.company} · {p.date}
                </div>
              </div>
              <div className="text-[13px] font-bold">{formatPrice(p.amount)}</div>
            </Card>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowInvoices((s) => !s)}
          className="w-full h-11 rounded-[12px] bg-white border border-[#e4e8e5] text-[14px] font-semibold text-[#1B7A4A]"
        >
          Voir toutes les factures
        </button>

        {showInvoices && (
          <div className="mt-3 bg-white rounded-[14px] border border-[#eef1ee] divide-y divide-[#f0f2f0]">
            {[
              { id: "FAC-2025-018", co: "ABC Call Center", amount: 150000, date: "15 avr. 2025" },
              { id: "FAC-2025-017", co: "XYZ Entreprise", amount: 185000, date: "14 avr. 2025" },
              { id: "FAC-2025-016", co: "Tech Solutions", amount: 98000, date: "12 avr. 2025" },
              { id: "FAC-2025-015", co: "Global Services", amount: 142000, date: "10 avr. 2025" },
            ].map((f) => (
              <div key={f.id} className="px-3.5 py-3 flex justify-between">
                <div>
                  <div className="text-[13px] font-semibold">{f.id}</div>
                  <div className="text-[11px] text-[#6b7a72]">
                    {f.co} · {f.date}
                  </div>
                </div>
                <div className="text-[13px] font-bold">{formatPrice(f.amount)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Screen>
  );
}
