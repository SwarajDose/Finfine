
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/Button";
import { Bot, HelpCircle, MessageSquare } from "lucide-react";
import AiAssistant from "@/components/AiAssistant";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const HelpPage = () => {
  const isMobile = useIsMobile();
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [faqDialogOpen, setFaqDialogOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col bg-finance-background">
      <Header />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className={`flex-1 p-4 md:p-6 lg:p-8 ${isMobile ? 'pb-20' : ''}`}>
          <div className="container max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
              <p className="text-gray-600">Find answers to common questions and get help when needed</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="flex flex-col items-center text-center p-6">
                <Bot className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
                <p className="text-gray-600 mb-4">Get instant answers from our AI financial assistant</p>
                <Button className="w-full" variant="outline" onClick={() => setAiAssistantOpen(true)}>Ask AI</Button>
              </Card>
              
              <Card className="flex flex-col items-center text-center p-6">
                <HelpCircle className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">FAQ</h3>
                <p className="text-gray-600 mb-4">Browse our frequently asked questions</p>
                <Button className="w-full" variant="outline" onClick={() => setFaqDialogOpen(true)}>View FAQs</Button>
              </Card>
              
              <Card className="flex flex-col items-center text-center p-6">
                <MessageSquare className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
                <p className="text-gray-600 mb-4">Reach out to our human support team</p>
                <Button className="w-full" variant="outline" onClick={() => setContactDialogOpen(true)}>Contact Us</Button>
              </Card>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to the most common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I set up a new financial goal?</AccordionTrigger>
                    <AccordionContent>
                      You can set up a new financial goal by navigating to the "Financial Goals" section. Click on "Add New Goal", then fill in the details like goal name, target amount, and timeline. Our system will automatically suggest suitable investment options to help you reach your goal.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How is my emergency fund calculated?</AccordionTrigger>
                    <AccordionContent>
                      Your emergency fund is calculated based on your monthly expenses. The general recommendation is to save 3-6 months of essential expenses. Our calculator helps you determine the right amount for your situation based on your income stability, dependents, and other factors.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What is the 50-30-20 budgeting rule?</AccordionTrigger>
                    <AccordionContent>
                      The 50-30-20 rule is a budgeting framework that suggests allocating 50% of your income to needs (housing, food, utilities), 30% to wants (entertainment, dining out), and 20% to savings and debt repayment. Our budget tracker helps you implement this rule and adjust it to your specific situation.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I plan for my child's education?</AccordionTrigger>
                    <AccordionContent>
                      In the "Children's Future" section, you can create an education fund by specifying your child's current age and when you expect education expenses to begin. The system will calculate the required monthly investment and suggest appropriate investment vehicles like education-specific mutual funds, fixed deposits, or government schemes.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Can I export my financial data?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can export your financial data in various formats including PDF, Excel, and CSV. Go to any section you want to export, click on the "Export" button in the top right corner, and select your preferred format. This feature is useful for sharing data with your financial advisor or keeping offline records.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>Watch step-by-step guides to using the platform</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-100 aspect-video flex items-center justify-center">
                  <p className="text-gray-500">Getting Started Tutorial</p>
                </div>
                <div className="rounded-lg bg-gray-100 aspect-video flex items-center justify-center">
                  <p className="text-gray-500">Setting Up Financial Goals</p>
                </div>
                <div className="rounded-lg bg-gray-100 aspect-video flex items-center justify-center">
                  <p className="text-gray-500">Using the Budget Tracker</p>
                </div>
                <div className="rounded-lg bg-gray-100 aspect-video flex items-center justify-center">
                  <p className="text-gray-500">Planning for Children's Future</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <AiAssistant />
      </div>
      
      {/* AI Assistant Dialog */}
      <Dialog open={aiAssistantOpen} onOpenChange={(open) => setAiAssistantOpen(open)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-500" />
              AI Financial Assistant
            </DialogTitle>
          </DialogHeader>
          <div className="p-4 bg-gray-50 rounded-lg mb-4 h-[300px] overflow-y-auto">
            <div className="flex items-start gap-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Bot className="h-4 w-4 text-blue-500" />
              </div>
              <div className="flex-1 bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm">Hello! I'm your AI financial assistant. How can I help you today?</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask me anything about your finances..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="submit">Send</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* FAQ Dialog */}
      <Dialog open={faqDialogOpen} onOpenChange={(open) => setFaqDialogOpen(open)}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-500" />
              Frequently Asked Questions
            </DialogTitle>
          </DialogHeader>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I set up a new financial goal?</AccordionTrigger>
              <AccordionContent>
                You can set up a new financial goal by navigating to the "Financial Goals" section. Click on "Add New Goal", then fill in the details like goal name, target amount, and timeline. Our system will automatically suggest suitable investment options to help you reach your goal.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>How is my emergency fund calculated?</AccordionTrigger>
              <AccordionContent>
                Your emergency fund is calculated based on your monthly expenses. The general recommendation is to save 3-6 months of essential expenses. Our calculator helps you determine the right amount for your situation based on your income stability, dependents, and other factors.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>What is the 50-30-20 budgeting rule?</AccordionTrigger>
              <AccordionContent>
                The 50-30-20 rule is a budgeting framework that suggests allocating 50% of your income to needs (housing, food, utilities), 30% to wants (entertainment, dining out), and 20% to savings and debt repayment. Our budget tracker helps you implement this rule and adjust it to your specific situation.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>How do I plan for my child's education?</AccordionTrigger>
              <AccordionContent>
                In the "Children's Future" section, you can create an education fund by specifying your child's current age and when you expect education expenses to begin. The system will calculate the required monthly investment and suggest appropriate investment vehicles like education-specific mutual funds, fixed deposits, or government schemes.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>Can I export my financial data?</AccordionTrigger>
              <AccordionContent>
                Yes, you can export your financial data in various formats including PDF, Excel, and CSV. Go to any section you want to export, click on the "Export" button in the top right corner, and select your preferred format. This feature is useful for sharing data with your financial advisor or keeping offline records.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={(open) => setContactDialogOpen(open)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              Contact Support
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Your Name</label>
              <input
                id="name"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email Address</label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Your Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <Button className="w-full">Submit Request</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HelpPage;
