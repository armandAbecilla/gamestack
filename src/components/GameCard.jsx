import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { Link } from 'react-router-dom';

export default function GameCard({ id, image, name }) {
  const cld = new Cloudinary({ cloud: { cloudName: 'dbetq8dac' } });
  const img = cld
    .image(image)
    .setDeliveryType('fetch')
    .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality('auto')
    .resize(
      fill()
        .width(640)
        .aspectRatio('16:9') // 👈 Force 16:9 ratio
        .gravity(autoGravity()), // optional: center/focus crop
    );

  return (
    <Link
      to={`/games/${id}`}
      className='group bg-black-100 border-black-50 shadow-black-50 relative cursor-pointer overflow-hidden rounded-lg border shadow transition-all duration-300 ease-in-out hover:opacity-70'
    >
      <AdvancedImage
        cldImg={img}
        className='transition-all duration-300 ease-in-out group-hover:scale-110'
      />
      <div className='absolute bottom-0 w-full bg-[rgba(15,15,17,0.8)] px-2 py-2'>
        <h3 className='truncate text-center text-sm'>{name}</h3>
      </div>
    </Link>
  );
}
