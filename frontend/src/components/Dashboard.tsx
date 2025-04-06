//import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import CashFlowTracker from "./CashFlowTracker";
import BudgetTracker from "./BudgetTracker";
import EmergencyFundCalculator from "./EmergencyFundCalculator";
import GoalBasedInvestments from "./GoalBasedInvestments";
import ChildrenFuturePlanning from "./ChildrenFuturePlanning";
import MarriageFundTracker from "./MarriageFundTracker";
import ProTips from "./ProTips";
import { useDashboardSummary } from "@/hooks/use-dashboard";
import ChatbotToggle from "../components/ChatbotToggle"; // adjust path if needed

const Dashboard = () => {
  const { data, loading, error, refreshData } = useDashboardSummary();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] animate-fade-in">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-finance-primary mx-auto mb-4" />
          <p className="text-gray-500">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4 animate-fade-in">
        <AlertTitle>Error loading dashboard</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
        <Button 
          onClick={refreshData} 
          variant="outline" 
          className="mt-2"
        >
          Try Again
        </Button>
      </Alert>
    );
  }

  // Pass dashboard data to child components
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <CashFlowTracker 
            accountsData={data?.accounts}
            transactionsData={data?.transactions}
            summaryData={data?.summary}
          />
        </div>
        <div>
          <EmergencyFundCalculator 
            goals={data?.goals}
          />
        </div>
      </div>
      
      <BudgetTracker 
        budgetsData={data?.budgets}
      />
      
      <GoalBasedInvestments 
        goalsData={data?.goals}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChildrenFuturePlanning 
          goalsData={data?.goals?.data?.filter(goal => goal.name.toLowerCase().includes('child') || goal.name.toLowerCase().includes('education'))}
        />
        <MarriageFundTracker 
          goalsData={data?.goals?.data?.filter(goal => goal.name.toLowerCase().includes('marriage') || goal.name.toLowerCase().includes('wedding'))}
        />
      </div>
      
      <ProTips />
      <ChatbotToggle />
    </div>
  );
};

export default Dashboard;
