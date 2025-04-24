export default function Badge({ status = 'playing' }) {
  const baseCssClasses = 'rounded-4xl px-4 py-1 text-sm capitalize';
  let cssClasses = ' ';
  switch (status) {
    case 'playing':
      cssClasses = 'bg-playing text-black';
      break;
    case 'completed':
      cssClasses = 'bg-darkgreen text-white';
      break;
    case 'backlog':
      cssClasses = 'bg-backlog text-white';
      break;
    case 'wishlist':
      cssClasses = 'bg-wishlist text-stone-800';
      break;
    default:
      cssClasses = 'bg-darkgreen text-white';
      break;
  }

  cssClasses += ' ' + baseCssClasses;

  return <span className={cssClasses}>{status}</span>;
}
