import { useNavigate } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { Header } from "../../components/ui";
import { currentUser } from "../../data/mock";

const rows = [
  { label: "Nom", value: currentUser.fullName },
  { label: "Rôle", value: currentUser.role },
  { label: "Entreprise", value: currentUser.company },
  { label: "Email", value: currentUser.email },
  { label: "Téléphone", value: currentUser.phone },
  { label: "Adresse de livraison", value: "Lot II, Antananarivo" },
];

export default function Profile() {
  const navigate = useNavigate();
  return (
    <Screen>
      <Header title="Profil" />
      <div className="px-4 pb-6">
        <div className="flex flex-col items-center pt-3 pb-4">
          <img src={currentUser.avatar} alt="" className="w-20 h-20 rounded-full object-cover" />
          <div className="mt-2 text-[17px] font-bold">{currentUser.fullName}</div>
          <div className="text-[12px] text-[#6b7a72]">{currentUser.company}</div>
        </div>
        <div className="bg-white rounded-[14px] border border-[#eef1ee] divide-y divide-[#f0f2f0] mb-3">
          {rows.map((r) => (
            <div key={r.label} className="px-3.5 py-3 flex justify-between gap-3">
              <span className="text-[12px] text-[#6b7a72]">{r.label}</span>
              <span className="text-[13px] font-medium text-right">{r.value}</span>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => navigate("/roles")}
          className="w-full h-11 rounded-[12px] border border-[#e4e8e5] bg-white text-[14px] font-semibold text-[#1B7A4A]"
        >
          Changer de rôle
        </button>
        <button
          type="button"
          onClick={() => navigate("/client/login")}
          className="w-full h-11 mt-2 rounded-[12px] bg-[#fde8e8] text-[14px] font-semibold text-[#dc2626]"
        >
          Se déconnecter
        </button>
      </div>
    </Screen>
  );
}
