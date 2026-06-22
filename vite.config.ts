import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// TanStack Start workflows:
// - tanstackStart(): TanStack Router code generation, SSR/Vinxi + React framework config
// - nitro():    Server bundler that emits platform-agnostic output
// - viteReact(): React JSX transform
// - tailwindcss():    Tailwind CSS v4 processing
//
// Vite 8+ resolves tsconfig paths natively (no vite-tsconfig-paths needed).
//
// Vercel: Nitro auto-detects the Vercel environment during deployment.
// The `vercel` preset is set explicitly to avoid ambiguity.
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    nitro({
      preset: "vercel",
      // Workaround for a known Nitro/Vercel issue where the web handler
      // overwrites req.runtime, crashing srvx's node adapter during SSR.
      // Forces the node entry format which preserves runtime.node.
      vercel: { entryFormat: "node" },
    }),
    viteReact(),
    tailwindcss(),
  ],
});
