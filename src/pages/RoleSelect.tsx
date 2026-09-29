import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { Screen } from "../components/Layout";
import { images } from "../data/mock";

const roles = [
  {
    id: "client",
    title: "Client / Employé",
    desc: "Commander, suivre et payer vos repas",
    to: "/client/home",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5.5 19c1.2-3 3.6-4.5 6.5-4.5s5.3 1.5 6.5 4.5" />
      </svg>
    ),
  },
  {
    id: "company",
    title: "Responsable d'entreprise",
    desc: "Suivi des commandes et des employés",
    to: "/company/dashboard",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h4" />
      </svg>
    ),
  },
  {
    id: "admin",
    title: "Administrateur",
    desc: "Pilotage global, finances et clients",
    to: "/admin/dashboard",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3 4 7v4c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V7l-8-4Z" />
      </svg>
    ),
  },
  {
    id: "kitchen",
    title: "Cuisine",
    desc: "Quantités à préparer par produit",
    to: "/kitchen/production",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 14h12v6H6zM8 14V9a4 4 0 0 1 8 0v5M4 9h16" />
      </svg>
    ),
  },
  {
    id: "delivery",
    title: "Livreur",
    desc: "Tournées, adresses et confirmations",
    to: "/delivery",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7" />
        <circle cx="6.5" cy="17.5" r="1.5" />
        <circle cx="17.5" cy="17.5" r="1.5" />
      </svg>
    ),
  },
];

const steps = [
  {
    label: "Commande",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </svg>
    ),
  },
  {
    label: "Préparation",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 13h16M7 13V8a5 5 0 0 1 10 0v5M6 17h12v3H6z" />
      </svg>
    ),
  },
  {
    label: "Livraison",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7" />
        <circle cx="6.5" cy="17.5" r="1.5" />
        <circle cx="17.5" cy="17.5" r="1.5" />
      </svg>
    ),
  },
  {
    label: "Paiement",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18" />
      </svg>
    ),
  },
];

export default function RoleSelect() {
  const navigate = useNavigate();
  return (
    <Screen className="bg-white relative overflow-hidden">
      <img
        src={images.leaves}
        alt=""
        className="pointer-events-none absolute -top-6 -right-8 w-40 opacity-70 object-contain"
      />
      <img
        src={images.leaves}
        alt=""
        className="pointer-events-none absolute bottom-24 -left-10 w-36 opacity-50 object-contain rotate-180"
      />

      <button
        type="button"
        onClick={() => navigate(-1)}
        className="absolute top-2 left-2 z-10 p-2 text-[#1a2b22]"
        aria-label="Retour"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <div className="relative px-5 pt-6 pb-8 fade-up">
        <div className="flex justify-center pt-2">
          <Logo stacked size={52} />
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-[12px] font-medium text-[#1B7A4A]">
          <span>Simple</span>
          <span className="text-[#c4a035]">·</span>
          <span>Rapide</span>
          <span className="text-[#c4a035]">·</span>
          <span>Efficace</span>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-2">
          {steps.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1.5">
              <div className="w-11 h-11 rounded-full border border-[#d7eadf] bg-[#f3faf6] text-[#1B7A4A] flex items-center justify-center">
                {s.icon}
              </div>
              <span className="text-[10px] text-[#5b6b62] font-medium">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-[16px] bg-[#f3faf6] border border-[#d7eadf] p-3.5">
          <div className="text-[13px] font-semibold text-[#1B7A4A] mb-2">
            Une solution complète pour la restauration B2B
          </div>
          {[
            "Gestion des entreprises",
            "Commandes groupées automatiques",
            "Suivi en temps réel",
            "Espaces dédiés par rôle",
            "Tableaux de bord et statistiques",
          ].map((t) => (
            <div key={t} className="flex items-center gap-2 py-[3px] text-[12px] text-[#3d4f45]">
              <span className="text-[#1B7A4A] font-bold">✓</span>
              {t}
            </div>
          ))}
          <p className="mt-2 text-[11px] italic text-[#6b7a72]">
            Plus qu'une application, un partenaire au quotidien !
          </p>
        </div>

        <p className="mt-5 mb-2 text-[12px] font-semibold text-[#5b6b62] uppercase tracking-wide">
          Accéder à l'espace
        </p>
        <div className="flex flex-col gap-2">
          {roles.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => navigate(r.to)}
              className="flex items-center gap-3 bg-white border border-[#e4e8e5] rounded-[14px] px-3 py-2.5 text-left shadow-[0_1px_3px_rgba(16,40,24,0.05)] active:bg-[#f3faf6]"
            >
              <div className="w-10 h-10 rounded-full bg-[#e7f4ec] text-[#1B7A4A] flex items-center justify-center shrink-0">
                {r.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-semibold text-[#1a2b22]">{r.title}</div>
                <div className="text-[11px] text-[#6b7a72] truncate">{r.desc}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8a968e" strokeWidth="2">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </Screen>
  );
}
