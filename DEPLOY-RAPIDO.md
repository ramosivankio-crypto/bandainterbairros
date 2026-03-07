# 🚀 Deploy Rápido - INTERBAIRROS

Guia super simplificado para colocar o site no ar em **5 minutos**.

---

## ⚡ Opção Mais Rápida: Vercel (GRÁTIS)

### 1. Instale o Node.js
Baixe em: https://nodejs.org/ (escolha a versão LTS)

### 2. Prepare o Projeto
Abra o terminal na pasta do projeto:

```bash
npm install
npm run build
```

### 3. Deploy no Vercel

**Opção A - Arrastar e Soltar (Mais Fácil):**
1. Vá em: https://vercel.com
2. Crie uma conta (pode usar GitHub)
3. Arraste a pasta **`dist/`** para o Vercel
4. Pronto! Seu site está no ar! 🎉

**Opção B - Linha de Comando:**
```bash
npm install -g vercel
vercel
```
Siga as instruções e pronto!

---

## 📱 Seu Site Estará em:

- **URL automática**: `https://seu-projeto.vercel.app`
- **Painel Admin**: `https://seu-projeto.vercel.app/admin`
- **Senha padrão**: `admin123`

---

## 🎯 Próximos Passos (Opcional)

### Adicionar Domínio Próprio
1. Compre um domínio (ex: registro.br, Hostinger, GoDaddy)
2. No Vercel, vá em **Settings > Domains**
3. Adicione seu domínio
4. Configure o DNS conforme instruções

### Mudar Senha do Admin
Edite o arquivo `/src/app/pages/admin-panel.tsx` linha 35:
```typescript
if (password === 'NOVA_SENHA_AQUI') {
```

Depois rode novamente:
```bash
npm run build
vercel --prod
```

---

## 📁 Estrutura após Build

```
dist/
├── index.html          # Página principal
├── assets/
│   ├── index-xxxxx.js  # JavaScript otimizado
│   └── index-xxxxx.css # CSS otimizado
└── .htaccess           # Config Apache (se necessário)
```

---

## 🔄 Como Atualizar o Site

1. Faça as alterações nos arquivos
2. Rode: `npm run build`
3. Faça upload novamente no Vercel
   - ou rode: `vercel --prod`

---

## ✅ Checklist

- [ ] Node.js instalado
- [ ] `npm install` executado
- [ ] `npm run build` funcionou
- [ ] Pasta `dist/` foi gerada
- [ ] Deploy feito no Vercel
- [ ] Site acessível na URL
- [ ] Admin funcionando em `/admin`

---

## 🆘 Problemas Comuns

**Erro ao instalar dependências:**
```bash
# Limpe o cache e tente novamente
npm cache clean --force
npm install
```

**Build falhou:**
```bash
# Verifique a versão do Node
node --version  # Deve ser 18 ou superior

# Reinstale dependências
rm -rf node_modules
npm install
```

**Site em branco após deploy:**
- Aguarde 1-2 minutos (propagação)
- Limpe o cache do navegador (Ctrl+Shift+R)
- Verifique o console do navegador (F12)

---

## 💡 Dica de Ouro

O Vercel faz **deploy automático** se você conectar com GitHub:

1. Suba o código para GitHub
2. Conecte o repositório no Vercel
3. Toda vez que fizer `git push`, o site atualiza automaticamente! 🎉

---

**Pronto! Em menos de 5 minutos seu site está no ar! 🚀🎸**
