import { AppProviders } from '@/providers';
import { RouterProvider } from '@/router/router-provider';

function App() {
  return (
    <AppProviders>
      <RouterProvider />
    </AppProviders>
  );
}

export default App;


