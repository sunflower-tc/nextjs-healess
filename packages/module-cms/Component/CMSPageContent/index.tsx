const CMSPageContent = ({ content }: { content: string }) => {
  return (
    <div
      className="text-hoverEffect"
      dangerouslySetInnerHTML={{
        __html: content || '-',
      }}
    />
  );
};

export default CMSPageContent;
