import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-[120px] font-extrabold leading-none gradient-text-primary">
          404
        </h1>
        <p className="text-2xl font-semibold mt-4 mb-2">Page not found</p>
        <p className="text-muted-foreground mb-10">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild size="lg">
          <Link to="/">Go back home</Link>
        </Button>
      </motion.div>
    </div>
  )
}
