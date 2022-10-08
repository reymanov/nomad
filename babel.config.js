module.exports = function (api) {
    api.cache(true);
    const plugins = [
        [
            'module-resolver',
            {
                root: ['./'],
                alias: {
                    '@assets': './src/assets',
                    '@components': './src/components',
                    '@constants': './src/constants',
                    '@navigation': './src/navigation',
                    '@handlers': './src/handlers',
                    '@hooks': './src/hooks',
                    '@screens': './src/screens',
                    '@store': './src/store',
                    '@utils': './src/utils',
                    '@src': './src',
                },
            },
        ],
        'react-native-reanimated/plugin',
    ];

    return {
        presets: ['module:metro-react-native-babel-preset'],
        plugins: plugins,
    };
};
