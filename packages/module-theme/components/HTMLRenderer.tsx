export const HTMLRenderer = ({
  htmlText,
  className = '',
  onClick,
}: {
  htmlText: string;
  className?: string;
  onClick?: any;
}) => {
  return (
    <span
      onClick={onClick}
      className={className}
      dangerouslySetInnerHTML={{ __html: htmlText }}
    ></span>
  );
};
