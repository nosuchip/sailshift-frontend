import { Middleware } from '@nuxt/types';

const adminRequired: Middleware = ({ store, redirect }) => {
  const user = store.state.user.user;
  console.log('>> Middleware admin required triggered', store.state.user);
  if (!user || !user.role || user.role.toLowerCase() !== 'admin') {
    return redirect('/login');
  }
};

export default adminRequired;
