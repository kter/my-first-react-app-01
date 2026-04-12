import { ErrorBoundary } from 'react-error-boundary';
import ErrorThrow from './ErrorThrow';

export default function ErrorRoot() {
  return (
    <>
      <h3>Basis of Error Boundary</h3>
      <ErrorBoundary fallback={<div>Error occured</div>}>
        <ErrorThrow />
      </ErrorBoundary>
    </>
  );
}

