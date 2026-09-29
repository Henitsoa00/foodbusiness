import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { Header, StatusBadge, Tabs } from "../../components/ui";
import { companyTodayOrders, formatPrice, initialOrders } from "../../data/mock";

export default function CompanyOrders() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("today");
  const list = tab === "today" ? companyTodayOrders : initialOrders.filter((o) => o.companyId === "abc");

  return (
    <Screen>
      <Header title="Mes commandes (entreprise)" onBack={() => navigate("/company/dashboard")} />
      <div className="px-4 pb-6">
        <Tabs
          tabs={[
            { id: "today", label: "Aujourd'hui" },
            { id: "history", label: "Historique" },
          ]}
          value={tab}
          onChange={setTab}
        />
        <div className="mt-3 flex flex-col gap-2.5">
          {list.map((o) => (
            <div key={o.id + o.time} className="bg-white rounded-[14px] border border-[#eef1ee] p-3.5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[14px] font-semibold">#{o.id}</div>
                  <div className="mt-1">
                    <StatusBadge status={o.status} />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[12px] text-[#6b7a72]">{o.time}</div>
                  <div className="text-[14px] font-bold mt-1">{formatPrice(o.total)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}
