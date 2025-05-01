import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Save, Send, Eye, Variable, AlertCircle } from "lucide-react";

interface MessageComposerProps {
  onNext?: () => void;
  onSaveTemplate?: (template: { name: string; content: string }) => void;
}

const MessageComposer = ({
  onNext = () => {},
  onSaveTemplate = () => {},
}: MessageComposerProps) => {
  const [message, setMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [activeTab, setActiveTab] = useState("compose");

  // Mock templates data
  const templates = [
    {
      id: "1",
      name: "Service Reminder",
      content:
        "Hi {{name}}, your vehicle is due for service at AutoBlitz. Call us at (555) 123-4567 to schedule.",
    },
    {
      id: "2",
      name: "Special Promotion",
      content:
        "AutoBlitz exclusive: 20% off all services this week for valued customers like you, {{name}}! Book now.",
    },
    {
      id: "3",
      name: "Follow Up",
      content:
        "Thank you {{name}} for visiting AutoBlitz. How was your experience? Reply to share feedback.",
    },
  ];

  // Mock variables that can be inserted
  const variables = [
    { id: "name", label: "Customer Name", placeholder: "{{name}}" },
    { id: "vehicle", label: "Vehicle Model", placeholder: "{{vehicle}}" },
    { id: "date", label: "Last Service Date", placeholder: "{{date}}" },
    { id: "advisor", label: "Service Advisor", placeholder: "{{advisor}}" },
  ];

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value);
    if (value === "start-from-scratch") {
      setMessage("");
      return;
    }
    const template = templates.find((t) => t.id === value);
    if (template) {
      setMessage(template.content);
    }
  };

  const handleInsertVariable = (placeholder: string) => {
    setMessage((prev) => `${prev} ${placeholder}`);
  };

  const handleSaveTemplate = () => {
    if (templateName && message) {
      onSaveTemplate({ name: templateName, content: message });
      setTemplateName("");
    }
  };

  const characterCount = message.length;
  const maxCharacters = 160;
  const isOverLimit = characterCount > maxCharacters;

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Message Composer</CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="compose" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template">Select Template</Label>
              <Select
                value={selectedTemplate}
                onValueChange={handleTemplateChange}
              >
                <SelectTrigger id="template">
                  <SelectValue placeholder="Choose a template or start from scratch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start-from-scratch">
                    Start from scratch
                  </SelectItem>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="message">Message</Label>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs ${isOverLimit ? "text-red-500" : "text-gray-500"}`}
                  >
                    {characterCount}/{maxCharacters}
                  </span>
                  {isOverLimit && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Message exceeds character limit</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[200px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Insert Variables</Label>
              <div className="flex flex-wrap gap-2">
                {variables.map((variable) => (
                  <Badge
                    key={variable.id}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => handleInsertVariable(variable.placeholder)}
                  >
                    <Variable className="h-3 w-3 mr-1" />
                    {variable.label}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <div className="border rounded-md p-4 bg-gray-50 min-h-[200px]">
              <div className="space-y-4">
                <div className="bg-blue-100 rounded-lg p-3 max-w-[80%] ml-auto">
                  <p className="text-sm whitespace-pre-wrap">
                    {message || "Your message preview will appear here"}
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <span className="text-xs text-gray-500">
                    {characterCount} characters{" "}
                    {isOverLimit && "(exceeds limit)"}
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Save className="h-4 w-4 mr-2" />
                Save as Template
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Save as Template</AlertDialogTitle>
                <AlertDialogDescription>
                  Enter a name for this template to save it for future use.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="py-4">
                <Input
                  placeholder="Template name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSaveTemplate}>
                  Save
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <Button
          onClick={onNext}
          disabled={message.trim() === "" || isOverLimit}
          className="flex items-center"
        >
          <Send className="h-4 w-4 mr-2" />
          Next: Select Recipients
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MessageComposer;
