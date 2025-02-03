import { formatDistance } from 'date-fns';
import { BlockCloseButton } from '../../block-close-button';
import { BlockActions } from '../../block-actions';
import type { UIBlock } from '../../block';

interface BlockHeaderProps {
  block: UIBlock;
  isContentDirty: boolean;
  document: { createdAt: string } | null;
  blockActionsProps: {
    currentVersionIndex: number;
    handleVersionChange: (type: 'next' | 'prev' | 'toggle' | 'latest') => void;
    isCurrentVersion: boolean;
    mode: 'edit' | 'diff';
    metadata: any;
    setMetadata: (meta: any) => void;
  };
}

export function BlockHeader({ block, isContentDirty, document, blockActionsProps }: BlockHeaderProps) {
  return (
    <div className="p-2 flex flex-row justify-between items-start">
      <div className="flex flex-row gap-4 items-start">
        <BlockCloseButton />
        <div className="flex flex-col">
          <div className="font-medium">{block.title}</div>
          {isContentDirty ? (
            <div className="text-sm text-muted-foreground">Saving changes...</div>
          ) : document ? (
            <div className="text-sm text-muted-foreground">
              {`Updated ${formatDistance(new Date(document.createdAt), new Date(), { addSuffix: true })}`}
            </div>
          ) : (
            <div className="w-32 h-3 mt-2 bg-muted-foreground/20 rounded-md animate-pulse" />
          )}
        </div>
      </div>
      <BlockActions
        block={block}
        currentVersionIndex={blockActionsProps.currentVersionIndex}
        handleVersionChange={blockActionsProps.handleVersionChange}
        isCurrentVersion={blockActionsProps.isCurrentVersion}
        mode={blockActionsProps.mode}
        metadata={blockActionsProps.metadata}
        setMetadata={blockActionsProps.setMetadata}
      />
    </div>
  );
} 