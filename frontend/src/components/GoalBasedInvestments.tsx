
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Award, Calendar } from "lucide-react";

const GoalBasedInvestments = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Goal-Based Investment Planner</CardTitle>
        <CardDescription>Plan investments based on your timeline and goals</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="short">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="short">Short-Term</TabsTrigger>
            <TabsTrigger value="medium">Medium-Term</TabsTrigger>
            <TabsTrigger value="long">Long-Term</TabsTrigger>
          </TabsList>
          
          <TabsContent value="short" className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium text-finance-primary">
              <Clock className="h-5 w-5" />
              <h3>Short-Term Goals (1-3 years)</h3>
            </div>
            
            <p className="text-sm text-gray-600">
              Perfect for upcoming expenses like education fees, vacations, or large purchases.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">High-Yield Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Typical Return</span>
                      <span className="font-medium">3-4% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Level</span>
                      <span className="font-medium text-green-600">Very Low</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Liquidity</span>
                      <span className="font-medium text-green-600">High</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Liquid Funds</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Typical Return</span>
                      <span className="font-medium">5-6% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Level</span>
                      <span className="font-medium text-yellow-600">Low</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Liquidity</span>
                      <span className="font-medium text-green-600">High</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="medium" className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium text-finance-primary">
              <Award className="h-5 w-5" />
              <h3>Medium-Term Goals (3-7 years)</h3>
            </div>
            
            <p className="text-sm text-gray-600">
              Suitable for goals like education funds, home down payment, or wedding expenses.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Hybrid Mutual Funds</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Typical Return</span>
                      <span className="font-medium">8-10% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Level</span>
                      <span className="font-medium text-yellow-600">Moderate</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lock-in Period</span>
                      <span className="font-medium">None, but 3+ years recommended</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Fixed Deposits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Typical Return</span>
                      <span className="font-medium">5-7% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Level</span>
                      <span className="font-medium text-green-600">Low</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lock-in Period</span>
                      <span className="font-medium">Fixed term (premature withdrawal penalties)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="long" className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium text-finance-primary">
              <Calendar className="h-5 w-5" />
              <h3>Long-Term Goals (7+ years)</h3>
            </div>
            
            <p className="text-sm text-gray-600">
              Ideal for retirement planning, children's education, or wealth creation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Index Fund SIPs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Typical Return</span>
                      <span className="font-medium">10-12% p.a. (historical)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Level</span>
                      <span className="font-medium text-orange-600">Moderate-High</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Min. Investment</span>
                      <span className="font-medium">$500 per month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Retirement Accounts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Typical Return</span>
                      <span className="font-medium">8-10% p.a. (varies)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Level</span>
                      <span className="font-medium text-yellow-600">Moderate</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax Benefits</span>
                      <span className="font-medium text-green-600">Significant</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="pro-tip mt-4">
              <p className="text-sm">
                <strong>Pro Tip:</strong> The power of compounding works best over long periods. Start early, even with small amounts.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GoalBasedInvestments;
