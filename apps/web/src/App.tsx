import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './globals.css';
import Router from './modules/router';

// Create a client
const queryClient = new QueryClient()


function App() {
  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
