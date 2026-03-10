import {
  Home,
  Settings,
  User,
  CreditCard,
  Activity,
  LucideIcon,
} from "lucide-react";

export type TMenu = {
  name: string;
  href: string;
  icon: LucideIcon;
  order: number;
  badge?: string;
};

const menus: TMenu[] = [
  {
    name: "Home",
    href: "/dashboard",
    icon: Home,
    order: 0,
  },
  {
    name: "Accounts",
    href: "/dashboard/accounts",
    icon: CreditCard,
    order: 1,
  },
  {
    name: "Activity",
    href: "/dashboard/activity",
    icon: Activity,
    order: 2,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    order: 3,
  },
];

export default menus;
