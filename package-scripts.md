# 📦 Scripts de Deploy Automatizado

Scripts úteis para facilitar o deploy do site INTERBAIRROS.

---

## 🚀 Script de Deploy Completo

Crie um arquivo `deploy.sh` na raiz do projeto:

```bash
#!/bin/bash

echo "🎸 INTERBAIRROS - Deploy Automático"
echo "===================================="
echo ""

# Cores para terminal
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não está instalado!${NC}"
    echo "Baixe em: https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✅ Node.js instalado:${NC} $(node --version)"

# Limpar build anterior
echo ""
echo -e "${YELLOW}🧹 Limpando build anterior...${NC}"
rm -rf dist/

# Instalar dependências
echo ""
echo -e "${YELLOW}📦 Instalando dependências...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao instalar dependências!${NC}"
    exit 1
fi

# Build do projeto
echo ""
echo -e "${YELLOW}🔨 Fazendo build...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao fazer build!${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Build concluído com sucesso!${NC}"
echo ""
echo "📁 Arquivos prontos em: ./dist/"
echo ""
echo "📋 Próximos passos:"
echo "  1. Envie os arquivos da pasta 'dist/' para sua hospedagem"
echo "  2. Configure o .htaccess (se necessário)"
echo "  3. Acesse seu site!"
echo ""
echo -e "${GREEN}🎸 Rock on! 🎸${NC}"
```

**Como usar:**
```bash
# Dar permissão de execução
chmod +x deploy.sh

# Executar
./deploy.sh
```

---

## 🎯 Deploy no Vercel (Automatizado)

Crie `deploy-vercel.sh`:

```bash
#!/bin/bash

echo "🚀 Deploy no Vercel - INTERBAIRROS"
echo "=================================="
echo ""

# Instalar Vercel CLI se não estiver instalado
if ! command -v vercel &> /dev/null; then
    echo "📦 Instalando Vercel CLI..."
    npm install -g vercel
fi

# Fazer build
echo "🔨 Fazendo build..."
npm run build

# Deploy
echo "🚀 Fazendo deploy..."
vercel --prod

echo ""
echo "✅ Deploy concluído!"
echo "🎸 Seu site está no ar!"
```

**Como usar:**
```bash
chmod +x deploy-vercel.sh
./deploy-vercel.sh
```

---

## 🌐 Deploy no Netlify (Automatizado)

Crie `deploy-netlify.sh`:

```bash
#!/bin/bash

echo "🚀 Deploy no Netlify - INTERBAIRROS"
echo "==================================="
echo ""

# Instalar Netlify CLI se não estiver instalado
if ! command -v netlify &> /dev/null; then
    echo "📦 Instalando Netlify CLI..."
    npm install -g netlify-cli
fi

# Fazer build
echo "🔨 Fazendo build..."
npm run build

# Deploy
echo "🚀 Fazendo deploy..."
netlify deploy --prod --dir=dist

echo ""
echo "✅ Deploy concluído!"
echo "🎸 Seu site está no ar!"
```

**Como usar:**
```bash
chmod +x deploy-netlify.sh
./deploy-netlify.sh
```

---

## 📋 Script de Backup

Crie `backup.sh`:

```bash
#!/bin/bash

echo "💾 Backup INTERBAIRROS"
echo "======================"
echo ""

# Data atual
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="backups/backup_$DATE"

# Criar pasta de backup
mkdir -p "$BACKUP_DIR"

# Copiar arquivos importantes
echo "📦 Copiando arquivos..."
cp -r src/ "$BACKUP_DIR/"
cp -r public/ "$BACKUP_DIR/"
cp package.json "$BACKUP_DIR/"
cp package-lock.json "$BACKUP_DIR/" 2>/dev/null
cp pnpm-lock.yaml "$BACKUP_DIR/" 2>/dev/null
cp vite.config.ts "$BACKUP_DIR/"
cp tsconfig.json "$BACKUP_DIR/"
cp README.md "$BACKUP_DIR/"

# Criar arquivo ZIP
echo "🗜️  Comprimindo..."
zip -r "backups/interbairros_$DATE.zip" "$BACKUP_DIR/" -q

# Remover pasta temporária
rm -rf "$BACKUP_DIR/"

echo ""
echo "✅ Backup criado: backups/interbairros_$DATE.zip"
echo "💾 Tamanho: $(du -h backups/interbairros_$DATE.zip | cut -f1)"
```

**Como usar:**
```bash
chmod +x backup.sh
./backup.sh
```

---

## 🔍 Script de Verificação

Crie `verificar.sh`:

