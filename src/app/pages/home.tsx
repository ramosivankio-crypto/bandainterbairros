import { AudioPlayer } from "../components/audio-player";
import { Gallery } from "../components/gallery";
import {
  Music2,
  Calendar,
  MapPin,
  Instagram,
  Youtube,
  Facebook,
  Settings,
} from "lucide-react";
import { Link } from "react-router";
import { useSite } from "../context/site-context";

export function Home() {
  const { shows, socialLinks, bandInfo } = useSite();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1684679106461-dae134df8da6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrJTIwYmFuZCUyMGNvbmNlcnQlMjBzdGFnZXxlbnwxfHx8fDE3NzI3NTkwODF8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Banda ao vivo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>

        <div className="relative z-10 text-center px-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Music2 className="w-12 h-12" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight">
            INTER<span className="text-red-500">BAIRROS</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8">
            Rock que eletrifica a alma
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="#musica"
              className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-full font-semibold transition-colors"
            >
              Ouça Agora.
            </a>
            <a
              href="#shows"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full font-semibold backdrop-blur-sm transition-colors"
            >
              Próximos Shows
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Sobre a Banda
            </h2>
            <p className="text-lg text-white/80 mb-4">
              {bandInfo.bio1}
            </p>
            <p className="text-lg text-white/80 mb-6">
              {bandInfo.bio2}
            </p>
            <div className="flex gap-4">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-red-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-red-500 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-red-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden">
            <img
              src={bandInfo.imageUrl}
              alt="Banda ensaiando"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Music Player Section */}
      <section
        id="musica"
        className="py-20 px-4 bg-gradient-to-b from-black to-zinc-900"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Nossa Música
          </h2>
          <AudioPlayer />
        </div>
      </section>

      {/* Shows Section */}
      <section
        id="shows"
        className="py-20 px-4 max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-12 text-center">
          Próximos Shows
        </h2>
        <div className="space-y-4">
          {shows.map((show, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white/5 hover:bg-white/10 rounded-xl backdrop-blur-sm transition-colors group"
            >
              <div className="flex items-center gap-6 mb-4 md:mb-0">
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {show.date.split(" ")[0]}
                  </div>
                  <div className="text-sm text-white/60">
                    {show.date.split(" ")[1]}
                  </div>
                </div>
                <div className="h-16 w-px bg-white/20" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span className="font-semibold text-lg">
                      {show.city}
                    </span>
                  </div>
                  <div className="text-white/60">
                    {show.venue}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/60 mt-1">
                    <Calendar className="w-3 h-3" />
                    {show.time}
                  </div>
                </div>
              </div>
              <a
                href={show.ticketLink || '#'}
                target={show.ticketLink ? "_blank" : undefined}
                rel={show.ticketLink ? "noopener noreferrer" : undefined}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full font-semibold transition-colors group-hover:scale-105"
              >
                Comprar Ingresso
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-zinc-900 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Galeria
          </h2>
          <Gallery />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music2 className="w-8 h-8" />
            <span className="text-2xl font-bold">
              INTER<span className="text-red-500">BAIRROS</span>
            </span>
          </div>
          <p className="text-white/60 mb-6">
            Contato: contato@bandainterbairros.com.br
          </p>
          <div className="flex gap-4 justify-center mb-6">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-red-500 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-red-500 transition-colors"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-red-500 transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
          <p className="text-sm text-white/40">
            © 2026 Banda Interbairros. Todos os direitos
            reservados.
          </p>
          <Link
            to="/admin"
            className="mt-4 inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Painel Admin
          </Link>
        </div>
      </footer>
    </div>
  );
}