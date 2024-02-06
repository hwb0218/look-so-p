import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { storage } from './config';

import { v4 as uuidv4 } from 'uuid';

class StorageService {
  async uploadFileAndGetURL(file: File, path: string = '') {
    const name = uuidv4();

    const storageRef = ref(storage, `${path}/${name}`);
    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }

  async uploadThumbnail(thumbnail: FileList, path: string = '') {
    if (!thumbnail) {
      return undefined;
    }

    const thumbnailFile = Array.from(thumbnail)[0];
    const thumbnailDownloadURL = await this.uploadFileAndGetURL(thumbnailFile, path);

    return thumbnailDownloadURL;
  }

  async uploadFiles(images: FileList, path: string = '') {
    if (!images) {
      return undefined;
    }

    const imageFiles = Array.from(images);

    const uploadPromises = imageFiles.map((file) => this.uploadFileAndGetURL(file, path));
    const downloadUrls = await Promise.all(uploadPromises);

    return downloadUrls;
  }

  async deleteFiles(fileURLs: string[]) {
    if (!Array.isArray(fileURLs)) {
      return console.log('String type 배열이 아닙니다.');
    }

    const deletePromises = fileURLs.map((url) => {
      const storageRef = ref(storage, url);
      return deleteObject(storageRef);
    });

    await Promise.all(deletePromises);
  }
}

export const storageService = new StorageService();
