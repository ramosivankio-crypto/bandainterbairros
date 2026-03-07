import { AudioPlayer } from './components/audio-player';
import { Gallery } from './components/gallery';
import { Music2, Calendar, MapPin, Instagram, Youtube, Facebook } from 'lucide-react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { MusicProvider } from './context/music-context';
import { SiteProvider } from './context/site-context';

export default function App() {
  return (
    <SiteProvider>
      <MusicProvider>
        <RouterProvider router={router} />
      </MusicProvider>
    </SiteProvider>
  );
}