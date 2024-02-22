import { lazy } from 'react';

const HomePage = lazy(() => import('./home'));
const LoginPage = lazy(() => import('./login'));
const SignUpPage = lazy(() => import('./sign-up'));
const ProductAllPage = lazy(() => import('./product-all'));
const GoodsByCategory = lazy(() => import('./goods-by-category'));
const GoodsDetailPage = lazy(() => import('./goods-detail'));

export { HomePage, LoginPage, SignUpPage, ProductAllPage, GoodsByCategory, GoodsDetailPage };
