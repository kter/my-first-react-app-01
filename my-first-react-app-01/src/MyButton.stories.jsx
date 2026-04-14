import MyButton from './MyButton'

export default {
  title: 'MyApp/MyButton',
  component: MyButton,
  argTypes: {
    primary: {
      type: 'boolean',
      description: 'Primary color',
    },
    backgroundcolor: {
      type: 'string',
      description: 'background color'
    },
    size: {
      type: 'enum',
      options: ['small', 'medium', 'large'],
      description: 'button size'
    },
    label: {
      type: 'string',
      description: 'button of caption'
    },
    onClick: {
      type: 'function',
      description: 'click handler'
    },
  },
};

// export const Index = {
//   render: () => <MyButton primary size="medium" label="Button" onClick={() => console.log('Hello, Storybook')} />
// };

export const Index = {
  args: {
    primary: true,
    size: 'medium',
    label: 'Button',
    onClick: () => console.log('Hello, Storybook')
  }
};

// export const White = {
//   render: () => <MyButton size="small" label="Button" backgroundColor="#fff" />
// };
export const White = {
  args: {
    size: 'small',
    label: 'Button',
    backgroundColor: '#fff'
  }
};

export const Yellow = {
  args: {
    ...White.args,
    backgroundColor: 'lightyellow'
  }
};
