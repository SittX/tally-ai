import {
  Home,
  FolderOpen,
  Settings,
  User,
  CreditCard,
  Bell,
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
    name: "Projects",
    href: "/dashboard/projects",
    icon: FolderOpen,
    order: 1,
  },
  {
    name: "Accounts",
    href: "/dashboard/accounts",
    icon: CreditCard,
    order: 2,
  },
  {
    name: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
    order: 3,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
    order: 4,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    order: 5,
  },
];

export default menus;
