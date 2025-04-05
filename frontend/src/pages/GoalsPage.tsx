
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import GoalBasedInvestments from "@/components/GoalBasedInvestments";
import { useIsMobile } from "@/hooks/use-mobile";
import AiAssistant from "@/components/AiAssistant";

const GoalsPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col bg-finance-background">
      <Header />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className={`flex-1 p-4 md:p-6 lg:p-8 ${isMobile ? 'pb-20' : ''}`}>
          <div className="container max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Financial Goals</h1>
              <p className="text-gray-600">Create and track your short, medium, and long-term goals</p>
            </div>
            
            <GoalBasedInvestments />
          </div>
        </main>
        
        <AiAssistant />
      </div>
    </div>
  );
};

export default GoalsPage;
