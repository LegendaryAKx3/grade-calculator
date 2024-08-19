"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ThemeSwitcher from "@/components/theme-switcher";

type Inputs = {
  grade: number;
  weight: number;
  desiredGrade: number;
}
export default function Home() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const [result, setResult] = useState<number | undefined>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const output = Math.round(((data.desiredGrade - data.grade * (data.weight/100)) / ((100 - data.weight)/100))*100)/100;
    setResult(output);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="absolute top-2 right-2">
        <ThemeSwitcher />
      </div>
      <Card className="w-1/5">
        <CardHeader>
          <CardTitle>Final Grade Calculator</CardTitle>
          <CardDescription>Input your current grade and the weight, along with desired grade to see what you need in the rest of the course to get that grade</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className='flex flex-row gap-4 w-full'>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label htmlFor="grade">Current Grade</Label>
                  <Input
                    id="grade"
                    type="number"
                    min={0} 
                    max={100}
                    required {...register("grade")}
                    endAdornment={<span className="text-sm text-muted-foreground">%</span>}
                  />
                </div>
                <div className='flex flex-col space-y-1.5 w-full'>
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    min={0}
                    max={100}
                    type="number"
                    required {...register("weight")}
                    endAdornment={<span className="text-sm text-muted-foreground">%</span>}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="final">Desired Grade</Label>
              <Input
                id="final" 
                type="number" 
                min={0}
                max={100}
                required {...register("desiredGrade")} 
                endAdornment={<span className="text-sm text-muted-foreground">%</span>}
              />
            </div>
            <Button className="w-full" type="submit">Calculate</Button>
          </form>
        </CardContent>
        {result && (
          <CardFooter>
            <CardDescription className="flex flex-col gap-2">
              <span>You need to get <span className="text-primary font-bold">{result}%</span> in the rest of the course to get your desired grade</span>
              {result > 100 && <span className="text-red-500">Not even studying can save you!</span>}
              {90 < result && result <= 100 && <span className="text-green-500">Still possible, lock in!</span>}
              {result > 70 && result <= 90 && <span className="text-green-500">Better get to studying!</span>}
              {result >= 50 && result <= 70 && <span className="text-green-500">Shouldn{"'"}t be that hard!</span>}
              {result < 50 && <span className="text-red-500">Try to bump those numbers up!</span>}
            </CardDescription>
          </CardFooter>
        )}
      </Card>
    </main>
  );
}

