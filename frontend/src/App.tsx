import React from 'react';
import RootNavigation from "./navigation";
import Providers from "./context";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Providers>
        <RootNavigation/>
        <Toaster position="top-center" toastOptions={{duration: 5000}}/>
      </Providers>
    </QueryClientProvider>
  );
}

export default App;
