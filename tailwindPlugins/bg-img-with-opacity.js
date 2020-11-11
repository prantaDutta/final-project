const plugin = require("tailwindcss/plugin");

module.exports = plugin.withOptions(() => {
  return function ({ addUtilities }) {
    addUtilities({
      ".bg-img-with-opacity": {
        background: `linear-gradient(
          rgba(43, 108, 176, 0.9),
          rgba(43, 108, 176, 0.9)
        ),
        url(../public/images/background-1.jpg)`,
      },
    });
  };
});
