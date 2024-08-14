import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { DarkModeProvider } from './Context/DarkModeContext';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PageNotFound from './pages/PageNotFound';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProtectedRoute from './ui/ProtectedRoute';
import AppLayout from './ui/AppLayout';
import Activity from './pages/Activity';
import Project from './pages/Project';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="home" element={<HomePage />} />
              <Route path="account" element={<Profile />} />
              <Route path="activities/:activityId" element={<Activity />} />
              <Route path="projects/:projectId" element={<Project />} />
            </Route>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
              dismiss: 'click',
            },
            error: {
              duration: 5000,
              dismiss: 'click',
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'bg-gray-300',
              color: 'text-gray-900',
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
