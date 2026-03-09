"use client";
import menus, { TMenu } from "@/lib/menus.config";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname === "/dashboard") return true;
    if (href !== "/dashboard" && pathname.startsWith(href)) return true;
    return false;
  };

  const sortedMenus = [...menus].sort((a, b) => a.order - b.order);

  return (
    <>
      {/* Mobile: Sticky Footer Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-base-100 border-t border-base-200 md:hidden">
        <div className="flex items-end justify-around px-1 py-2 h-20 gap-1">
          {sortedMenus.map((menu: TMenu) => {
            const Icon = menu.icon;
            const active = isActive(menu.href);
            return (
              <Link
                key={menu.name}
                href={menu.href}
                className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-md flex-1 transition-all duration-200 ${
                  active
                    ? "text-primary bg-primary/10 font-semibold"
                    : "text-base-content/50 hover:text-base-content hover:bg-base-200"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={22} strokeWidth={1.5} className="flex-shrink-0" />
                <span className="text-[10px] leading-none text-center line-clamp-1">
                  {menu.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop: Horizontal Top Navigation */}
      <nav className="hidden md:block sticky top-0 z-40 bg-base-100 border-b border-base-200 w-full">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold">Dashboard</span>
          </div>
          <div className="flex items-center gap-1">
            {sortedMenus.map((menu: TMenu) => {
              const Icon = menu.icon;
              const active = isActive(menu.href);
              return (
                <Link
                  key={menu.name}
                  href={menu.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
                    active
                      ? "text-primary bg-primary/10 font-semibold"
                      : "text-base-content/60 hover:text-base-content hover:bg-base-200"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon size={18} strokeWidth={1.5} />
                  <span className="text-sm">{menu.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile: Bottom Spacer for Fixed Footer */}
      <div className="h-20 md:hidden" />
    </>
  );
}
