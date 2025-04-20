import { ESLint } from 'eslint';

const eslintFilterIgnoredFiles = async (/** @type {string[]} */ files) => {
    const eslint = new ESLint();
    return (await Promise.all(files.map(async (file) => {
        return (await eslint.isPathIgnored(file)) ? '' : file;
    }))).filter(file => !!file);
};

/** @type {import('lint-staged').Configuration} */
const config = {
    '**/*.{ts,js}': () => {
        return 'pnpm type-check';
    },
    '**/*.{js,ts}': 'eslint --max-warnings=0 .',
    '**/*.{yml,yaml}': async (files) => {
        const filesToLint = await eslintFilterIgnoredFiles(files);
        return (filesToLint.length > 0) ? `eslint --max-warnings=0 ${filesToLint.join(' ')}` : [];
    },
};

export default config;
