import type { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../utils/cn";
import { useApp } from "../context/AppContext";

type NavItem = {
  to: string;
  label: string;
  icon: (active: boolean) => ReactNode;
};

function IconHome(a: boolean) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" />
    </svg>
  );
}
function IconMenu(a: boolean) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.2 : 1.8} strokeLinecap="round">
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </svg>
  );
}
function IconOrders(a: boolean) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}
function IconClock(a: boolean) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.2 : 1.8} strokeLinecap="round">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}
function IconUser(a: boolean) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.2 : 1.8} strokeLinecap="round">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19c1.2-3 3.6-4.5 6.5-4.5s5.3 1.5 6.5 4.5" />
    </svg>
  );
}
function IconDash(a: boolean) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.2 : 1.8} strokeLinecap="round">
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="5" rx="1.5" />
      <rect x="13" y="10" width="8" height="11" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
    </svg>
  );
}
function IconChef(a: boolean) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 14h12v6H6z" />
      <path d="M8 14V9a4 4 0 0 1 8 0v5" />
      <path d="M4 9h16" />
    </svg>
  );
}
function IconTruck(a: boolean) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h11v8H3z" />
      <path d="M14 10h4l3 3v2h-7" />
      <circle cx="6.5" cy="17.5" r="1.5" />
      <circle cx="17.5" cy="17.5" r="1.5" />
    </svg>
  );
}
function IconUsers(a: boolean) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.2 : 1.8} strokeLinecap="round">
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.8-3 2.8-4.5 5.5-4.5s4.7 1.5 5.5 4.5" />
      <circle cx="17" cy="9" r="2.2" />
      <path d="M16 14.5c2 .3 3.5 1.6 4 3.5" />
    </svg>
  );
}
function IconWallet(a: boolean) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.2 : 1.8} strokeLinecap="round">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <circle cx="16.5" cy="14.5" r="1" fill="currentColor" />
    </svg>
  );
}

export const clientNav: NavItem[] = [
  { to: "/client/home", label: "Accueil", icon: IconHome },
  { to: "/client/menu", label: "Menu", icon: IconMenu },
  { to: "/client/cart", label: "Commandes", icon: IconOrders },
  { to: "/client/history", label: "Historique", icon: IconClock },
  { to: "/client/profile", label: "Profil", icon: IconUser },
];

export const companyNav: NavItem[] = [
  { to: "/company/dashboard", label: "Dashboard", icon: IconDash },
  { to: "/company/orders", label: "Commandes", icon: IconOrders },
  { to: "/company/employees", label: "Employés", icon: IconUsers },
  { to: "/company/history", label: "Historique", icon: IconClock },
  { to: "/company/profile", label: "Profil", icon: IconUser },
];

export const adminNav: NavItem[] = [
  { to: "/admin/dashboard", label: "Dashboard", icon: IconDash },
  { to: "/admin/orders", label: "Commandes", icon: IconOrders },
  { to: "/admin/kitchen", label: "Cuisine", icon: IconChef },
  { to: "/admin/deliveries", label: "Livraisons", icon: IconTruck },
  { to: "/admin/clients", label: "Clients", icon: IconUsers },
];

export const kitchenNav: NavItem[] = [
  { to: "/kitchen/production", label: "Production", icon: IconChef },
  { to: "/kitchen/company/abc", label: "Détails", icon: IconOrders },
  { to: "/kitchen/orders", label: "Commandes", icon: IconDash },
  { to: "/kitchen/ready", label: "Livraisons", icon: IconTruck },
  { to: "/kitchen/profile", label: "Profil", icon: IconUser },
];

export const deliveryNav: NavItem[] = [
  { to: "/delivery", label: "Livraisons", icon: IconTruck },
  { to: "/delivery/history", label: "Livrées", icon: IconClock },
  { to: "/delivery/orders", label: "Commandes", icon: IconOrders },
  { to: "/delivery/finances", label: "Finances", icon: IconWallet },
  { to: "/delivery/profile", label: "Profil", icon: IconUser },
];

function isExtraActive(to: string, pathname: string) {
  if (to.startsWith("/kitchen/company") && pathname.startsWith("/kitchen/company")) return true;
  if (to === "/delivery") {
    const seg = pathname.split("/")[2];
    const reserved = ["history", "orders", "finances", "profile"];
    return Boolean(seg) && pathname.startsWith("/delivery/") && !reserved.includes(seg);
  }
  return false;
}

function navFor(pathname: string): NavItem[] {
  if (pathname.startsWith("/admin")) return adminNav;
  if (pathname.startsWith("/company")) return companyNav;
  if (pathname.startsWith("/kitchen")) return kitchenNav;
  if (pathname.startsWith("/delivery")) return deliveryNav;
  return clientNav;
}

export function shouldShowNav(pathname: string) {
  if (pathname === "/" || pathname === "/client/login" || pathname === "/roles") return false;
  if (pathname.startsWith("/client/product")) return false;
  return true;
}

export function BottomNav() {
  const { pathname } = useLocation();
  const { cartCount } = useApp();
  if (!shouldShowNav(pathname)) return null;
  const items = navFor(pathname);

  return (
    <nav className="absolute bottom-0 left-0 right-0 h-[62px] bg-white border-t border-[#eef1ee] flex items-stretch px-1 z-30">
      {items.map((item) => (
        <NavLink
          key={item.to + item.label}
          to={item.to}
          end
          className={({ isActive }) => {
            const extra = isExtraActive(item.to, pathname);
            const on = isActive || extra;
            return cn(
              "flex-1 flex flex-col items-center justify-center gap-[2px] text-[10px] font-medium relative",
              on ? "text-[#1B7A4A]" : "text-[#8a968e]"
            );
          }}
        >
          {({ isActive }) => {
            const extra = isExtraActive(item.to, pathname);
            const on = isActive || extra;
            return (
            <>
              {item.icon(on)}
              <span>{item.label}</span>
              {item.to === "/client/cart" && cartCount > 0 && (
                <span className="absolute top-1.5 right-[18px] min-w-[16px] h-[16px] px-0.5 rounded-full bg-[#1B7A4A] text-white text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </>
            );
          }}
        </NavLink>
      ))}
    </nav>
  );
}

export function PhoneShell({ children }: { children: ReactNode }) {
  const { toast } = useApp();
  const { pathname } = useLocation();
  const showNav = shouldShowNav(pathname);

  return (
    <div className="min-h-dvh bg-[#cfd8d2] flex justify-center sm:items-stretch sm:py-0">
      <div className="w-full max-w-[390px] min-h-dvh bg-white shadow-[0_0_40px_rgba(20,40,28,0.18)] relative flex flex-col overflow-hidden">
        <div className={cn("flex-1 overflow-y-auto overflow-x-hidden no-scrollbar", showNav && "pb-[62px]")}>
          {children}
        </div>
        <BottomNav />
        {toast && (
          <div className="toast-enter absolute top-14 left-1/2 z-50 -translate-x-1/2 bg-[#1B7A4A] text-white text-[13px] font-medium px-4 py-2 rounded-full shadow-lg whitespace-nowrap">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}

export function Screen({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("min-h-full flex flex-col bg-[#f4f6f4]", className)}>
      {children}
    </div>
  );
}
