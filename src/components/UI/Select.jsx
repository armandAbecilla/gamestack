export default function Select({ id, options, defaultPlaceholder, ...props }) {
  return (
    <select
      className='focus:outline-darkgreen w-full bg-white p-1 text-xl'
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
