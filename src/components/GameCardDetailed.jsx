export default function GameCardDetailed() {
  return (
    <div className='bg-black-100 flex overflow-hidden rounded-xl border border-stone-100 shadow'>
      <div>
        <img
          className='w-[240px] object-cover'
          src='https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co95gf.jpg'
          alt=''
        />
      </div>
      <div className='flex w-full flex-col gap-8 px-5 py-5'>
        <div className='flex items-center gap-2'>
          <h3 className='font-heading text-3xl font-bold text-white'>
            Split Fiction
          </h3>
          <span className='bg-darkgreen rounded-full px-4 py-1 text-sm'>
            Playing
          </span>
        </div>
        <p className='text-body'>
          Cyberpunk 2077 is an open-world, action-adventure story set in Night
          City, a megalopolis obsessed with power, glamour and body
          modification. You play as V, a mercenary outlaw going after a
          one-of-a-kind implant that is the key to immortality. You can
          customize your character’s cyberware, skillset and playstyle, and
          explore a vast city where the choices you make shape the story and the
          world around you.
        </p>
        <h3 className='font-heading text-body text-xl font-semibold'>
          Released on: Dec 10, 2020
        </h3>
      </div>
    </div>
  );
}
