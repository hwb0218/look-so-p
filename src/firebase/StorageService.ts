import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from './config';

class StorageService {
  async uploadFile(file: File, path: string = '') {
    const storageRef = ref(storage, `${path}/${file.name}`);

    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }
}

export const storageService = new StorageService();
