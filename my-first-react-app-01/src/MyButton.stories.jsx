import MyButton from './MyButton'

export default {
  title: 'MyApp/MyButton',
  component: MyButton,
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
