
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const BudgetTracker = () => {
  const [income, setIncome] = useState(50000);
  const [needs, setNeeds] = useState(50);
  const [wants, setWants] = useState(30);
  const [savings, setSavings] = useState(20);

  // Ensure the percentages always add up to 100%
  const handleNeedsChange = (value: number[]) => {
    const newNeeds = value[0];
    const remaining = 100 - newNeeds;
    // Maintain the same ratio between wants and savings
    const ratio = wants / (wants + savings);
    const newWants = Math.round(remaining * ratio);
    const newSavings = remaining - newWants;
    
    setNeeds(newNeeds);
    setWants(newWants);
    setSavings(newSavings);
  };

  const handleWantsChange = (value: number[]) => {
    const newWants = value[0];
    const remaining = 100 - needs - newWants;
    setSavings(remaining);
    setWants(newWants);
  };

  // Calculate the actual amounts
  const needsAmount = Math.round(income * needs / 100);
  const wantsAmount = Math.round(income * wants / 100);
  const savingsAmount = Math.round(income * savings / 100);

  const data = [
    { name: "Needs", value: needs, color: "#1a73e8" },
    { name: "Wants", value: wants, color: "#fbbc04" },
    { name: "Savings", value: savings, color: "#34a853" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Tracker</CardTitle>
        <CardDescription>Apply the 50-30-20 Rule to manage your finances</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="income">Monthly Income</Label>
              <Input
                id="income"
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="needs">Needs ({needs}%)</Label>
                  <span className="text-sm font-medium">${needsAmount}</span>
                </div>
                <Slider
                  id="needs"
                  min={0}
                  max={100}
                  step={1}
                  value={[needs]}
                  onValueChange={handleNeedsChange}
                  className="[&>.sliderTrack]:bg-finance-needs"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="wants">Wants ({wants}%)</Label>
                  <span className="text-sm font-medium">${wantsAmount}</span>
                </div>
                <Slider
                  id="wants"
                  min={0}
                  max={100 - needs}
                  step={1}
                  value={[wants]}
                  onValueChange={handleWantsChange}
                  className="[&>.sliderTrack]:bg-finance-wants"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="savings">Savings ({savings}%)</Label>
                  <span className="text-sm font-medium">${savingsAmount}</span>
                </div>
                <Slider
                  id="savings"
                  min={0}
                  max={100}
                  step={1}
                  value={[savings]}
                  disabled
                  className="[&>.sliderTrack]:bg-finance-savings"
                />
              </div>
            </div>
            
            <div className="tip-card">
              <p className="text-sm">💡 <strong>Budget Tip:</strong> Aim to save 20–30% of your income. Start small, grow steady.</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetTracker;
