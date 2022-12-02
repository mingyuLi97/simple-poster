import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import pkg from "./package.json";

export default defineConfig({
  input: "src/index.ts",
  output: {
    file: pkg.module,
    format: "es",
    sourcemap: true,
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**",
      extensions: [".js", ".ts"],
      babelHelpers: "runtime",
    }),
    typescript({
      sourceMap: true,
      tsconfig: "./tsconfig.json",
      // TODO：暂时不会配置多 output 时，怎么只生成一份 .d.ts 所以暂时用 tsc 替代 rollup 生成 （见 package.json script build）
      declaration: false,
    }),
  ],
});
