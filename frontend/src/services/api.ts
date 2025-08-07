import axios from 'axios';
import { UserProfile, DailyEntry, FoodItem, CalorieCalculationResult } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User Profile APIs
export const userProfileApi = {
  create: (profile: UserProfile): Promise<UserProfile> =>
    api.post('/users', profile).then(res => res.data),
  
  getById: (id: number): Promise<UserProfile> =>
    api.get(`/users/${id}`).then(res => res.data),
  
  update: (id: number, profile: UserProfile): Promise<UserProfile> =>
    api.put(`/users/${id}`, profile).then(res => res.data),
  
  delete: (id: number): Promise<void> =>
    api.delete(`/users/${id}`).then(res => res.data),
};

// Calorie Calculation APIs
export const calorieApi = {
  calculateCalories: (profile: UserProfile): Promise<CalorieCalculationResult> =>
    api.post('/calories/calculate', profile).then(res => res.data),
};

// Food Items APIs
export const foodApi = {
  search: (query: string): Promise<FoodItem[]> =>
    api.get(`/foods/search?q=${encodeURIComponent(query)}`).then(res => res.data),
  
  getAll: (): Promise<FoodItem[]> =>
    api.get('/foods').then(res => res.data),
  
  create: (food: FoodItem): Promise<FoodItem> =>
    api.post('/foods', food).then(res => res.data),
};

// Daily Entries APIs
export const dailyEntryApi = {
  getByUserAndDate: (userId: number, date: string): Promise<DailyEntry> =>
    api.get(`/entries/user/${userId}/date/${date}`).then(res => res.data),
  
  create: (entry: DailyEntry): Promise<DailyEntry> =>
    api.post('/entries', entry).then(res => res.data),
  
  update: (id: number, entry: DailyEntry): Promise<DailyEntry> =>
    api.put(`/entries/${id}`, entry).then(res => res.data),
  
  getHistory: (userId: number, days: number): Promise<DailyEntry[]> =>
    api.get(`/entries/user/${userId}/history?days=${days}`).then(res => res.data),
};