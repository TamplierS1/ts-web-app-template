const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");

const clientConfig = {
    name: "client",
    mode: "development",
    entry: "./src/frontend/index.js",
    target: "web",
    plugins: [
        new CopyPlugin({
            patterns: [{ from: "src/static" }],
        }),
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist/client"),
    },
};

const serverConfig = {
    name: "server",
    mode: "development",
    entry: "./src/app.js",
    target: "node",
    externals: [nodeExternals()],
    externalsPresets: { node: true },
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "dist/server"),
    },
};

module.exports = [clientConfig, serverConfig];
