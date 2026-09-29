import { useNavigate, useSearchParams } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { Header, PrimaryButton, StatusBadge } from "../../components/ui";
import { formatPrice } from "../../data/mock";
import { useApp } from "../../context/AppContext";

export default function Payment() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { orders, payOrder } = useApp();
  const id = params.get("id");
  const order = orders.find((o) => o.id === id) ?? orders[0];
  const paid = order.paymentStatus === "paye";
  const paidAmount = paid ? order.total : 0;
  const rest = order.total - paidAmount;

  return (
    <Screen>
      <Header title="Paiement" onBack={() => navigate("/client/history")} />
      <div className="px-4 pb-6">
        <div className="bg-white rounded-[14px] border border-[#eef1ee] p-4 space-y-3 mb-4">
          <Row label="Montant total" value={formatPrice(order.total)} />
          <Row label="Montant payé" value={formatPrice(paidAmount)} />
          <div className="flex justify-between items-center pt-1">
            <span className="text-[13px] text-[#6b7a72]">Reste à payer</span>
            <span className="text-[18px] font-bold text-[#dc2626]">{formatPrice(rest)}</span>
          </div>
          <div className="h-px bg-[#f0f2f0]" />
          <Row label="Mode de paiement" value={order.paymentMethod} />
          <div className="flex justify-between items-center">
            <span className="text-[13px] text-[#6b7a72]">Statut</span>
            <StatusBadge status={order.paymentStatus} kind="payment" />
          </div>
        </div>

        {!paid ? (
          <PrimaryButton onClick={() => payOrder(order.id)}>Payer maintenant</PrimaryButton>
        ) : (
          <div className="text-center text-[13px] text-[#1B7A4A] font-semibold bg-[#e7f4ec] rounded-[12px] py-3">
            Paiement reçu. Merci !
          </div>
        )}
      </div>
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-[13px] text-[#6b7a72]">{label}</span>
      <span className="text-[13px] font-semibold">{value}</span>
    </div>
  );
}
