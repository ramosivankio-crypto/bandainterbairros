# 🗄️ Configuração Supabase para INTERBAIRROS

Guia completo para migrar do localStorage para banco de dados PostgreSQL na nuvem.

---

## 🎯 Por que usar Supabase?

- ✅ **Banco de dados real** (PostgreSQL)
- ✅ **Dados na nuvem** (não perde ao limpar cache)
- ✅ **Gratuito** até 500MB
- ✅ **API automática** gerada
- ✅ **Sincronização em tempo real**
- ✅ **Autenticação incluída**
- ✅ **Storage para MP3 e imagens**

---

## 📋 Passo a Passo

### 1. Criar Conta no Supabase

1. Acesse: https://supabase.com
2. Clique em **Start your project**
3. Faça login com GitHub (recomendado)

### 2. Criar Novo Projeto

1. Clique em **New Project**
2. Preencha:
   - **Name**: interbairros
   - **Database Password**: (escolha uma senha forte)
   - **Region**: South America (São Paulo)
3. Clique em **Create new project**
4. Aguarde 1-2 minutos (provisionamento)

### 3. Criar Tabelas no Banco

1. No menu lateral, clique em **SQL Editor**
2. Clique em **New query**
3. Cole o SQL abaixo e execute (**RUN**):

```sql
-- ========================================
-- BANCO DE DADOS INTERBAIRROS
-- ========================================

-- Tabela de Shows
CREATE TABLE shows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date TEXT NOT NULL,
  city TEXT NOT NULL,
  venue TEXT NOT NULL,
  time TEXT NOT NULL,
  ticket_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Galeria
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  alt TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Músicas
CREATE TABLE music_tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  duration TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Configurações do Site
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- INSERIR DADOS PADRÃO
-- ========================================

-- Shows iniciais
INSERT INTO shows (date, city, venue, time, ticket_link) VALUES
  ('15 MAR', 'São Paulo', 'Espaço das Américas', '21:00', 'https://exemplo.com/ingressos'),
  ('22 MAR', 'Rio de Janeiro', 'Circo Voador', '20:30', 'https://exemplo.com/ingressos'),
  ('05 ABR', 'Belo Horizonte', 'Music Hall', '21:00', 'https://exemplo.com/ingressos'),
  ('12 ABR', 'Curitiba', 'Live Curitiba', '20:00', 'https://exemplo.com/ingressos');

-- Imagens da galeria
INSERT INTO gallery_images (url, alt) VALUES
  ('https://images.unsplash.com/photo-1762917903361-99e0164dbcc5?w=1080', 'Guitarrista em performance'),
  ('https://images.unsplash.com/photo-1647168285321-7509a33bf1d7?w=1080', 'Baterista no palco'),
  ('https://images.unsplash.com/photo-1666143208844-ac2f983b171a?w=1080', 'Vocalista ao microfone'),
  ('https://images.unsplash.com/photo-1735511751649-c1743f3d3df5?w=1080', 'Baixista em show'),
  ('https://images.unsplash.com/photo-1611810293387-c8afe03cd7dd?w=1080', 'Público no festival'),
  ('https://images.unsplash.com/photo-1651912170375-5d25d534b4c3?w=1080', 'Guitarra e amplificador'),
  ('https://images.unsplash.com/photo-1534050055340-71c7fa612a99?w=1080', 'Palco iluminado'),
  ('https://images.unsplash.com/photo-1684679106461-dae134df8da6?w=1080', 'Banda no palco');

-- Músicas de exemplo
INSERT INTO music_tracks (title, duration, url) VALUES
  ('Rock da Pesada', '3:45', 'https://exemplo.com/musicas/rock-da-pesada.mp3'),
  ('Noite de Fogo', '4:12', 'https://exemplo.com/musicas/noite-de-fogo.mp3'),
  ('Alma Livre', '3:30', 'https://exemplo.com/musicas/alma-livre.mp3');

-- Configurações do site
INSERT INTO site_settings (key, value) VALUES
  ('social_links', '{
    "instagram": "https://instagram.com/interbairros",
    "youtube": "https://youtube.com/@interbairros",
    "facebook": "https://facebook.com/interbairros"
  }'::jsonb),
  ('band_info', '{
    "bio1": "Desde 2025, a Banda Interbairros tem levado o verdadeiro rock para palcos de toda Curitiba e região. Com uma mistura explosiva de rock alternativo, noise e shogaze a banda conquistou vários fãs com suas performances eletrizantes.",
    "bio2": "Formada jovens músicos apaixonados pela arte, cada show é uma experiência única que faz o público vibrar do primeiro ao último acorde.",
    "imageUrl": "https://images.unsplash.com/photo-1762917903361-99e0164dbcc5?w=1080"
  }'::jsonb);

-- ========================================
-- SEGURANÇA (ROW LEVEL SECURITY)
-- ========================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE shows ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE music_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Permitir leitura pública (qualquer um pode ver)
CREATE POLICY "Permitir leitura pública" ON shows
  FOR SELECT USING (true);

CREATE POLICY "Permitir leitura pública" ON gallery_images
  FOR SELECT USING (true);

CREATE POLICY "Permitir leitura pública" ON music_tracks
  FOR SELECT USING (true);

CREATE POLICY "Permitir leitura pública" ON site_settings
  FOR SELECT USING (true);

-- Permitir escrita apenas para usuários autenticados
CREATE POLICY "Permitir insert para autenticados" ON shows
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Permitir update para autenticados" ON shows
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Permitir delete para autenticados" ON shows
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Permitir insert para autenticados" ON gallery_images
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Permitir delete para autenticados" ON gallery_images
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Permitir insert para autenticados" ON music_tracks
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Permitir delete para autenticados" ON music_tracks
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Permitir update para autenticados" ON site_settings
  FOR UPDATE USING (auth.role() = 'authenticated');

-- ========================================
-- FUNÇÕES ÚTEIS
-- ========================================

-- Atualizar timestamp automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger nas tabelas
CREATE TRIGGER update_shows_updated_at
  BEFORE UPDATE ON shows
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 4. Pegar Credenciais

1. No menu lateral, clique em **Settings** (ícone engrenagem)
2. Clique em **API**
3. Copie:
   - **Project URL** (ex: https://xxxxx.supabase.co)
   - **anon public** key (chave pública)

### 5. Configurar no Projeto

Crie arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

⚠️ **IMPORTANTE:** Adicione `.env` ao `.gitignore` (já está)

### 6. Instalar Cliente Supabase

```bash
npm install @supabase/supabase-js
```

---

## 🔧 Configuração do Storage (Para MP3 e Imagens)

### Criar Bucket de Arquivos

1. No Supabase, vá em **Storage**
2. Clique em **New bucket**
3. Configure:

**Bucket para Músicas:**
- **Name**: `music`
- **Public bucket**: ✅ Sim
- Clique em **Create bucket**

**Bucket para Imagens:**
- **Name**: `images`
- **Public bucket**: ✅ Sim
- Clique em **Create bucket**

### Upload de Arquivos

1. Clique no bucket criado
2. Clique em **Upload file**
3. Selecione seus MP3/imagens
4. Após upload, clique no arquivo
5. Copie a **Public URL**

**Exemplo de URL:**
```
https://xxxxx.supabase.co/storage/v1/object/public/music/rock-da-pesada.mp3
```

---

## 👤 Configurar Autenticação (Admin)

### 1. Habilitar Email/Password

1. Vá em **Authentication** > **Providers**
2. Habilite **Email**
3. Desabilite **Confirm email** (para testes)

### 2. Criar Usuário Admin

Execute no SQL Editor:

```sql
-- Criar usuário admin
-- Troque email e senha conforme necessário
SELECT auth.signup(
  email := 'admin@interbairros.com',
  password := 'SenhaSegura123!'
);
```

Ou crie manualmente em **Authentication** > **Users** > **Add user**

---

## 💻 Integrar com o Site React

### 1. Criar Cliente Supabase

Crie arquivo `/src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 2. Atualizar Context (Exemplo: Shows)

