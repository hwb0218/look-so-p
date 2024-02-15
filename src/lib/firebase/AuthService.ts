import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, getDocs, collection, orderBy, query } from 'firebase/firestore';
import { auth, db } from './config';

import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@src/utils/local-storage';

import type { CreateUserValues, Product, User } from './types';

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
      localStorage.clear();
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

  async getUser(email: string = '', password: string = '') {
    let uid = '';

    if (!('auth' in localStorage)) {
      uid = await this.login(email, password);
    } else {
      const auth = getLocalStorage({ key: 'auth' });
      uid = auth.uid;
    }

    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data() as User;

      const q = query(collection(userRef, 'cart'), orderBy('updatedAt', 'desc'));
      const cartSnap = await getDocs(q);
      const cartItems = cartSnap.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as Product;
      }) as Product[];

      const user = {
        email: data.email,
        isSeller: data.isSeller,
        nickname: data.nickname,
        profile: data.profile,
        uid: data.uid,
      };

      setLocalStorage({ key: 'auth', value: user });
      setLocalStorage({ key: 'cart', value: cartItems });

      return user;
    }
    return null;
  }
}

export const authService = new AuthService();
