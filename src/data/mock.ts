import imgPizza from "../assets/images/pizza.jpg";
import imgRizMais from "../assets/images/riz-mais.jpg";
import imgRizAchards from "../assets/images/riz-achards.jpg";
import imgNem from "../assets/images/nem.jpg";
import imgGouter from "../assets/images/gouter.jpg";
import imgBoisson from "../assets/images/boisson.jpg";
import imgPromo from "../assets/images/promo-meals.jpg";
import imgLogin from "../assets/images/login-bowl.jpg";
import imgAvatar from "../assets/images/avatar-ahmed.jpg";
import imgLeaves from "../assets/images/leaves-decor.jpg";

export const images = {
  pizza: imgPizza,
  rizMais: imgRizMais,
  rizAchards: imgRizAchards,
  nem: imgNem,
  gouter: imgGouter,
  boisson: imgBoisson,
  promo: imgPromo,
  login: imgLogin,
  avatar: imgAvatar,
  leaves: imgLeaves,
};

export type Category = "repas" | "snacks" | "boissons";

export type OrderStatus =
  | "en_attente"
  | "en_preparation"
  | "en_livraison"
  | "livree";

export type PaymentStatus = "paye" | "non_paye";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  available: boolean;
  options?: { id: string; label: string; extra: number }[];
}

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  optionId?: string;
  optionLabel?: string;
  extraPrice: number;
  notes?: string;
}

export interface Company {
  id: string;
  name: string;
  employees: number;
  address: string;
  city: string;
  contact: string;
  responsable: string;
  phone: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  companyId: string;
  companyName: string;
  date: string;
  dateLabel: string;
  time: string;
  items: OrderItem[];
  meals: number;
  extras: string;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  address: string;
  contact?: string;
}

export interface PaymentRecord {
  id: string;
  method: string;
  date: string;
  amount: number;
  company: string;
}

export const products: Product[] = [
  {
    id: "riz-mais",
    name: "Riz + maïs",
    description: "Riz blanc complet avec légumes frais et épis de maïs",
    price: 6500,
    image: imgRizMais,
    category: "repas",
    available: true,
  },
  {
    id: "riz-achards",
    name: "Riz + achards",
    description: "Riz blanc et achards savoureux",
    price: 6500,
    image: imgRizAchards,
    category: "repas",
    available: true,
  },
  {
    id: "pizza",
    name: "Pizza",
    description: "Pâte maison, sauce tomate, fromage, et options au choix",
    price: 8000,
    image: imgPizza,
    category: "repas",
    available: true,
    options: [
      { id: "petite", label: 'Petite (8")', extra: 0 },
      { id: "grande", label: 'Grande (12")', extra: 2000 },
    ],
  },
  {
    id: "nem",
    name: "Nem",
    description: "Croustillant et savoureux",
    price: 5000,
    image: imgNem,
    category: "snacks",
    available: true,
  },
  {
    id: "gouter",
    name: "Goûter",
    description: "Goûter sucré et gourmand",
    price: 3500,
    image: imgGouter,
    category: "snacks",
    available: true,
  },
  {
    id: "boisson",
    name: "Boisson 50 cl",
    description: "Eau minérale 50 cl",
    price: 1500,
    image: imgBoisson,
    category: "boissons",
    available: true,
  },
];

export const companies: Company[] = [
  {
    id: "abc",
    name: "ABC Call Center",
    employees: 120,
    address: "Lot II, Antananarivo",
    city: "Antananarivo",
    contact: "034 12 345 67",
    responsable: "Ahmed Rakoto",
    phone: "034 12 345 67",
  },
  {
    id: "xyz",
    name: "XYZ Entreprise",
    employees: 80,
    address: "Antananarivo",
    city: "Antananarivo",
    contact: "034 22 111 22",
    responsable: "Miora Andria",
    phone: "034 22 111 22",
  },
  {
    id: "tech",
    name: "Tech Solutions",
    employees: 45,
    address: "Tanjombato",
    city: "Tanjombato",
    contact: "034 55 678 90",
    responsable: "Jean Rabe",
    phone: "034 55 678 90",
  },
  {
    id: "global",
    name: "Global Services",
    employees: 60,
    address: "Ambohibao",
    city: "Ambohibao",
    contact: "034 98 765 43",
    responsable: "Hery Rasoa",
    phone: "034 98 765 43",
  },
];

export const currentUser = {
  name: "Ahmed",
  fullName: "Ahmed Rakoto",
  email: "ahmed@abccallcenter.mg",
  phone: "034 12 345 67",
  company: "ABC Call Center",
  companyId: "abc",
  role: "Employé",
  avatar: imgAvatar,
};

