import Header from "@/components/layout/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileForm from "@/components/settings/profile-form";
import NotificationsForm from "@/components/settings/notifications-form";

export default function SettingsPage() {
  return (
    <>
      <Header title="Settings" />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Manage Your Account</h2>
            <p className="text-muted-foreground">
            Update your profile and notification preferences.
            </p>
        </div>
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <ProfileForm />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationsForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
