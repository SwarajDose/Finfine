
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CashFlowTracker from "./CashFlowTracker";
import BudgetTracker from "./BudgetTracker";
import EmergencyFundCalculator from "./EmergencyFundCalculator";
import GoalBasedInvestments from "./GoalBasedInvestments";
import ChildrenFuturePlanning from "./ChildrenFuturePlanning";
import MarriageFundTracker from "./MarriageFundTracker";
import ProTips from "./ProTips";

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <CashFlowTracker />
        </div>
        <div>
          <EmergencyFundCalculator />
        </div>
      </div>
      
      <BudgetTracker />
      
      <GoalBasedInvestments />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChildrenFuturePlanning />
        <MarriageFundTracker />
      </div>
      
      <ProTips />
    </div>
  );
};

export default Dashboard;
