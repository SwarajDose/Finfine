
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Minus, DollarSign, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const CashFlowTracker = () => {
  const [income, setIncome] = useState({
    salary: 5000,
    investments: 200,
    other: 0
  });
  
  const [expenses, setExpenses] = useState({
    housing: 1500,
    food: 600,
    utilities: 200,
    transportation: 300,
    entertainment: 200,
    other: 100
  });
  
  const totalIncome = Object.values(income).reduce((sum, value) => sum + value, 0);
  const totalExpenses = Object.values(expenses).reduce((sum, value) => sum + value, 0);
  const surplus = totalIncome - totalExpenses;
  const savingsRate = Math.round((surplus / totalIncome) * 100);
  
  const handleIncomeChange = (key: keyof typeof income, value: number) => {
    setIncome(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleExpenseChange = (key: keyof typeof expenses, value: number) => {
    setExpenses(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cash Flow Tracker</CardTitle>
        <CardDescription>Know your money first - track income and expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <Plus className="h-5 w-5 text-finance-secondary" />
              <h3>Income</h3>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="salary">Salary/Wages</Label>
                <Input
                  id="salary"
                  type="number"
                  value={income.salary}
                  onChange={(e) => handleIncomeChange('salary', Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="investments">Investment Income</Label>
                <Input
                  id="investments"
                  type="number"
                  value={income.investments}
                  onChange={(e) => handleIncomeChange('investments', Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="other-income">Other Income</Label>
                <Input
                  id="other-income"
                  type="number"
                  value={income.other}
                  onChange={(e) => handleIncomeChange('other', Number(e.target.value))}
                />
              </div>
            </div>
            
            <div className="bg-green-50 p-3 rounded-md flex justify-between items-center">
              <span className="font-medium">Total Income</span>
              <span className="text-lg font-bold text-finance-secondary">${totalIncome}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <Minus className="h-5 w-5 text-finance-danger" />
              <h3>Expenses</h3>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="housing">Housing</Label>
                <Input
                  id="housing"
                  type="number"
                  value={expenses.housing}
                  onChange={(e) => handleExpenseChange('housing', Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="food">Food</Label>
                <Input
                  id="food"
                  type="number"
                  value={expenses.food}
                  onChange={(e) => handleExpenseChange('food', Number(e.target.value))}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="utilities">Utilities</Label>
                  <Input
                    id="utilities"
                    type="number"
                    value={expenses.utilities}
                    onChange={(e) => handleExpenseChange('utilities', Number(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="transportation">Transportation</Label>
                  <Input
                    id="transportation"
                    type="number"
                    value={expenses.transportation}
                    onChange={(e) => handleExpenseChange('transportation', Number(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="entertainment">Entertainment</Label>
                  <Input
                    id="entertainment"
                    type="number"
                    value={expenses.entertainment}
                    onChange={(e) => handleExpenseChange('entertainment', Number(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="other-expenses">Other</Label>
                  <Input
                    id="other-expenses"
                    type="number"
                    value={expenses.other}
                    onChange={(e) => handleExpenseChange('other', Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 p-3 rounded-md flex justify-between items-center">
              <span className="font-medium">Total Expenses</span>
              <span className="text-lg font-bold text-finance-danger">${totalExpenses}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-finance-primary" />
              <h3 className="font-medium">Monthly Surplus</h3>
            </div>
            <span className={`text-xl font-bold ${surplus >= 0 ? 'text-finance-secondary' : 'text-finance-danger'}`}>
              {surplus >= 0 ? '+' : ''} ${surplus}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Savings Rate</span>
            <span className="text-sm font-medium">{isNaN(savingsRate) ? 0 : savingsRate}% of income</span>
          </div>
        </div>
        
        <div className="tip-card mt-4">
          <p className="text-sm">
            <strong>Cash Flow Tip:</strong> Aim to save 20–30% of your income. Look for areas where you can reduce expenses without reducing quality of life.
          </p>
        </div>
        
        <Button className="w-full mt-4">Save Cash Flow Data</Button>
      </CardContent>
    </Card>
  );
};

export default CashFlowTracker;
