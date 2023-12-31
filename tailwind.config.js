/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}', './public/index.html'],
    theme: {
        extend: {
            backgroundColor: {
                'main-100': '#E7ECEC',
                'main-200': '#DDE4E4',
                'main-300': '#CED9D9',
                'main-400': '#C0D8D8',
                'main-500': '#0E8080',
                'overlay-50': 'rgba(0,0,0,0.5)',
            },
            colors: {
                'main-100': '#E7ECEC',
                'main-200': '#DDE4E4',
                'main-300': '#CED9D9',
                'main-400': '#C0D8D8',
                'main-500': '#0E8080',
                'black-100': '#32323D',
                'text-hover': '#0f7070',
                'text-secondary': '#696969',
                'song-item-action': '#32323D80',
                'border-primary': 'rgba(0,0,0,0.1)'
            },
            keyframes: {
                'slide-right': {
                    '0%': {
                        '-webkit-transform': 'translateX(-500px);',
                        transform: 'translateX(-500px);',
                    },
                    '100%': {
                        '-webkit-transform': 'translateX(0);',
                        transform: 'translateX(0);',
                    },
                },
                'slide-left': {
                  '0%': {
                      '-webkit-transform': 'translateX(500px);',
                      transform: 'translateX(500px);',
                  },
                  '100%': {
                      '-webkit-transform': 'translateX(0);',
                      transform: 'translateX(0);',
                  },
                },
                'slide-left2': {
                  '0%': {
                      '-webkit-transform': 'translateX(500px);',
                      transform: 'translateX(500px);',
                  },
                  '100%': {
                      '-webkit-transform': 'translateX(0);',
                      transform: 'translateX(0);',
                  },
                },
                'scale-up-center': {
                    '0%': {
                        '-webkit-transform': 'scale(0);',
                        transform: 'scale(0);',
                    },
                    '100%': {
                        '-webkit-transform': 'scale(1);',
                        transform: 'scale(1);',
                    },
                },
                'scale-up-section': {
                '0%': {
                    '-webkit-transform': 'scale(1);',
                    transform: 'scale(1);',
                },
                '100%': {
                    '-webkit-transform': 'scale(1.1);',
                    transform: 'scale(1.1);',
                },
                },
            },
            animation: {
                'slide-right': 'slide-right 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'slide-left': 'slide-left 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'slide-left2': 'slide-left2 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'scale-up-center': 'scale-up-center 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'scale-up-section': 'scale-up-section 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
            },
            flex: {
                '4': '4 4 0%',
                '6': '6 6 0%',
                '3': '3 3 0%',
                '7': '7 7 0%',
            },
            boxShadow: {
                'thumbnail': '0 5px 8px 0 rgba(0, 0, 0, .2)',
            }
        },
        screens: {
            '1400': '1400px',
            '1200': '1200px',
            'laptop': '1224px',
        }
    },
    plugins: [],
};
