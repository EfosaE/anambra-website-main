type SpinnerProps = {
  size?: number | string;       // e.g. 24, '2rem', '32px'
  color?: string;               // e.g. '#da9617', 'blue', 'currentColor'
  position?: 'center' | 'top';  // Spinner alignment in parent
};

export default function Spinner({
  size = 32,
  color = '#da9617',
  position,
}: SpinnerProps) {
  const dimension = typeof size === 'number' ? `${size}px` : size;

  const positionClasses =
    position === 'center'
      ? 'flex justify-center items-center'
      : position === 'top'
      ? 'flex items-start justify-center'
      : '';

  return (
    <div className={positionClasses}>
      <div
        className="animate-spin rounded-full border-4 border-gray-200 border-t-transparent mt-2"
        style={{
          width: dimension,
          height: dimension,
          borderTopColor: color,
        }}
      />
    </div>
  );
}
