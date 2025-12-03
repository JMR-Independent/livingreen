# Configuración de EmailJS para el Formulario de Contacto

## 📧 ¿Qué es EmailJS?

EmailJS te permite enviar emails directamente desde tu sitio web sin necesitar un servidor backend. Los mensajes del formulario llegarán directamente a tu correo.

## 🚀 Pasos para Configurar (5 minutos)

### 1. Crear cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en "Sign Up" (arriba derecha)
3. Crea una cuenta gratis (permite 200 emails/mes)

### 2. Conectar tu Gmail

1. En el dashboard de EmailJS, ve a **Email Services**
2. Haz clic en **Add New Service**
3. Selecciona **Gmail**
4. Haz clic en **Connect Account** y autoriza con tu cuenta de Gmail
5. Dale un nombre al servicio (ejemplo: "LivinGreen Contact")
6. Copia el **Service ID** (lo necesitarás después)

### 3. Crear la plantilla de email

1. Ve a **Email Templates**
2. Haz clic en **Create New Template**
3. **Borra todo** el contenido predeterminado
4. Copia y pega esta plantilla:

```
Subject: New Quote Request - {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
City: {{city}}
Service: {{service}}

Message:
{{message}}

---
This message was sent from the LivinGreen website contact form.
```

5. En la sección **To Email**, pon tu correo donde quieres recibir los mensajes
6. Guarda la plantilla
7. Copia el **Template ID** (lo necesitarás después)

### 4. Obtener tu Public Key

1. Ve a **Account** (arriba derecha)
2. Haz clic en **API Keys**
3. Copia tu **Public Key** (comienza con algo como "user_...")

### 5. Configurar las variables de entorno

Abre el archivo `.env.local` en tu proyecto y reemplaza los valores:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id_aqui
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id_aqui
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
NEXT_PUBLIC_CONTACT_EMAIL=tu-email@gmail.com
```

### 6. Configurar en Vercel (para producción)

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Ve a **Settings** → **Environment Variables**
3. Agrega las 4 variables:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
   - `NEXT_PUBLIC_CONTACT_EMAIL`
4. Haz un nuevo deploy para que tome los cambios

## ✅ Probar que funciona

1. Ve a tu sitio web
2. Llena el formulario de contacto
3. Presiona "Send Message"
4. Deberías ver "Message Sent!"
5. Revisa tu correo (puede tardar 1-2 minutos)

## 🎨 Personalizar el Template de Email (Opcional)

Puedes personalizar el email que recibes editando la plantilla en EmailJS. Las variables disponibles son:

- `{{from_name}}` - Nombre del cliente
- `{{from_email}}` - Email del cliente
- `{{phone}}` - Teléfono del cliente
- `{{city}}` - Ciudad del cliente
- `{{service}}` - Servicio solicitado
- `{{message}}` - Mensaje del cliente

## 🔒 Seguridad

- Las API keys son públicas (por eso comienzan con `NEXT_PUBLIC_`)
- EmailJS tiene protección contra spam incluida
- Límite de 200 emails/mes en plan gratuito
- Si necesitas más, el plan pagado es $7/mes (1000 emails)

## ❓ Problemas Comunes

**Email no llega:**
- Revisa la carpeta de spam
- Verifica que las credenciales estén correctas en `.env.local`
- Asegúrate de haber autorizado Gmail en EmailJS

**Error al enviar:**
- Abre la consola del navegador (F12)
- Busca errores rojos
- Verifica que las variables de entorno estén configuradas

**Límite de emails alcanzado:**
- EmailJS te enviará un email cuando estés cerca del límite
- Puedes actualizar al plan pagado en cualquier momento

## 📞 Alternativa: SMS o WhatsApp

Si prefieres recibir los mensajes por WhatsApp o SMS en lugar de email, puedo configurar eso también. Solo avísame.

---

**¿Listo para probar?** Una vez que configures todo, el formulario enviará los mensajes directamente a tu email sin que el cliente sepa. Solo verá "Message Sent!" 🎉
