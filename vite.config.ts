import dtsPlugin from 'vite-plugin-dts';
import glslPlugin from 'vite-plugin-glsl';
import { fileURLToPath } from 'node:url';

export default {
    plugins: [
        glslPlugin({
            minify: true,
        }),
        dtsPlugin({
            tsconfigPath: fileURLToPath(new URL('./tsconfig.lib.json', import.meta.url)),
            rollupTypes: true,
            insertTypesEntry: true,

        }),
    ],
    build: {
        sourcemap: true,
        lib: {
            entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
            formats: ['es', 'cjs'],
            fileName: 'index',
        },
        outDir: fileURLToPath(new URL('./dist', import.meta.url)),
        rollupOptions: {
            external: [
                'three',
            ],
        },
    },
};
