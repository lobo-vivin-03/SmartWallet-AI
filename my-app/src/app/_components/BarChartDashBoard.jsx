import React from 'react'
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BarChartDashBoard({budgetList}){
  return (
    <div className='border rounded-2xl p-5'>
      <h2 className='font-bold text-lg'>
        Activity
      </h2>
      <div className="w-full lg:w-[30%]"> {/* 100% on smaller, 30% on lg */}
        <ResponsiveContainer width={'100%'} height={300}>

          <BarChart data={budgetList} margin={{top:7}}>
            <XAxis dataKey={'name'}/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey='Total Spend' stackId='a' fill='#4845d2'/>
            <Bar dataKey='Amount' stackId='a' fill='#ec3482'/>
          </BarChart>

        </ResponsiveContainer>
      </div>

    </div>
  )
}

export default BarChartDashBoard