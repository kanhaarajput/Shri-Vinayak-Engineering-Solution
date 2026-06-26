import { Helmet } from 'react-helmet-async'

export default function SEO({ 
  title, 
  description = "Shri Vinayak Engineering Solutions specializes in advanced laser welding, VMC wirecut job work, and precise die & mould repairing.", 
  name = "Shri Vinayak Engineering Solutions", 
  type = "website" 
}) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* OpenGraph tags for social media sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={name} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
