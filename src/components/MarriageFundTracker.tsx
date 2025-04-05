
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Calendar } from "lucide-react";

const MarriageFundTracker = () => {
  const [targetAmount, setTargetAmount] = useState(50000);
  const [yearsToMarriage, setYearsToMarriage] = useState(3);
  const [currentSavings, setCurrentSavings] = useState(5000);
  
  // Calculate the monthly investment needed
  const monthsToGoal = yearsToMarriage * 12;
  const amountNeeded = targetAmount - currentSavings;
  const monthlyInvestment = Math.ceil(amountNeeded / monthsToGoal / 0.85); // Assuming 7-8% annual returns
  
  // Calculate progress
  const progress = Math.min(Math.round((currentSavings / targetAmount) * 100), 100);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Marriage Fund Tracker</CardTitle>
            <CardDescription>Plan ahead for your big day</CardDescription>
          </div>
          <div className="bg-pink-100 p-2 rounded-full">
            <Heart className="h-5 w-5 text-pink-500" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target-amount">Wedding Budget</Label>
              <Input
                id="target-amount"
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="years-to-marriage">Years to Wedding</Label>
              <Input
                id="years-to-marriage"
                type="number"
                value={yearsToMarriage}
                onChange={(e) => setYearsToMarriage(Number(e.target.value))}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="current-savings">Current Savings</Label>
            <Input
              id="current-savings"
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
            />
          </div>
          
          <div className="space-y-2 mt-4">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Target Date: {new Date().getFullYear() + yearsToMarriage}</span>
              </div>
              <span className="font-medium">{progress}% Saved</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="mt-6 p-4 bg-pink-50 rounded-lg text-center">
            <p className="text-sm text-gray-700 mb-2">Recommended Monthly Contribution</p>
            <p className="text-3xl font-bold text-pink-600">${monthlyInvestment}</p>
            <p className="text-xs text-gray-500 mt-1">to reach your goal by {new Date().getFullYear() + yearsToMarriage}</p>
          </div>
          
          <Button className="w-full">Set Up Automatic Savings</Button>
          
          <div className="tip-card">
            <p className="text-sm">
              <strong>Tip:</strong> For wedding funds, focus on investments with decent returns but high liquidity since you'll need the money on a specific date.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarriageFundTracker;
