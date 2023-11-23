const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");

const clientConfig = {
    name: "client",
    mode: "development",
    entry: "./src/frontend/index.ts",
    target: "web",
    plugins: [
        new CopyPlugin({
            patterns: [{ from: "src/static" }],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                include: /src/,
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js", ".mjs"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist/client"),
    },
};

const serverConfig = {
    name: "server",
    mode: "development",
    entry: "./src/app.ts",
    target: "node",
    externals: [nodeExternals()],
    externalsPresets: { node: true },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                include: /src/,
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js", ".mjs"],
    },
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "dist/server"),
    },
};

module.exports = [clientConfig, serverConfig];
