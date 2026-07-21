import { Helmet } from 'react-helmet-async'

export default function SEO({ 
  title, 
  description = "Shri Vinayak Engineering Solutions is a leading precision engineering company in Gurgaon offering CNC Machining, VMC Machining, Wire Cut EDM, EDM Drilling, Laser Welding, Laser Engraving, Argon Welding, Tool Room Services, Die & Mold Manufacturing.", 
  name = "Shri Vinayak Engineering Solutions", 
  type = "website",
  url = "https://www.shrivinayakengineeringsolutions.com",
  keywords = "",
  image = "/favicon.jpeg",
  schemas = [] 
}) {
  const defaultKeywords = "Shri Vinayak Engineering Solutions, CNC Machining, CNC Machining Services, VMC Machining, VMC Job Work, Vertical Machining Center, Wire Cut EDM, Wire Cut Machine, EDM Drilling, Fast Hole EDM, Laser Welding, Laser Engraving, Laser Marking, Argon Welding, TIG Welding, Precision Engineering, Tool Room, Die Manufacturing, Mold Manufacturing, Plastic Mold, Press Tool, Jigs and Fixtures, Industrial Components, Precision Components, Custom Machining, Metal Fabrication, Engineering Company, Industrial Engineering, CNC Milling, Precision Manufacturing, Machine Shop India, Engineering Company Gurgaon, Precision Engineering Gurgaon, CNC Company India";
  
  const finalKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

  return (
    <Helmet>
      {/* ── Standard Meta Tags ── */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={finalKeywords} />
      
      {/* ── Language & canonical ── */}
      <html lang="en" />
      <link rel="canonical" href={url} />
      <link rel="icon" href="/favicon.jpeg" type="image/jpeg" />
      
      {/* ── OpenGraph / Facebook ── */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={name} />
      
      {/* ── Twitter ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* ── Mobile & Performance & Security ── */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#10b981" /> {/* Tailwind emerald-500 */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content={name} />
      <meta name="application-name" content={name} />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      
      {/* ── Robots ── */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />

      {/* ── JSON-LD Structured Data ── */}
      {schemas && schemas.length > 0 && schemas.map((schema, index) => (
        <script type="application/ld+json" key={index}>
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
