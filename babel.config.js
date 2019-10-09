'use strict';

const presets = [
    '@babel/preset-env',
    '@babel/preset-flow'
];
const plugins = [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-private-methods"
];

if (process.env['BABEL_ENV'] === 'esm') {
    presets[0] = [
        '@babel/preset-env',
        {
            modules: false,
        },
    ];
}

if (process.env['BABEL_ENV'] === 'esm' || process.env['BABEL_ENV'] === 'cjs') {
    plugins.push('@babel/plugin-transform-runtime');
}

module.exports = {presets, plugins};
