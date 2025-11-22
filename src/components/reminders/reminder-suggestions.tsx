"use client";

import { useState } from "react";
import { getPersonalizedReminderSuggestions, ReminderSuggestionsOutput } from "@/ai/flows/personalized-reminder-suggestions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { BellRing, Loader2 } from "lucide-react";

export default function ReminderSuggestions() {
  const [applianceType, setApplianceType] = useState("");
  const [suggestions, setSuggestions] = useState<ReminderSuggestionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetSuggestions = async () => {
    if (!applianceType) {
      toast({
        title: "Select an appliance",
        description: "Please choose an appliance type to get suggestions.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result = await getPersonalizedReminderSuggestions({
        userId: "user-123", // Mock user ID
        usageData: "User typically leaves the living room lights on after 11 PM on weekdays.", // Mock usage data
        applianceType: applianceType,
      });
      setSuggestions(result);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to get reminder suggestions. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleSetReminder = (time: string) => {
    toast({
      title: "Reminder Set!",
      description: `We'll remind you to turn off the ${applianceType} at ${time}.`,
    });
  };

  return (
    <div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Find the best time for a reminder</CardTitle>
          <CardDescription>Select an appliance and our AI will suggest the most effective time to remind you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select onValueChange={setApplianceType} value={applianceType}>
              <SelectTrigger>
                <SelectValue placeholder="Select appliance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lights">Lights</SelectItem>
                <SelectItem value="fan">Fan</SelectItem>
                <SelectItem value="tap">Water Tap</SelectItem>
                <SelectItem value="ac">Air Conditioner</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleGetSuggestions} disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Get Suggestions
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {isLoading && (
        <div className="text-center mt-8">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground mt-2">Our AI is thinking...</p>
        </div>
      )}

      {suggestions && (
        <div className="mt-8">
            <h3 className="text-xl font-bold tracking-tight mb-4">Here are your suggestions:</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {suggestions.reminderSuggestions.map((suggestion, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BellRing className="h-5 w-5 text-primary"/> 
                    {suggestion.time}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleSetReminder(suggestion.time)}>Set Reminder</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
