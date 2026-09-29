import { useState } from "react";
import { Screen } from "../../components/Layout";
import { Header, PrimaryButton, Tabs } from "../../components/ui";
import { companies, type Company } from "../../data/mock";

export default function AdminClients() {
  const [tab, setTab] = useState("companies");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [list, setList] = useState<Company[]>(companies);

  return (
    <Screen>
      <Header title="Gestion des clients" />
      <div className="px-4 pb-6">
        <Tabs
          tabs={[
            { id: "companies", label: "Entreprises" },
            { id: "owners", label: "Responsables" },
            { id: "employees", label: "Employés" },
          ]}
          value={tab}
          onChange={setTab}
        />

        {tab === "companies" && (
          <div className="mt-3 flex flex-col gap-2.5">
            {list.map((c) => (
              <div key={c.id} className="bg-white rounded-[14px] border border-[#eef1ee] p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e7f4ec] text-[#1B7A4A] flex items-center justify-center font-bold text-[12px]">
                  {c.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-semibold truncate">{c.name}</div>
                  <div className="text-[12px] text-[#6b7a72]">
                    {c.employees} employés · {c.city}
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8a968e" strokeWidth="2">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </div>
            ))}
            <PrimaryButton className="mt-2" onClick={() => setOpen(true)}>
              + Ajouter une entreprise
            </PrimaryButton>
          </div>
        )}

        {tab === "owners" && (
          <div className="mt-3 flex flex-col gap-2.5">
            {list.map((c) => (
              <div key={c.id} className="bg-white rounded-[14px] border border-[#eef1ee] p-3">
                <div className="text-[14px] font-semibold">{c.responsable}</div>
                <div className="text-[12px] text-[#6b7a72]">
                  {c.name} · {c.phone}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "employees" && (
          <div className="mt-3 flex flex-col gap-2.5">
            {list.map((c) => (
              <div key={c.id} className="bg-white rounded-[14px] border border-[#eef1ee] p-3 flex justify-between">
                <div>
                  <div className="text-[14px] font-semibold">{c.name}</div>
                  <div className="text-[12px] text-[#6b7a72]">{c.city}</div>
                </div>
                <div className="text-[16px] font-bold text-[#1B7A4A]">{c.employees}</div>
              </div>
            ))}
          </div>
        )}

        {open && (
          <div className="fixed inset-0 z-50 bg-black/30 flex items-end justify-center">
            <div className="w-full max-w-[390px] bg-white rounded-t-[20px] p-4">
              <div className="text-[16px] font-bold mb-3">Nouvelle entreprise</div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom de l'entreprise"
                className="w-full h-11 rounded-[12px] border border-[#e4e8e5] px-3 text-[14px] mb-3"
              />
              <PrimaryButton
                onClick={() => {
                  if (!name.trim()) return;
                  setList((prev) => [
                    ...prev,
                    {
                      id: name.toLowerCase().replace(/\s+/g, "-"),
                      name,
                      employees: 0,
                      address: "Antananarivo",
                      city: "Antananarivo",
                      contact: "",
                      responsable: "—",
                      phone: "—",
                    },
                  ]);
                  setName("");
                  setOpen(false);
                }}
              >
                Enregistrer
              </PrimaryButton>
              <button type="button" onClick={() => setOpen(false)} className="w-full mt-2 h-11 text-[14px] text-[#6b7a72]">
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </Screen>
  );
}
