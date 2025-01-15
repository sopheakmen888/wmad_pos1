import React from 'react'
import { Button } from "@/components/ui/button";
import Link from 'next/link';

interface Props {
    title: string;
  }

export const PromotionIfoForm: React.FC<Props> = ({ title}) => {
  return (
        <div className="space-y-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex justify-between items-center">
        <Button><Link href="/promotion/create">
        PromotionIfo
      </Link></Button>
      </div>
    </div>
  )
}
