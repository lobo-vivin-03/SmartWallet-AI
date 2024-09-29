'use client'

import React,{useEffect} from "react"
import SideNav from "./_component/SideNav"
import DashboardHeader from "./_component/DashboardHeader"
import { db } from "../../../../utils/dbConfig"
import { Budgets } from "../../../../utils/schema"
import { useUser } from "@clerk/nextjs"
import { eq } from "drizzle-orm"
import { useRouter } from "next/router"

function DashboardLayout({childern}){
  const {user} = useUser();
  const router = useRouter();

  useEffect(() =>{
    user && checkUserBudget()
  }, [user])

  const checkUserBudget = async ( )=> {
    const result = await db.select.from(Budgets).where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
    if(result?.length == 0){
      router.replace('/dashboard/budgets')
    }
  }
  return(
    <div>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav/>
      </div>
      <div className="md:ml-64">
        <DashboardHeader/>
        {childern}
      </div>
    </div>
  );
}