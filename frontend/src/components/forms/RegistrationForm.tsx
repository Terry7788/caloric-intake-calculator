'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  Alert,
  Divider,
} from '@mui/material';
import { PersonAdd, Email, Lock } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { UserProfile } from '../../types';

interface RegistrationFormProps {
  open: boolean;
  onClose: () => void;
  prefilledData?: Partial<UserProfile>;
  onSuccess: (userData: UserProfile & { email: string; password: string }) => void;
}

interface RegistrationData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegistrationForm({ 
  open, 
  onClose, 
  prefilledData, 
  onSuccess 
}: RegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, watch, formState: { errors } } = useForm<RegistrationData>({
    defaultValues: {
      name: prefilledData?.name || '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  const password = watch('password');

  const handleRegistration = async (data: RegistrationData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Combine prefilled calculator data with registration data
      const userData = {
        ...prefilledData,
        name: data.name, // Use the name from registration form
        email: data.email,
        password: data.password,
      } as UserProfile & { email: string; password: string };

      onSuccess(userData);
      onClose();
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
        <PersonAdd sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Create Your Account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Join thousands tracking their fitness goals
        </Typography>
      </DialogTitle>
      
      <form onSubmit={handleSubmit(handleRegistration)}>
        <DialogContent sx={{ pt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {prefilledData && (
            <Box sx={{ mb: 3 }}>
              <Alert severity="info" sx={{ mb: 2 }}>
                We've saved your calculator results! Just add your account details below.
              </Alert>
              <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {prefilledData.age} years old • {prefilledData.gender} • {prefilledData.height}cm, {prefilledData.weight}kg
                </Typography>
              </Box>
            </Box>
          )}

          <Stack spacing={3}>
            <Controller
              name="name"
              control={control}
              rules={{ 
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  InputProps={{
                    startAdornment: <PersonAdd sx={{ color: 'grey.500', mr: 1 }} />
                  }}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{ 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email Address"
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    startAdornment: <Email sx={{ color: 'grey.500', mr: 1 }} />
                  }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{ 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    startAdornment: <Lock sx={{ color: 'grey.500', mr: 1 }} />
                  }}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              rules={{ 
                required: 'Please confirm your password',
                validate: (value) => 
                  value === password || 'Passwords do not match'
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  InputProps={{
                    startAdornment: <Lock sx={{ color: 'grey.500', mr: 1 }} />
                  }}
                />
              )}
            />
          </Stack>

          <Divider sx={{ my: 3 }} />
          
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            size="large"
            disabled={isSubmitting}
            sx={{ px: 4 }}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}