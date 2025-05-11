export default function SearchInput({
  label,
  id,
  className,
  onClear,
  ...props
}) {
  return (
    <div className='relative'>
      <input
        className={`w-full bg-white px-2 py-1 focus:outline-0 xl:text-xl ${className}`}
        id={id}
        name={id}
        {...props}
      />
      <button
        className='text-darkgreen absolute top-[1px] right-2.5 flex h-8 w-8 cursor-pointer items-center justify-center bg-transparent text-xl font-bold hover:bg-transparent focus:outline-none'
        aria-label='Close'
        onClick={onClear}
      >
        ×
      </button>
    </div>
  );
}
