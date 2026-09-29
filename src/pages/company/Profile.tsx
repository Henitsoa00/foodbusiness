import { useNavigate } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { Header } from "../../components/ui";

export default function CompanyProfile() {
  const navigate = useNavigate();
  return (
    <Screen>
      <Header title="Profil entreprise" />
      <div className="px-4 pb-6">
        <div className="bg-white rounded-[14px] border border-[#eef1ee] p-4 mb-3">
          <div className="text-[16px] font-bold">ABC Call Center</div>
          <div className="text-[13px] text-[#6b7a72] mt-1">Responsable · Ahmed Rakoto</div>
          <div className="text-[13px] text-[#6b7a72]">Lot II, Antananarivo</div>
          <div className="text-[13px] text-[#6b7a72]">034 12 345 67</div>
        </div>
        <button
          type="button"
          onClick={() => navigate("/roles")}
          className="w-full h-11 rounded-[12px] border border-[#e4e8e5] bg-white text-[14px] font-semibold text-[#1B7A4A]"
        >
          Changer de rôle
        </button>
      </div>
    </Screen>
  );
}
