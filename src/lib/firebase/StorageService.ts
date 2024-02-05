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

  // TODO: 프로필 작업
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

  async deleteFiles(fileURL: string) {
    const storageRef = ref(storage, fileURL);

    await deleteObject(storageRef);
  }
}

export const storageService = new StorageService();
