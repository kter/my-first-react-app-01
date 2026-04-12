import { ErrorBoundary } from 'react-error-boundary';
import ErrorEvent from './ErrorEvent';

export default function ErrorEventRoot() {
  const handleFallback = ({ error, resetErrorBoundary }) => {
    return (
      <div>
        <h4>Following Error Occred</h4>
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
      <h3>Basis of Error Boudnary</h3>
      <ErrorBoundary onReset={handleReset} fallbackRender={handleFallback}>
        <ErrorEvent />
      </ErrorBoundary>
    </>
  );
}

