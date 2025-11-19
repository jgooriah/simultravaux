/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Désactiver complètement le Static Site Generation
  // Toutes les pages seront rendues dynamiquement
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Désactiver le pré-rendu au build time
  skipTrailingSlashRedirect: true,
  output: undefined, // Pas de standalone
}

export default nextConfig


