import Link from 'next/link';

// Visible breadcrumb trail. Pairs with the BreadcrumbList JSON-LD already on each
// page, helps users orient, and prevents orphan pages (per local SEO best practice).
export default function Breadcrumbs({ items }: { items: { name: string; url: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="bg-neutral-50 border-b border-neutral-100">
      <ol className="container-custom max-w-6xl flex flex-wrap items-center gap-2 py-4 text-sm text-neutral-500">
        {items.map((item, i) => (
          <li key={item.url} className="flex items-center gap-2">
            {i < items.length - 1 ? (
              <>
                <Link href={item.url} className="hover:text-primary transition-colors">
                  {item.name}
                </Link>
                <span className="text-neutral-300">/</span>
              </>
            ) : (
              <span className="text-neutral-800 font-medium">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
