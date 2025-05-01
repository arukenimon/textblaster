import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  Users,
  UserCheck,
  UserPlus,
  X,
} from "lucide-react";

interface Recipient {
  id: string;
  name: string;
  phone: string;
  segment?: string;
}

interface RecipientSelectorProps {
  onBack?: () => void;
  onNext?: (recipients: Recipient[]) => void;
  selectedRecipients?: Recipient[];
}

const RecipientSelector = ({
  onBack = () => {},
  onNext = () => {},
  selectedRecipients = [],
}: RecipientSelectorProps) => {
  const [recipients, setRecipients] = useState<Recipient[]>(
    selectedRecipients.length > 0
      ? selectedRecipients
      : [
          {
            id: "1",
            name: "John Doe",
            phone: "(555) 123-4567",
            segment: "Recent Service",
          },
          {
            id: "2",
            name: "Jane Smith",
            phone: "(555) 234-5678",
            segment: "New Customer",
          },
          {
            id: "3",
            name: "Robert Johnson",
            phone: "(555) 345-6789",
            segment: "Recent Service",
          },
          {
            id: "4",
            name: "Emily Davis",
            phone: "(555) 456-7890",
            segment: "New Customer",
          },
          {
            id: "5",
            name: "Michael Wilson",
            phone: "(555) 567-8901",
            segment: "Recent Service",
          },
        ],
  );

  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("import");

  const segments = [
    { id: "recent-service", label: "Recent Service Customers", count: 156 },
    { id: "new-customers", label: "New Customers", count: 87 },
    { id: "inactive", label: "Inactive Customers", count: 243 },
    { id: "premium", label: "Premium Service Customers", count: 62 },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCsvFile(e.target.files[0]);
      // In a real implementation, you would parse the CSV file here
      // and update the recipients state
    }
  };

  const handleSegmentToggle = (segmentId: string) => {
    setSelectedSegments((prev) =>
      prev.includes(segmentId)
        ? prev.filter((id) => id !== segmentId)
        : [...prev, segmentId],
    );
  };

  const handleRemoveRecipient = (id: string) => {
    setRecipients((prev) => prev.filter((recipient) => recipient.id !== id));
  };

  const totalRecipients = recipients.length;

  return (
    <div className="w-full max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold">Select Recipients</CardTitle>
        <CardDescription>
          Choose who will receive your message by importing contacts or
          selecting customer segments.
        </CardDescription>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="import" className="flex items-center gap-2">
            <Upload size={16} />
            Import Contacts
          </TabsTrigger>
          <TabsTrigger value="segments" className="flex items-center gap-2">
            <Users size={16} />
            Select Segments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                <Upload className="h-10 w-10 text-gray-400 mb-4" />
                <p className="mb-2 text-sm text-gray-600">
                  Drag and drop a CSV file or click to browse
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Your file should include name and phone number columns
                </p>
                <Input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Label htmlFor="csv-upload" className="cursor-pointer">
                  <Button variant="outline">Browse Files</Button>
                </Label>
                {csvFile && (
                  <div className="mt-4 flex items-center gap-2 p-2 bg-gray-100 rounded">
                    <span className="text-sm">{csvFile.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => setCsvFile(null)}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                {segments.map((segment) => (
                  <div
                    key={segment.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={segment.id}
                        checked={selectedSegments.includes(segment.id)}
                        onCheckedChange={() => handleSegmentToggle(segment.id)}
                      />
                      <div>
                        <Label
                          htmlFor={segment.id}
                          className="font-medium cursor-pointer"
                        >
                          {segment.label}
                        </Label>
                        <p className="text-sm text-gray-500">
                          {segment.id === "recent-service"
                            ? "Customers who had service in the last 30 days"
                            : segment.id === "new-customers"
                              ? "Customers who joined in the last 60 days"
                              : segment.id === "inactive"
                                ? "No service in the last 6 months"
                                : "Customers enrolled in premium service plans"}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{segment.count} contacts</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Selected Recipients</CardTitle>
          <CardDescription>
            {totalRecipients} contacts will receive your message
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] rounded-md border p-4">
            <div className="space-y-2">
              {recipients.length > 0 ? (
                recipients.map((recipient) => (
                  <div
                    key={recipient.id}
                    className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md"
                  >
                    <div>
                      <p className="font-medium">{recipient.name}</p>
                      <p className="text-sm text-gray-500">{recipient.phone}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {recipient.segment && (
                        <Badge variant="secondary" className="text-xs">
                          {recipient.segment}
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleRemoveRecipient(recipient.id)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-[150px] text-center">
                  <Users className="h-10 w-10 text-gray-300 mb-2" />
                  <p className="text-gray-500">No recipients selected</p>
                  <p className="text-sm text-gray-400">
                    Import contacts or select segments above
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Message
          </Button>
          <Button
            onClick={() => onNext(recipients)}
            disabled={recipients.length === 0}
            className="flex items-center gap-2"
          >
            Continue to Schedule
            <ArrowRight size={16} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RecipientSelector;
