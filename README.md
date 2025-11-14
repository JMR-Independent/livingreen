# CleanPro Utah - Professional Cleaning Services Website

Una aplicación web moderna y profesional construida con Next.js 15, React 19, TypeScript, y Tailwind CSS, diseñada específicamente para una empresa de limpieza profesional en Utah.

## Características Principales

### Diseño y Experiencia de Usuario
- **Diseño Minimalista Estilo Apple**: Interfaz limpia con mucho whitespace, tipografía Inter, y animaciones suaves
- **Efectos Dinámicos de Scroll**: Animaciones de fade-in, slide-up, y parallax usando Framer Motion y GSAP
- **Carousel Profesional Avanzado**: Implementado con Swiper para logos de clientes y testimonios
- **Responsive Design**: Totalmente adaptado para desktop, tablet y móvil
- **Efectos de Hover y Transiciones**: Interacciones suaves y profesionales en todos los componentes

### Tecnología Avanzada
- **Next.js 15** con App Router y React Server Components
- **TypeScript** para type safety
- **Tailwind CSS** para estilos utilitarios y diseño responsivo
- **Framer Motion** para animaciones fluidas
- **Swiper** para carruseles profesionales
- **React Hook Form + Zod** para validación de formularios
- **Headless UI** para componentes accesibles

### Optimizaciones
- **Next.js Image Optimization**: Imágenes optimizadas en WebP y AVIF
- **Code Splitting**: Carga de componentes bajo demanda
- **SEO Optimizado**: Meta tags, Open Graph, structured data
- **Performance**: Fast loading, lazy loading, optimizaciones de Core Web Vitals

## Estructura del Proyecto

```
cleanpro-utah/
├── app/
│   ├── about/page.tsx          # Página About Us
│   ├── contact/page.tsx        # Página de contacto con formulario
│   ├── faq/page.tsx            # Preguntas frecuentes
│   ├── gallery/page.tsx        # Galería de trabajos
│   ├── reviews/page.tsx        # Testimonios de clientes
│   ├── services/
│   │   ├── page.tsx            # Hub de servicios
│   │   └── [slug]/page.tsx     # Páginas individuales de servicios
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Página de inicio
│   ├── globals.css             # Estilos globales
│   └── not-found.tsx           # Página 404
├── components/
│   ├── ClientCarousel.tsx      # Carousel de clientes
│   ├── FAQSection.tsx          # Sección de preguntas frecuentes
│   ├── Footer.tsx              # Footer del sitio
│   ├── Gallery.tsx             # Componente de galería
│   ├── Header.tsx              # Header con navegación sticky
│   ├── Hero.tsx                # Hero section con parallax
│   ├── ReviewsSection.tsx      # Sección de testimonios
│   ├── ScrollAnimation.tsx     # Wrapper para animaciones de scroll
│   ├── ServicesSection.tsx     # Grid de servicios
│   └── WhatsAppButton.tsx      # Botón flotante de WhatsApp
├── lib/
│   ├── constants.ts            # Constantes y datos del sitio
│   └── utils.ts                # Utilidades y helpers
└── public/
    └── images/                 # Imágenes del sitio

## Servicios Ofrecidos

1. **Area Rug Cleaning** - Limpieza de alfombras normales (no muro a muro)
2. **Upholstery Cleaning** - Limpieza de sillones y tapizados
3. **Mattress Cleaning** - Limpieza profunda de colchones
4. **Car Interior Detailing** - Limpieza interior de automóviles
5. **Protection & Waterproofing** - Impermeabilización de alfombras y tapizados

## Paleta de Colores

- **Primario (Azul)**: `#009ddb` - Azul corporativo
- **Acento (Verde)**: `#7fb539` - Verde natural
- **Neutrales**: Escala de grises del blanco al negro
- **Fondos**: Blanco (`#ffffff`), gris claro (`#f5f5f7`)

## Características Especiales

