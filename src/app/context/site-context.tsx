import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Show {
  id: string;
  date: string;
  city: string;
  venue: string;
  time: string;
  ticketLink?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

interface SocialLinks {
  instagram: string;
  youtube: string;
  facebook: string;
}

interface BandInfo {
  bio1: string;
  bio2: string;
  imageUrl: string;
}

interface SiteSettings {
  whatsappNumber: string;
  bannerUrl: string;
}

interface SiteContextType {
  shows: Show[];
  images: GalleryImage[];
  socialLinks: SocialLinks;
  bandInfo: BandInfo;
  siteSettings: SiteSettings;
  addShow: (show: Omit<Show, 'id'>) => void;
  deleteShow: (id: string) => void;
  addImage: (image: Omit<GalleryImage, 'id'>) => void;
  deleteImage: (id: string) => void;
  updateSocialLinks: (links: SocialLinks) => void;
  updateBandInfo: (info: BandInfo) => void;
  updateSiteSettings: (settings: SiteSettings) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const defaultShows: Show[] = [
  { id: '1', date: '15 MAR', city: 'São Paulo', venue: 'Espaço das Américas', time: '21:00', ticketLink: 'https://exemplo.com/ingressos' },
  { id: '2', date: '22 MAR', city: 'Rio de Janeiro', venue: 'Circo Voador', time: '20:30', ticketLink: 'https://exemplo.com/ingressos' },
  { id: '3', date: '05 ABR', city: 'Belo Horizonte', venue: 'Music Hall', time: '21:00', ticketLink: 'https://exemplo.com/ingressos' },
  { id: '4', date: '12 ABR', city: 'Curitiba', venue: 'Live Curitiba', time: '20:00', ticketLink: 'https://exemplo.com/ingressos' },
];

const defaultImages: GalleryImage[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1762917903361-99e0164dbcc5?w=1080', alt: 'Guitarrista em performance' },
  { id: '2', url: 'https://images.unsplash.com/photo-1647168285321-7509a33bf1d7?w=1080', alt: 'Baterista no palco' },
  { id: '3', url: 'https://images.unsplash.com/photo-1666143208844-ac2f983b171a?w=1080', alt: 'Vocalista ao microfone' },
  { id: '4', url: 'https://images.unsplash.com/photo-1735511751649-c1743f3d3df5?w=1080', alt: 'Baixista em show' },
  { id: '5', url: 'https://images.unsplash.com/photo-1611810293387-c8afe03cd7dd?w=1080', alt: 'Público no festival' },
  { id: '6', url: 'https://images.unsplash.com/photo-1651912170375-5d25d534b4c3?w=1080', alt: 'Guitarra e amplificador' },
  { id: '7', url: 'https://images.unsplash.com/photo-1534050055340-71c7fa612a99?w=1080', alt: 'Palco iluminado' },
  { id: '8', url: 'https://images.unsplash.com/photo-1684679106461-dae134df8da6?w=1080', alt: 'Banda no palco' },
];

const defaultSocialLinks: SocialLinks = {
  instagram: 'https://instagram.com/interbairros',
  youtube: 'https://youtube.com/@interbairros',
  facebook: 'https://facebook.com/interbairros',
};

const defaultBandInfo: BandInfo = {
  bio1: 'Desde 2018, o Interbairros tem levado o verdadeiro rock para palcos de todo o país. Com uma mistura explosiva de rock clássico e energia moderna, a banda conquistou milhares de fãs com suas performances eletrizantes.',
  bio2: 'Formada por músicos experientes e apaixonados, cada show é uma experiência única que faz o público vibrar do primeiro ao último acorde.',
  imageUrl: 'https://images.unsplash.com/photo-1762917903361-99e0164dbcc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5kJTIwbXVzaWNpYW4lMjBndWl0YXIlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzI4Mjk3NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
};

const defaultSiteSettings: SiteSettings = {
  whatsappNumber: '+5511999999999',
  bannerUrl: 'https://images.unsplash.com/photo-1534050055340-71c7fa612a99?w=1080',
};

export function SiteProvider({ children }: { children: ReactNode }) {
  const [shows, setShows] = useState<Show[]>(() => {
    const saved = localStorage.getItem('interbairros_shows');
    return saved ? JSON.parse(saved) : defaultShows;
  });

  const [images, setImages] = useState<GalleryImage[]>(() => {
    const saved = localStorage.getItem('interbairros_images');
    return saved ? JSON.parse(saved) : defaultImages;
  });

  const [socialLinks, setSocialLinks] = useState<SocialLinks>(() => {
    const saved = localStorage.getItem('interbairros_social');
    return saved ? JSON.parse(saved) : defaultSocialLinks;
  });

  const [bandInfo, setBandInfo] = useState<BandInfo>(() => {
    const saved = localStorage.getItem('interbairros_band');
    return saved ? JSON.parse(saved) : defaultBandInfo;
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('interbairros_settings');
    return saved ? JSON.parse(saved) : defaultSiteSettings;
  });

  useEffect(() => {
    localStorage.setItem('interbairros_shows', JSON.stringify(shows));
  }, [shows]);

  useEffect(() => {
    localStorage.setItem('interbairros_images', JSON.stringify(images));
  }, [images]);

  useEffect(() => {
    localStorage.setItem('interbairros_social', JSON.stringify(socialLinks));
  }, [socialLinks]);

  useEffect(() => {
    localStorage.setItem('interbairros_band', JSON.stringify(bandInfo));
  }, [bandInfo]);

  useEffect(() => {
    localStorage.setItem('interbairros_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  const addShow = (show: Omit<Show, 'id'>) => {
    const newShow: Show = {
      id: Date.now().toString(),
      ...show,
    };
    setShows([...shows, newShow]);
  };

  const deleteShow = (id: string) => {
    setShows(shows.filter(show => show.id !== id));
  };

  const addImage = (image: Omit<GalleryImage, 'id'>) => {
    const newImage: GalleryImage = {
      id: Date.now().toString(),
      ...image,
    };
    setImages([...images, newImage]);
  };

  const deleteImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  const updateSocialLinks = (links: SocialLinks) => {
    setSocialLinks(links);
  };

  const updateBandInfo = (info: BandInfo) => {
    setBandInfo(info);
  };

  const updateSiteSettings = (settings: SiteSettings) => {
    setSiteSettings(settings);
  };

  return (
    <SiteContext.Provider value={{
      shows,
      images,
      socialLinks,
      bandInfo,
      siteSettings,
      addShow,
      deleteShow,
      addImage,
      deleteImage,
      updateSocialLinks,
      updateBandInfo,
      updateSiteSettings,
    }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within SiteProvider');
  }
  return context;
}