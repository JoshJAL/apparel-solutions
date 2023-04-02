interface Props {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;

  additionalClasses?: string;
}
export default function RichTextButton({ onClick, disabled, children, additionalClasses }: Props) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={`font-semibold bg-backgroundLightButtons px-2 py-1 hover:bg-backgroundLightButtonsHover dark:bg-teal-600 dark:hover:bg-teal-700 ${
        additionalClasses ? additionalClasses : ''
      }`}
    >
      {children}
    </button>
  );
}
