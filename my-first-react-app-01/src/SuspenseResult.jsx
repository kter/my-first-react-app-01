import { Suspense, Component } from 'react';
import ThrowResult from './ThrowResult';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return <p>Error: {this.state.error}</p>;
    }
    return this.props.children;
  }
}

export default function SuspenseResult() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<p>Now Loading...</p>}>
        <ThrowResult />
      </Suspense>
    </ErrorBoundary>
  );
}
