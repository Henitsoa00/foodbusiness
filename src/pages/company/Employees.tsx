import { Screen } from "../../components/Layout";
import { Header } from "../../components/ui";

const sample = [
  { name: "Ahmed Rakoto", role: "Employé", dept: "Call Center A" },
  { name: "Miora Rasoanaivo", role: "Employé", dept: "Call Center B" },
  { name: "Jean Andrianina", role: "Superviseur", dept: "Qualité" },
  { name: "Hery Rasolofo", role: "Employé", dept: "Call Center A" },
  { name: "Fara Rakoto", role: "Employé", dept: "Call Center C" },
  { name: "Lova Rabe", role: "RH", dept: "Administration" },
];

export default function CompanyEmployees() {
  return (
    <Screen>
      <Header title="Employés" />
      <div className="px-4 pb-6">
        <div className="bg-[#e7f4ec] rounded-[14px] p-3.5 mb-3 flex justify-between">
          <div>
            <div className="text-[12px] text-[#6b7a72]">Effectif</div>
            <div className="text-[22px] font-bold text-[#1B7A4A]">120</div>
          </div>
          <div className="text-right">
            <div className="text-[12px] text-[#6b7a72]">Commandes du jour</div>
            <div className="text-[22px] font-bold">86</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {sample.map((e) => (
            <div key={e.name} className="bg-white rounded-[14px] border border-[#eef1ee] p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#e7f4ec] text-[#1B7A4A] flex items-center justify-center font-bold text-[13px]">
                {e.name.split(" ").map((p) => p[0]).join("")}
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-semibold">{e.name}</div>
                <div className="text-[12px] text-[#6b7a72]">
                  {e.role} · {e.dept}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}
