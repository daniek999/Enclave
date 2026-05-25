export function Loading({ message }: { message?: string }) {
  return (
    <div className="h-100 d-flex flex-column justify-content-center align-items-center gap-2">
      <div className="spinner-border fg-neutral"></div>
      <p className="mb-0 fw-bold">- {message} -</p>
    </div>
  );
}
