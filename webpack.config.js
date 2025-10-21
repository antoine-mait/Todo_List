// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    
    return {
        mode: argv.mode || "development",
        entry: "./src/index.js",
        output: {
            filename: "main.js",
            path: path.resolve(__dirname, "dist"),
            // Use relative path only for production (GitHub Pages)
            publicPath: isProduction ? "./" : "/",
            clean: true,
        },
        devtool: isProduction ? false : "eval-source-map",
        devServer: {
            watchFiles: ["./src/template.html"],
            port: 8080,
            open: true,
            hot: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/template.html",
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.html$/i,
                    loader: "html-loader",
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: "asset/resource",
                },
            ],
        },
    };
};