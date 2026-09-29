import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../utils/cn";
import type { OrderStatus, PaymentStatus } from "../data/mock";
import { deliveryStatusLabel, statusLabel } from "../data/mock";

export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-[10px] pb-[2px] text-[12px] font-semibold text-[#111] bg-white select-none">
      <span className="tabular-nums">9:41</span>
      <div className="flex items-center gap-[5px]">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
          <rect x="0" y="7" width="3" height="5" rx="0.5" />
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" />
          <rect x="9" y="2.5" width="3" height="9.5" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path
            d="M1 4.2C3.4 2 6.2 1 8 1s4.6 1 7 3.2M3.2 6.4C4.8 5 6.4 4.3 8 4.3s3.2.7 4.8 2.1M5.5 8.6c.8-.7 1.6-1 2.5-1s1.7.3 2.5 1"
            stroke="#111"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <circle cx="8" cy="10.7" r="1" fill="#111" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.6" y="0.6" width="21" height="10.8" rx="2.4" stroke="#111" strokeWidth="1.2" />
          <rect x="2.2" y="2.2" width="16.5" height="7.6" rx="1.2" fill="#111" />
          <path d="M23.2 4.2v3.6c.8-.4.8-3.2 0-3.6Z" fill="#111" />
        </svg>
      </div>
    </div>
  );
}

export function Header({
  title,
  onBack,
  right,
  menu,
  className,
}: {
  title: string;
  onBack?: boolean | (() => void);
  right?: ReactNode;
  menu?: () => void;
  className?: string;
}) {
  const navigate = useNavigate();
  return (
    <div className={cn("flex items-center justify-between px-4 py-2 bg-transparent", className)}>
      <div className="flex items-center gap-1.5 min-w-0 flex-1">
        {menu && (
          <button type="button" onClick={menu} className="p-1 -ml-1 text-[#1a2b22]" aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        )}
        {onBack && (
          <button
            type="button"
            onClick={() => (typeof onBack === "function" ? onBack() : navigate(-1))}
            className="p-1 -ml-1 text-[#1a2b22]"
            aria-label="Retour"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
        <h1 className="text-[18px] font-semibold text-[#1a2b22] truncate">{title}</h1>
      </div>
      <div className="flex items-center gap-2 shrink-0">{right}</div>
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  className,
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "w-full h-[48px] rounded-[12px] bg-[#1B7A4A] text-white text-[15px] font-semibold active:bg-[#14633c] disabled:opacity-50 disabled:pointer-events-none shadow-[0_4px_12px_rgba(27,122,74,0.28)]",
        className
      )}
    >
      {children}
    </button>
  );
}

export function Card({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "bg-white rounded-[14px] border border-[#eef1ee] shadow-[0_1px_4px_rgba(16,40,24,0.05)] text-left w-full",
        className
      )}
    >
      {children}
    </Comp>
  );
}

export function StatusBadge({
  status,
  kind = "order",
}: {
  status: OrderStatus | PaymentStatus | "disponible";
  kind?: "order" | "delivery" | "payment" | "stock";
}) {
  if (kind === "stock" || status === "disponible") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1B7A4A]">
        <span className="w-[6px] h-[6px] rounded-full bg-[#1B7A4A]" />
        Disponible
      </span>
    );
  }
  if (kind === "payment" || status === "paye" || status === "non_paye") {
    const paid = status === "paye";
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 text-[11px] font-medium px-2 py-[3px] rounded-full",
          paid ? "bg-[#e7f4ec] text-[#1B7A4A]" : "bg-[#fde8e8] text-[#dc2626]"
        )}
      >
        <span className={cn("w-[6px] h-[6px] rounded-full", paid ? "bg-[#1B7A4A]" : "bg-[#dc2626]")} />
        {paid ? "Payé" : "Non payé"}
      </span>
    );
  }
  const map: Record<OrderStatus, string> = {
    en_attente: "bg-[#fff4e0] text-[#d97706]",
    en_preparation: "bg-[#fff4e0] text-[#d97706]",
    en_livraison: "bg-[#fff1e0] text-[#ea580c]",
    livree: "bg-[#e7f4ec] text-[#1B7A4A]",
  };
  const label = kind === "delivery" ? deliveryStatusLabel(status as OrderStatus) : statusLabel(status as OrderStatus);
  return (
    <span className={cn("inline-flex items-center text-[11px] font-semibold px-2 py-[3px] rounded-full", map[status as OrderStatus])}>
      {label}
    </span>
  );
}

export function Tabs({
  tabs,
  value,
  onChange,
}: {
  tabs: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={cn(
            "px-3.5 py-[7px] rounded-full text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors",
            value === t.id
              ? "bg-[#1B7A4A] text-white"
              : "bg-white text-[#5b6b62] border border-[#e4e8e5]"
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function QtySelector({
  value,
  onChange,
  min = 1,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-7 h-7 rounded-full border border-[#d5ddd7] text-[#1B7A4A] text-[18px] leading-none flex items-center justify-center bg-white"
      >
        −
      </button>
      <span className="min-w-[16px] text-center text-[15px] font-semibold tabular-nums">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="w-7 h-7 rounded-full bg-[#1B7A4A] text-white text-[18px] leading-none flex items-center justify-center"
      >
        +
      </button>
    </div>
  );
}

export function StatCard({
  label,
  value,
  tone = "default",
  onClick,
}: {
  label: string;
  value: string | number;
  tone?: "default" | "warn" | "danger" | "ok";
  onClick?: () => void;
}) {
  const tones = {
    default: "text-[#1a2b22]",
    warn: "text-[#d97706]",
    danger: "text-[#dc2626]",
    ok: "text-[#1B7A4A]",
  };
  return (
    <Card onClick={onClick} className="p-3">
      <div className="text-[11px] text-[#6b7a72] font-medium leading-tight">{label}</div>
      <div className={cn("text-[18px] font-bold mt-1 tabular-nums leading-tight", tones[tone])}>{value}</div>
    </Card>
  );
}

export function SectionTitle({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-2.5">
      <h2 className="text-[15px] font-semibold text-[#1a2b22]">{children}</h2>
      {action}
    </div>
  );
}

export function BellButton({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="relative p-1.5 text-[#1a2b22]" aria-label="Notifications">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5" />
        <path d="M9 17a3 3 0 0 0 6 0" />
      </svg>
      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#dc2626]" />
    </button>
  );
}
