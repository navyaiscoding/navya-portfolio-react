/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_CONTACT_API_URL?: string
    readonly VITE_COMPETENCIES_API_URL?: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }