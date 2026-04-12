export default function ErrorRetryThrow() {
  if (Math.random() < 0.6) {
    throw new Error('An error occured in MyApp');
  }

  return (
    <p>Successfly executed</p>
  );
}
