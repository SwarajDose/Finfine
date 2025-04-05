
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Shield } from "lucide-react";

const EmergencyFundCalculator = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState(3000);
  const [currentSavings, setCurrentSavings] = useState(5000);
  const targetMonths = 6;
  const targetAmount = monthlyExpenses * targetMonths;
  const progress = Math.min(Math.round((currentSavings / targetAmount) * 100), 100);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Emergency Fund</CardTitle>
            <CardDescription>Building your financial safety net</CardDescription>
          </div>
          <div className="bg-blue-100 p-2 rounded-full">
            <Shield className="h-5 w-5 text-finance-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="monthly-expenses">Monthly Expenses</Label>
            <Input
              id="monthly-expenses"
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="current-savings">Current Emergency Savings</Label>
            <Input
              id="current-savings"
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Target: ${targetAmount.toLocaleString()} ({targetMonths} months)</span>
              <span className="font-medium">{progress}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="tip-card mt-4">
            <p className="text-sm">
              <strong>Target:</strong> 3-6 months of expenses in a high-interest savings account or liquid fund.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyFundCalculator;
