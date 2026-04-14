import './stories/button.css'

export default function MyButton ({
  primary = false,
  backgroundColor = null,
  size = 'medium',
  label = 'Button',
  ...props
}) {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';

  return (
    <button
    type="button"
    className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
    style={backgroundColor && { backgroundColor }}
    {...props}
    >
    {label}
    </button>
  );
}
