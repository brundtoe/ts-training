/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    testEnvironment: 'node',
    clearMocks: true,
    roots: [
        "./src"
    ],
    setupFilesAfterEnv: ["./jest.setup.js"],
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": ["ts-jest",
            {
                tsconfig: "tsconfig.test.json",
                useESM: true,

            }
        ]
    },
};