```typescript
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export function useSite() {
  const [shows, setShows] = useState([]);

  // Carregar shows do Supabase
  useEffect(() => {
    loadShows();
  }, []);

  const loadShows = async () => {
    const { data, error } = await supabase
      .from('shows')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Erro ao carregar shows:', error);
      return;
    }
    
    setShows(data || []);
  };

  const addShow = async (show) => {
    const { error } = await supabase
      .from('shows')
      .insert([show]);
    
    if (error) {
      console.error('Erro ao adicionar show:', error);
      return;
    }
    
    loadShows(); // Recarregar lista
  };

  const deleteShow = async (id) => {
    const { error } = await supabase
      .from('shows')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Erro ao deletar show:', error);
      return;
    }
    
    loadShows(); // Recarregar lista
  };

  return { shows, addShow, deleteShow };
}
```

### 3. Autenticação no Admin Panel

```typescript
import { supabase } from '@/lib/supabase';

// Login
const handleLogin = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert('Erro ao fazer login: ' + error.message);
    return;
  }

  setIsAuthenticated(true);
};

// Logout
const handleLogout = async () => {
  await supabase.auth.signOut();
  setIsAuthenticated(false);
};

// Verificar sessão
useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    setIsAuthenticated(!!session);
  });

  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    setIsAuthenticated(!!session);
  });

  return () => subscription.unsubscribe();
}, []);
```

