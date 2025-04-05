import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { 
  getDashboardSummary, 
  DashboardSummary,
  getAccounts,
  getTransactions,
  getBudgets,
  getGoals
} from '@/lib/dashboard-api';

export const useDashboardSummary = () => {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }
        
        const summaryData = await getDashboardSummary(token);
        setData(summaryData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  const refreshData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      const summaryData = await getDashboardSummary(token);
      setData(summaryData);
    } catch (error) {
      console.error('Error refreshing dashboard data:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refreshData };
};

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<{ accounts: any[]; total_balance: number }>({ accounts: [], total_balance: 0 });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchAccounts = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }
        
        const data = await getAccounts(token);
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [isAuthenticated]);

  return { accounts, loading, error };
};

export const useTransactions = (params?: { limit?: number; skip?: number; category?: string; type?: string }) => {
  const [transactions, setTransactions] = useState<{ 
    transactions: any[]; 
    total_count: number;
    current_page: number;
    total_pages: number;
  }>({ 
    transactions: [], 
    total_count: 0,
    current_page: 1,
    total_pages: 1
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }
        
        const data = await getTransactions(token, params);
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [isAuthenticated, params?.limit, params?.skip, params?.category, params?.type]);

  return { transactions, loading, error };
};

export const useBudgets = () => {
  const [budgets, setBudgets] = useState<{
    budgets: any[];
    total: number;
    spent: number;
    remaining: number;
  }>({
    budgets: [],
    total: 0,
    spent: 0,
    remaining: 0
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchBudgets = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }
        
        const data = await getBudgets(token);
        setBudgets(data);
      } catch (error) {
        console.error('Error fetching budgets:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
  }, [isAuthenticated]);

  return { budgets, loading, error };
};

export const useGoals = () => {
  const [goals, setGoals] = useState<{
    goals: any[];
    total: number;
    current: number;
    progress: number;
  }>({
    goals: [],
    total: 0,
    current: 0,
    progress: 0
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchGoals = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }
        
        const data = await getGoals(token);
        setGoals(data);
      } catch (error) {
        console.error('Error fetching goals:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [isAuthenticated]);

  return { goals, loading, error };
}; 