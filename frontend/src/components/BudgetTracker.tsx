import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Budget } from "@/lib/dashboard-api";

interface BudgetTrackerProps {
  budgetsData?: {
    data: Budget[];
    total: number;
    spent: number;
    remaining: number;
  };
}

const BudgetTracker = ({ budgetsData }: BudgetTrackerProps) => {
  // Use provided data or default to empty array
  const budgets = budgetsData?.data || [];
  const totalBudget = budgetsData?.total || 0;
  const totalSpent = budgetsData?.spent || 0;
  const totalRemaining = budgetsData?.remaining || 0;
  
  // Calculate overall percentage
  const overallPercentage = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Tracker</CardTitle>
        <CardDescription>Track your spending against monthly budget limits</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Overall Budget</h3>
            <div className="text-sm font-medium">
              ${totalSpent} of ${totalBudget} ({overallPercentage}%)
            </div>
          </div>
          <Progress value={overallPercentage} className="h-2" />
          <div className="flex justify-end mt-1">
            <span className="text-sm text-gray-500">${totalRemaining} remaining</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {budgets.map((budget) => {
            const percentage = budget.amount > 0 ? Math.round((budget.spent / budget.amount) * 100) : 0;
            const isOverBudget = percentage > 100;
            
            return (
              <div key={budget.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="font-medium">{budget.category}</span>
                    <span className="ml-2 text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5">
                      {budget.period}
                    </span>
                  </div>
                  <div className="text-sm font-medium">
                    ${budget.spent} of ${budget.amount} ({percentage}%)
                  </div>
                </div>
                <Progress 
                  value={percentage > 100 ? 100 : percentage} 
                  className={`h-2 ${isOverBudget ? 'bg-red-200' : ''}`}
                />
                <div className="flex justify-end">
                  <span className={`text-xs ${isOverBudget ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                    {isOverBudget 
                      ? `$${budget.spent - budget.amount} over budget` 
                      : `$${budget.amount - budget.spent} remaining`}
                  </span>
                </div>
              </div>
            );
          })}
          
          {budgets.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              No budget categories found. Add some categories to track your spending.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetTracker;
