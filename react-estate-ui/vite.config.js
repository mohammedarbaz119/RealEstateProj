import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({mode})=>{
  // eslint-disable-next-line no-undef
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(),"")};
  return defineConfig({
    plugins: [react()],
    server:{
      proxy:{
        '/api':{
          // eslint-disable-next-line no-undef
          target:process.env.VITE_API_URL||'http://localhost:3000',
          changeOrigin:true,
        }
      }
    }
  })
}

