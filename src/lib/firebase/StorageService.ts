import { ref, getDownloadURL, uploadBytes, deleteObject, getStorage, updateMetadata, listAll } from 'firebase/storage';
import { storage } from './config';

import { v4 as uuidv4 } from 'uuid';

class StorageService {
  async uploadFileAndGetURL(file: File, path: string = '') {
    const name = uuidv4();

    const storageRef = ref(storage, `${path}/${name}`);

    await uploadBytes(storageRef, file, { cacheControl: 'public, max-age=86400' });

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }

  async uploadThumbnail(thumbnail: FileList, path: string = '') {
    if (!thumbnail?.length) {
      return undefined;
    }

    const thumbnailFile = Array.from(thumbnail)[0];
    const thumbnailDownloadURL = await this.uploadFileAndGetURL(thumbnailFile, path);

    return thumbnailDownloadURL;
  }

  async uploadFiles(images: FileList, path: string = '') {
    if (!images?.length) {
      return undefined;
    }

    const imageFiles = Array.from(images);

    const uploadPromises = imageFiles.map((file) => this.uploadFileAndGetURL(file, path));
    const downloadUrls = await Promise.all(uploadPromises);

    return downloadUrls;
  }

  async deleteFiles(fileURLs: string[]) {
    if (!Array.isArray(fileURLs) || !fileURLs) {
      return console.error('String type 배열이 아닙니다.');
    }

    const deletePromises = fileURLs.map((url) => {
      const storageRef = ref(storage, url);
      return deleteObject(storageRef);
    });

    await Promise.all(deletePromises);
  }

  async updateMetadatas(path: string = '') {
    const storage = getStorage();
    const folderRef = ref(storage, path);

    const res = await listAll(folderRef);

    const newMetadata = { cacheControl: 'public, max-age=86400' };

    for (let i = 0; i < res.prefixes.length; i++) {
      const subfolderRef = res.prefixes[i];
      await this.updateMetadatas(subfolderRef.fullPath);
    }

    for (let i = 0; i < res.items.length; i++) {
      const fileRef = res.items[i];
      await updateMetadata(fileRef, newMetadata);
    }
  }
}

export const storageService = new StorageService();
