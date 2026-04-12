import { ErrorBoundary } from 'react-error-boundary';
import ErrorRetryThrow from './ErrorRetryThrow';

export default function ErrorRetryRoot() {
  const handleFallback = ({ error, resetErrorBoundary }) => {
    return (
      <div>
        <h4>Following Error has occured...</h4>
        <p>{error.message}</p>
        <button type="button" onClick={resetErrorBoundary}>
          Retry
        </button>
      </div>
    );
  };

  const handleReset = () => console.log('Retry!');

  return (
    <>
      <h3>Basis of Error Boundary</h3>
      <ErrorBoundary onReset={handleReset} fallbackRender={handleFallback}>
        <ErrorRetryThrow />
      </ErrorBoundary>
    </>
  );
}

