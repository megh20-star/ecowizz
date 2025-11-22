"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getSmartSavingTips, SmartSavingTipsOutput } from "@/ai/flows/smart-saving-tips";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Lightbulb, Loader2 } from "lucide-react";

const tipsFormSchema = z.object({
  energyUsage: z.coerce.number().min(0, "Energy usage must be positive."),
  waterUsage: z.coerce.number().min(0, "Water usage must be positive."),
  location: z.string().min(2, "Location is required."),
});

type TipsFormValues = z.infer<typeof tipsFormSchema>;

export default function SmartTips() {
  const [tips, setTips] = useState<SmartSavingTipsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<TipsFormValues>({
    resolver: zodResolver(tipsFormSchema),
    defaultValues: {
      energyUsage: 150,
      waterUsage: 5000,
      location: "San Francisco, CA",
    },
  });

  const onSubmit: SubmitHandler<TipsFormValues> = async (data) => {
    setIsLoading(true);
    setTips(null);
    try {
      const result = await getSmartSavingTips(data);
      setTips(result);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to get saving tips. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Personalized Saving Tips</CardTitle>
          <CardDescription>Enter your monthly usage and location to get AI-generated tips.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="energyUsage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Energy Usage (kWh)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 150" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="waterUsage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Water Usage (Liters)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 5000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., San Francisco, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Generate Tips
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="text-center mt-8">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground mt-2">Generating your personalized tips...</p>
        </div>
      )}

      {tips && tips.tips.length > 0 && (
        <div className="mt-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold tracking-tight mb-4 text-center">Your Custom Eco-Plan</h3>
          <Accordion type="single" collapsible className="w-full">
            {tips.tips.map((tip, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Tip #{index + 1}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {tip}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}
