import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Screen } from "../../components/Layout";
import { PrimaryButton, QtySelector, StatusBadge } from "../../components/ui";
import { formatPrice, products } from "../../data/mock";
import { useApp } from "../../context/AppContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id) ?? products[2];
  const { addToCart } = useApp();
  const [qty, setQty] = useState(1);
  const [optionId, setOptionId] = useState(product.options?.[0]?.id);
  const [notes, setNotes] = useState("");
  const option = product.options?.find((o) => o.id === optionId);
  const extra = option?.extra ?? 0;
  const unit = product.price + extra;

  return (
    <Screen className="bg-white">
      <div className="px-0 pb-6">
        <div className="relative">
          <img src={product.image} alt={product.name} className="w-full h-[230px] object-cover" />
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md"
            aria-label="Retour"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>
        <div className="px-4 pt-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-[22px] font-bold leading-tight">{product.name}</h1>
              <p className="text-[13px] text-[#6b7a72] mt-1 leading-snug">{product.description}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="text-[22px] font-bold text-[#1B7A4A]">{formatPrice(unit)}</div>
            <StatusBadge status="disponible" kind="stock" />
          </div>

          <div className="flex items-center justify-between mt-4 py-2">
            <span className="text-[14px] font-medium">Quantité</span>
            <QtySelector value={qty} onChange={setQty} />
          </div>

          {product.options && (
            <div className="mt-2">
              <div className="text-[14px] font-semibold mb-2">Options</div>
              <div className="text-[12px] text-[#6b7a72] mb-1.5">Taille</div>
              <div className="flex flex-col gap-2">
                {product.options.map((o) => (
                  <label
                    key={o.id}
                    className="flex items-center justify-between bg-[#f7f8f7] rounded-[12px] px-3 py-2.5"
                  >
                    <span className="flex items-center gap-2 text-[13px]">
                      <input
                        type="radio"
                        name="opt"
                        checked={optionId === o.id}
                        onChange={() => setOptionId(o.id)}
                        className="accent-[#1B7A4A]"
                      />
                      {o.label}
                    </span>
                    <span className="text-[13px] font-medium text-[#1a2b22]">
                      {o.extra > 0 ? `+ ${formatPrice(o.extra)}` : ""}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4">
            <div className="text-[14px] font-semibold mb-1.5">Remarque (facultatif)</div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex : sans fromage, bien cuit..."
              rows={3}
              className="w-full rounded-[12px] border border-[#e4e8e5] bg-[#fafbfa] p-3 text-[13px] resize-none"
            />
          </div>

          <PrimaryButton
            className="mt-5"
            onClick={() => {
              addToCart({
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: qty,
                extraPrice: extra,
                optionId,
                optionLabel: option?.label,
                notes: notes || undefined,
              });
              navigate("/client/cart");
            }}
          >
            Ajouter au panier
          </PrimaryButton>
        </div>
      </div>
    </Screen>
  );
}
