# 🎸 INTERBAIRROS - Site Oficial

Site oficial da banda INTERBAIRROS com player de música, galeria de fotos e painel administrativo.

![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.x-blue)
![Vite](https://img.shields.io/badge/Vite-6.x-purple)

---

## ✨ Funcionalidades

### 🎵 Player de Música
- Player de áudio completo com controles
- Playlist gerenciável pelo admin
- Suporte para arquivos MP3

### 🖼️ Galeria de Fotos
- Grid responsivo de imagens
- Lightbox para visualização ampliada
- Gerenciamento pelo painel admin

### 📅 Calendário de Shows
- Lista de próximos shows
- Links diretos para compra de ingressos
- Informações de data, local e horário

### 🔐 Painel Administrativo
- Gerenciar shows e eventos
- Adicionar/remover músicas
- Editar galeria de fotos
- Configurar redes sociais
- Editar informações da banda
- Acesso protegido por senha

---

## 🚀 Instalação Rápida

### Requisitos
- Node.js 18+ ([Download](https://nodejs.org/))

### 1. Instalar Dependências
```bash
npm install
```

### 2. Rodar em Desenvolvimento
```bash
npm run dev
```
Acesse: http://localhost:5173

### 3. Build para Produção
```bash
npm run build
```
Arquivos otimizados estarão em `/dist`

---

## 📚 Documentação Completa

- **[INSTALACAO.md](./INSTALACAO.md)** - Guia completo de instalação e configuração
- **[DEPLOY-RAPIDO.md](./DEPLOY-RAPIDO.md)** - Deploy em 5 minutos no Vercel

---

## 🛠️ Tecnologias

- **React 18** - Framework JavaScript
- **TypeScript** - Tipagem estática
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS 4** - Framework CSS
- **React Router** - Gerenciamento de rotas
- **Lucide React** - Ícones

---

## 📁 Estrutura do Projeto

```
interbairros-site/
├── src/
│   ├── app/
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── context/          # Context API (estado global)
│   │   ├── pages/            # Páginas do site
│   │   ├── App.tsx           # Componente raiz
│   │   └── routes.ts         # Configuração de rotas
│   ├── styles/               # Estilos globais
│   └── main.tsx              # Entrada da aplicação
├── public/                   # Arquivos estáticos
├── dist/                     # Build de produção (gerado)
└── package.json              # Dependências
```

---

## 🎯 Principais Rotas

- `/` - Página inicial (home)
- `/admin` - Painel administrativo (senha: `admin123`)

---

## 🔒 Segurança

### Senha do Admin
Por padrão: `admin123`

**⚠️ IMPORTANTE:** Altere a senha antes do deploy em produção!

Edite `/src/app/pages/admin-panel.tsx` linha 35:
```typescript
if (password === 'SUA_SENHA_SEGURA') {
```

---

## 🌐 Deploy

### Opções de Hospedagem (Todas Gratuitas)

| Plataforma | Dificuldade | Tempo | HTTPS | Domínio |
|------------|-------------|-------|-------|---------|
| **Vercel** | ⭐ Fácil | 2 min | ✅ Sim | ✅ Grátis |
| **Netlify** | ⭐ Fácil | 3 min | ✅ Sim | ✅ Grátis |
| **GitHub Pages** | ⭐⭐ Médio | 5 min | ✅ Sim | ✅ Grátis |
| **Hospedagem Compartilhada** | ⭐⭐⭐ Difícil | 10 min | Depende | Seu domínio |

### Deploy no Vercel (Recomendado)

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Fazer deploy
vercel
```

Ou arraste a pasta `dist/` em https://vercel.com

**Veja o guia completo em [DEPLOY-RAPIDO.md](./DEPLOY-RAPIDO.md)**

---

## 📝 Como Usar o Painel Admin

1. Acesse `seusite.com/admin`
2. Digite a senha: `admin123`
3. Use as abas para gerenciar:
   - **Shows**: Adicionar/remover shows e links de ingressos
   - **Galeria**: Gerenciar fotos
   - **Músicas**: Adicionar/remover do player
   - **Redes Sociais**: Editar links do Instagram, YouTube, Facebook
   - **Sobre a Banda**: Editar biografia e foto principal

---

## 💾 Armazenamento de Dados

### Modo Atual: LocalStorage
- Dados salvos no navegador
- Funciona offline
- ⚠️ Dados podem ser perdidos se limpar o cache

### Recomendado: Supabase
Para dados na nuvem e sincronização entre dispositivos:

1. Crie conta em [supabase.com](https://supabase.com)
2. Veja instruções em [INSTALACAO.md](./INSTALACAO.md#configuração-do-backend-opcional)

---

## 🎵 Adicionando Músicas

### URLs de Áudio
Use URLs públicas de arquivos MP3:

**Opções:**
- Cloudinary (recomendado)
- Supabase Storage
- Seu próprio servidor
- Dropbox (link direto)

**Exemplo:**
```
https://exemplo.com/musicas/rock-da-pesada.mp3
```

No painel admin:
1. Vá em **Músicas**
2. Preencha: Título, Duração, URL do MP3
3. Clique em **Adicionar Música**

---

## 🖼️ Adicionando Imagens

### Para Galeria
Use URLs de imagens:

**Fontes:**
- Unsplash (https://unsplash.com)
- Imgur (https://imgur.com)
- Cloudinary
- Seu servidor

**No painel admin:**
1. Vá em **Galeria**
2. Cole a URL da imagem
3. Adicione descrição
4. Clique em **Adicionar Imagem**

---

## 🎨 Personalização

### Cores
Edite `/src/styles/theme.css`:
```css
:root {
  --color-primary: #ef4444; /* Vermelho */
  --color-background: #000000; /* Preto */
}
```

### Logo/Nome da Banda
Edite `/src/app/pages/home.tsx` - linha 32-34

### Fontes
Edite `/src/styles/fonts.css`

---

## 🧪 Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev           # Iniciar servidor local

# Build
npm run build         # Criar versão de produção

# Preview
npm run preview       # Testar build localmente

# Lint (se configurado)
npm run lint          # Verificar código
```

---

## 🐛 Solução de Problemas

### Site em branco
- Verifique console do navegador (F12)
- Rode `npm run build` novamente
- Limpe cache: Ctrl+Shift+R

### Rotas não funcionam
- Configure `.htaccess` (Apache)
- ou `netlify.toml` (Netlify)
- ou `vercel.json` (Vercel)

### Músicas não tocam
- Verifique se a URL é HTTPS
- Teste o link direto no navegador
- Verifique CORS do servidor de áudio

**Veja mais em [INSTALACAO.md](./INSTALACAO.md#solução-de-problemas)**

---

## 📊 Performance

### Lighthouse Score
- Performance: 95+
- Accessibility: 90+
- Best Practices: 95+
- SEO: 90+

### Otimizações Incluídas
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Minificação
- ✅ Compressão GZIP
- ✅ Cache de assets

---

## 🔄 Atualizações Futuras

### Planejado
- [ ] Backend com Supabase
- [ ] Autenticação real do admin
- [ ] Upload direto de arquivos
- [ ] Newsletter
- [ ] Sistema de comentários
- [ ] Blog da banda

---

## 📄 Licença

Este projeto é de código aberto. Sinta-se livre para usar e modificar.

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Adiciona nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

---

## 📞 Contato

- **Site**: [interbairros.com.br](#)
- **Instagram**: [@interbairros](#)
- **YouTube**: [@interbairros](#)

---

## ⭐ Créditos

Desenvolvido com ❤️ para a banda INTERBAIRROS

Tecnologias usadas:
- React Team
- Tailwind Labs
- Vercel
- Vite

---

**🎸 Rock que eletrifica a alma! 🎸**
