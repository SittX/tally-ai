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
      {/* Sticky Footer Navigation - Mobile Optimized */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-base-100 border-t border-base-200 md:hidden">
        <div className="flex items-center justify-around gap-0 px-2 py-2">
          {sortedMenus.map((menu: TMenu) => {
            const Icon = menu.icon;
            const active = isActive(menu.herf);
            return (
              <Link
                key={menu.name}
                href={menu.herf}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-fit ${
                  active
                    ? "text-primary bg-primary/10"
                    : "text-base-content/60 hover:text-base-content hover:bg-base-200"
                }`}
                title={menu.name}
              >
                <Icon size={24} strokeWidth={1.5} />
                <span className="text-xs font-medium">{menu.name}</span>
                {menu.badge && (
                  <span className="badge badge-xs badge-primary">
                    {menu.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Navigation - Hidden on Mobile */}
      <nav className="hidden md:flex sticky top-0 z-40 bg-base-100 border-b border-base-200">
        <div className="w-full px-6 py-4 flex items-center gap-2">
          <h1 className="text-xl font-bold mr-auto">Dashboard</h1>
          <div className="flex items-center gap-2">
            {sortedMenus.map((menu: TMenu) => {
              const Icon = menu.icon;
              const active = isActive(menu.herf);
              return (
                <Link
                  key={menu.name}
                  href={menu.herf}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    active
                      ? "text-primary bg-primary/10"
                      : "text-base-content/60 hover:text-base-content hover:bg-base-200"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.5} />
                  <span className="text-sm font-medium">{menu.name}</span>
                  {menu.badge && (
                    <span className="badge badge-xs badge-primary">
                      {menu.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Spacer for Mobile - Prevents content overlap with fixed footer */}
      <div className="h-20 md:hidden" />
    </>
  );
}
