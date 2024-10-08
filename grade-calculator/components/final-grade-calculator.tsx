"use client"

import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2 } from "lucide-react"

type GradeInput = {
  grade: number
  weight: number
}

type Inputs = {
  grades: GradeInput[]
  desiredGrade: number
}

export default function FinalGradeCalculator() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<Inputs>({
    defaultValues: {
      grades: [{ grade: 0, weight: 0 }],
      desiredGrade: 0
    }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "grades"
  })
  const [result, setResult] = useState<number | undefined>()

  const onSubmit = (data: Inputs) => {
    const totalWeight = data.grades.reduce((sum, grade) => sum + grade.weight, 0);
    const weightedSum = data.grades.reduce((sum, grade) => sum + (grade.grade * (grade.weight / 100)), 0);
    const remainingWeight = 100 - totalWeight
    const requiredGrade = ((data.desiredGrade - weightedSum) / (remainingWeight / 100));
    const output = Math.round(requiredGrade * 100) / 100;    
    setResult(output)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-end space-x-4">
          <div className="flex-1">
            <Label htmlFor={`grades.${index}.grade`}>Grade</Label>
            <Input
              id={`grades.${index}.grade`}
              type="number"
              min={0}
              max={100}
              {...register(`grades.${index}.grade` as const, { required: true, min: 0, max: 100 })}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor={`grades.${index}.weight`}>Weight</Label>
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
      <div className="space-y-2">
        <Label htmlFor="desiredGrade">Desired Final Grade</Label>
        <Input
          id="desiredGrade"
          type="number"
          min={0}
          max={100}
          {...register("desiredGrade", { required: true, min: 0, max: 100 })}
        />
      </div>
      <Button className="w-full" type="submit">Calculate Required Grade</Button>
      {result !== undefined && (
        <div className="mt-4 text-center">
          <p className="text-lg">
            You need to get <span className="text-primary font-bold">{result}%</span> in the remaining coursework to achieve your desired grade.
          </p>
          {result > 100 && <p className="text-destructive">Not even studying can save you!</p>}
          {90 < result && result <= 100 && <p className="text-green-500">Still possible, lock in!</p>}
          {result > 70 && result <= 90 && <p className="text-green-500">Better get to studying!</p>}
          {result >= 50 && result <= 70 && <p className="text-green-500">Shouldn&apos;t be that hard!</p>}
          {result < 50 && <p className="text-destructive">Try to bump those numbers up!</p>}
        </div>
      )}
    </form>
  )
}