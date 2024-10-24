import React, { useEffect } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  CircleDollarSign,
  TrendingUp,
  TrendingDownIcon,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Incomes",
      icon: CircleDollarSign,
      path: "/dashboard/incomes",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    // {
    //   id: 4,
    //   name: "Upgrade",
    //   icon: ShieldCheck,
    //   path: "/dashboard/upgrade",
    // },
  ];
  const path = usePathname();

  useEffect(() => {
    // console.log(path);
  }, [path]);
  return (
      <div className="h-screen p-5 border shadow-xl shadow-slate-700">
      
      <div className="flex flex-row items-center">
        <Image src="/logo.png" alt="logo" width={35} height={35} />
        <span className="text-blue-900 font-bold text-xl p-2">Smart Wallet AI</span>
      </div>
      <div className="mt-10">
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h2
              className={`flex gap-2 items-center
                    text-gray-800 font-medium
                    mb-2 mt-5
                    p-4 cursor-pointer rounded-full
                    hover:text-blue-900 hover:bg-blue-200
                    ${path == menu.path && "text-blue-900 bg-blue-100"}
                    `}
              >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div
        className="fixed bottom-10 p-5 flex gap-2
            items-center"
      >
        <UserButton />
        Profile
      </div>
    </div>
  );
}

export default SideNav;