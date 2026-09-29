import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { BellButton, Card, Header, StatusBadge } from "../../components/ui";
import { currentUser, formatPrice, images, notifications, products } from "../../data/mock";
import { useApp } from "../../context/AppContext";
import { cn } from "../../utils/cn";

const categories = [
  {
    id: "repas",
    label: "Repas",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 13h16v7H4z" />
        <path d="M8 13V7a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v6" />
        <path d="M16 13V8h2" />
      </svg>
    ),
  },
  {
    id: "snacks",
    label: "Snacks",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M7 8h10l1 12H6L7 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
    ),
  },
  {
    id: "boissons",
    label: "Boissons",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M8 4h8l-1 16H9L8 4Z" />
        <path d="M9 9h6" />
      </svg>
    ),
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { orders } = useApp();
  const [showNotif, setShowNotif] = useState(false);
  const popular = products.filter((p) => p.id === "riz-mais" || p.id === "pizza");
  const current = orders.find((o) => o.status === "en_preparation") ?? orders[0];

  return (
    <Screen className="bg-[#f4f6f4]">
      <Header
        title="Accueil"
        menu={() => navigate("/roles")}
        right={<BellButton onClick={() => setShowNotif((s) => !s)} />}
      />

      {showNotif && (
        <div className="mx-4 mb-2 bg-white rounded-[14px] border border-[#eef1ee] shadow-md p-3 z-20">
          {notifications.map((n) => (
            <div key={n.id} className="py-2 border-b border-[#f0f2f0] last:border-0">
              <div className="text-[13px] font-semibold">{n.title}</div>
              <div className="text-[12px] text-[#6b7a72]">{n.text}</div>
              <div className="text-[10px] text-[#9aa59e] mt-0.5">{n.time}</div>
            </div>
          ))}
        </div>
      )}

      <div className="px-4 pb-5 fade-up">
        <div className="flex items-center gap-3 mt-1 mb-1">
          <img src={currentUser.avatar} alt="" className="w-11 h-11 rounded-full object-cover" />
          <div>
            <div className="text-[18px] font-bold text-[#1a2b22] leading-tight">Bonjour {currentUser.name} !</div>
            <div className="text-[12px] text-[#6b7a72]">Bon appétit pour aujourd'hui !</div>
          </div>
        </div>
        <div className="text-[12px] text-[#8a968e] mb-3">Mardi 15 avril 2025</div>

        <div className="relative overflow-hidden rounded-[16px] bg-[#1B7A4A] h-[132px] mb-4">
          <img src={images.promo} alt="" className="absolute right-0 top-0 h-full w-[54%] object-cover" />
          <div className="absolute left-0 top-0 h-full w-[58%] bg-[#1B7A4A]" />
          <div className="absolute left-[42%] top-0 h-full w-16 bg-[#1B7A4A] opacity-80" />
          <div className="relative z-10 p-4 max-w-[62%] h-full flex flex-col justify-between">
            <p className="text-white text-[14px] font-semibold leading-snug">
              Des repas frais et équilibrés pour votre entreprise
            </p>
            <button
              type="button"
              onClick={() => navigate("/client/menu")}
              className="self-start bg-white text-[#1B7A4A] text-[12px] font-semibold px-3.5 py-1.5 rounded-full"
            >
              Commander
            </button>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => navigate(`/client/menu?cat=${c.id}`)}
              className="flex-1 bg-white rounded-[14px] border border-[#eef1ee] py-3 flex flex-col items-center gap-1.5 text-[#1B7A4A] shadow-[0_1px_3px_rgba(16,40,24,0.04)]"
            >
              {c.icon}
              <span className="text-[12px] font-medium text-[#1a2b22]">{c.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[15px] font-semibold">Produits populaires</h2>
          <button type="button" onClick={() => navigate("/client/menu")} className="text-[12px] text-[#1B7A4A] font-medium">
            Voir tout
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {popular.map((p) => (
            <Card key={p.id} className="overflow-hidden p-0" onClick={() => navigate(`/client/product/${p.id}`)}>
              <img src={p.image} alt={p.name} className="h-[92px] w-full object-cover" />
              <div className="p-2.5">
                <div className="text-[13px] font-semibold truncate">{p.name}</div>
                <div className="text-[13px] font-bold text-[#1B7A4A] mt-0.5">{formatPrice(p.price)}</div>
              </div>
            </Card>
          ))}
        </div>

        <h2 className="text-[15px] font-semibold mb-2">Ma commande en cours</h2>
        <Card className="p-3" onClick={() => navigate("/client/history")}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13px] font-semibold">#{current.id}</div>
              <StatusBadge status={current.status} />
            </div>
            <div className="text-right">
              <div className="text-[13px] font-bold">{formatPrice(current.total)}</div>
              <div className={cn("text-[11px] text-[#1B7A4A] font-medium")}>Voir le suivi →</div>
            </div>
          </div>
        </Card>
      </div>
    </Screen>
  );
}
