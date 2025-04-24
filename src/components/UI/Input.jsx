export default function Input({ label, id, textarea = false, ...props }) {
  if (textarea) {
    return (
      <textarea
        className='focus:outline-darkgreen w-full bg-white px-2 py-1 text-xl'
        name={id}
        id={id}
        {...props}
      ></textarea>
    );
  }

  return (
    <input
      className='focus:outline-darkgreen w-full bg-white px-2 py-1 text-xl'
      id={id}
      name={id}
      {...props}
    />
  );
}
