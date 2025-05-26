'use client'

import { VerifyForm } from "@/components/VerifyForm";
import { Suspense } from "react";

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyForm />
    </Suspense>
  )
}

export default page;