### Animaciones y Efectos
- Hero section con parallax background
- Scroll animations con Framer Motion
- Hover effects en cards y botones
- Transiciones suaves en navegación
- Loading states y skeletons

### Componentes Interactivos
- Menú móvil con animación hamburguesa
- Accordion para FAQs con animaciones
- Lightbox para galería de imágenes
- Carousel con autoplay y navegación
- Formulario con validación en tiempo real

### SEO y Metadata
- Meta tags optimizados por página
- Open Graph tags para redes sociales
- Structured data (Schema.org)
- Sitemap automático
- Breadcrumbs

## Instalación y Uso

### Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# El sitio estará disponible en http://localhost:3000
```

### Producción

```bash
# Construir para producción
npm run build

# Iniciar servidor de producción
npm start
```

### Linting

```bash
# Ejecutar ESLint
npm run lint
```

## Páginas del Sitio

- **/** - Página de inicio con hero, servicios, clientes, galería, reviews y FAQ
- **/about** - Información sobre la empresa, valores y equipo
- **/services** - Hub de todos los servicios
- **/services/[slug]** - Páginas individuales de cada servicio
- **/gallery** - Galería de trabajos realizados
- **/reviews** - Testimonios de clientes
- **/faq** - Preguntas frecuentes
- **/contact** - Formulario de contacto e información

## Información de Contacto (Placeholder)

- **Teléfono**: (801) 555-0100
- **Email**: info@cleanpro-utah.com
- **WhatsApp**: +1 (801) 555-0100
- **Dirección**: 123 Main Street, Santaquin, UT 84655

**Área de Servicio**: De Santaquin a Salt Lake City, incluyendo:
- Santaquin
- Spanish Fork
- Provo
- Orem
- Salt Lake City

## Adaptaciones del Sitio Original (LivinGreen Chile)

Este sitio está basado en el diseño y estructura de LivinGreen de Chile, adaptado para el mercado de Utah con las siguientes modificaciones:

### Cambios de Contenido
- Idioma: Español → Inglés
- Moneda: Pesos chilenos → Dólares estadounidenses
- Ubicación: Santiago, Chile → Utah, Estados Unidos
- Servicios: Alfombras muro a muro → Area rugs normales
- Agregado: Servicio de limpieza interior de autos

### Mejoras Técnicas
- WordPress → Next.js 15 con React 19
- CSS tradicional → Tailwind CSS
- Sin framework JS → Framer Motion + GSAP
- Carousels básicos → Swiper profesional
- Formularios simples → React Hook Form con validación

### Mejoras de Diseño
- Diseño más minimalista estilo Apple
- Animaciones más suaves y profesionales
- Mejor responsive design
- Efectos de scroll avanzados
- Tipografía mejorada (Inter font)

## Próximos Pasos Recomendados

1. **Reemplazar imágenes**: Cambiar las imágenes actuales (de LivinGreen Chile) por fotos reales de la empresa en Utah
2. **Actualizar información**: Modificar datos de contacto, dirección, teléfonos y redes sociales reales
3. **Configurar formulario**: Conectar el formulario de contacto a un servicio de email (ej: SendGrid, Resend)
4. **Agregar Google Maps**: Integrar mapa con la ubicación real del negocio
5. **SEO local**: Optimizar para búsquedas locales de Utah
6. **Google Analytics**: Integrar tracking y analytics
7. **Testimonios reales**: Reemplazar con reviews reales de clientes de Utah
8. **Deploy**: Desplegar en Vercel, Netlify o plataforma similar

## Tecnologías Utilizadas

- Next.js 15.1.4
- React 19.0.0
- TypeScript 5
- Tailwind CSS 3.4.1
- Framer Motion 11.15.0
- Swiper 11.1.14
- React Hook Form 7.54.2
- Zod 3.24.1
- Headless UI 2.2.0
- GSAP 3.12.5

## Licencia

Proyecto privado para CleanPro Utah.

---

**Desarrollado con las últimas tecnologías web para ofrecer la mejor experiencia de usuario posible.**
