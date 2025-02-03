import type { Attachment } from 'ai';

import { LoaderIcon } from './icons';

// A simple inline PDF Icon component
const PdfIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8 text-red-600"
  >
    <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12C24 5.373 18.627 0 12 0zM10 17v-6h4v6h-4z" />
  </svg>
);

export const PreviewAttachment = ({
  attachment,
  isUploading = false,
  onCancel,
}: {
  attachment: Attachment;
  isUploading?: boolean;
  onCancel?: () => void;
}) => {
  const { name, url, contentType } = attachment;

  return (
    <div className="flex flex-col gap-2">
      <div className="w-20 h-16 aspect-video bg-muted rounded-md relative flex flex-col items-center justify-center cursor-pointer group">
        {/* Cancel Button in the center */}
        {onCancel && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
            <button
              onClick={onCancel}
              className="p-1 bg-gray-100 rounded-full shadow-sm text-gray-700 hover:bg-gray-200 transition-colors duration-150"
              aria-label="Cancel upload"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M6.225 4.811a.75.75 0 011.06 0L12 9.525l4.715-4.714a.75.75 0 111.06 1.06L13.525 10.585l4.714 4.715a.75.75 0 11-1.06 1.06L12 11.645l-4.715 4.714a.75.75 0 11-1.06-1.06l4.714-4.715-4.714-4.715a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
        {contentType ? (
          contentType.startsWith('image') ? (
            // NOTE: it is recommended to use next/image for images
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={url}
              src={url}
              alt={name ?? 'An image attachment'}
              className="rounded-md w-full h-full object-cover z-0 pointer-events-none"
            />
          ) : contentType.startsWith('application/pdf') ? (
            // Use embed for realtime PDF preview
            <embed
              src={url}
              type="application/pdf"
              className="rounded-md w-full h-full z-0 pointer-events-none"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full z-0 pointer-events-none">
              <span className="text-xs">File</span>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center w-full h-full z-0 pointer-events-none">
            <span className="text-xs">No preview</span>
          </div>
        )}

        {isUploading && (
          <div className="animate-spin absolute text-zinc-500">
            <LoaderIcon />
          </div>
        )}
      </div>
      <div className="text-xs text-zinc-500 max-w-16 truncate">{name}</div>
    </div>
  );
};
