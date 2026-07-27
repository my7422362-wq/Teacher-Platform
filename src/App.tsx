import { AppProviders } from '@/app/providers';
import { RouterProvider } from '@/app/router/router-provider';

function App() {
  return (
    <AppProviders>
      <RouterProvider />
    </AppProviders>
  );
}

export default App;

