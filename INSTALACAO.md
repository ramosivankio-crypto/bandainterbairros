# 🎸 INTERBAIRROS - Guia de Instalação

Este guia contém todas as instruções para instalar o site da banda INTERBAIRROS em sua própria hospedagem.

---

## 📋 Índice

1. [Requisitos](#requisitos)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Instalação Local](#instalação-local)
4. [Build para Produção](#build-para-produção)
5. [Deploy em Hospedagens](#deploy-em-hospedagens)
6. [Configuração do Backend (Opcional)](#configuração-do-backend-opcional)
7. [Manutenção e Atualizações](#manutenção-e-atualizações)
8. [Solução de Problemas](#solução-de-problemas)

---

## 🔧 Requisitos

### Software Necessário

- **Node.js** versão 18 ou superior ([Download](https://nodejs.org/))
- **npm** ou **pnpm** (vem com Node.js)
- Editor de código (recomendado: VS Code)

### Para Verificar se está instalado:

```bash
node --version   # Deve mostrar v18.x.x ou superior
npm --version    # Deve mostrar versão do npm
```

---

## 📁 Estrutura do Projeto

```
interbairros-site/
├── src/
│   ├── app/
│   │   ├── components/       # Componentes React
│   │   │   ├── audio-player.tsx
│   │   │   └── gallery.tsx
│   │   ├── context/          # Gerenciamento de estado
│   │   │   ├── music-context.tsx
│   │   │   └── site-context.tsx
│   │   ├── pages/            # Páginas
│   │   │   ├── home.tsx
│   │   │   └── admin-panel.tsx
│   │   ├── App.tsx           # Componente principal
│   │   └── routes.ts         # Configuração de rotas
│   ├── styles/               # Estilos CSS
│   │   ├── theme.css
│   │   └── fonts.css
│   └── main.tsx              # Ponto de entrada
├── public/                   # Arquivos estáticos
├── package.json              # Dependências do projeto
├── vite.config.ts            # Configuração do Vite
└── tsconfig.json             # Configuração TypeScript
```

---

## 💻 Instalação Local

### Passo 1: Download do Projeto

Baixe todos os arquivos do projeto e extraia em uma pasta (ex: `interbairros-site`)

### Passo 2: Instalar Dependências

Abra o terminal na pasta do projeto e execute:

```bash
# Usando npm
npm install

# OU usando pnpm (mais rápido)
npm install -g pnpm
pnpm install
```

### Passo 3: Rodar em Modo Desenvolvimento

```bash
# Usando npm
npm run dev

# OU usando pnpm
pnpm dev
```

O site estará disponível em: **http://localhost:5173**

- **Site Principal**: http://localhost:5173/
- **Painel Admin**: http://localhost:5173/admin (senha: `admin123`)

---

## 🏗️ Build para Produção

### Gerar arquivos otimizados para hospedagem:

```bash
# Usando npm
npm run build

# OU usando pnpm
pnpm build
```

Isso criará uma pasta **`dist/`** com todos os arquivos otimizados prontos para deploy.

**Conteúdo da pasta `dist/`:**
- `index.html` - Página principal
- `assets/` - JavaScript, CSS e imagens otimizadas

---

## 🌐 Deploy em Hospedagens

### Opção 1: Vercel (Recomendado - Gratuito) ⭐

**Mais fácil e rápido:**

1. Crie uma conta em [vercel.com](https://vercel.com)
2. Instale o Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Na pasta do projeto, execute:
   ```bash
   vercel
   ```
4. Siga as instruções na tela
5. Pronto! Seu site estará online em segundos

**Vantagens:**
- ✅ HTTPS automático
- ✅ Deploy em segundos
- ✅ Domínio gratuito (.vercel.app)
- ✅ Atualizações fáceis

---

### Opção 2: Netlify (Gratuito)

1. Crie conta em [netlify.com](https://netlify.com)
2. Arraste a pasta **`dist/`** para o Netlify
3. Ou use o Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

**Configuração importante:**
- Adicione arquivo `netlify.toml` na raiz:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Opção 3: Hospedagem Compartilhada (cPanel/Hostinger/etc)

**Requisitos:**
- Servidor com suporte a arquivos estáticos
- Acesso FTP ou File Manager

**Passos:**

1. Faça o build:
   ```bash
   npm run build
   ```

2. Envie **TODOS** os arquivos da pasta `dist/` para o servidor via FTP:
   - Use FileZilla, WinSCP ou File Manager do cPanel
   - Envie para a pasta `public_html/` ou `www/`

3. Configure o `.htaccess` (crie na raiz se não existir):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Compressão GZIP
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

---

### Opção 4: GitHub Pages (Gratuito)

1. Crie um repositório no GitHub
2. Adicione arquivo `vite.config.ts` com:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/nome-do-repositorio/', // Substitua pelo nome do seu repo
});
```

3. Faça o build e deploy:
   ```bash
   npm run build
   npx gh-pages -d dist
   ```

---

## 🔒 Configuração do Backend (Opcional)

Atualmente o site usa **localStorage** (dados salvos no navegador). Para dados na nuvem:

### Opção A: Supabase (Recomendado)

1. Crie conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Crie as tabelas no SQL Editor:

```sql
-- Tabela de Shows
CREATE TABLE shows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date TEXT NOT NULL,
  city TEXT NOT NULL,
  venue TEXT NOT NULL,
  time TEXT NOT NULL,
  ticket_link TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Galeria
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  alt TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Músicas
CREATE TABLE music_tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  duration TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Configurações
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Inserir configurações padrão
INSERT INTO site_settings (key, value) VALUES
('social_links', '{"instagram": "https://instagram.com/interbairros", "youtube": "https://youtube.com/@interbairros", "facebook": "https://facebook.com/interbairros"}'),
('band_info', '{"bio1": "Desde 2025...", "bio2": "Formada jovens músicos...", "imageUrl": "https://images.unsplash.com/..."}');

-- Habilitar acesso público (Row Level Security)
ALTER TABLE shows ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE music_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON shows FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON music_tracks FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON site_settings FOR SELECT USING (true);

-- Para permitir edição (apenas admin - configurar depois)
CREATE POLICY "Enable insert for authenticated users only" ON shows FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON shows FOR DELETE USING (auth.role() = 'authenticated');
```

4. Pegue as credenciais em **Settings > API**
5. Crie arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua-url-aqui
VITE_SUPABASE_ANON_KEY=sua-chave-aqui
```

6. Instale o cliente Supabase:
   ```bash
   npm install @supabase/supabase-js
   ```

---

## 🎵 Adicionando Músicas (Arquivos MP3)

### Opção 1: Hospedar em Cloud Storage

**Supabase Storage (Recomendado):**

1. No Supabase, vá em **Storage**
2. Crie um bucket chamado `music`
3. Faça upload dos MP3
4. Pegue a URL pública
5. Use essa URL no painel admin

**Alternativas:**
- Cloudinary (grátis até 25GB)
- AWS S3
- Google Cloud Storage
- Dropbox (link direto)

### Opção 2: Servidor Próprio

1. Crie pasta `public/music/` no projeto
2. Adicione os arquivos MP3
3. Use URLs como: `https://seusite.com/music/musica.mp3`

---

## 🎨 Personalização

### Mudar Cores

Edite `/src/styles/theme.css`:

```css
:root {
  --color-primary: #ef4444; /* Vermelho principal */
  --color-background: #000000; /* Fundo */
}
```

### Mudar Logo/Nome

Edite `/src/app/pages/home.tsx` - linha 32-34

### Senha do Admin

Edite `/src/app/pages/admin-panel.tsx` - linha 35:
```typescript
if (password === 'SUA_SENHA_AQUI') {
```

---

## 🔄 Manutenção e Atualizações

### Atualizar Conteúdo

Use o painel administrativo em: `seusite.com/admin`

### Fazer Backup

**LocalStorage (atual):**
- Dados ficam no navegador
- Exporte pelo console: `localStorage.getItem('interbairros_shows')`

**Supabase:**
- Backup automático incluído
- Exporte dados no Dashboard

### Atualizar o Site

1. Edite os arquivos
2. Rode `npm run build`
3. Envie novos arquivos da pasta `dist/` para hospedagem

---

## ⚠️ Solução de Problemas

### Site em branco após deploy

**Solução:**
- Verifique se o arquivo `.htaccess` está configurado
- Verifique se todos os arquivos da pasta `dist/` foram enviados
- Veja console do navegador (F12) para erros

### Rota /admin não funciona

**Solução:**
- Configure redirects no servidor (veja seção de cada hospedagem)
- Acesse diretamente: `seusite.com/#/admin`

### Músicas não tocam

**Solução:**
- Verifique se as URLs dos MP3 são válidas
- URLs devem ser HTTPS
- Teste o link direto no navegador
- Habilite CORS no servidor de áudio

### Imagens não carregam

**Solução:**
- Use URLs completas (https://)
- Verifique se são imagens válidas
- Teste o link direto no navegador

---

## 📞 Suporte

### Logs de Erro

Abra o console do navegador (F12) e veja a aba "Console"

### Verificar Build

```bash
npm run build -- --debug
```

---

## 📝 Checklist de Deploy

- [ ] Node.js instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] Build funcionando (`npm run build`)
- [ ] Pasta `dist/` gerada
- [ ] Arquivos enviados para hospedagem
- [ ] `.htaccess` configurado (se aplicável)
- [ ] Site acessível na URL
- [ ] Página inicial carrega
- [ ] Painel admin acessível (`/admin`)
- [ ] Player de música funciona
- [ ] Galeria funciona
- [ ] Links de redes sociais funcionam

---

## 🎯 Próximos Passos Recomendados

1. **Domínio Próprio**
   - Registre um domínio (ex: interbairros.com.br)
   - Configure DNS apontando para sua hospedagem

2. **SSL/HTTPS**
   - Vercel/Netlify: Automático
   - Hospedagem compartilhada: Let's Encrypt gratuito

3. **Analytics**
   - Google Analytics
   - Plausible (privacidade)

4. **SEO**
   - Adicione meta tags no `index.html`
   - Sitemap.xml
   - robots.txt

5. **Performance**
   - Otimizar imagens (WebP)
   - Lazy loading
   - CDN (Cloudflare)

---

## 📊 Recursos Consumidos

### Armazenamento
- Site básico: ~5-10 MB
- Com músicas MP3: +5-10 MB por música
- Com imagens: +1-3 MB por imagem HD

### Banda Necessária
- Site estático: Muito baixa
- Streaming de música: ~1-2 MB por música por usuário

---

**✅ Pronto! Seu site da banda INTERBAIRROS está configurado e rodando!**

Para dúvidas específicas, consulte a documentação oficial:
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Vercel](https://vercel.com/docs)
- [Netlify](https://docs.netlify.com/)
- [Supabase](https://supabase.com/docs)
