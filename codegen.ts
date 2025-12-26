import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: '../VisualDebuggerBE/src/schema.gql',
    documents: 'graphql/**/*.graphql',
    generates: {
        './graphql/generated/': {
            preset: 'client',
            plugins: [],
            presetConfig: {
                gqlTagName: 'gql',
            },
        },
    },
};

export default config;
