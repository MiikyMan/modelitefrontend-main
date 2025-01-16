export const customizeRequiredMark = (label: React.ReactNode, { required }: { required: boolean }) => (
  <>
    {label}
    {required && (
      <span className='mx-1 text-xs' style={{ color: 'red' }}>
        *
      </span>
    )}
  </>
);
