export type TMenu = {
  name: string;
  herf: string;
  order: number;
};

const menus: TMenu[] = [
  {
    name: "Home",
    herf: "/",
    order: 0,
  },
  {
    name: "Settings",
    herf: "/dashboard/settings",
    order: 1,
  },
];

export default menus;
