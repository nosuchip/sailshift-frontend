import { Middleware } from '@nuxt/types';

const authenticated: Middleware = ({ store, redirect }) => {
  console.log('>> Middleware authenticated triggered', store.state.user);
  if (!store.state.user.user || !store.state.user.token) {
    return redirect('/login');
  }
};

export default authenticated;
