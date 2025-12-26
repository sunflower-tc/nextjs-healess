import LinearProgress from '@mui/material/LinearProgress';
import { CustomOptions } from '@packages/module-catalog/types';
import UploadFileList from '@packages/module-theme/components/elements/UploadFile';
import { useFileUpload } from '@packages/module-theme/components/ui/hooks/useFileUpload';
import { isValidArray, isValidObject } from '@utils/Helper';
import { useEffect, useState } from 'react';
import { UploadFileResponseType } from './SimpleProductOption';

export default function FileCustomOption({
  item,
  loading,
  customValue,
}: {
  item: CustomOptions;
  loading: boolean;
  customValue: (optionId: number, valueString: string) => void;
}) {
  const [files, setFiles] = useState<UploadFileResponseType[]>([]);
  const { uploadFile, loading: isLoading, progress } = useFileUpload();
  const uploadFiles = (files: File) => {
    uploadFile(files, (res: UploadFileResponseType[]) => {
      [{ file: res?.[0]?.url }];
      const file = {
        url: res?.[0]?.url,
        name: res?.[0]?.name,
        extension: res?.[0]?.type,
        size: res?.[0]?.size,
      };
      if (isValidObject(file)) {
        setFiles([file]);
      }
    });
  };
  useEffect(() => {
    if (isValidArray(files)) {
      customValue(item?.option_id, files?.[0]?.file_url || '');
    }
  }, [files]);
  return (
    <div
      className="relative grid gap-2 py-4 md:max-w-sm"
      key={item?.sort_order}
    >
      {loading ? (
        <div className="w-10 h-1 rounded-md animate-pulse bg-neutral-200" />
      ) : (
        <p className="flex flex-wrap items-end px-1 text-lg font-semibold">
          {item?.title}{' '}
          {item?.required && (
            <span className="px-1 pb-1 text-xs text-gray-400">(Required)</span>
          )}
        </p>
      )}
      {loading ? (
        <div className="w-full rounded-md h-14 animate-pulse bg-neutral-200" />
      ) : (
        <>
          <UploadFileList
            allowedTypes={item?.file_value?.file_extension?.split(',')}
            uploadFiles={uploadFiles}
            loading={isLoading}
            maxHeight={parseInt(item?.file_value?.image_size_x)}
            maxWidth={parseInt(item?.file_value?.image_size_y)}
            progress={progress}
          />
          {isLoading && (
            <LinearProgress
              variant="determinate"
              className="max-w-sm my-2"
              value={progress}
            />
          )}
        </>
      )}
    </div>
  );
}
