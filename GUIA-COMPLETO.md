# 🎸 INTERBAIRROS - Guia Completo de Instalação

**Tudo que você precisa para colocar o site no ar em uma hospedagem própria.**

---

## 📚 Documentação Disponível

| Arquivo | Descrição |
|---------|-----------|
| **README.md** | Visão geral do projeto |
| **INSTALACAO.md** | Guia detalhado de instalação e deploy |
| **DEPLOY-RAPIDO.md** | Deploy em 5 minutos no Vercel |
| **SUPABASE-SETUP.md** | Configurar banco de dados PostgreSQL |
| **package-scripts.md** | Scripts automatizados de deploy |

---

## 🚀 Início Rápido (5 Minutos)

### Para quem tem pressa:

```bash
# 1. Instalar dependências
npm install

# 2. Fazer build
npm run build

# 3. Deploy no Vercel (mais fácil)
npm install -g vercel
vercel
```

**Pronto! Seu site está no ar! 🎉**

Leia **DEPLOY-RAPIDO.md** para mais detalhes.

---

## 📖 Guia Passo a Passo Detalhado

### 1️⃣ Preparação (Local)

```bash
# Instalar Node.js (se não tiver)
# Baixe em: https://nodejs.org/

# Verificar instalação
node --version  # Deve ser 18+
npm --version
```

### 2️⃣ Configurar Projeto

```bash
# Baixar/clonar o projeto
cd interbairros-site

# Instalar dependências
npm install

# Testar localmente
npm run dev
# Acesse: http://localhost:5173
```

### 3️⃣ Build para Produção

```bash
# Gerar arquivos otimizados
npm run build

# Pasta 'dist/' será criada com os arquivos prontos
```

### 4️⃣ Deploy (Escolha uma opção)

#### Opção A: Vercel (RECOMENDADO - Gratuito) ⭐

```bash
# Instalar CLI
npm install -g vercel

# Deploy
vercel

# Ou arraste a pasta 'dist/' em vercel.com
```

**Vantagens:**
- ✅ Gratuito
- ✅ HTTPS automático
- ✅ Deploy em 1 minuto
- ✅ Domínio grátis (.vercel.app)

---

#### Opção B: Netlify (Gratuito)

```bash
# Instalar CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

**Ou:**
1. Vá em https://netlify.com
2. Arraste a pasta `dist/`
3. Pronto!

---

#### Opção C: Hospedagem Compartilhada (cPanel/Hostinger)

1. **Fazer build:**
   ```bash
   npm run build
   ```

2. **Enviar arquivos via FTP:**
   - Conecte-se ao servidor via FileZilla/WinSCP
   - Envie **TODOS** os arquivos de `dist/` para `public_html/`

3. **Configurar .htaccess:**
   - O arquivo `.htaccess` já está em `/public/.htaccess`
   - Certifique-se de enviá-lo junto

4. **Acessar:**
   - http://seudominio.com

---

#### Opção D: GitHub Pages

1. **Configurar base no vite.config.ts:**
   ```typescript
   export default defineConfig({
     base: '/nome-do-repositorio/',
     // ... resto da config
   });
   ```

2. **Deploy:**
   ```bash
   npm run build
   npm install -g gh-pages
   npx gh-pages -d dist
   ```

---

## 🎯 Configurações Importantes

### Senha do Admin

**Localização:** `/src/app/pages/admin-panel.tsx` - linha 35

```typescript
// ALTERE ANTES DE COLOCAR NO AR!
if (password === 'admin123') {  // ← Mude isso!
  setIsAuthenticated(true);
}
```

**Recomendado:**
```typescript
if (password === 'MinhaS3nh@Segur@!') {
  setIsAuthenticated(true);
}
```

Depois refaça o build:
```bash
npm run build
```

---

### Cores e Estilo

**Arquivo:** `/src/styles/theme.css`

```css
:root {
  /* Cores principais - CUSTOMIZE AQUI */
  --color-primary: #ef4444;      /* Vermelho */
  --color-background: #000000;   /* Preto */
  --color-text: #ffffff;         /* Branco */
}
```

---

### Nome da Banda

**Arquivo:** `/src/app/pages/home.tsx` - linha 32-34

```tsx
<h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight">
  INTER<span className="text-red-500">BAIRROS</span>
</h1>
```

---

## 🎵 Adicionar Músicas

### Opção 1: Upload em Cloud (Recomendado)

**Cloudinary (Gratuito):**
1. Crie conta em https://cloudinary.com
2. Faça upload dos MP3
3. Copie a URL pública
4. Cole no painel admin em `/admin`

**Supabase Storage:**
- Veja guia completo em **SUPABASE-SETUP.md**

### Opção 2: Servidor Próprio

1. Crie pasta `public/music/` no projeto
2. Adicione arquivos MP3
3. URL será: `https://seusite.com/music/musica.mp3`

---

## 🖼️ Adicionar Imagens

### Para Galeria

