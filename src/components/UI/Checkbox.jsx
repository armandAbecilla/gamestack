export default function Checkbox({ label, id, ...props }) {
  return (
    <div className='relative pl-7'>
      <label htmlFor={id} className='cursor-pointer'>
        <input id={id} type='checkbox' className='peer hidden' {...props} />

        <span className="peer-checked:border-darkgreen before:bg-darkgreen absolute top-1/2 left-0 h-[18px] w-[18px] -translate-y-1/2 transform border border-gray-400 before:absolute before:top-1/2 before:right-[2px] before:h-[12px] before:w-[12px] before:-translate-y-1/2 before:transform before:opacity-0 before:transition-all before:duration-300 before:content-[''] peer-checked:before:opacity-100" />
        {label}
      </label>
    </div>
  );
}