```bash
#!/bin/bash

echo "🔍 Verificação do Projeto INTERBAIRROS"
echo "======================================"
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Node.js
if command -v node &> /dev/null; then
    echo -e "${GREEN}✅ Node.js:${NC} $(node --version)"
else
    echo -e "${RED}❌ Node.js não instalado${NC}"
fi

# npm
if command -v npm &> /dev/null; then
    echo -e "${GREEN}✅ npm:${NC} $(npm --version)"
else
    echo -e "${RED}❌ npm não instalado${NC}"
fi

# Verificar arquivos importantes
echo ""
echo "📁 Verificando arquivos..."

files=("package.json" "vite.config.ts" "tsconfig.json" "src/main.tsx" "src/app/App.tsx")

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅${NC} $file"
    else
        echo -e "${RED}❌${NC} $file (não encontrado)"
    fi
done

# Verificar node_modules
echo ""
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ Dependências instaladas${NC}"
else
    echo -e "${YELLOW}⚠️  Dependências não instaladas. Execute: npm install${NC}"
fi

# Verificar build
echo ""
if [ -d "dist" ]; then
    echo -e "${GREEN}✅ Build encontrado (dist/)${NC}"
    echo "   Tamanho: $(du -sh dist/ | cut -f1)"
else
    echo -e "${YELLOW}⚠️  Build não encontrado. Execute: npm run build${NC}"
fi

echo ""
echo "🎸 Verificação concluída!"
```

**Como usar:**
```bash
chmod +x verificar.sh
./verificar.sh
```

---

## 🧹 Script de Limpeza

Crie `limpar.sh`:

```bash
#!/bin/bash

echo "🧹 Limpeza do Projeto INTERBAIRROS"
echo "=================================="
echo ""

read -p "⚠️  Tem certeza que deseja limpar? (s/N) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo "🧹 Removendo node_modules..."
    rm -rf node_modules/
    
    echo "🧹 Removendo dist..."
    rm -rf dist/
    
    echo "🧹 Removendo cache..."
    rm -rf .cache/
    
    echo "🧹 Removendo logs..."
    rm -f *.log
    
    echo ""
    echo "✅ Limpeza concluída!"
    echo "💡 Execute 'npm install' para reinstalar dependências"
else
    echo "❌ Limpeza cancelada"
fi
```

**Como usar:**
```bash
chmod +x limpar.sh
./limpar.sh
```

---

## 📦 Script NPM (package.json)

Adicione ao `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && echo '✅ Build pronto! Envie a pasta dist/ para sua hospedagem'",
    "deploy:vercel": "npm run build && vercel --prod",
    "deploy:netlify": "npm run build && netlify deploy --prod --dir=dist",
    "clean": "rm -rf dist/ node_modules/",
    "fresh": "npm run clean && npm install && npm run build"
  }
}
```

**Como usar:**
```bash
npm run deploy          # Build básico
npm run deploy:vercel   # Deploy no Vercel
npm run deploy:netlify  # Deploy no Netlify
npm run clean           # Limpar projeto
npm run fresh           # Limpar e rebuildar tudo
```

---

## 🪟 Scripts para Windows (PowerShell)

Crie `deploy.ps1`:

```powershell
Write-Host "🎸 INTERBAIRROS - Deploy Automático" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Limpar build anterior
Write-Host "🧹 Limpando build anterior..." -ForegroundColor Yellow
Remove-Item -Path "dist" -Recurse -Force -ErrorAction SilentlyContinue

# Instalar dependências
Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao instalar dependências!" -ForegroundColor Red
    exit 1
}

# Build
Write-Host "🔨 Fazendo build..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer build!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Build concluído com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Arquivos prontos em: ./dist/" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎸 Rock on! 🎸" -ForegroundColor Green
```

**Como usar (PowerShell):**
```powershell
.\deploy.ps1
```

---

## ✅ Checklist Automático

Crie `checklist.sh`:

```bash
#!/bin/bash

echo "✅ Checklist de Deploy - INTERBAIRROS"
echo "====================================="
echo ""

checks=0
total=10

check() {
    if [ $1 -eq 0 ]; then
        echo "✅ $2"
        ((checks++))
    else
        echo "❌ $2"
    fi
}

# Verificações
node --version &> /dev/null
check $? "Node.js instalado"

npm --version &> /dev/null
check $? "npm instalado"

[ -f "package.json" ]
check $? "package.json existe"

[ -d "node_modules" ]
check $? "Dependências instaladas"

[ -d "dist" ]
check $? "Build gerado (dist/)"

[ -f "dist/index.html" ]
check $? "index.html no build"

[ -f ".htaccess" ] || [ -f "public/.htaccess" ]
check $? ".htaccess configurado"

[ -f "netlify.toml" ] || [ -f "vercel.json" ]
check $? "Config de deploy presente"

[ -f "README.md" ]
check $? "README.md existe"

[ -f "INSTALACAO.md" ]
check $? "Documentação completa"

echo ""
echo "📊 Progresso: $checks/$total verificações OK"

if [ $checks -eq $total ]; then
    echo ""
    echo "🎉 Tudo pronto para deploy!"
    echo "🚀 Execute: npm run deploy:vercel"
else
    echo ""
    echo "⚠️  Algumas verificações falharam"
    echo "📋 Revise o checklist acima"
fi
```

**Como usar:**
```bash
chmod +x checklist.sh
./checklist.sh
```

---

**💡 Dica:** Torne todos os scripts executáveis de uma vez:
```bash
chmod +x *.sh
```

---

**🎸 Scripts prontos para facilitar seu deploy! 🎸**
