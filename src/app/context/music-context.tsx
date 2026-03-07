import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Track {
  id: string;
  title: string;
  duration: string;
  url: string;
}

interface MusicContextType {
  tracks: Track[];
  addTrack: (track: Omit<Track, 'id'>) => void;
  deleteTrack: (id: string) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

const defaultTracks: Track[] = [
  { id: '1', title: 'Electric Dreams', duration: '3:45', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: '2', title: 'Midnight Thunder', duration: '4:12', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: '3', title: 'Neon Lights', duration: '3:28', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: '4', title: 'Rock Revolution', duration: '4:05', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
];

export function MusicProvider({ children }: { children: ReactNode }) {
  const [tracks, setTracks] = useState<Track[]>(() => {
    const saved = localStorage.getItem('interbairros_tracks');
    return saved ? JSON.parse(saved) : defaultTracks;
  });

  useEffect(() => {
    localStorage.setItem('interbairros_tracks', JSON.stringify(tracks));
  }, [tracks]);

  const addTrack = (track: Omit<Track, 'id'>) => {
    const newTrack: Track = {
      id: Date.now().toString(),
      ...track,
    };
    setTracks([...tracks, newTrack]);
  };

  const deleteTrack = (id: string) => {
    setTracks(tracks.filter(track => track.id !== id));
  };

  return (
    <MusicContext.Provider value={{ tracks, addTrack, deleteTrack }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within MusicProvider');
  }
  return context;
}
