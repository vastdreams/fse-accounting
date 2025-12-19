/**
 * PATH: src/lib/api.ts
 * PURPOSE: API client for FSE Accounting backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ApiOptions extends RequestInit {
  authenticated?: boolean;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  }

  async request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const { authenticated = true, ...fetchOptions } = options;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((fetchOptions.headers as Record<string, string>) || {}),
    };

    if (authenticated) {
      const token = this.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    if (response.status === 401) {
      // Token expired, attempt refresh
      const refreshed = await this.refreshToken();
      if (refreshed) {
        // Retry request
        headers['Authorization'] = `Bearer ${this.getToken()}`;
        const retryResponse = await fetch(`${this.baseUrl}${endpoint}`, {
          ...fetchOptions,
          headers,
        });
        if (!retryResponse.ok) {
          throw new Error('Request failed after token refresh');
        }
        return retryResponse.json();
      } else {
        // Redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        throw new Error('Authentication required');
      }
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Request failed' }));
      throw new Error(error.detail || 'Request failed');
    }

    return response.json();
  }

  private async refreshToken(): Promise<boolean> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${this.baseUrl}/api/v1/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) return false;

      const data = await response.json();
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('refreshToken', data.refresh_token);
      return true;
    } catch {
      return false;
    }
  }

  // Auth
  async login(email: string, password: string) {
    return this.request<{
      access_token: string;
      refresh_token: string;
      user: { id: number; email: string; first_name: string; last_name: string; role: string };
    }>('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      authenticated: false,
    });
  }

  async register(data: { email: string; password: string; first_name: string; last_name: string }) {
    return this.request('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
      authenticated: false,
    });
  }

  // Users
  async getMe() {
    return this.request('/api/v1/users/me');
  }

  async updateMe(data: Partial<{ first_name: string; last_name: string; phone: string }>) {
    return this.request('/api/v1/users/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Clients
  async getClients(params?: { status?: string; skip?: number; limit?: number }) {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return this.request(`/api/v1/clients${query ? `?${query}` : ''}`);
  }

  async getClient(id: number) {
    return this.request(`/api/v1/clients/${id}`);
  }

  async createClient(data: { company_name: string; abn?: string; industry?: string }) {
    return this.request('/api/v1/clients', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Projects
  async getProjects(params?: { client_id?: number; status?: string }) {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return this.request(`/api/v1/projects${query ? `?${query}` : ''}`);
  }

  async getProject(id: number) {
    return this.request(`/api/v1/projects/${id}`);
  }

  // Documents
  async getDocuments(params?: { project_id?: number }) {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return this.request(`/api/v1/documents${query ? `?${query}` : ''}`);
  }

  async uploadDocument(file: File, projectId?: number) {
    const formData = new FormData();
    formData.append('file', file);
    if (projectId) formData.append('project_id', projectId.toString());

    const token = this.getToken();
    const response = await fetch(`${this.baseUrl}/api/v1/documents/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });

    if (!response.ok) throw new Error('Upload failed');
    return response.json();
  }

  // AI
  async chat(message: string, history?: { role: string; content: string }[]) {
    return this.request<{ response: string; tokens_used: number }>('/api/v1/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, history }),
    });
  }
}

export const api = new ApiClient(API_URL);

