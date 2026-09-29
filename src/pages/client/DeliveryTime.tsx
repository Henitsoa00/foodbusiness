import { useNavigate } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { Header, PrimaryButton, Tabs } from "../../components/ui";
import { timeSlots } from "../../data/mock";
import { useApp } from "../../context/AppContext";
import { cn } from "../../utils/cn";

export default function DeliveryTime() {
  const navigate = useNavigate();
  const { deliveryDate, setDeliveryDate, deliveryTime, setDeliveryTime } = useApp();

  return (
    <Screen>
      <Header title="Choix de date et heure" onBack />
      <div className="px-4 pb-6">
        <Tabs
          tabs={[
            { id: "today", label: "Aujourd'hui" },
            { id: "tomorrow", label: "Demain" },
          ]}
          value={deliveryDate}
          onChange={(id) => setDeliveryDate(id as "today" | "tomorrow")}
        />

        <div className="mt-4 text-[13px] font-medium text-[#1a2b22]">
          {deliveryDate === "today" ? "Mardi 15 avril 2025" : "Mercredi 16 avril 2025"}
        </div>
        <div className="text-[12px] text-[#6b7a72] mb-3">Heure de livraison</div>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {timeSlots.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setDeliveryTime(t)}
              className={cn(
                "h-10 rounded-full text-[13px] font-semibold border",
                deliveryTime === t
                  ? "bg-[#1B7A4A] text-white border-[#1B7A4A]"
                  : "bg-white text-[#1a2b22] border-[#e4e8e5]"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex gap-2 items-start rounded-[12px] bg-[#fff6e8] border border-[#f3ddb0] px-3 py-2.5 mb-6">
          <span className="text-[#d97706] mt-0.5">⚠</span>
          <p className="text-[12px] text-[#9a6b1a] leading-snug">
            Commandez avant 10h00 pour une livraison aujourd'hui.
          </p>
        </div>

        <PrimaryButton onClick={() => navigate("/client/recap")}>Suivant</PrimaryButton>
      </div>
    </Screen>
  );
}
