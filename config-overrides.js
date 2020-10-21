//根目录创建config-overrides.js, 修改默认配置
const {
    override,
    fixBabelImports,
    addLessLoader,
    addDecoratorsLegacy
} = require("customize-cra");

module.exports = override(
    fixBabelImports("import", {
        // antd按需加载
        libraryName: "antd",
        libraryDirectory: "es",
        style: true
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            "@primary-color": "gray"
        }
    }),
    addDecoratorsLegacy(), //装饰器
);