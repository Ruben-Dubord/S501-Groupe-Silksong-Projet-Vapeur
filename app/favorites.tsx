import FavoritesView from '@/views/FavoritesView';
import DBProvider from "@/app/database";

export default function Favorites() {
  return (
    <DBProvider>
      <FavoritesView />
    </DBProvider>
  );
}
