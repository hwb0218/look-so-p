import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from './config';

class StorageService {
  async uploadFiles(fileOrFiles: File | File[], path: string = '') {
    const files = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];

    const downloadUrls = await Promise.all(
      files.map(async (file) => {
        const storageRef = ref(storage, `${path}/${file.name}`);

        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
      }),
    );

    return downloadUrls;
  }
}

export const storageService = new StorageService();
