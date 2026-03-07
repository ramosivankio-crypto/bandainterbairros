# 🌐 Configurar Domínio Próprio para INTERBAIRROS

Guia completo para usar seu próprio domínio (ex: interbairros.com.br) ao invés do domínio gratuito da hospedagem.

---

## 🎯 O que você precisa

1. **Um domínio registrado** (ex: interbairros.com.br)
2. **Site já hospedado** (Vercel, Netlify ou servidor próprio)

---

## 📋 Onde Registrar Domínio

### Opções no Brasil

| Registrador | Preço/ano | Obs |
|-------------|-----------|-----|
| **Registro.br** | R$ 40 | Oficial (.br, .com.br) |
| **Hostinger** | R$ 40-60 | Internacional |
| **Hostgator** | R$ 40-80 | Internacional |
| **GoDaddy** | R$ 40-100 | Internacional |
| **Locaweb** | R$ 40-90 | Nacional |

**Recomendação:** Para domínios `.com.br`, use o **Registro.br** (oficial e mais barato)

---

## 🚀 Configuração por Hospedagem

### Opção 1: Vercel + Domínio Próprio ⭐

**Passo a Passo:**

1. **No Vercel:**
   - Acesse seu projeto
   - Vá em **Settings** > **Domains**
   - Clique em **Add Domain**
   - Digite seu domínio (ex: `interbairros.com.br`)
   - Clique em **Add**

2. **Copiar configurações DNS:**
   - Vercel mostrará os registros DNS necessários
   - Anote os valores (geralmente tipo A ou CNAME)

3. **No Registro.br (ou seu registrador):**
   - Acesse o painel de controle
   - Vá em **DNS** ou **Gerenciar DNS**
   - Adicione os registros fornecidos pelo Vercel:

   **Para domínio raiz (interbairros.com.br):**
   ```
   Tipo: A
   Nome: @
   Valor: 76.76.21.21 (IP do Vercel)
   ```

   **Para www (www.interbairros.com.br):**
   ```
   Tipo: CNAME
   Nome: www
   Valor: cname.vercel-dns.com
   ```

4. **Aguardar propagação:**
   - DNS pode levar de 1 hora a 48 horas
   - Normalmente funciona em 1-2 horas

5. **Verificar HTTPS:**
   - Vercel gera certificado SSL automaticamente
   - Aguarde alguns minutos após DNS propagar

**Pronto! Seu domínio está configurado!**

---

### Opção 2: Netlify + Domínio Próprio

**Passo a Passo:**

1. **No Netlify:**
   - Acesse seu site
   - Vá em **Domain settings**
   - Clique em **Add custom domain**
   - Digite seu domínio
   - Clique em **Verify**

2. **Configurar DNS no Registro.br:**

   **Opção A - Usar Netlify DNS (Recomendado):**
   
   Netlify mostrará os nameservers:
   ```
   dns1.p0X.nsone.net
   dns2.p0X.nsone.net
   dns3.p0X.nsone.net
   dns4.p0X.nsone.net
   ```

   No Registro.br:
   - Vá em **Alterar Servidores DNS**
   - Adicione os nameservers do Netlify
   - Salve

   **Opção B - Apontar com CNAME/A:**
   ```
   Tipo: A
   Nome: @
   Valor: 75.2.60.5 (IP do Netlify)
   
   Tipo: CNAME
   Nome: www
   Valor: seu-site.netlify.app
   ```

3. **Aguardar propagação:**
   - 1 a 48 horas
   - Geralmente 1-2 horas

4. **HTTPS automático:**
   - Netlify gera Let's Encrypt automaticamente

---

### Opção 3: Hospedagem Compartilhada (cPanel)

**Se seu domínio está no mesmo servidor do site:**

1. **No cPanel:**
   - Já está configurado automaticamente
   - Nenhuma ação necessária

**Se seu domínio está em outro registrador:**

1. **No Registro.br:**
   - Vá em **Gerenciar DNS**
   - Adicione registro A:
   ```
   Tipo: A
   Nome: @
   Valor: [IP do seu servidor]
   ```
   
   - Adicione registro CNAME:
   ```
   Tipo: CNAME
   Nome: www
   Valor: seudominio.com.br
   ```