export const kitchenTotals: { productId: string; name: string; qty: number }[] = [
  { productId: "riz-mais", name: "Riz + maïs", qty: 120 },
  { productId: "riz-achards", name: "Riz + achards", qty: 45 },
  { productId: "pizza", name: "Pizza", qty: 35 },
  { productId: "nem", name: "Nem", qty: 60 },
  { productId: "gouter", name: "Goûter", qty: 40 },
];

export const kitchenByCompany: {
  companyId: string;
  employees: number;
  items: { name: string; qty: number }[];
}[] = [
  {
    companyId: "abc",
    employees: 87,
    items: [
      { name: "Riz + maïs", qty: 40 },
      { name: "Nem", qty: 15 },
      { name: "Pizza", qty: 10 },
    ],
  },
  {
    companyId: "xyz",
    employees: 50,
    items: [
      { name: "Riz + maïs", qty: 30 },
      { name: "Pizza", qty: 20 },
    ],
  },
  {
    companyId: "tech",
    employees: 35,
    items: [
      { name: "Riz + maïs", qty: 20 },
      { name: "Nem", qty: 10 },
    ],
  },
  {
    companyId: "global",
    employees: 40,
    items: [
      { name: "Riz + maïs", qty: 30 },
      { name: "Pizza", qty: 5 },
      { name: "Goûter", qty: 10 },
    ],
  },
];

export const companyGrouped = [
  { name: "Riz + maïs", qty: 86 },
  { name: "Riz + achards", qty: 21 },
  { name: "Pizza", qty: 15 },
  { name: "Nem", qty: 12 },
];

export const salesWeek = [
  { day: "Lun", value: 42 },
  { day: "Mar", value: 55 },
  { day: "Mer", value: 48 },
  { day: "Jeu", value: 70 },
  { day: "Ven", value: 78 },
  { day: "Sam", value: 86 },
  { day: "Dim", value: 94 },
];

export const timeSlots = ["11:00", "12:00", "13:00", "14:00"];

export const payments: PaymentRecord[] = [
  { id: "p1", method: "Mobile Money", date: "14 avr. 2025", amount: 120000, company: "ABC Call Center" },
  { id: "p2", method: "Virement", date: "12 avr. 2025", amount: 350000, company: "XYZ Entreprise" },
  { id: "p3", method: "Mobile Money", date: "10 avr. 2025", amount: 80000, company: "Tech Solutions" },
];

export const initialOrders: Order[] = [
  {
    id: "CMD2025-0045",
    companyId: "abc",
    companyName: "ABC Call Center",
    date: "2025-04-15",
    dateLabel: "15 avr. 2025",
    time: "12:00",
    items: [
      { name: "Riz + maïs", quantity: 2, price: 6500 },
      { name: "Pizza", quantity: 1, price: 8000 },
      { name: "Boisson 50 cl", quantity: 2, price: 1500 },
    ],
    meals: 86,
    extras: "42 nems",
    total: 24000,
    status: "en_preparation",
    paymentStatus: "non_paye",
    paymentMethod: "Mobile Money",
    address: "Lot II, Antananarivo",
    contact: "034 12 345 67",
  },
  {
    id: "CMD2025-0044",
    companyId: "xyz",
    companyName: "XYZ Entreprise",
    date: "2025-04-15",
    dateLabel: "14 avr. 2025",
    time: "11:30",
    items: [
      { name: "Riz + maïs", quantity: 50, price: 6500 },
      { name: "Pizza", quantity: 20, price: 8000 },
    ],
    meals: 50,
    extras: "20 pizzas",
    total: 18500,
    status: "en_attente",
    paymentStatus: "non_paye",
    paymentMethod: "Virement",
    address: "Antananarivo",
    contact: "034 22 111 22",
  },
  {
    id: "CMD2025-0043",
    companyId: "tech",
    companyName: "Tech Solutions",
    date: "2025-04-15",
    dateLabel: "12 avr. 2025",
    time: "11:00",
    items: [
      { name: "Riz + maïs", quantity: 30, price: 6500 },
      { name: "Nem", quantity: 16, price: 5000 },
    ],
    meals: 30,
    extras: "16 nems",
    total: 15000,
    status: "livree",
    paymentStatus: "paye",
    paymentMethod: "Mobile Money",
    address: "Tanjombato",
    contact: "034 55 678 90",
  },
  {
    id: "CMD2025-0042",
    companyId: "global",
    companyName: "Global Services",
    date: "2025-04-15",
    dateLabel: "10 avr. 2025",
    time: "10:00",
    items: [
      { name: "Riz + maïs", quantity: 40, price: 6500 },
      { name: "Pizza", quantity: 15, price: 8000 },
    ],
    meals: 40,
    extras: "15 pizzas",
    total: 22000,
    status: "en_livraison",
    paymentStatus: "non_paye",
    paymentMethod: "Mobile Money",
    address: "Ambohibao",
    contact: "034 98 765 43",
  },
  {
    id: "CMD2025-0041",
    companyId: "abc",
    companyName: "ABC Call Center",
    date: "2025-04-08",
    dateLabel: "8 avr. 2025",
    time: "12:00",
    items: [
      { name: "Riz + maïs", quantity: 2, price: 6500 },
      { name: "Nem", quantity: 1, price: 5000 },
    ],
    meals: 3,
    extras: "",
    total: 18000,
    status: "livree",
    paymentStatus: "paye",
    paymentMethod: "Mobile Money",
    address: "Lot II, Antananarivo",
  },
  {
    id: "CMD2025-0040",
    companyId: "abc",
    companyName: "ABC Call Center",
    date: "2025-04-05",
    dateLabel: "5 avr. 2025",
    time: "12:00",
    items: [{ name: "Pizza", quantity: 2, price: 8000 }],
    meals: 2,
    extras: "",
    total: 16000,
    status: "livree",
    paymentStatus: "paye",
    paymentMethod: "Mobile Money",
    address: "Lot II, Antananarivo",
  },
];

