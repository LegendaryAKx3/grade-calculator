"use client"

import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

type GradeInput = {
    grade: string
  }
  
  type Inputs = {
    grades: GradeInput[]
  }
  
  export default function TopSixCalculator() {
    const { register, control, handleSubmit, formState: { errors } } = useForm<Inputs>({
      defaultValues: {
        grades: [{ grade: ""}]
      }
    })
    const { fields } = useFieldArray({
        control,
        name: "grades"
      })

    const [result, setResult] = useState<number | undefined>()
  
    const onSubmit = (data: Inputs) => {
    // Ensure all weights and grades are treated as numbers
    const grades = data.grades.map((grade) => {
      return {
        grade: parseFloat(grade.grade)
      }
    });
  
    let weightedSum = 0;
      weightedSum = grades.reduce((sum, grade) => {
        return sum + grade.grade * (1/6);
      }, 0);
  
    // Output the result rounded to 2 decimal places
    const output = Math.round(weightedSum * 100) / 100;
  
    // Set the result to output
    setResult(output);
  };
  
    
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
        {Array(6).fill(0).map((_, index) => (
          <div key={_.id} className="flex items-end space-x-4">
            <div className="flex-1">
              <Label htmlFor={`grades.${index}.grade`}>Course {index + 1}</Label>
              <Input
                id={`grades.${index}.grade`}
                type="number"
                min={0}
                max={100}
                {...register(`grades.${index}.grade` as const, { required: true, min: 0, max: 100 })}
              />
            </div>
            </div>
        ))}
        </div>
        
        <Button className="w-full" type="submit">Calculate Current Average</Button>
        {result !== undefined && (
          <div className="mt-4 text-center">
            <p className="text-lg">
              Your current top 6 average is: <span className="text-primary font-bold">{result}%</span>
            </p>
          </div>
        )}
      </form>
    )
  }