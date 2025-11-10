import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts"
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import tailwindcss from "@tailwindcss/postcss";

const packageJson = require("./package.json")

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
      },
      {
        file: packageJson.module,
        format: "esm",
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        extensions: [".css"],
        minimize: true,
        extract: "styles.css",
        plugins: [
          tailwindcss()
        ]
      }),
      terser({
        format: {
          comments: false
        }
      }),
      peerDepsExternal()
    ],
    external: ["react", "react-dom"]
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.types
      }
    ],
    plugins: [dts.default()],
    external: [/\.css$/]
  }
]
