import { MessageCircle } from 'lucide-react';
import { useSite } from '../context/site-context';

export function WhatsAppButton() {
  const { siteSettings } = useSite();

  const handleClick = () => {
    // Remove caracteres não numéricos do número
    const cleanNumber = siteSettings.whatsappNumber.replace(/\D/g, '');
    
    // Abre o WhatsApp em nova janela
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=Olá! Vim pelo site da banda INTERBAIRROS!`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Não mostrar o botão se não houver número configurado
  if (!siteSettings.whatsappNumber || siteSettings.whatsappNumber === '+5511999999999') {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 group"
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Fale conosco no WhatsApp
        <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-gray-900"></div>
      </div>

      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
    </button>
  );
}
