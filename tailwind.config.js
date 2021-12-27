const plugin = require('tailwindcss/plugin');

module.exports = {
    theme: {
        extends: {
            colors: {
            }
        }
    },
    plugin: [
        require('@tailwindcss/forms')
    ]
}