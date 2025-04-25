export default function Input({
  label,
  id,
  className,
  textarea = false,
  ...props
}) {
  if (textarea) {
    return (
      <textarea
        className={`w-full bg-white px-2 py-1 text-xl text-stone-800 focus:outline-0 ${className}`}
        name={id}
        id={id}
        {...props}
      ></textarea>
    );
  }

  return (
    <input
      className={`w-full bg-white px-2 py-1 text-xl text-stone-800 focus:outline-0 ${className}`}
      id={id}
      name={id}
      {...props}
    />
  );
}
