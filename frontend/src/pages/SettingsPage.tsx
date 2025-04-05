import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Lock, User } from "lucide-react";
import AiAssistant from "@/components/AiAssistant";

const SettingsPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col bg-finance-background">
      <Header />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className={`flex-1 p-4 md:p-6 lg:p-8 ${isMobile ? 'pb-20' : ''}`}>
          <div className="container max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Settings</h1>
              <p className="text-gray-600">Customize your account and application preferences</p>
            </div>
            
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full md:w-auto grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-500" />
                      <div>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your personal information</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="Jane Smith" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="jane.smith@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+1 (555) 123-4567" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Preferred Currency</Label>
                        <Input id="currency" defaultValue="USD" />
                      </div>
                    </div>
                    <Button className="mt-4">Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-blue-500" />
                      <div>
                        <CardTitle>Notification Settings</CardTitle>
                        <CardDescription>Manage your notification preferences</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Goal Reminders</p>
                          <p className="text-sm text-gray-500">Get notified when you're close to achieving a financial goal</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Budget Alerts</p>
                          <p className="text-sm text-gray-500">Get notified when you're approaching budget limits</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Investment Opportunities</p>
                          <p className="text-sm text-gray-500">Get updates about new investment opportunities</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Monthly Reports</p>
                          <p className="text-sm text-gray-500">Receive monthly financial summary reports</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <Button className="mt-4">Save Preferences</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-blue-500" />
                      <div>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>Manage your account security</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <Switch />
                    </div>
                    <Button className="mt-4">Update Password</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <AiAssistant />
      </div>
    </div>
  );
};

export default SettingsPage;