**Opções de hospedagem:**
- Unsplash (https://unsplash.com)
- Imgur (https://imgur.com)
- Cloudinary
- Seu próprio servidor

**Como adicionar:**
1. Acesse `seusite.com/admin`
2. Vá na aba **Galeria**
3. Cole a URL da imagem
4. Adicione descrição
5. Clique em **Adicionar Imagem**

---

## 🗄️ Banco de Dados (Opcional)

### Modo Atual: localStorage
- ✅ Funciona sem configuração
- ✅ Dados salvos no navegador
- ⚠️ Dados podem ser perdidos ao limpar cache

### Migrar para Supabase (PostgreSQL)

**Por que fazer?**
- ✅ Dados na nuvem (não perde)
- ✅ Sincronização entre dispositivos
- ✅ Backup automático
- ✅ Gratuito até 500MB

**Como configurar:**
Leia o guia completo em **SUPABASE-SETUP.md**

---

## 📊 Estrutura de Arquivos

```
interbairros-site/
│
├── 📄 README.md                    # Visão geral
├── 📄 INSTALACAO.md                # Guia detalhado
├── 📄 DEPLOY-RAPIDO.md             # Deploy rápido
├── 📄 SUPABASE-SETUP.md            # Banco de dados
├── 📄 GUIA-COMPLETO.md             # Este arquivo
├── 📄 package-scripts.md           # Scripts úteis
│
├── 📁 src/                         # Código fonte
│   ├── app/
│   │   ├── components/             # Componentes React
│   │   │   ├── audio-player.tsx    # Player de música
│   │   │   └── gallery.tsx         # Galeria de fotos
│   │   ├── context/                # Estado global
│   │   │   ├── music-context.tsx   # Gerencia músicas
│   │   │   └── site-context.tsx    # Gerencia site
│   │   ├── pages/                  # Páginas
│   │   │   ├── home.tsx            # Página inicial
│   │   │   └── admin-panel.tsx     # Painel admin
│   │   ├── App.tsx                 # App principal
│   │   └── routes.ts               # Rotas
│   └── styles/                     # Estilos CSS
│       ├── theme.css               # ← CUSTOMIZE CORES AQUI
│       └── fonts.css
│
├── 📁 public/                      # Arquivos estáticos
│   └── .htaccess                   # Config Apache
│
├── 📁 dist/                        # Build (gerado)
│   └── (arquivos prontos para upload)
│
├── 📄 package.json                 # Dependências
├── 📄 vite.config.ts               # Config Vite
├── 📄 netlify.toml                 # Config Netlify
├── 📄 vercel.json                  # Config Vercel
└── 📄 .gitignore                   # Git ignore
```

---

## ✅ Checklist de Deploy

### Antes de Colocar no Ar

- [ ] Node.js instalado (v18+)
- [ ] Dependências instaladas (`npm install`)
- [ ] Senha do admin alterada
- [ ] Cores personalizadas (opcional)
- [ ] Build testado localmente (`npm run build`)
- [ ] Arquivos MP3 hospedados
- [ ] URLs de imagens prontas

### Durante o Deploy

- [ ] Build gerado (`npm run build`)
- [ ] Pasta `dist/` criada
- [ ] Arquivos enviados para servidor
- [ ] `.htaccess` configurado (se aplicável)
- [ ] Variáveis de ambiente configuradas (se usar Supabase)

### Após o Deploy

- [ ] Site acessível na URL
- [ ] Página inicial carrega corretamente
- [ ] Imagens aparecem
- [ ] Player de música funciona
- [ ] Painel admin acessível (`/admin`)
- [ ] Links de redes sociais funcionam
- [ ] Shows aparecem corretamente
- [ ] Galeria funciona
- [ ] Responsivo em mobile

---

## 🆘 Problemas Comuns

### 🔴 Site em branco após deploy

**Solução:**
1. Limpe cache do navegador (Ctrl+Shift+R)
2. Verifique se `.htaccess` foi enviado
3. Veja console do navegador (F12) para erros
4. Certifique-se que TODOS os arquivos de `dist/` foram enviados

---

### 🔴 Rota /admin não funciona (erro 404)

**Solução:**
- **Vercel/Netlify**: Já está configurado
- **Apache**: Certifique-se que `.htaccess` está na raiz
- **Nginx**: Configure redirects manualmente
- **Temporário**: Acesse `seusite.com/#/admin`

---

### 🔴 Músicas não tocam

**Soluções:**
1. Verifique se a URL do MP3 é válida
2. URL deve ser HTTPS (não HTTP)
3. Teste o link direto no navegador
4. Verifique CORS no servidor de áudio
5. Use console do navegador (F12) para ver erro

---

### 🔴 Imagens não carregam

**Soluções:**
1. Use URLs completas (https://...)
2. Teste o link direto no navegador
3. Verifique se a imagem existe
4. Use HTTPS (não HTTP)

---

### 🔴 Erro ao instalar dependências

```bash
# Limpar cache e tentar novamente
npm cache clean --force
rm -rf node_modules
npm install
```

---

### 🔴 Build falha

```bash
# Verificar versão do Node
node --version  # Deve ser 18+

# Atualizar Node se necessário
# Baixe em: https://nodejs.org/

# Limpar e rebuildar
rm -rf node_modules dist
npm install
npm run build
```

---

## 🎯 Fluxo de Trabalho Recomendado

### Desenvolvimento Local
```bash
npm run dev
# Edite arquivos
# Veja mudanças em tempo real
```

### Testar Build
```bash
npm run build
npm run preview
# Acesse: http://localhost:4173
```

### Deploy
```bash
# Opção 1: Vercel
vercel --prod

# Opção 2: Netlify
netlify deploy --prod --dir=dist

# Opção 3: FTP
# Upload manual da pasta dist/
```

### Atualizar Site
1. Edite arquivos
2. `npm run build`
3. Deploy novamente

---

## 💡 Dicas Profissionais

### 1. Use Git para Controle de Versão

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/seu-usuario/interbairros.git
git push -u origin main
```

### 2. Configure Deploy Automático

**GitHub + Vercel:**
- Conecte repositório no Vercel
- Cada `git push` atualiza o site automaticamente

**GitHub + Netlify:**
- Mesmo processo

### 3. Monitore Performance

- Google Analytics
- Google Search Console
- Lighthouse (no Chrome DevTools)

### 4. Backup Regular

```bash
# Use o script de backup
chmod +x backup.sh
./backup.sh
```

### 5. SEO Básico

Edite `/index.html`:
```html
<title>INTERBAIRROS - Rock que eletrifica a alma</title>
<meta name="description" content="Site oficial da banda INTERBAIRROS">
<meta name="keywords" content="rock, banda, música, shows">
```

---

## 🚀 Próximos Passos

### Essencial
1. ✅ Fazer deploy
2. ✅ Alterar senha do admin
3. ✅ Adicionar conteúdo real (shows, músicas, fotos)
4. ✅ Configurar redes sociais

### Recomendado
- [ ] Domínio próprio (registro.br, Hostinger)
- [ ] Migrar para Supabase (banco de dados)
- [ ] Google Analytics
- [ ] Backup automático

### Avançado
- [ ] Upload direto de MP3
- [ ] Newsletter
- [ ] Sistema de comentários
- [ ] Blog da banda
- [ ] Loja de merchandising

---

## 📞 Recursos Úteis

### Hospedagem Gratuita
- **Vercel**: https://vercel.com
- **Netlify**: https://netlify.com
- **GitHub Pages**: https://pages.github.com

### Banco de Dados
- **Supabase**: https://supabase.com (PostgreSQL)
- **Firebase**: https://firebase.google.com

### Storage (MP3/Imagens)
- **Cloudinary**: https://cloudinary.com (Grátis 25GB)
- **Supabase Storage**: Incluído no Supabase
- **Imgur**: https://imgur.com (Imagens)

### Domínio
- **Registro.br**: https://registro.br (Brasil)
- **Hostinger**: https://hostinger.com.br
- **GoDaddy**: https://godaddy.com

### Ferramentas
- **Node.js**: https://nodejs.org
- **VS Code**: https://code.visualstudio.com
- **FileZilla**: https://filezilla-project.org (FTP)
- **Git**: https://git-scm.com

### Documentação Técnica
- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Supabase Docs**: https://supabase.com/docs

---

## 📊 Comparação de Hospedagens

| Característica | Vercel | Netlify | GitHub Pages | Hospedagem Compartilhada |
|----------------|--------|---------|--------------|--------------------------|
| **Preço** | Grátis | Grátis | Grátis | R$ 5-20/mês |
| **HTTPS** | ✅ Auto | ✅ Auto | ✅ Auto | Depende |
| **Domínio Grátis** | ✅ Sim | ✅ Sim | ✅ Sim | ❌ Não |
| **Deploy** | 1 min | 1 min | 5 min | 15 min |
| **CI/CD** | ✅ Sim | ✅ Sim | ✅ Sim | ❌ Manual |
| **Dificuldade** | ⭐ Fácil | ⭐ Fácil | ⭐⭐ Médio | ⭐⭐⭐ Difícil |
| **Suporte** | Docs | Docs | Docs | Ticket |
| **Recomendado para** | Iniciantes | Iniciantes | Devs | Profissionais |

---

## 🎸 Conclusão

Você tem **TUDO** que precisa para colocar o site no ar!

### Caminho mais rápido:
1. `npm install`
2. `npm run build`
3. `vercel`
4. ✅ **Pronto!**

### Leia conforme precisar:
- **Iniciante?** → DEPLOY-RAPIDO.md
- **Quer detalhes?** → INSTALACAO.md
- **Banco de dados?** → SUPABASE-SETUP.md
- **Scripts úteis?** → package-scripts.md

---

**🎸 Rock que eletrifica a alma! 🎸**

**Boa sorte com o site da INTERBAIRROS! 🚀**
