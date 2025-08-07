import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import CustomThemeProvider from '../lib/CustomThemeProvider';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Daily Caloric Intake Calculator',
  description: 'Track your daily caloric intake and reach your health goals',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomThemeProvider>
          <AppBar position="static" elevation={0}>
            <Toolbar sx={{ minHeight: 64 }}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 500, letterSpacing: '0.5px', color: 'inherit' }}>
                CalorieTracker
              </Typography>
            </Toolbar>
          </AppBar>
          <Container maxWidth="xl" sx={{ mt: 3, mb: 6, px: { xs: 2, sm: 3 } }}>
            {children}
          </Container>
        </CustomThemeProvider>
      </body>
    </html>
  );
}