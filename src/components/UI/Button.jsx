export default function Button({ children, textOnly, className, ...props }) {
  const buttonClasses =
    'font-inherit bg-darkgreen hover:bg-darkgreen-100 active:bg-darkgreen-100 cursor-pointer rounded-sm px-6 py-2 disabled:cursor-not-allowed';
  const textOnlyClasses =
    'font-inherit text-darkgreen hover:text-darkgreen-100 active:text-darkgreen-100 cursor-pointer border-none bg-transparent disabled:cursor-not-allowed';

  let cssClasses = textOnly ? textOnlyClasses : buttonClasses;
  cssClasses += ' ' + className;
  return (
    <button {...props} className={cssClasses}>
      {children}
    </button>
  );
}
