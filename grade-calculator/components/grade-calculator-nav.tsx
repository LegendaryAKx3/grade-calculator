"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ThemeSwitcher from "@/components/theme-switcher"
import FinalGradeCalculator from "./final-grade-calculator"
import CurrentGradeCalculator from "./current-grade-calculator"

export default function GradeCalculatorNav() {
  const [activeTab, setActiveTab] = useState("final")

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute top-2 right-2">
        <ThemeSwitcher />
      </div>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Grade Calculator</CardTitle>
          <CardDescription>Calculate your final grade or current weighted average</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="final">Final Grade</TabsTrigger>
              <TabsTrigger value="current">Current Grade</TabsTrigger>
            </TabsList>
            <TabsContent value="final">
              <FinalGradeCalculator />
            </TabsContent>
            <TabsContent value="current">
              <CurrentGradeCalculator />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  )
}