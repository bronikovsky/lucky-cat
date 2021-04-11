module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: {
            localIdentName: '[name]__[local]--[hash:base64:5]',
          },
        },
      },
    },
  ],

  webpackFinal: async config => {
    // Enable support for including both sass modules and sass global files.
    const sassModuleRule = config.module.rules.find(r => r.test.test('.scss'));

    // Clone the sass modules rule, remove the `modules` field from `css-loader` options.
    const sassRule = { ...sassModuleRule };

    sassRule.test = /(?<!module).s[ca]ss/;
    sassRule.use = sassRule.use.map(l => {
      if (l.options && l.options.modules) {
        return { ...l, options: { ...l.options, modules: undefined } };
      }

      return l;
    });

    sassModuleRule.test = /\.module\.s[ca]ss$/
    config.module.rules.push(sassRule);

    return config;
  },
};
