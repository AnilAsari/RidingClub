import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";

import { createQueryClient } from "@/src/services/queryClient";

export function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(createQueryClient);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
