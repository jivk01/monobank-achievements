import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/lib/index.ts', 'src/cli/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
    entry: ['src/lib/index.ts'],
    compilerOptions: {
      moduleResolution: "node"
    }
  },
  splitting: false,
  sourcemap: true,
  clean: true,
})