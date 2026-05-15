interface Props {
  message: string;
}

export function Empty({ message }: Props) {
  return (
    <div className="py-5 text-center text-secondary">
      <p className="mb-0">{message}</p>
    </div>
  );
}
