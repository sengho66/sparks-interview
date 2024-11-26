// app/providers.tsx
"use client";
import { defaultSystem, defineConfig } from "@chakra-ui/react";

import { ChakraProvider } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
