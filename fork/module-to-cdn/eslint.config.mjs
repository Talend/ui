import js from '@eslint/js';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
    js.configs.recommended,
    importPlugin.flatConfigs.recommended,
    {
        plugins: {
            prettier: prettierPlugin
        },
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.es2022,
                ...globals.node,
                ...globals.jasmine,
                ...globals.jest
            }
        },
        rules: {
            ...prettierConfig.rules,
            'prettier/prettier': 'error'
        }
    }
];
