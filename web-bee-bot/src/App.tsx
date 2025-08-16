import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import BeeBotGame from './components/BeeBotGame';
import Header from './components/Header';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App min-h-screen bg-gradient-to-br from-blue-400 to-purple-600">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <BeeBotGame />
        </main>
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#FFD700',
              color: '#2C2C2C',
              border: '3px solid #2C2C2C',
              borderRadius: '15px',
              fontSize: '16px',
              fontFamily: 'Comic Sans MS, cursive',
            },
          }}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
