'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Chip,
  Divider,
  Paper,
  Alert,
} from '@mui/material';
import { Calculate, TrendingUp, TrendingDown, Remove, PersonAdd } from '@mui/icons-material';
import { UserProfile, CalorieCalculationResult } from '../types';
import { useForm, Controller } from 'react-hook-form';
import RegistrationForm from '../components/forms/RegistrationForm';

interface CalculatorForm {
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
}

export default function Home() {
  const [calculationResult, setCalculationResult] = useState<CalorieCalculationResult | null>(null);
  const [showAccountPrompt, setShowAccountPrompt] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatorData, setCalculatorData] = useState<CalculatorForm | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<CalculatorForm>({
    defaultValues: {
      age: 25,
      gender: 'male',
      height: 170,
      weight: 70,
      activityLevel: 'moderate',
    }
  });

  // Calculate calories using the same formulas as backend
  const calculateBMR = (data: CalculatorForm): number => {
    if (data.gender === 'male') {
      return 88.362 + (13.397 * data.weight) + (4.799 * data.height) - (5.677 * data.age);
    } else {
      return 447.593 + (9.247 * data.weight) + (3.098 * data.height) - (4.330 * data.age);
    }
  };

  const getActivityMultiplier = (activityLevel: string): number => {
    switch (activityLevel) {
      case 'sedentary': return 1.2;
      case 'light': return 1.375;
      case 'moderate': return 1.55;
      case 'active': return 1.725;
      case 'very_active': return 1.9;
      default: return 1.2;
    }
  };

  const calculateCalories = (data: CalculatorForm) => {
    setIsCalculating(true);
    setCalculatorData(data); // Save the form data
    
    // Simulate API call delay
    setTimeout(() => {
      const bmr = calculateBMR(data);
      const tdee = bmr * getActivityMultiplier(data.activityLevel);
      
      const result: CalorieCalculationResult = {
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        targetCalories: Math.round(tdee), // Maintenance
        recommendedIntake: {
          protein: Math.round((tdee * 0.25) / 4), // 25% of calories, 4 cal per gram
          carbs: Math.round((tdee * 0.45) / 4),   // 45% of calories, 4 cal per gram
          fat: Math.round((tdee * 0.30) / 9),     // 30% of calories, 9 cal per gram
        }
      };

      setCalculationResult(result);
      setShowAccountPrompt(true);
      setIsCalculating(false);
    }, 1000);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 300, color: 'primary.main', mb: 2 }}>
          Daily Caloric Needs Calculator
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 600, mx: 'auto' }}>
          Discover your daily caloric needs with precision. Get personalized recommendations for maintenance, cutting, and bulking.
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', lg: 'row' }, 
        gap: 4,
        alignItems: 'flex-start'
      }}>
        {/* Calculator Form */}
        <Box sx={{ flex: 1, maxWidth: { lg: 480 } }}>
          <Card elevation={2}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Calculate sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
                <Typography variant="h5" component="h2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                  Calculate Your Needs
                </Typography>
              </Box>

              <form onSubmit={handleSubmit(calculateCalories)}>
                <Stack spacing={3}>
                  {/* Personal Info */}
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Controller
                      name="age"
                      control={control}
                      rules={{ 
                        required: 'Age is required',
                        min: { value: 15, message: 'Must be at least 15' },
                        max: { value: 80, message: 'Must be under 80' }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Age"
                          type="number"
                          fullWidth
                          error={!!errors.age}
                          helperText={errors.age?.message}
                        />
                      )}
                    />
                    
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel>Gender</InputLabel>
                          <Select {...field} label="Gender">
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Controller
                      name="height"
                      control={control}
                      rules={{ 
                        required: 'Height is required',
                        min: { value: 120, message: 'Too short' },
                        max: { value: 250, message: 'Too tall' }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Height (cm)"
                          type="number"
                          fullWidth
                          error={!!errors.height}
                          helperText={errors.height?.message}
                        />
                      )}
                    />
                    
                    <Controller
                      name="weight"
                      control={control}
                      rules={{ 
                        required: 'Weight is required',
                        min: { value: 30, message: 'Too light' },
                        max: { value: 300, message: 'Too heavy' }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Weight (kg)"
                          type="number"
                          fullWidth
                          error={!!errors.weight}
                          helperText={errors.weight?.message}
                        />
                      )}
                    />
                  </Box>

                  <Controller
                    name="activityLevel"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>Activity Level</InputLabel>
                        <Select {...field} label="Activity Level">
                          <MenuItem value="sedentary">
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>Sedentary</Typography>
                              <Typography variant="caption" color="text.secondary">Little or no exercise</Typography>
                            </Box>
                          </MenuItem>
                          <MenuItem value="light">
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>Light</Typography>
                              <Typography variant="caption" color="text.secondary">Light exercise 1-3 days/week</Typography>
                            </Box>
                          </MenuItem>
                          <MenuItem value="moderate">
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>Moderate</Typography>
                              <Typography variant="caption" color="text.secondary">Moderate exercise 3-5 days/week</Typography>
                            </Box>
                          </MenuItem>
                          <MenuItem value="active">
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>Active</Typography>
                              <Typography variant="caption" color="text.secondary">Hard exercise 6-7 days/week</Typography>
                            </Box>
                          </MenuItem>
                          <MenuItem value="very_active">
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>Very Active</Typography>
                              <Typography variant="caption" color="text.secondary">Very hard exercise + physical job</Typography>
                            </Box>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isCalculating}
                    sx={{ py: 1.5, fontSize: '1rem', fontWeight: 500 }}
                  >
                    {isCalculating ? 'Calculating...' : 'Calculate My Calories'}
                  </Button>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Box>

        {/* Results Section */}
        <Box sx={{ flex: 1 }}>
          {calculationResult ? (
            <Stack spacing={3}>
              {/* Main Results */}
              <Card elevation={2}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, color: 'text.primary' }}>
                    Your Caloric Needs
                  </Typography>
                  
                  <Stack spacing={3}>
                    {/* BMR */}
                    <Paper sx={{ p: 3, bgcolor: '#f5f7fa', border: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
                        Basal Metabolic Rate (BMR)
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 400, color: 'primary.main', mb: 1 }}>
                        {calculationResult.bmr} cal/day
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Calories burned at complete rest
                      </Typography>
                    </Paper>

                    {/* Goal-based recommendations */}
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 500 }}>
                        Recommendations Based on Goals
                      </Typography>
                      
                      <Stack spacing={2}>
                        {/* Cutting */}
                        <Paper sx={{ p: 3, border: '1px solid', borderColor: '#ffcdd2', bgcolor: '#ffebee' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <TrendingDown sx={{ color: 'error.main', mr: 2, fontSize: 24 }} />
                              <Box>
                                <Typography variant="h6" sx={{ color: 'error.dark', fontWeight: 500 }}>
                                  Fat Loss (Cutting)
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  500 calorie deficit for 1 lb/week loss
                                </Typography>
                              </Box>
                            </Box>
                            <Chip 
                              label={`${calculationResult.tdee - 500} cal/day`}
                              sx={{ bgcolor: 'error.main', color: 'white', fontWeight: 500 }}
                            />
                          </Box>
                        </Paper>

                        {/* Maintenance */}
                        <Paper sx={{ p: 3, border: '1px solid', borderColor: '#c8e6c9', bgcolor: '#e8f5e8' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Remove sx={{ color: 'success.main', mr: 2, fontSize: 24 }} />
                              <Box>
                                <Typography variant="h6" sx={{ color: 'success.dark', fontWeight: 500 }}>
                                  Maintenance
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Maintain current weight
                                </Typography>
                              </Box>
                            </Box>
                            <Chip 
                              label={`${calculationResult.tdee} cal/day`}
                              sx={{ bgcolor: 'success.main', color: 'white', fontWeight: 500 }}
                            />
                          </Box>
                        </Paper>

                        {/* Bulking */}
                        <Paper sx={{ p: 3, border: '1px solid', borderColor: '#bbdefb', bgcolor: '#e3f2fd' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <TrendingUp sx={{ color: 'info.main', mr: 2, fontSize: 24 }} />
                              <Box>
                                <Typography variant="h6" sx={{ color: 'info.dark', fontWeight: 500 }}>
                                  Muscle Gain (Bulking)
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  500 calorie surplus for lean gains
                                </Typography>
                              </Box>
                            </Box>
                            <Chip 
                              label={`${calculationResult.tdee + 500} cal/day`}
                              sx={{ bgcolor: 'info.main', color: 'white', fontWeight: 500 }}
                            />
                          </Box>
                        </Paper>
                      </Stack>
                    </Box>

                    {/* Macronutrient breakdown */}
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                        Daily Macronutrient Targets
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                        <Chip 
                          label={`${calculationResult.recommendedIntake.protein}g Protein`}
                          color="error" 
                          variant="outlined"
                          sx={{ fontWeight: 500 }}
                        />
                        <Chip 
                          label={`${calculationResult.recommendedIntake.carbs}g Carbs`}
                          color="warning" 
                          variant="outlined"
                          sx={{ fontWeight: 500 }}
                        />
                        <Chip 
                          label={`${calculationResult.recommendedIntake.fat}g Fat`}
                          color="info" 
                          variant="outlined"
                          sx={{ fontWeight: 500 }}
                        />
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Account Prompt */}
              {showAccountPrompt && (
                <Alert 
                  severity="info" 
                  action={
                    <Button 
                      color="primary" 
                      size="small" 
                      variant="contained"
                      startIcon={<PersonAdd />}
                      onClick={() => setShowRegistration(true)}
                    >
                      Create Account
                    </Button>
                  }
                >
                  <Typography variant="h6" gutterBottom>
                    Want to track your daily intake?
                  </Typography>
                  <Typography variant="body2">
                    Create a free account to log meals, track progress, and reach your goals!
                  </Typography>
                </Alert>
              )}
            </Stack>
          ) : (
            <Card elevation={1} sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Calculate sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
                  Complete the form to see your personalized caloric needs
                </Typography>
                <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                  Get instant results based on proven scientific formulas
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>

      {/* Registration Modal */}
      <RegistrationForm
        open={showRegistration}
        onClose={() => setShowRegistration(false)}
        prefilledData={calculatorData ? {
          name: '', // Will be filled in registration form
          age: calculatorData.age,
          gender: calculatorData.gender,
          height: calculatorData.height,
          weight: calculatorData.weight,
          activityLevel: calculatorData.activityLevel,
          goal: 'maintain' // Default goal
        } : undefined}
        onSuccess={(userData) => {
          console.log('User registered:', userData);
          // TODO: Save user data and redirect to dashboard
          setShowRegistration(false);
        }}
      />
    </Box>
  );
}