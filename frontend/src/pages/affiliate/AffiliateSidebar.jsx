import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  CreditCard,
  DollarSign,
  Home,
  LinkIcon,
  LogOut,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import classNames from "classnames";

const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="flex items-center justify-center rounded-md border border-gray-300 bg-white p-2 text-gray-700 shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    {children}
  </button>
);

const Sheet = ({ children }) => <div>{children}</div>;
const SheetTrigger = ({ children }) => <>{children}</>;
const SheetContent = ({ children }) => (
  <div className="fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-white shadow-lg ring-1 ring-black ring-opacity-5">
    {children}
  </div>
);

const navItems = [
  { title: "Dashboard", href: "/agent", icon: Home },
  { title: "Referrals", href: "/agent?tab=referrals", icon: Users },
  { title: "Commissions", href: "/agent?tab=commissions", icon: DollarSign },
  { title: "Payouts", href: "/agent?tab=payouts", icon: CreditCard },
  { title: "Referral Tools", href: "/agent?tab=tools", icon: LinkIcon },
  { title: "Analytics", href: "/agent?tab=analytics", icon: BarChart3 },
  { title: "Settings", href: "/agent?tab=settings", icon: Settings },
];

export function AffiliateSidebar() {
  const location = useLocation();
  const pathname = location.pathname + location.search;

  return (
    <>
      {/* Mobile Navigation */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4 md:hidden">
        <Sheet>
          <SheetTrigger>
            <Button aria-label="Toggle menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col gap-2 px-6 py-8">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.href}
                  className={({ isActive }) =>
                    classNames(
                      "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-semibold transition-colors",
                      isActive || pathname === item.href
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    )
                  }
                >
                  <item.icon className="h-6 w-6" />
                  {item.title}
                </NavLink>
              ))}
              <NavLink
                to="/logout"
                className="mt-6 flex items-center gap-3 rounded-lg px-4 py-3 font-semibold text-red-600 transition-colors hover:bg-red-100"
              >
                <LogOut className="h-6 w-6" />
                Logout
              </NavLink>
            </nav>
          </SheetContent>
        </Sheet>
        <h1 className="flex-1 text-center text-xl font-bold text-gray-900">
          Affiliate Dashboard
        </h1>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-gray-200 bg-white md:flex">
        <div className="flex h-16 items-center border-b border-gray-200 px-6">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Affiliate Program
          </h1>
        </div>
        <nav className="flex flex-col flex-grow gap-1 overflow-y-auto p-6">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.href}
              className={({ isActive }) =>
                classNames(
                  "flex items-center gap-4 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200",
                  isActive || pathname === item.href
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100"
                )
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {item.title}
            </NavLink>
          ))}
          <div className="mt-auto pt-6">
            <NavLink
              to="/logout"
              className="flex items-center gap-4 rounded-lg px-4 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              Logout
            </NavLink>
          </div>
        </nav>
      </aside>
    </>
  );
}
