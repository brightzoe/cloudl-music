const path = require("path");

const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);

module.exports = {
	webpack: {
		alias: {
			"@": pathResolve("./src"),
		},
	},
	babel: {
		plugins: [
			"babel-plugin-styled-components",
			{
				ssr: false,
			},
			{
				displayName: false,
			},
		],
	},
};
