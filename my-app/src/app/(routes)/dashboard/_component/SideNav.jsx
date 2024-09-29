import Image from "next/image";
import React,{useEffect} from "react";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  CircleDollarSign,
  Receipt
} from 'lucide-react'
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNav(){
  const menuList =[
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashbaord",
    },
    {
      id: 2,
      name: "Incomes",
      icon: CircleDollarSign,
      path: "/dashbaord/incomes",
    },
    {
      id: 3,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashbaord/budgets",
    },
    {
      id: 4,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashbaord/expenses",
    },
    {
      id: 5,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashbaord/upgrade",
    },
  ];

  const path = usePathname()

  useEffect(() => {
    console.log(path)
  }, [path]);

  return(
    <div className="h-screen p-5 border shadow-sm">
      <div className="flex flex-row items-center">
        <Image src ={'/logo.svg'} alt="logo" width={40} height={25} />
        <span className="text-blue-900 font-bold text-xl"></span>
      </div>
    

      <div className="mt-5">
        {menuList.map((menu,index) => (
          <Link 
          href={menu.path} key={index}
          >
            <h2 className={` flex gap-2 items-center text-gray-500 font-medium mb-2 p-4 cursor-pointer rounded-full hover:text-primary hover:bg-blue-100 ${path == menu.path && 'text-primary bg-blue-100'}`}>
              <menu.icon/>
              <menu.name/>

            </h2>

          </Link>
        ))}

      </div>
    </div>
  )

}

export default SideNav;
