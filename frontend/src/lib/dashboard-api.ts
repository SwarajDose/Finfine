const API_URL = 'http://localhost:5000/api';

// Types for dashboard data
export interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: string;
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  period: string;
}

export interface Goal {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  deadline: string | null;
  priority: string;
}

export interface DashboardSummary {
  accounts: {
    data: Account[];
    total_balance: number;
  };
  transactions: {
    recent: Transaction[];
  };
  budgets: {
    data: Budget[];
    total: number;
    spent: number;
    remaining: number;
  };
  goals: {
    data: Goal[];
    total: number;
    current: number;
    progress: number;
  };
  summary: {
    net_worth: number;
    income_this_month: number;
    expenses_this_month: number;
    savings_rate: number;
  };
}

export interface AccountsResponse {
  accounts: Account[];
  total_balance: number;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  total_count: number;
  current_page: number;
  total_pages: number;
}

export interface BudgetsResponse {
  budgets: Budget[];
  total: number;
  spent: number;
  remaining: number;
}

export interface GoalsResponse {
  goals: Goal[];
  total: number;
  current: number;
  progress: number;
}

// Helper function to handle responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }
  
  return data;
};

// Get dashboard summary
export const getDashboardSummary = async (token: string): Promise<DashboardSummary> => {
  const response = await fetch(`${API_URL}/dashboard/summary`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  return handleResponse(response);
};

// Get accounts
export const getAccounts = async (token: string): Promise<AccountsResponse> => {
  const response = await fetch(`${API_URL}/dashboard/accounts`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  return handleResponse(response);
};

// Get transactions
export const getTransactions = async (
  token: string, 
  params?: { 
    limit?: number; 
    skip?: number; 
    category?: string; 
    type?: string;
  }
): Promise<TransactionsResponse> => {
  const queryParams = new URLSearchParams();
  
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.skip) queryParams.append('skip', params.skip.toString());
  if (params?.category) queryParams.append('category', params.category);
  if (params?.type) queryParams.append('type', params.type);
  
  const url = `${API_URL}/dashboard/transactions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  return handleResponse(response);
};

// Get budgets
export const getBudgets = async (token: string): Promise<BudgetsResponse> => {
  const response = await fetch(`${API_URL}/dashboard/budgets`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  return handleResponse(response);
};

// Get goals
export const getGoals = async (token: string): Promise<GoalsResponse> => {
  const response = await fetch(`${API_URL}/dashboard/goals`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  return handleResponse(response);
}; 