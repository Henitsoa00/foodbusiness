import { Screen } from "../../components/Layout";
import { Card, Header, StatCard } from "../../components/ui";
import { formatPrice } from "../../data/mock";
import { useApp } from "../../context/AppContext";

export default function DeliveryFinances() {
  const { orders } = useApp();
  const delivered = orders.filter((o) => o.status === "livree");
  const collected = delivered.reduce((s, o) => s + o.total, 0);
  const pending = orders
    .filter((o) => o.status !== "livree")
    .reduce((s, o) => s + o.total, 0);
  const cash = delivered.filter((o) => o.paymentMethod === "Espèces").reduce((s, o) => s + o.total, 0);
  const mobile = collected - cash;

  return (
    <Screen>
      <Header title="Finances" />
      <div className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-2.5 mb-3">
          <StatCard label="Collecté aujourd'hui" value={formatPrice(collected)} tone="ok" />
          <StatCard label="Reste à encaisser" value={formatPrice(pending)} tone="warn" />
          <StatCard label="Mobile Money" value={formatPrice(mobile)} />
          <StatCard label="Livraisons payées" value={delivered.length} />
        </div>

        <div className="text-[15px] font-semibold mb-2">Encaissements</div>
        <div className="flex flex-col gap-2">
          {delivered.map((o) => (
            <Card key={o.id} className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[13px] font-semibold">{o.companyName}</div>
                  <div className="text-[11px] text-[#6b7a72]">
                    #{o.id} · {o.paymentMethod}
                  </div>
                </div>
                <div className="text-[13px] font-bold text-[#1B7A4A]">{formatPrice(o.total)}</div>
              </div>
            </Card>
          ))}
          {delivered.length === 0 && (
            <div className="text-center text-[13px] text-[#6b7a72] py-8">Aucun encaissement pour le moment</div>
          )}
        </div>
      </div>
    </Screen>
  );
}
