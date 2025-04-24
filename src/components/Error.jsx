export default function Error({ title, message }) {
  return (
    <div className='mx-auto my-8 w-[90%] max-w-[25rem] rounded-[6px] bg-[#f9b8b8] p-4 text-[#6d0b0b]'>
      <h2 className='m-0 text-lg font-bold'>{title}</h2>
      <p className='m-0'>{message}</p>
    </div>
  );
}
