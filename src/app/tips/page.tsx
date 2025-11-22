import Header from "@/components/layout/header";
import SmartTips from "@/components/tips/smart-tips";

export default function TipsPage() {
  return (
    <>
      <Header title="Smart Saving Tips" />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">AI-Powered Conservation Tips</h2>
            <p className="text-muted-foreground">
              Get personalized tips to help you save energy and water.
            </p>
          </div>
        </div>
        <SmartTips />
      </div>
    </>
  );
}
