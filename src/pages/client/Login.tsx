import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { Screen } from "../../components/Layout";
import { PrimaryButton } from "../../components/ui";
import { images } from "../../data/mock";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("ahmed@abccallcenter.mg");
  const [password, setPassword] = useState("••••••••");
  const [remember, setRemember] = useState(true);
  const [showPwd, setShowPwd] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    const v = email.toLowerCase();
    if (v.includes("admin")) navigate("/admin/dashboard");
    else if (v.includes("cuisine") || v.includes("kitchen")) navigate("/kitchen/production");
    else if (v.includes("livreur") || v.includes("delivery")) navigate("/delivery");
    else if (v.includes("responsable") || v.includes("company")) navigate("/company/dashboard");
    else navigate("/client/home");
  }

  return (
    <Screen className="bg-white relative overflow-hidden">
      <div className="relative z-10 px-6 pt-6">
        <div className="flex justify-center">
          <Logo stacked size={54} />
        </div>

        <form onSubmit={submit} className="mt-7 space-y-3.5">
          <label className="block">
            <span className="text-[12px] font-medium text-[#5b6b62]">Email ou téléphone</span>
            <div className="mt-1.5 flex items-center gap-2 h-[46px] rounded-[12px] border border-[#e0e5e2] bg-[#fafbfa] px-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8a968e" strokeWidth="1.8">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-[14px] text-[#1a2b22]"
                placeholder="exemple@entreprise.com"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-[12px] font-medium text-[#5b6b62]">Mot de passe</span>
            <div className="mt-1.5 flex items-center gap-2 h-[46px] rounded-[12px] border border-[#e0e5e2] bg-[#fafbfa] px-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8a968e" strokeWidth="1.8">
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent text-[14px] text-[#1a2b22]"
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPwd((s) => !s)} className="text-[#8a968e] p-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          </label>

          <label className="flex items-center gap-2 text-[12px] text-[#5b6b62] pt-0.5">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="accent-[#1B7A4A] w-3.5 h-3.5"
            />
            Se souvenir de moi
          </label>

          <PrimaryButton type="submit" className="mt-2">
            Se connecter
          </PrimaryButton>

          <p className="text-center text-[13px] text-[#5b6b62]">
            Pas encore de compte ?{" "}
            <button
              type="button"
              className="text-[#1B7A4A] font-semibold"
              onClick={() => navigate("/client/home")}
            >
              Créer un compte
            </button>
          </p>

          <div className="pt-1">
            <p className="text-center text-[11px] text-[#8a968e] mb-2">Accès démo</p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {[
                { l: "Employé", t: "/client/home" },
                { l: "Responsable", t: "/company/dashboard" },
                { l: "Admin", t: "/admin/dashboard" },
                { l: "Cuisine", t: "/kitchen/production" },
                { l: "Livreur", t: "/delivery" },
              ].map((r) => (
                <button
                  key={r.l}
                  type="button"
                  onClick={() => navigate(r.t)}
                  className="px-2.5 py-1 rounded-full bg-[#e7f4ec] text-[#1B7A4A] text-[11px] font-semibold"
                >
                  {r.l}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>

      <div className="absolute left-0 bottom-0 w-full h-[280px] pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-white via-white/70 to-transparent z-20" />
        <img
          src={images.login}
          alt="Repas du jour"
          className="absolute left-0 bottom-0 w-full h-full object-cover object-center z-0"
        />
      </div>
    </Screen>
  );
}
