import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import HtmlToNextComponents from '@voguish/module-theme/components/htmlBlocks/HtmlBlocksGenerator';

export default function HtmlBlock({
  category,
}: {
  category: { content?: { html?: string | undefined } };
}) {
  return (
    <ErrorBoundary>
      <div className="category_block">
        <HtmlToNextComponents htmlString={category?.content?.html || ''} />
      </div>
    </ErrorBoundary>
  );
}
