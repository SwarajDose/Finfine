
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Baby, GraduationCap, Wallet } from "lucide-react";

const ChildrenFuturePlanning = () => {
  const [childAge, setChildAge] = useState(5);
  const [targetAmount, setTargetAmount] = useState(100000);
  const [targetAge, setTargetAge] = useState(18);
  const [currentSavings, setCurrentSavings] = useState(10000);
  
  // Simple calculation for monthly SIP needed
  const yearsToGoal = targetAge - childAge;
  const amountNeeded = targetAmount - currentSavings;
  const monthlyInvestment = Math.ceil(amountNeeded / (yearsToGoal * 12) / 0.8); // Assuming 8% annual returns
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Children's Future Planning</CardTitle>
            <CardDescription>Secure their tomorrow, starting today</CardDescription>
          </div>
          <div className="bg-blue-100 p-2 rounded-full">
            <Baby className="h-5 w-5 text-finance-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="child-age">Child's Current Age</Label>
              <Input
                id="child-age"
                type="number"
                value={childAge}
                onChange={(e) => setChildAge(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="goal-age">Target Age</Label>
              <Select
                value={targetAge.toString()}
                onValueChange={(value) => setTargetAge(Number(value))}
              >
                <SelectTrigger id="goal-age">
                  <SelectValue placeholder="Select age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18">18 (College)</SelectItem>
                  <SelectItem value="21">21 (Higher Education)</SelectItem>
                  <SelectItem value="25">25 (Career Start)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="current-savings">Current Savings</Label>
              <Input
                id="current-savings"
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="target-amount">Target Amount</Label>
              <Input
                id="target-amount"
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(Number(e.target.value))}
              />
            </div>
          </div>
          
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h4 className="text-base font-medium flex items-center gap-2 mb-3">
              <Wallet className="h-4 w-4" /> Investment Strategy
            </h4>
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-sm text-gray-500">Years to goal</span>
                <p className="font-medium">{yearsToGoal} years</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Monthly investment needed</span>
                <p className="font-medium text-lg">${monthlyInvestment}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-1 rounded-full mt-0.5">
                  <GraduationCap className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h5 className="text-sm font-medium">Education-focused Mutual Fund SIP</h5>
                  <p className="text-xs text-gray-600">Start with ${Math.round(monthlyInvestment * 0.6)} monthly</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                  <Wallet className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h5 className="text-sm font-medium">Long-term Fixed Deposit</h5>
                  <p className="text-xs text-gray-600">Allocate ${Math.round(monthlyInvestment * 0.4)} monthly</p>
                </div>
              </div>
            </div>
          </div>
          
          <Button className="w-full">Create Savings Plan</Button>
          
          <div className="tip-card">
            <p className="text-sm">
              <strong>Tip:</strong> Consider education-specific investment plans that provide tax benefits and protection against inflation.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChildrenFuturePlanning;
