import xboxLogo from '../../assets/icon-xbox-100.png';
import psLogo from '../../assets/icon-playstation-100.png';
import pcLogo from '../../assets/icon-pc-100.png';
import nswLogo from '../../assets/icon-nintendo-switch-100.png';

export default function PlatformIcon({ platform = 'pc', classNames }) {
  //absolute top-2 right-2
  let logoImg = null;
  let baseClassNames = 'aspect-square h-14 opacity-80';

  switch (platform) {
    case 'pc':
      logoImg = pcLogo;
      break;
    case 'xbox':
      logoImg = xboxLogo;
      break;
    case 'playstation':
      logoImg = psLogo;
      break;
    case 'nintendo switch':
      logoImg = nswLogo;
      break;
    default:
      logoImg = pcLogo;
      break;
  }

  if (classNames !== '') {
    baseClassNames += ' ' + classNames;
  }
  return <img className={baseClassNames} src={logoImg} alt='' />;
}
