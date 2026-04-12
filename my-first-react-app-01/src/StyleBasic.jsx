import { Suspense } from 'react';

export function StyleX() {
  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boostrap@5.3.0/dist/css/bootstrap.min.css" precedence="low" />
      <div className="alert alert-primary">
        <i className="bi bi-alarm"> </i>
        Hello, StyleX!
      </div>
    </>
  );
}

export function StyleY() {
  return (
    <>
      <link rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" precedence="high" />
      <link rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/flatly/bootstrap.min.css" precedence="low" />
      <div className="alert alert-secondary">
        <i className="bi bi-airplane"> </i>
        Hello, StyleY!
      </div>
    </>
  );
}

export default function StyleBasic() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <StyleX />
      <StyleY />
    </Suspense>
  );
}
