import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from './config';

class StorageService {
  async uploadFile(file: File) {
    const storageRef = ref(storage, `profile/${file.name}`);

    const snapshot = await uploadBytes(storageRef, file);
    console.log(snapshot);

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }
}

export const storageService = new StorageService();
