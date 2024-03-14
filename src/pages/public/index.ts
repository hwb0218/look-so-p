import HomePage from './home';

const LoginPage = () => import('./login');
const SignUpPage = () => import('./sign-up');
const GoodsDetailPage = () => import('./goods-detail');
const GoodsByCategory = () => import('./goods-by-category');
const GoodsSearchPage = () => import('./goods-search');

export { HomePage, GoodsDetailPage, LoginPage, SignUpPage, GoodsSearchPage, GoodsByCategory };