2. **No cPanel:**
   - Vá em **Domínios** ou **Addon Domains**
   - Adicione seu domínio
   - Configure Document Root para pasta do site

3. **HTTPS:**
   - No cPanel, vá em **SSL/TLS Status**
   - Clique em **Run AutoSSL**

---

### Opção 4: GitHub Pages + Domínio

1. **No repositório GitHub:**
   - Vá em **Settings** > **Pages**
   - Em **Custom domain**, digite seu domínio
   - Salve

2. **Criar arquivo CNAME:**
   - Na raiz do projeto, crie arquivo `CNAME`
   - Conteúdo: `interbairros.com.br`

3. **Configurar DNS:**
   ```
   Tipo: A
   Nome: @
   Valor: 185.199.108.153
   
   Tipo: A
   Nome: @
   Valor: 185.199.109.153
   
   Tipo: A
   Nome: @
   Valor: 185.199.110.153
   
   Tipo: A
   Nome: @
   Valor: 185.199.111.153
   
   Tipo: CNAME
   Nome: www
   Valor: seu-usuario.github.io
   ```

---

## 🔧 Configuração Específica: Registro.br

### Interface do Registro.br

1. Acesse: https://registro.br
2. Faça login
3. Clique no domínio
4. Vá em **Editar Zona DNS** ou **DNS**

### Adicionar Registros

**Registro A (domínio raiz):**
```
Entrada (host): @
Tipo: A
Dados (valor): [IP fornecido pela hospedagem]
TTL: 3600
```

**Registro CNAME (subdomínio www):**
```
Entrada (host): www
Tipo: CNAME
Dados (valor): [seu-site.vercel.app ou outro]
TTL: 3600
```

**Salvar:** Clique em **Aplicar**

---

## ⏱️ Tempo de Propagação DNS

### O que esperar:

- **Mínimo:** 1 hora
- **Médio:** 2-4 horas
- **Máximo:** 48 horas (raro)

### Como verificar:

**Online:**
- https://dnschecker.org
- Digite seu domínio
- Veja se os IPs aparecem em várias localidades

**Terminal (Linux/Mac):**
```bash
dig interbairros.com.br
nslookup interbairros.com.br
```

**Windows:**
```cmd
nslookup interbairros.com.br
```

---

## 🔒 HTTPS (Certificado SSL)

### Vercel/Netlify
✅ **Automático!** Não precisa fazer nada.

### cPanel/Hospedagem Compartilhada

1. **Let's Encrypt (Gratuito):**
   - No cPanel, vá em **SSL/TLS Status**
   - Clique em **Run AutoSSL**
   - Aguarde 5-10 minutos

2. **Manual:**
   - No cPanel, vá em **SSL/TLS**
   - Clique em **Manage SSL sites**
   - Instale certificado

### Cloudflare (Alternativa)

1. Crie conta em https://cloudflare.com
2. Adicione seu domínio
3. Altere nameservers no Registro.br
4. SSL gratuito + CDN + proteção DDoS

**Nameservers Cloudflare (exemplo):**
```
alice.ns.cloudflare.com
bob.ns.cloudflare.com
```

---

## 🌐 Subdomínios

### Criar subdomínios (ex: blog.interbairros.com.br)

**No DNS:**
```
Tipo: CNAME
Nome: blog
Valor: seu-site.vercel.app
```

**No Vercel/Netlify:**
- Adicione o subdomínio nas configurações
- Mesmo processo do domínio principal

---

## 📧 Email Profissional

### Opções para email@interbairros.com.br:

**1. Google Workspace (Pago - R$ 30/mês):**
- Gmail profissional
- Google Drive, Calendar, etc.
- https://workspace.google.com

**2. Zoho Mail (GRATUITO até 5 usuários):**
- Email profissional grátis
- 5GB por usuário
- https://zoho.com/mail

**3. ProtonMail (Privacidade):**
- Email seguro e criptografado
- https://proton.me

