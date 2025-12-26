import { UploadFileResponseType } from '@packages/module-catalog/Components/Product/Detail/SimpleProductOption';
import { useToken } from '@packages/module-customer/hooks/useToken';
import { handleRequestProgress } from '@utils/Fetcher';
import { useState } from 'react';
import { useToast } from '../../toast/hooks';

export const useFileUpload = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const token = useToken();
  const { showToast } = useToast();

  const uploadFile = (
    inputFile: File,
    afterUpload: (result: UploadFileResponseType[]) => void,
    endpoint?: string,
    path?: string
  ) => {
    setLoading(true);
    setProgress(0);
    const formData = new FormData();
    formData.append('file', inputFile);
    path && formData.append('path', path);
    handleRequestProgress({
      endpoint: endpoint ?? 'customer/file-upload',
      body: formData,
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      isFormData: true,
      onProgress: (percent) => {
        setProgress(percent);
      },
    })
      .then((res) => {
        let parsedRes = res;
        try {
          parsedRes = typeof res === 'string' ? JSON.parse(res) : res;
        } catch (e) {
          console.error('Failed to parse response:', res);
        }

        // const result = parsedRes?.[0] || null;
        // showToast({
        //   message: result?.message || 'Uploaded successfully',
        //   type: 'success',
        // });
        afterUpload(parsedRes);
      })
      .catch((err) => {
        showToast({ message: err.message || 'Upload failed', type: 'error' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { uploadFile, loading, progress };
};
