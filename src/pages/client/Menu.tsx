import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { Header, StatusBadge } from "../../components/ui";
import { formatPrice, products, type Category } from "../../data/mock";
import { useApp } from "../../context/AppContext";
import { cn } from "../../utils/cn";

const filters: { id: "tous" | Category; label: string }[] = [
  { id: "tous", label: "Tous" },
  { id: "repas", label: "Repas" },
  { id: "snacks", label: "Snacks" },
  { id: "boissons", label: "Boissons" },
];

export default function Menu() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initial = (params.get("cat") as Category | null) ?? "tous";
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<"tous" | Category>(
    initial === "repas" || initial === "snacks" || initial === "boissons" ? initial : "tous"
  );
  const { addToCart } = useApp();

  const list = useMemo(() => {
    return products.filter((p) => {
      const okCat = cat === "tous" || p.category === cat;
      const okQ = p.name.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase());
      return okCat && okQ;
    });
  }, [q, cat]);

  return (
    <Screen>
      <Header title="Menu" onBack={() => navigate("/client/home")} />
      <div className="px-4 pb-5">
        <div className="flex items-center gap-2 h-[42px] rounded-[12px] bg-white border border-[#e4e8e5] px-3 mb-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8a968e" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3-3" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un produit..."
            className="flex-1 bg-transparent text-[13px]"
          />
        </div>

        <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setCat(f.id)}
              className={cn(
                "px-3.5 py-[6px] rounded-full text-[13px] font-medium shrink-0",
                cat === f.id ? "bg-[#1B7A4A] text-white" : "bg-white text-[#5b6b62] border border-[#e4e8e5]"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          {list.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-[14px] border border-[#eef1ee] p-2.5 flex gap-3 items-center shadow-[0_1px_3px_rgba(16,40,24,0.04)]"
            >
              <button type="button" onClick={() => navigate(`/client/product/${p.id}`)} className="shrink-0">
                <img src={p.image} alt={p.name} className="w-[72px] h-[72px] rounded-[12px] object-cover" />
              </button>
              <div className="flex-1 min-w-0">
                <button type="button" onClick={() => navigate(`/client/product/${p.id}`)} className="text-left w-full">
                  <div className="text-[14px] font-semibold">{p.name}</div>
                  <div className="text-[11px] text-[#6b7a72] line-clamp-2 leading-snug">{p.description}</div>
                </button>
                <div className="flex items-center justify-between mt-1">
                  <div>
                    <div className="text-[13px] font-bold text-[#1a2b22]">{formatPrice(p.price)}</div>
                    <StatusBadge status="disponible" kind="stock" />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        productId: p.id,
                        name: p.name,
                        price: p.price,
                        image: p.image,
                        quantity: 1,
                        extraPrice: 0,
                      })
                    }
                    className="h-[30px] px-3 rounded-full bg-[#1B7A4A] text-white text-[12px] font-semibold"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          ))}
          {list.length === 0 && (
            <div className="text-center text-[13px] text-[#6b7a72] py-10">Aucun produit trouvé</div>
          )}
        </div>
      </div>
    </Screen>
  );
}
