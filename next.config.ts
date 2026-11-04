
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images:{
    remotePatterns:[
       {
      hostname:"images.unsplash.com"
    },
       {
      hostname:"plus.unsplash.com"
    },

    

    ]
   

    
  }
};

export default nextConfig;
