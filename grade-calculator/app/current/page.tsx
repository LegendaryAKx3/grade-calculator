"use client"

import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import ThemeSwitcher from "@/components/theme-switcher"
import { PlusCircle, Trash2 } from "lucide-react"

// TODO Create error messages for impossible weights and add link to this page 

type GradeInput = {
  grade: number
  weight: number
}

type Inputs = {
  grades: GradeInput[]
}

export default function Component() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<Inputs>({
    defaultValues: {
      grades: [{ grade: 0, weight: 0 }]
    }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "grades"
  })
  const [result, setResult] = useState<number | undefined>()

  const onSubmit = (data: Inputs) => {
    const weightedSum = data.grades.reduce((sum, grade) => sum + grade.grade * (grade.weight / 100), 0)
    setResult(weightedSum)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute top-2 right-2">
        <ThemeSwitcher />
      </div>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Dynamic Grade Calculator</CardTitle>
          <CardDescription>
            Input your current grades and weights to calculate your weighted average
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-end space-x-4">
                <div className="flex-1">
                  <Label htmlFor={`grades.${index}.grade`}>Grade {index + 1}</Label>
                  <Input
                    id={`grades.${index}.grade`}
                    type="number"
                    min={0}
                    max={100}
                    {...register(`grades.${index}.grade` as const, { required: true, min: 0, max: 100 })}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor={`grades.${index}.weight`}>Weight {index + 1}</Label>
                  <Input
                    id={`grades.${index}.weight`}
                    type="number"
                    min={0}
                    max={100}
                    {...register(`grades.${index}.weight` as const, { required: true, min: 0, max: 100 })}
                  />
                </div>
                <Button 
                  type="button" 
                  variant="destructive" 
                  size="icon" 
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ grade: 0, weight: 0 })}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Grade
            </Button>
            <Button className="w-full" type="submit">Calculate Average</Button>
          </form>
        </CardContent>
        {result !== undefined && (
          <CardFooter>
            <CardDescription className="flex flex-col gap-2">
              <span>
                Your current weighted average is: <span className="text-primary font-bold">{result}%</span>
              </span>
              {result >= 90 && <span className="text-green-500">Excellent work! Keep it up!</span>}
              {result >= 80 && result < 90 && <span className="text-green-500">Great job! You're doing well.</span>}
              {result >= 70 && result < 80 && <span className="text-yellow-500">Good effort. There's room for improvement.</span>}
              {result >= 60 && result < 70 && <span className="text-yellow-500">You're passing, but try to boost your grades.</span>}
              {result < 60 && <span className="text-destructive">You need to work harder to improve your grades.</span>}
            </CardDescription>
          </CardFooter>
        )}
      </Card>
    </main>
  )
}