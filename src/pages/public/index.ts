import { lazy } from 'react';

import HomePage from './home';
import GoodsDetailPage from './goods-detail';

const LoginPage = lazy(() => import('./login'));
const SignUpPage = lazy(() => import('./sign-up'));
const GoodsByCategory = lazy(() => import('./goods-by-category'));
const GoodsSearchPage = lazy(() => import('./goods-search'));

export { HomePage, GoodsDetailPage, LoginPage, SignUpPage, GoodsSearchPage, GoodsByCategory };
