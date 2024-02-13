import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';

import type { CreateUserValues, User } from './types';

class AuthService {
  async signUp(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    return userCredential.user.uid;
  }

  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    return userCredential.user.uid;
  }

  async logout() {
    if (auth.currentUser) {
      await signOut(auth);
    }
  }

  async createUser(values: CreateUserValues) {
    const { email, password } = values;
    const uid = await this.signUp(email, password);

    const documentRef = doc(db, 'users', uid);
    const userRef = await setDoc(documentRef, {
      ...values,
      uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return userRef;
  }

  async getUser(email: string, password: string) {
    const uid = await this.login(email, password);

    const userRef = doc(db, 'users', uid);
    const userSanp = await getDoc(userRef);

    if (userSanp.exists()) {
      const data = userSanp.data() as User;

      const user = {
        email: data.email,
        isSeller: data.isSeller,
        nickname: data.nickname,
        profile: data.profile,
        uid: data.uid,
      };

      return user;
    }
    return null;
  }
  //TODO: 유저 정보 수정
  async editUser() {}
}

export const authService = new AuthService();
