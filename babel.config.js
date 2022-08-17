module.exports = function (api) {
    api.cache(true);
    const plugins = [
        [
            'module-resolver',
            {
                root: ['./'],
                alias: {
                    '@src': './src',
                    '@assets': './src/assets',
                    '@components': './src/components',
                    '@constants': './src/constants',
                    '@navigation': './src/navigation',
                    '@handlers': './src/handlers',
                    '@hooks': './src/hooks',
                    '@screens': './src/screens',
                    '@store': './src/store',
                    '@utils': './src/utils',
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
