
import { useState } from "react";
import { Bot, X, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your Financial AI Assistant. How can I help you with your financial planning today?",
      timestamp: new Date(),
    },
  ]);
  const [messageInput, setMessageInput] = useState("");
  const { toast } = useToast();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: messageInput,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setMessageInput("");
    
    // Simulate AI response
    setTimeout(() => {
      const suggestions = [
        "Based on your current savings rate, you could reach your retirement goal by age 58.",
        "I recommend allocating 60% to equity funds and 40% to debt funds for your child's education goal.",
        "Your emergency fund should ideally be around $15,000 based on your monthly expenses.",
        "For tax-efficient investing, consider maxing out your retirement accounts first.",
        "Your current debt-to-income ratio is healthy at below 30%.",
      ];
      
      const randomResponse = suggestions[Math.floor(Math.random() * suggestions.length)];
      
      const aiMessage: Message = {
        role: "assistant",
        content: randomResponse,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 z-50 rounded-full p-3 w-12 h-12 shadow-lg"
        variant={isOpen ? "outline" : "default"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </Button>

      {/* Chat Panel */}
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 md:w-96 z-50 shadow-xl border animate-fade-in">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg py-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Bot className="h-5 w-5" /> Financial AI Assistant
            </CardTitle>
          </CardHeader>
          <ScrollArea className="h-80">
            <CardContent className="p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {message.content}
                      <div className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </ScrollArea>
          <CardFooter className="p-3 border-t bg-gray-50">
            <div className="flex w-full gap-2">
              <Input
                placeholder="Ask something about your finances..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default AiAssistant;
