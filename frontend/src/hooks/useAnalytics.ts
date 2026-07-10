import { useState, useCallback } from 'react';

interface UseAnalyticsReturn {
  dashboardData: any;
  skillProgress: any[];
  errorPatterns: any[];
  fetchDashboard: () => Promise<void>;
  fetchSkillProgress: (skillId: string) => Promise<void>;
  fetchErrorPatterns: () => Promise<void>;
  isLoading: boolean;
}

export const useAnalytics = (): UseAnalyticsReturn => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [skillProgress, setSkillProgress] = useState<any[]>([]);
  const [errorPatterns, setErrorPatterns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/analytics/dashboard', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setDashboardData(data.dashboard);
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchSkillProgress = useCallback(async (skillId: string) => {
    try {
      const response = await fetch(`/api/analytics/skill/${skillId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setSkillProgress(data.skillAnalytics);
      }
    } catch (error) {
      console.error('Error fetching skill progress:', error);
    }
  }, []);

  const fetchErrorPatterns = useCallback(async () => {
    try {
      const response = await fetch('/api/analytics/errors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setErrorPatterns(data.errors);
      }
    } catch (error) {
      console.error('Error fetching error patterns:', error);
    }
  }, []);

  return {
    dashboardData,
    skillProgress,
    errorPatterns,
    fetchDashboard,
    fetchSkillProgress,
    fetchErrorPatterns,
    isLoading,
  };
};
