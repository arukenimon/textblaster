import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  BarChart2,
  Settings,
  MessageSquare,
  Users,
  Calendar,
} from "lucide-react";
import MessageComposer from "./MessageComposer";
import RecipientSelector from "./RecipientSelector";
import AnalyticsDashboard from "./AnalyticsDashboard";

const Home = () => {
  const [activeTab, setActiveTab] = useState("compose");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div className="font-bold text-xl flex items-center">
              <span className="text-primary">Auto</span>
              <span>Blitz</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 ml-6">
              <Button
                variant="ghost"
                className="text-muted-foreground"
                size="sm"
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="text-muted-foreground"
                size="sm"
              >
                Campaigns
              </Button>
              <Button
                variant="ghost"
                className="text-muted-foreground"
                size="sm"
              >
                Templates
              </Button>
              <Button
                variant="ghost"
                className="text-muted-foreground"
                size="sm"
              >
                Contacts
              </Button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                alt="User"
              />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r bg-card p-4">
          <div className="space-y-4">
            <div className="py-2">
              <h2 className="text-lg font-semibold mb-2">Text Blast</h2>
              <div className="space-y-1">
                <Button
                  variant={activeTab === "compose" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("compose")}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Compose Message
                </Button>
                <Button
                  variant={activeTab === "recipients" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("recipients")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Select Recipients
                </Button>
                <Button
                  variant={activeTab === "schedule" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("schedule")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
                <Button
                  variant={activeTab === "analytics" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("analytics")}
                >
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
              </div>
            </div>
            <div className="py-2">
              <h2 className="text-lg font-semibold mb-2">Quick Access</h2>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  Recent Campaigns
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Saved Templates
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Contact Lists
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Text Blast System</h1>

            <Card className="mb-6">
              <CardContent className="p-6">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="compose">Compose</TabsTrigger>
                    <TabsTrigger value="recipients">Recipients</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  </TabsList>

                  <TabsContent value="compose" className="space-y-4">
                    <MessageComposer
                      onNext={() => setActiveTab("recipients")}
                    />
                  </TabsContent>

                  <TabsContent value="recipients" className="space-y-4">
                    <RecipientSelector
                      onBack={() => setActiveTab("compose")}
                      onNext={() => setActiveTab("schedule")}
                    />
                  </TabsContent>

                  <TabsContent value="schedule" className="space-y-4">
                    <div className="flex flex-col space-y-4">
                      <h2 className="text-xl font-semibold">
                        Schedule Your Message
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="send-now"
                              name="schedule"
                              defaultChecked
                            />
                            <label htmlFor="send-now">Send Immediately</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="schedule-later"
                              name="schedule"
                            />
                            <label htmlFor="schedule-later">
                              Schedule for Later
                            </label>
                          </div>
                          <div className="pt-4">
                            <label className="block text-sm font-medium mb-1">
                              Date and Time
                            </label>
                            <input
                              type="datetime-local"
                              className="w-full p-2 border rounded-md"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-md">
                          <h3 className="font-medium mb-2">Message Summary</h3>
                          <div className="space-y-2 text-sm">
                            <p>
                              <strong>Template:</strong> Promotional Offer
                            </p>
                            <p>
                              <strong>Recipients:</strong> 245 contacts
                            </p>
                            <p>
                              <strong>Estimated Cost:</strong> $12.25
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between pt-6">
                        <Button
                          variant="outline"
                          onClick={() => setActiveTab("recipients")}
                        >
                          Back
                        </Button>
                        <Button onClick={() => setActiveTab("analytics")}>
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="analytics" className="space-y-4">
                    <AnalyticsDashboard />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    Recent Campaigns
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Summer Sale Promo</span>
                      <span className="text-green-500 text-sm">Sent</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Service Reminder</span>
                      <span className="text-amber-500 text-sm">Scheduled</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>New Inventory Alert</span>
                      <span className="text-gray-500 text-sm">Draft</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Message Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Messages Sent (MTD)</span>
                      <span className="font-medium">1,245</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Avg. Response Rate</span>
                      <span className="font-medium">12.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Active Campaigns</span>
                      <span className="font-medium">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <span className="mr-2">+</span> New Template
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <span className="mr-2">+</span> Import Contacts
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <span className="mr-2">↓</span> Export Reports
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
