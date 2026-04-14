/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        ghostwhite: { name: 'Ghostwhite', value: '#f8f8ff' },
        aquamarine: { name: 'Aquamarine', value: '#7fffd4' },
        coral: { name: 'Coral', value: '#ff7f50' },
      }
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  },
};

export default preview;
