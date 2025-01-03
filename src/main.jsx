
import { createRoot } from 'react-dom/client';
import { QueryClientProvider,QueryClient } from 'react-query';

import App from './App'
const queryClient=new QueryClient();

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
  
    <App />
    </QueryClientProvider>
 
)
