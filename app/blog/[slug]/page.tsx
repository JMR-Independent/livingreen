import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/lib/blog';
import { COMPANY_INFO } from '@/lib/constants';
import { articleSchema, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';

const FONT = "'Nunito', 'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif";

interface PostProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Article Not Found' };
  const url = `${COMPANY_INFO.url}/blog/${post.slug}`;
  return {
    title: post.metaTitle,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: { title: post.metaTitle, description: post.excerpt, url, type: 'article', images: [post.image] },
  };
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[m - 1]} ${d}, ${y}`;
}

export default async function BlogPostPage({ params }: PostProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const more = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);
  const whatsapp = encodeURIComponent('Hi! I read your blog and I would like a free quote for couch cleaning.');

  return (
    <div style={{ fontFamily: FONT }}>
      <JsonLd data={articleSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ])}
      />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[440px] flex items-end overflow-hidden bg-black">
        <Image src={post.image} alt={post.title} fill priority quality={85} className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
        <div className="relative z-10 container-custom max-w-4xl pb-14 text-white">
          <Reveal>
            <Link href="/blog" className="text-accent font-semibold mb-4 inline-block">← Back to blog</Link>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight mb-4">{post.title}</h1>
            <p className="text-white/70">{formatDate(post.date)} · {post.readTime}</p>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <article className="space-y-6">
            {post.body.map((block, i) => {
              if (block.type === 'h2') {
                return (
                  <Reveal key={i}>
                    <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 pt-4">{block.text}</h2>
                  </Reveal>
                );
              }
              if (block.type === 'ul') {
                return (
                  <Reveal key={i}>
                    <ul className="space-y-3 pl-1">
                      {block.items?.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-lg text-neutral-700">
                          <span className="w-2 h-2 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                );
              }
              return (
                <Reveal key={i}>
                  <p className="text-lg text-neutral-700 leading-relaxed">{block.text}</p>
                </Reveal>
              );
            })}
          </article>

          {/* Inline CTA */}
          <div className="mt-14 bg-neutral-50 rounded-3xl p-8 md:p-10 text-center border border-neutral-100">
            <h3 className="text-2xl font-bold text-neutral-900 mb-3">Need your couch cleaned?</h3>
            <p className="text-neutral-600 mb-6">Free on site estimates across Utah County and Salt Lake County.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-secondary text-lg px-8 py-3">
                Get a Free Quote
              </a>
              <a href={`tel:${COMPANY_INFO.phone}`} className="bg-primary text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-primary-dark transition-colors duration-300">
                Call {COMPANY_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* More articles */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom max-w-6xl">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 text-center mb-12">More from the blog</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {more.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link href={`/blog/${p.slug}`} className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full">
                  <div className="relative h-44 overflow-hidden">
                    <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-neutral-900 leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
