import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, Trash2, Calendar, Image as ImageIcon, Save, Music, Share2, Info, Settings2 } from 'lucide-react';
import { useMusic } from '../context/music-context';
import { useSite, type Show, type GalleryImage } from '../context/site-context';

export function AdminPanel() {
  const navigate = useNavigate();
  const { tracks, addTrack, deleteTrack } = useMusic();
  const { shows, images, socialLinks, bandInfo, siteSettings, addShow, deleteShow, addImage, deleteImage, updateSocialLinks, updateBandInfo, updateSiteSettings } = useSite();
  const [activeTab, setActiveTab] = useState<'shows' | 'gallery' | 'music' | 'social' | 'band' | 'settings'>('shows');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // Form states
  const [showForm, setShowForm] = useState({ date: '', city: '', venue: '', time: '', ticketLink: '' });
  const [imageForm, setImageForm] = useState({ url: '', alt: '' });
  const [musicForm, setMusicForm] = useState({ title: '', duration: '', url: '' });
  const [socialForm, setSocialForm] = useState(socialLinks);
  const [bandForm, setBandForm] = useState(bandInfo);
  const [settingsForm, setSettingsForm] = useState(siteSettings);

  // Update forms when context changes
  useEffect(() => {
    setSocialForm(socialLinks);
  }, [socialLinks]);

  useEffect(() => {
    setBandForm(bandInfo);
  }, [bandInfo]);

  useEffect(() => {
    setSettingsForm(siteSettings);
  }, [siteSettings]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'felipe2015') {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta!');
    }
  };

  const handleAddShow = (e: React.FormEvent) => {
    e.preventDefault();
    addShow(showForm);
    setShowForm({ date: '', city: '', venue: '', time: '', ticketLink: '' });
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    addImage(imageForm);
    setImageForm({ url: '', alt: '' });
  };

  const handleAddMusic = (e: React.FormEvent) => {
    e.preventDefault();
    addTrack(musicForm);
    setMusicForm({ title: '', duration: '', url: '' });
  };

  const handleUpdateSocial = (e: React.FormEvent) => {
    e.preventDefault();
    updateSocialLinks(socialForm);
    alert('Links atualizados com sucesso!');
  };

  const handleUpdateBand = (e: React.FormEvent) => {
    e.preventDefault();
    updateBandInfo(bandForm);
    alert('Informações atualizadas com sucesso!');
  };

  const handleUpdateSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(settingsForm);
    alert('Configurações atualizadas com sucesso!');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
          <h1 className="text-3xl font-bold mb-6 text-center">Painel Admin</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500"
                placeholder="Digite a senha"
              />
            </div>
            <button type="submit" className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors">
              Entrar
            </button>
          </form>
          <p className="mt-4 text-sm text-white/60 text-center">Senha alterada pelo administrador</p>
          <button onClick={() => navigate('/')} className="mt-4 w-full px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
            Sair
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10 overflow-x-auto">
          {[
            { id: 'shows', icon: Calendar, label: 'Shows' },
            { id: 'gallery', icon: ImageIcon, label: 'Galeria' },
            { id: 'music', icon: Music, label: 'Músicas' },
            { id: 'social', icon: Share2, label: 'Redes Sociais' },
            { id: 'band', icon: Info, label: 'Sobre a Banda' },
            { id: 'settings', icon: Settings2, label: 'Configurações' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.id ? 'border-red-500 text-white' : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Shows Tab */}
        {activeTab === 'shows' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 h-fit">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Adicionar Show
              </h2>
              <form onSubmit={handleAddShow} className="space-y-4">
                <input type="text" value={showForm.date} onChange={(e) => setShowForm({ ...showForm, date: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500" placeholder="Data (ex: 15 MAR)" required />
                <input type="text" value={showForm.city} onChange={(e) => setShowForm({ ...showForm, city: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500" placeholder="Cidade" required />
                <input type="text" value={showForm.venue} onChange={(e) => setShowForm({ ...showForm, venue: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500" placeholder="Local" required />
                <input type="text" value={showForm.time} onChange={(e) => setShowForm({ ...showForm, time: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500" placeholder="Horário (ex: 21:00)" required />
                <input type="url" value={showForm.ticketLink} onChange={(e) => setShowForm({ ...showForm, ticketLink: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500" placeholder="Link para Ingressos (opcional)" />
                <button type="submit" className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" />
                  Adicionar Show
                </button>
              </form>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold mb-4">Shows Cadastrados ({shows.length})</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {shows.map((show) => (
                  <div key={show.id} className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                    <div>
                      <div className="font-semibold">{show.city} - {show.venue}</div>
                      <div className="text-sm text-white/60">{show.date} às {show.time}</div>
                      {show.ticketLink && <div className="text-xs text-blue-400 truncate">{show.ticketLink}</div>}
                    </div>
                    <button onClick={() => deleteShow(show.id)} className="p-2 hover:bg-red-600/20 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 h-fit">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Adicionar Imagem
              </h2>
              <form onSubmit={handleAddImage} className="space-y-4">
                <input type="url" value={imageForm.url} onChange={(e) => setImageForm({ ...imageForm, url: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500" placeholder="URL da Imagem" required />
                <input type="text" value={imageForm.alt} onChange={(e) => setImageForm({ ...imageForm, alt: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500" placeholder="Descrição" required />
                {imageForm.url && <img src={imageForm.url} alt="Preview" className="w-full h-48 object-cover rounded-lg" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Imagem+Inválida'; }} />}
                <button type="submit" className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" />
                  Adicionar Imagem
                </button>
              </form>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold mb-4">Galeria ({images.length})</h2>
              <div className="grid grid-cols-2 gap-3 max-h-[600px] overflow-y-auto">
                {images.map((image) => (
                  <div key={image.id} className="relative group rounded-lg overflow-hidden">
                    <img src={image.url} alt={image.alt} className="w-full h-32 object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-colors flex items-center justify-center">
                      <button onClick={() => deleteImage(image.id)} className="opacity-0 group-hover:opacity-100 p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Music Tab */}
        {activeTab === 'music' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 h-fit">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Adicionar Música
              </h2>
              <form onSubmit={handleAddMusic} className="space-y-4">
                <input type="text" value={musicForm.title} onChange={(e) => setMusicForm({ ...musicForm, title: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500" placeholder="Título da Música" required />
                <input type="text" value={musicForm.duration} onChange={(e) => setMusicForm({ ...musicForm, duration: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500" placeholder="Duração (3:45)" pattern="[0-9]+:[0-5][0-9]" required />
                <input type="url" value={musicForm.url} onChange={(e) => setMusicForm({ ...musicForm, url: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500" placeholder="URL do áudio MP3" required />
                <button type="submit" className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" />
                  Adicionar Música
                </button>
              </form>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold mb-4">Músicas ({tracks.length})</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {tracks.map((track) => (
                  <div key={track.id} className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                    <div>
                      <div className="font-semibold">{track.title}</div>
                      <div className="text-sm text-white/60">{track.duration}</div>
                    </div>
                    <button onClick={() => deleteTrack(track.id)} className="p-2 hover:bg-red-600/20 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Social Links Tab */}
        {activeTab === 'social' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Redes Sociais
              </h2>
              <form onSubmit={handleUpdateSocial} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Instagram</label>
                  <input type="url" value={socialForm.instagram} onChange={(e) => setSocialForm({ ...socialForm, instagram: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500" placeholder="https://instagram.com/..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">YouTube</label>
                  <input type="url" value={socialForm.youtube} onChange={(e) => setSocialForm({ ...socialForm, youtube: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500" placeholder="https://youtube.com/..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Facebook</label>
                  <input type="url" value={socialForm.facebook} onChange={(e) => setSocialForm({ ...socialForm, facebook: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500" placeholder="https://facebook.com/..." />
                </div>
                <button type="submit" className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" />
                  Salvar Links
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Band Info Tab */}
        {activeTab === 'band' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Sobre a Banda
              </h2>
              <form onSubmit={handleUpdateBand} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Biografia - Parágrafo 1</label>
                  <textarea value={bandForm.bio1} onChange={(e) => setBandForm({ ...bandForm, bio1: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 h-24" placeholder="Primeiro parágrafo da biografia..." required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Biografia - Parágrafo 2</label>
                  <textarea value={bandForm.bio2} onChange={(e) => setBandForm({ ...bandForm, bio2: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 h-24" placeholder="Segundo parágrafo da biografia..." required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">URL da Imagem da Banda</label>
                  <input type="url" value={bandForm.imageUrl} onChange={(e) => setBandForm({ ...bandForm, imageUrl: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500" placeholder="https://exemplo.com/banda.jpg" required />
                </div>
                {bandForm.imageUrl && <img src={bandForm.imageUrl} alt="Preview" className="w-full h-64 object-cover rounded-lg" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Imagem+Inválida'; }} />}
                <button type="submit" className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" />
                  Salvar Informações
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Settings2 className="w-5 h-5" />
                Configurações
              </h2>
              <form onSubmit={handleUpdateSettings} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Número do WhatsApp</label>
                  <input 
                    type="text" 
                    value={settingsForm.whatsappNumber} 
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })} 
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500" 
                    placeholder="+5541999999999 (com código do país)" 
                    required 
                  />
                  <p className="text-xs text-white/50 mt-1">Formato: +55 41 99999-9999 (inclua código do país)</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">URL da Imagem do Banner (Hero)</label>
                  <input 
                    type="url" 
                    value={settingsForm.bannerUrl} 
                    onChange={(e) => setSettingsForm({ ...settingsForm, bannerUrl: e.target.value })} 
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500" 
                    placeholder="https://exemplo.com/banner.jpg" 
                    required 
                  />
                  <p className="text-xs text-white/50 mt-1">Imagem de fundo da seção principal (topo do site)</p>
                </div>
                {settingsForm.bannerUrl && (
                  <div>
                    <p className="text-sm text-white/70 mb-2">Preview do Banner:</p>
                    <img 
                      src={settingsForm.bannerUrl} 
                      alt="Preview do Banner" 
                      className="w-full h-64 object-cover rounded-lg" 
                      onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/1200x600?text=Imagem+Inválida'; }} 
                    />
                  </div>
                )}
                <button type="submit" className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" />
                  Salvar Configurações
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}