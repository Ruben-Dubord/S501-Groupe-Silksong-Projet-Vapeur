import FavoritesView from '@/views/FavoritesView';
import DBProvider from './database';

export default function Index() {
  return (
    <DBProvider>
      <FavoritesView />
    </DBProvider>
  );
}