// ==========================================
// إعداد الاتصال بـ .NET API الخارجي
// غيّر BASE_URL إلى رابط الـ API الخاص بك
// ==========================================

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://your-dotnet-api.com/api';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: Record<string, string>;
  token?: string;
}

async function apiRequest<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, token } = options;

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...headers,
  };

  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new ApiError(response.status, errorData?.message || response.statusText);
  }

  if (response.status === 204) return {} as T;
  return response.json();
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// ==========================================
// Projects API - مشاريع إعادة الإعمار
// ==========================================
export const projectsApi = {
  getAll: () => apiRequest<Project[]>('/projects'),
  getById: (id: string) => apiRequest<Project>(`/projects/${id}`),
  create: (data: CreateProject, token: string) =>
    apiRequest<Project>('/projects', { method: 'POST', body: data, token }),
  update: (id: string, data: Partial<Project>, token: string) =>
    apiRequest<Project>(`/projects/${id}`, { method: 'PUT', body: data, token }),
  delete: (id: string, token: string) =>
    apiRequest<void>(`/projects/${id}`, { method: 'DELETE', token }),
};

// ==========================================
// Donations API - التبرعات
// ==========================================
export const donationsApi = {
  getAll: (token: string) => apiRequest<Donation[]>('/donations', { token }),
  create: (data: CreateDonation) =>
    apiRequest<Donation>('/donations', { method: 'POST', body: data }),
  getByProject: (projectId: string) =>
    apiRequest<Donation[]>(`/projects/${projectId}/donations`),
};

// ==========================================
// Volunteers API - المتطوعين
// ==========================================
export const volunteersApi = {
  apply: (data: VolunteerApplication) =>
    apiRequest<VolunteerApplication>('/volunteers/apply', { method: 'POST', body: data }),
  getApplications: (token: string) =>
    apiRequest<VolunteerApplication[]>('/volunteers', { token }),
  updateStatus: (id: string, status: string, token: string) =>
    apiRequest<VolunteerApplication>(`/volunteers/${id}/status`, { method: 'PATCH', body: { status }, token }),
};



// ==========================================
// Partners API - الشركاء
// ==========================================
export const partnersApi = {
  getAll: () => apiRequest<Partner[]>('/partners'),
  create: (data: Partial<Partner>, token: string) =>
    apiRequest<Partner>('/partners', { method: 'POST', body: data, token }),
};

// ==========================================
// Auth API - المصادقة
// ==========================================
export const authApi = {
  login: (email: string, password: string) =>
    apiRequest<AuthResponse>('/auth/login', { method: 'POST', body: { email, password } }),
  register: (data: RegisterData) =>
    apiRequest<AuthResponse>('/auth/register', { method: 'POST', body: data }),
  refreshToken: (refreshToken: string) =>
    apiRequest<AuthResponse>('/auth/refresh', { method: 'POST', body: { refreshToken } }),
};

// ==========================================
// TypeScript Types - الأنواع
// ==========================================
export interface Project {
  id: string;
  name: string;
  description: string;
  location: string;
  status: 'planning' | 'in_progress' | 'completed';
  budget: number;
  progressPct: number;
  startDate: string;
  endDate?: string;
}

export interface CreateProject {
  name: string;
  description: string;
  location: string;
  budget: number;
  startDate: string;
}

export interface Donation {
  id: string;
  userId?: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: string;
  donatedAt: string;
}

export interface CreateDonation {
  amount: number;
  currency: string;
  paymentMethod: string;
  projectId?: string;
  donorName?: string;
  donorEmail?: string;
}

export interface VolunteerApplication {
  id?: string;
  userId?: string;
  projectId: string;
  fullName: string;
  email: string;
  phone?: string;
  skills: string[];
  status?: string;
  appliedAt?: string;
}





export interface Partner {
  id: string;
  name: string;
  type: string;
  logoUrl?: string;
  website?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: { id: string; email: string; fullName: string; role: string };
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  role?: string;
  profile?: Record<string, string>;
}
