'use client';

import { useState } from 'react';
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
  Box,
  Typography,
  Divider,
  Stack,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { UserProfile } from '../../types';

interface UserProfileFormProps {
  initialData?: UserProfile;
  onSubmit: (data: UserProfile) => void;
  onCancel: () => void;
}

export default function UserProfileForm({ initialData, onSubmit, onCancel }: UserProfileFormProps) {
  const [open, setOpen] = useState(true);
  
  const { control, handleSubmit, formState: { errors } } = useForm<UserProfile>({
    defaultValues: initialData || {
      name: '',
      age: 25,
      gender: 'male',
      height: 170,
      weight: 70,
      activityLevel: 'moderate',
      goal: 'maintain',
    }
  });

  const handleFormSubmit = (data: UserProfile) => {
    onSubmit(data);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    onCancel();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="md" fullWidth>
      <DialogTitle>
        {initialData ? 'Update Profile' : 'Create Your Profile'}
      </DialogTitle>
      
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Stack spacing={3}>
            {/* Personal Information */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Stack spacing={2}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Full Name"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
                
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <Controller
                    name="age"
                    control={control}
                    rules={{ 
                      required: 'Age is required',
                      min: { value: 1, message: 'Age must be positive' },
                      max: { value: 150, message: 'Age must be realistic' }
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
                    rules={{ required: 'Gender is required' }}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.gender}>
                        <InputLabel>Gender</InputLabel>
                        <Select {...field} label="Gender">
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Box>
              </Stack>
            </Box>

            {/* Physical Measurements */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Physical Measurements
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Controller
                  name="height"
                  control={control}
                  rules={{ 
                    required: 'Height is required',
                    min: { value: 50, message: 'Height must be at least 50 cm' },
                    max: { value: 300, message: 'Height must be less than 300 cm' }
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
                    min: { value: 20, message: 'Weight must be at least 20 kg' },
                    max: { value: 500, message: 'Weight must be less than 500 kg' }
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
            </Box>

            {/* Activity & Goals */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Activity & Goals
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Stack spacing={2}>
                <Controller
                  name="activityLevel"
                  control={control}
                  rules={{ required: 'Activity level is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.activityLevel}>
                      <InputLabel>Activity Level</InputLabel>
                      <Select {...field} label="Activity Level">
                        <MenuItem value="sedentary">Sedentary (little/no exercise)</MenuItem>
                        <MenuItem value="light">Light (light exercise 1-3 days/week)</MenuItem>
                        <MenuItem value="moderate">Moderate (moderate exercise 3-5 days/week)</MenuItem>
                        <MenuItem value="active">Active (hard exercise 6-7 days/week)</MenuItem>
                        <MenuItem value="very_active">Very Active (very hard exercise & physical job)</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
                
                <Controller
                  name="goal"
                  control={control}
                  rules={{ required: 'Goal is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.goal}>
                      <InputLabel>Goal</InputLabel>
                      <Select {...field} label="Goal">
                        <MenuItem value="lose">Lose Weight</MenuItem>
                        <MenuItem value="maintain">Maintain Weight</MenuItem>
                        <MenuItem value="gain">Gain Weight</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {initialData ? 'Update Profile' : 'Create Profile'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}