import { lazy } from 'react';

import HomePage from './home';
import GoodsDetailPage from './goods-detail';

const LoginPage = lazy(() => import('./login'));
const SignUpPage = lazy(() => import('./sign-up'));
const ProductAllPage = lazy(() => import('./product-all'));
const GoodsByCategory = lazy(() => import('./goods-by-category'));

export { HomePage, GoodsDetailPage, LoginPage, SignUpPage, ProductAllPage, GoodsByCategory };
