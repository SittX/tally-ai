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
  herf: string;
  icon: LucideIcon;
  order: number;
  badge?: string;
};

const menus: TMenu[] = [
  {
    name: "Home",
    herf: "/dashboard",
    icon: Home,
    order: 0,
  },
  {
    name: "Projects",
    herf: "/dashboard/projects",
    icon: FolderOpen,
    order: 1,
  },
  {
    name: "Accounts",
    herf: "/dashboard/accounts",
    icon: CreditCard,
    order: 2,
  },
  {
    name: "Notifications",
    herf: "/dashboard/notifications",
    icon: Bell,
    order: 3,
  },
  {
    name: "Profile",
    herf: "/dashboard/profile",
    icon: User,
    order: 4,
  },
  {
    name: "Settings",
    herf: "/dashboard/settings",
    icon: Settings,
    order: 5,
  },
];

export default menus;
