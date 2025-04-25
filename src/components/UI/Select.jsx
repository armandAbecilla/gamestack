export default function Select({ id, options, defaultPlaceholder, ...props }) {
  return (
    <select
      className='w-full bg-white p-1 text-xl text-stone-800 focus:outline-none'
      id={id}
      name={id}
      {...props}
    >
      <option value='' disabled>
        {defaultPlaceholder}
      </option>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
