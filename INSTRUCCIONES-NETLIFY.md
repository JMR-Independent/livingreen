# 🚀 Instrucciones para Subir LivinGreen a Netlify

## 📁 Paso 1: Renombrar la Carpeta

1. **Cierra VSCode** o cualquier editor que tengas abierto en esta carpeta
2. **Cierra la terminal** si tienes alguna abierta en esta ubicación
3. **Renombra la carpeta** `cleanpro-utah` a `livingreen`:
   - Clic derecho en la carpeta → Cambiar nombre → `livingreen`

---

## ✅ Paso 2: Verificar que Todo Esté Listo

La carpeta ya está configurada y lista para Netlify con:

✅ **netlify.toml** - Configuración de Netlify
✅ **.gitignore** - Archivos a ignorar
✅ **next.config.ts** - Optimizado para producción
✅ **PageTransition** - Navegación rápida
✅ **Todas las páginas optimizadas**

---

## 🌐 Paso 3: Subir a Netlify

### Opción A: Subir directamente desde Netlify (MÁS FÁCIL)

1. Ve a **https://app.netlify.com**
2. Inicia sesión o crea una cuenta gratis
3. Haz clic en **"Add new site"** → **"Deploy manually"**
4. **Arrastra la carpeta `livingreen`** completa a la zona de drop
5. ¡Listo! Netlify se encargará de:
   - Instalar dependencias (`npm install`)
   - Hacer el build (`npm run build`)
   - Desplegar el sitio

### Opción B: Conectar con Git (RECOMENDADO para actualizaciones automáticas)

1. **Inicializa Git** en la carpeta `livingreen`:
   ```bash
   cd livingreen
   git init
   git add .
   git commit -m "Initial commit - LivinGreen website"
   ```

2. **Crea un repositorio en GitHub**:
   - Ve a https://github.com/new
   - Nombre: `livingreen`
   - Descripción: "LivinGreen Professional Cleaning Services Website"
   - Público o Privado (como prefieras)
   - NO agregues README, .gitignore ni licencia
   - Haz clic en "Create repository"

3. **Conecta tu repositorio local con GitHub**:
   ```bash
   git remote add origin https://github.com/TU-USUARIO/livingreen.git
   git branch -M main
   git push -u origin main
   ```

4. **Conecta Netlify con GitHub**:
   - Ve a https://app.netlify.com
   - "Add new site" → "Import an existing project"
   - Elige "GitHub"
   - Busca el repositorio `livingreen`
   - Netlify detectará automáticamente la configuración de Next.js
   - Haz clic en "Deploy site"

---

## ⚙️ Configuración en Netlify

Netlify detectará automáticamente:
- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Framework:** Next.js (con plugin automático)

Si necesitas configurar variables de entorno:
1. Ve a "Site settings" → "Environment variables"
2. Agrega las que necesites (API keys, etc.)

---

## 🎯 Paso 4: Configurar Dominio Personalizado (Opcional)

1. En Netlify, ve a "Site settings" → "Domain management"
2. Haz clic en "Add custom domain"
3. Ingresa tu dominio (ej: `livingreen.com`)
4. Sigue las instrucciones para:
   - Configurar DNS
   - Habilitar HTTPS (automático y gratis)

---

## 📝 Archivos Importantes Creados

### `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### `.gitignore`
- Ignora `node_modules`, `.next`, `.env` y otros archivos temporales

---

## 🔧 Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build de producción (para probar antes de subir)
npm run build

# Ejecutar build local
npm start
```

---

## ⚠️ Solución de Problemas

### Build falla en Netlify

**Error:** "Module not found"
**Solución:** Asegúrate de que todas las dependencias estén en `package.json`

**Error:** "Out of memory"
**Solución:** En Netlify Settings → Environment variables, agrega:
- `NODE_OPTIONS` = `--max-old-space-size=4096`

### Imágenes no cargan

**Problema:** Las imágenes no se ven en producción
**Solución:** Verifica que todas las imágenes estén en la carpeta `public/images`

### La página se ve diferente

**Problema:** Estilos no se aplican correctamente
**Solución:** Limpia la caché y rebuild:
- En Netlify: "Deploys" → "Trigger deploy" → "Clear cache and deploy site"

---

## 📊 Monitoreo y Análisis

Netlify incluye gratis:
- ✅ Analytics básico
- ✅ Logs de deploy
- ✅ Forms (si los usas)
- ✅ HTTPS automático
- ✅ CDN global
- ✅ 100 GB de ancho de banda/mes

---

## 🎉 ¡Listo!

Tu sitio de LivinGreen estará en vivo en:
- **URL temporal:** `https://[nombre-aleatorio].netlify.app`
- **URL personalizada:** Tu dominio cuando lo configures

**Cada vez que hagas cambios:**
- Si usas Git: Solo haz `git push` y Netlify lo desplegará automáticamente
- Si subes manualmente: Arrastra la carpeta nuevamente

---

## 📞 Soporte

- **Netlify Docs:** https://docs.netlify.com
- **Next.js Docs:** https://nextjs.org/docs

---

¡Tu sitio web profesional está listo para el mundo! 🌟
