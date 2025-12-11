"use client";

import { defaultShouldDehydrateQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SuperJSON from "superjson";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      experimental_prefetchInRender: true,
      refetchInterval: 1000 * 20,
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
    dehydrate: {
      serializeData: SuperJSON.serialize,
      shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === "pending",
    },
    hydrate: {
      deserializeData: SuperJSON.deserialize,
    },
  },
});
export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
