import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { storage } from './config';

import genUID from '@src/utils/gen-UID';

class StorageService {
  async uploadFiles(fileList: FileList, path: string = '') {
    const files = Array.from(fileList);

    const iterPromise = files.map(async (file) => {
      const name = genUID();

      const storageRef = ref(storage, `${path}/${name}`);
      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    });

    const downloadUrls = await Promise.all(iterPromise);
    return downloadUrls;
  }

  async deleteFiles(fileURL: string) {
    const storageRef = ref(storage, fileURL);

    await deleteObject(storageRef);
  }
}

export const storageService = new StorageService();