---

## 📊 Queries Úteis

### Consultar dados

```sql
-- Ver todos os shows
SELECT * FROM shows ORDER BY created_at DESC;

-- Ver galeria
SELECT * FROM gallery_images;

-- Ver músicas
SELECT * FROM music_tracks;

-- Ver configurações
SELECT * FROM site_settings;
```

### Backup manual

```sql
-- Exportar shows para JSON
SELECT json_agg(row_to_json(shows)) FROM shows;
```

### Limpar dados

```sql
-- CUIDADO! Remove todos os dados
TRUNCATE shows, gallery_images, music_tracks CASCADE;
```

---

## 🔄 Sincronização em Tempo Real

Adicione listeners para atualizar automaticamente:

```typescript
useEffect(() => {
  // Escutar mudanças em tempo real
  const channel = supabase
    .channel('shows-changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'shows' },
      (payload) => {
        console.log('Show atualizado:', payload);
        loadShows(); // Recarregar
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

---

## 💰 Limites do Plano Gratuito

| Recurso | Limite Gratuito |
|---------|-----------------|
| Banco de dados | 500 MB |
| Storage | 1 GB |
| Bandwidth | 5 GB/mês |
| Requisições API | Ilimitadas |
| Projetos | 2 ativos |

**Para a maioria dos sites de banda, o plano gratuito é suficiente!**

---

## 🚀 Deploy com Supabase

Suas variáveis de ambiente precisam estar configuradas na hospedagem:

### Vercel
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

### Netlify
1. Vá em **Site settings** > **Environment variables**
2. Adicione:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

---

## ⚠️ Segurança

### ✅ Boas Práticas

- ✅ Use RLS (Row Level Security) - já configurado
- ✅ Nunca exponha a `service_role_key` no frontend
- ✅ Use apenas `anon key` no código React
- ✅ Autentique usuários antes de operações sensíveis
- ✅ Valide dados no backend (RLS policies)

### ❌ NÃO Faça

- ❌ Não commite `.env` no Git
- ❌ Não use `service_role_key` no frontend
- ❌ Não desabilite RLS sem motivo
- ❌ Não exponha dados sensíveis

---

## 📞 Recursos Adicionais

- **Documentação Oficial**: https://supabase.com/docs
- **Dashboard**: https://app.supabase.com
- **Exemplos React**: https://github.com/supabase/supabase/tree/master/examples
- **Comunidade**: https://discord.supabase.com

---

## 🎯 Checklist de Implementação

- [ ] Conta criada no Supabase
- [ ] Projeto criado
- [ ] Tabelas criadas (SQL executado)
- [ ] Dados de exemplo inseridos
- [ ] RLS configurado
- [ ] Credenciais copiadas
- [ ] `.env` criado no projeto
- [ ] Cliente Supabase instalado
- [ ] Contexts atualizados
- [ ] Storage configurado (se necessário)
- [ ] Autenticação implementada
- [ ] Variáveis de ambiente no deploy

---

**✅ Pronto! Seu site agora tem um banco de dados PostgreSQL profissional na nuvem! 🎸**
