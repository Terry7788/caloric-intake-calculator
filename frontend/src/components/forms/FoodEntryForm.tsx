'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Typography,
  Box,
  Chip,
  Divider,
  Stack,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { FoodItem, FoodEntry } from '../../types';
import { foodApi } from '../../services/api';

interface FoodEntryFormProps {
  onSubmit: (entry: FoodEntry) => void;
  onCancel: () => void;
}

interface FormData {
  foodItem: FoodItem | null;
  quantity: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export default function FoodEntryForm({ onSubmit, onCancel }: FoodEntryFormProps) {
  const [open, setOpen] = useState(true);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingFoods, setIsLoadingFoods] = useState(false);

  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      foodItem: null,
      quantity: 1,
      mealType: 'breakfast',
    }
  });

  const selectedFood = watch('foodItem');
  const quantity = watch('quantity');
  const calculatedCalories = selectedFood && quantity 
    ? selectedFood.caloriesPerServing * quantity 
    : 0;

  useEffect(() => {
    // Load popular foods on component mount
    loadPopularFoods();
  }, []);

  const loadPopularFoods = async () => {
    try {
      setIsLoadingFoods(true);
      const foods = await foodApi.getAll();
      setFoodItems(foods.slice(0, 20)); // Show top 20 popular foods
    } catch (error) {
      console.error('Error loading foods:', error);
      // Mock data for development
      setFoodItems([
        { id: 1, name: 'Banana', caloriesPerServing: 105, servingSize: '1 medium (118g)', protein: 1.3, carbs: 27, fat: 0.3 },
        { id: 2, name: 'Apple', caloriesPerServing: 95, servingSize: '1 medium (182g)', protein: 0.5, carbs: 25, fat: 0.3 },
        { id: 3, name: 'Chicken Breast', caloriesPerServing: 231, servingSize: '100g', protein: 43.5, carbs: 0, fat: 5 },
        { id: 4, name: 'Brown Rice', caloriesPerServing: 216, servingSize: '1 cup cooked (195g)', protein: 5, carbs: 45, fat: 1.8 },
        { id: 5, name: 'Broccoli', caloriesPerServing: 55, servingSize: '1 cup chopped (156g)', protein: 4.6, carbs: 11, fat: 0.6 },
      ]);
    } finally {
      setIsLoadingFoods(false);
    }
  };

  const searchFoods = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      loadPopularFoods();
      return;
    }

    try {
      setIsLoadingFoods(true);
      const foods = await foodApi.search(searchQuery);
      setFoodItems(foods);
    } catch (error) {
      console.error('Error searching foods:', error);
    } finally {
      setIsLoadingFoods(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        searchFoods(searchTerm);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleFormSubmit = (data: FormData) => {
    if (data.foodItem) {
      const foodEntry: FoodEntry = {
        foodItem: data.foodItem,
        quantity: data.quantity,
        calories: calculatedCalories,
      };
      onSubmit(foodEntry);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    onCancel();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="md" fullWidth>
      <DialogTitle>Add Food Entry</DialogTitle>
      
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Stack spacing={3}>
            {/* Meal Type Selection */}
            <Controller
              name="mealType"
              control={control}
              rules={{ required: 'Meal type is required' }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.mealType}>
                  <InputLabel>Meal Type</InputLabel>
                  <Select {...field} label="Meal Type">
                    <MenuItem value="breakfast">Breakfast</MenuItem>
                    <MenuItem value="lunch">Lunch</MenuItem>
                    <MenuItem value="dinner">Dinner</MenuItem>
                    <MenuItem value="snack">Snack</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            {/* Food Search */}
            <Controller
              name="foodItem"
              control={control}
              rules={{ required: 'Please select a food item' }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={foodItems}
                  getOptionLabel={(option) => option.name}
                  value={value}
                  onChange={(_, newValue) => onChange(newValue)}
                  onInputChange={(_, newInputValue) => setSearchTerm(newInputValue)}
                  loading={isLoadingFoods}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search Food Items"
                      placeholder="Start typing to search for foods..."
                      error={!!errors.foodItem}
                      helperText={errors.foodItem?.message}
                      fullWidth
                    />
                  )}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body1">{option.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {option.caloriesPerServing} cal per {option.servingSize}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                />
              )}
            />

            {/* Selected Food Details */}
            {selectedFood && (
              <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {selectedFood.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Serving size: {selectedFood.servingSize}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mt: 1 }}>
                  <Chip label={`${selectedFood.caloriesPerServing} cal`} color="primary" size="small" />
                  {selectedFood.protein && (
                    <Chip label={`${selectedFood.protein}g protein`} variant="outlined" size="small" />
                  )}
                  {selectedFood.carbs && (
                    <Chip label={`${selectedFood.carbs}g carbs`} variant="outlined" size="small" />
                  )}
                  {selectedFood.fat && (
                    <Chip label={`${selectedFood.fat}g fat`} variant="outlined" size="small" />
                  )}
                </Stack>
              </Box>
            )}

            {/* Quantity Input */}
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              alignItems: 'center',
              flexDirection: { xs: 'column', sm: 'row' }
            }}>
              <Controller
                name="quantity"
                control={control}
                rules={{ 
                  required: 'Quantity is required',
                  min: { value: 0.1, message: 'Quantity must be positive' }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Quantity (servings)"
                    type="number"
                    inputProps={{ step: 0.1, min: 0.1 }}
                    sx={{ flex: 1, minWidth: 200 }}
                    error={!!errors.quantity}
                    helperText={errors.quantity?.message}
                  />
                )}
              />

              {calculatedCalories > 0 && (
                <Box sx={{ 
                  minWidth: 'fit-content',
                  textAlign: { xs: 'center', sm: 'left' }
                }}>
                  <Typography variant="h6" color="primary">
                    Total: {Math.round(calculatedCalories)} cal
                  </Typography>
                </Box>
              )}
            </Box>
          </Stack>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Add Food
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}