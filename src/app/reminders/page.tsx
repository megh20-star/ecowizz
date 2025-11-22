import Header from "@/components/layout/header";
import ReminderSuggestions from "@/components/reminders/reminder-suggestions";

export default function RemindersPage() {
  return (
    <>
      <Header title="Smart Reminders" />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">AI Reminder Suggestions</h2>
            <p className="text-muted-foreground">
              Get smart suggestions for when to turn off your appliances.
            </p>
          </div>
        </div>
        <ReminderSuggestions />
      </div>
    </>
  );
}
