"use client"

import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2 } from "lucide-react"

type GradeInput = {
  grade: string
  weight: string
}

type Inputs = {
  grades: GradeInput[]
}

export default function CurrentGradeCalculator() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<Inputs>({
    defaultValues: {
      grades: [{ grade: "", weight: "" }]
    }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "grades"
  })
  const [result, setResult] = useState<number | undefined>()

  const onSubmit = (data: Inputs) => {
  // Ensure all weights and grades are treated as numbers
  const grades = data.grades.map((grade) => {
    return {
      grade: parseFloat(grade.grade),
      weight: parseFloat(grade.weight),
    }
  });

  // Calculate the total weight
  const totalWeight = grades.reduce((sum, grade) => sum + grade.weight, 0);

  // Calculate the weighted sum - handle cases where total weight is zero
  let weightedSum = 0;
  if (totalWeight > 0) {
    weightedSum = grades.reduce((sum, grade) => {
      return sum + grade.grade * (grade.weight / totalWeight);
    }, 0);
  }

  // Output the result rounded to 2 decimal places
  const output = Math.round(weightedSum * 100) / 100;

  // Set the result to output
  setResult(output);
};

  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-end space-x-4">
          <div className="flex-1">
            <Label htmlFor={`grades.${index}.grade`}>Grade</Label>
            <Input
              id={`grades.${index}.grade`}
              type="number"
              step="0.01"
              min={0}
              max={100}
              {...register(`grades.${index}.grade` as const, { required: true, min: 0, max: 100 })}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor={`grades.${index}.weight`}>Weight (%)</Label>
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
        onClick={() => append({ grade: "", weight: "" })}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Grade
      </Button>
      <Button className="w-full" type="submit">Calculate Current Average</Button>
      {result !== undefined && (
        <div className="mt-4 text-center">
          <p className="text-lg">
            Your current weighted average is: <span className="text-primary font-bold">{result}%</span>
          </p>
          {result >= 90 && <p className="text-green-500">Excellent work! Keep it up!</p>}
          {result >= 80 && result < 90 && <p className="text-green-500">Great job! You&apos;re doing well.</p>}
          {result >= 70 && result < 80 && <p className="text-yellow-500">Good effort. There&apos;s room for improvement.</p>}
          {result >= 60 && result < 70 && <p className="text-yellow-500">You&apos;re passing, but try to boost your grades.</p>}
          {result < 60 && <p className="text-destructive">You need to work harder to improve your grades.</p>}
        </div>
      )}
    </form>
  )
}