export const companyTodayOrders: Order[] = [
  {
    id: "CMD2025-0045",
    companyId: "abc",
    companyName: "ABC Call Center",
    date: "2025-04-15",
    dateLabel: "Aujourd'hui",
    time: "12:00",
    items: [],
    meals: 86,
    extras: "",
    total: 24000,
    status: "en_preparation",
    paymentStatus: "non_paye",
    paymentMethod: "Mobile Money",
    address: "Lot II, Antananarivo",
  },
  {
    id: "CMD2025-0044",
    companyId: "abc",
    companyName: "ABC Call Center",
    date: "2025-04-15",
    dateLabel: "Aujourd'hui",
    time: "11:30",
    items: [],
    meals: 12,
    extras: "",
    total: 18500,
    status: "livree",
    paymentStatus: "paye",
    paymentMethod: "Mobile Money",
    address: "Lot II, Antananarivo",
  },
  {
    id: "CMD2025-0043",
    companyId: "abc",
    companyName: "ABC Call Center",
    date: "2025-04-15",
    dateLabel: "Aujourd'hui",
    time: "11:00",
    items: [],
    meals: 8,
    extras: "",
    total: 22000,
    status: "livree",
    paymentStatus: "paye",
    paymentMethod: "Virement",
    address: "Lot II, Antananarivo",
  },
  {
    id: "CMD2025-0042",
    companyId: "abc",
    companyName: "ABC Call Center",
    date: "2025-04-15",
    dateLabel: "Aujourd'hui",
    time: "10:30",
    items: [],
    meals: 10,
    extras: "",
    total: 15000,
    status: "livree",
    paymentStatus: "paye",
    paymentMethod: "Mobile Money",
    address: "Lot II, Antananarivo",
  },
  {
    id: "CMD2025-0041",
    companyId: "abc",
    companyName: "ABC Call Center",
    date: "2025-04-15",
    dateLabel: "Aujourd'hui",
    time: "09:45",
    items: [],
    meals: 6,
    extras: "",
    total: 12500,
    status: "livree",
    paymentStatus: "paye",
    paymentMethod: "Mobile Money",
    address: "Lot II, Antananarivo",
  },
];

export function formatPrice(n: number): string {
  return `${Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0")} Ar`;
}

export function statusLabel(s: OrderStatus): string {
  switch (s) {
    case "en_attente":
      return "En attente";
    case "en_preparation":
      return "En préparation";
    case "en_livraison":
      return "En livraison";
    case "livree":
      return "Livrée";
  }
}

export function deliveryStatusLabel(s: OrderStatus): string {
  switch (s) {
    case "en_attente":
      return "À livrer";
    case "en_preparation":
      return "À livrer";
    case "en_livraison":
      return "En livraison";
    case "livree":
      return "Livré";
  }
}

export const notifications = [
  {
    id: "n1",
    title: "Commande en préparation",
    text: "Votre commande #CMD2025-0045 est en cours de préparation.",
    time: "Il y a 12 min",
  },
  {
    id: "n2",
    title: "Livraison aujourd'hui",
    text: "Pensez à commander avant 10h00 pour une livraison le jour même.",
    time: "Il y a 1 h",
  },
];

export const defaultCart: CartItem[] = [
  {
    key: "riz-mais",
    productId: "riz-mais",
    name: "Riz + maïs",
    price: 6500,
    image: imgRizMais,
    quantity: 2,
    extraPrice: 0,
  },
  {
    key: "pizza",
    productId: "pizza",
    name: "Pizza",
    price: 8000,
    image: imgPizza,
    quantity: 1,
    extraPrice: 0,
    optionId: "petite",
    optionLabel: 'Petite (8")',
  },
  {
    key: "boisson",
    productId: "boisson",
    name: "Boisson 50 cl",
    price: 1500,
    image: imgBoisson,
    quantity: 2,
    extraPrice: 0,
  },
];
