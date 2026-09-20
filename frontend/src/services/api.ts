/**
 * API Service Client
 * Handles communication between the React frontend and Express backend.
 */

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

const API_BASE = '/api';

export const api = {
  /**
   * Submit contact inquiry
   */
  async submitContact(payload: ContactPayload): Promise<ApiResponse> {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      return {
        success: false,
        error: 'NETWORK_ERROR',
        message: 'Could not reach backend API. If running locally, please ensure backend is started.'
      };
    }
  },

  /**
   * Fetch all projects from backend (fallback bundled if offline)
   */
  async getProjects(): Promise<ApiResponse> {
    try {
      const res = await fetch(`${API_BASE}/projects`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return {
        success: false,
        error: 'FETCH_ERROR',
        message: 'Could not fetch projects from backend API.'
      };
    }
  },

  /**
   * Record page view analytics
   */
  async recordAnalytics(page: string = '/'): Promise<void> {
    try {
      await fetch(`${API_BASE}/analytics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page })
      });
    } catch {
      // Non-blocking telemetry failure
    }
  },

  /**
   * Check backend & database health
   */
  async checkHealth(): Promise<ApiResponse> {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return await res.json();
    } catch {
      return {
        success: false,
        error: 'HEALTH_CHECK_FAILED',
        message: 'Backend server is not responding.'
      };
    }
  }
};
