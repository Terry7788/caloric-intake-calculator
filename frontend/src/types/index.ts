export interface UserProfile {
  id?: number;
  name: string;
  age: number;
  gender: 'male' | 'female';
  height: number; // in cm
  weight: number; // in kg
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'lose' | 'maintain' | 'gain';
}

export interface FoodItem {
  id?: number;
  name: string;
  caloriesPerServing: number;
  servingSize: string;
  protein?: number;
  carbs?: number;
  fat?: number;
  brand?: string;
  barcode?: string;
  isVerified?: boolean;
}

export interface DailyEntry {
  id?: number;
  userId: number;
  date: string;
  meals: Meal[];
  totalCalories: number;
  targetCalories: number;
}

export interface Meal {
  id?: number;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: FoodEntry[];
  totalCalories: number;
}

export interface FoodEntry {
  id?: number;
  foodItem: FoodItem;
  quantity: number;
  calories: number;
}

export interface CalorieCalculationResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  recommendedIntake: {
    protein: number;
    carbs: number;
    fat: number;
  };
}