**Configurar no Registro.br:**

Adicione registros MX fornecidos pelo provedor de email.

**Exemplo Zoho Mail:**
```
Tipo: MX
Nome: @
Valor: mx.zoho.com
Prioridade: 10

Tipo: MX
Nome: @
Valor: mx2.zoho.com
Prioridade: 20
```

---

## ⚙️ Configurações Recomendadas

### Registros DNS Completos

```
# Domínio principal (Vercel)
@ IN A 76.76.21.21

# Subdomínio www
www IN CNAME cname.vercel-dns.com

# Email (Zoho Mail - opcional)
@ IN MX 10 mx.zoho.com
@ IN MX 20 mx2.zoho.com

# SPF (anti-spam - opcional)
@ IN TXT "v=spf1 include:zoho.com ~all"

# DMARC (segurança email - opcional)
_dmarc IN TXT "v=DMARC1; p=none"
```

---

## 🔍 Verificação Final

### Checklist pós-configuração:

- [ ] Domínio acessível (http://seudominio.com.br)
- [ ] www funciona (http://www.seudominio.com.br)
- [ ] HTTPS ativo (https://seudominio.com.br)
- [ ] Certificado SSL válido (cadeado verde)
- [ ] Redirecionamento http → https funcionando
- [ ] Redirecionamento www → não-www (ou vice-versa)
- [ ] Site carrega corretamente
- [ ] Painel admin acessível (/admin)

---

## 🐛 Problemas Comuns

### Domínio não funciona após 48h

**Soluções:**
1. Verifique os registros DNS no painel do registrador
2. Use https://dnschecker.org para confirmar propagação
3. Limpe cache DNS local:
   ```bash
   # Windows
   ipconfig /flushdns
   
   # Mac
   sudo dscacheutil -flushcache
   
   # Linux
   sudo systemd-resolve --flush-caches
   ```

### HTTPS não funciona

**Soluções:**
1. Aguarde propagação DNS completa
2. Force renovação do certificado (Vercel/Netlify)
3. Verifique se domínio está corretamente apontado
4. Use Cloudflare como intermediário

### www não funciona

**Solução:**
Adicione registro CNAME para www:
```
Tipo: CNAME
Nome: www
Valor: seu-site.vercel.app
```

### Email não funciona

**Soluções:**
1. Verifique registros MX
2. Aguarde propagação DNS
3. Use ferramenta de teste: https://mxtoolbox.com

---

## 💰 Custos Estimados

| Item | Custo Anual | Obs |
|------|-------------|-----|
| Domínio .com.br | R$ 40 | Registro.br |
| Hospedagem | R$ 0 | Vercel/Netlify grátis |
| Email | R$ 0 | Zoho Mail grátis |
| SSL | R$ 0 | Let's Encrypt grátis |
| **TOTAL** | **R$ 40/ano** | Apenas o domínio! |

---

## 🎯 Recomendações Finais

### Configuração Ideal

1. **Domínio:** Registro.br (.com.br)
2. **Hospedagem:** Vercel (gratuito)
3. **Email:** Zoho Mail (gratuito)
4. **CDN/Segurança:** Cloudflare (gratuito - opcional)

### Segurança

- ✅ Sempre use HTTPS
- ✅ Configure SPF e DKIM para email
- ✅ Habilite 2FA no registrador de domínio
- ✅ Mantenha informações de contato atualizadas

### Performance

- ✅ Use Cloudflare para CDN global
- ✅ Otimize imagens (WebP)
- ✅ Configure cache headers
- ✅ Minimize CSS/JS (já feito no build)

---

## 📞 Suporte

### Registro.br
- Site: https://registro.br
- Suporte: https://registro.br/ajuda

### Vercel
- Docs: https://vercel.com/docs/custom-domains
- Discord: https://vercel.com/discord

### Netlify
- Docs: https://docs.netlify.com/domains-https/custom-domains/
- Suporte: https://netlify.com/support

---

**✅ Pronto! Seu domínio próprio está configurado! 🎸**

**Site acessível em: https://interbairros.com.br**
