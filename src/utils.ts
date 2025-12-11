import type { Frameworks as FrameworksType } from "./types/globals";

export function projectHeight(h: number, angle: number = 45): number {
  const rad = (angle * Math.PI) / 180;
  return h * Math.cos(rad);
}

export function sleep(ms: number) {
  return new Promise((res) => {
    setTimeout(() => {
      res(null)
    }, ms)
  })
}


export const Frameworks: FrameworksType = {
  'FRONTEND': [
    { iconName: "co-react", toolName: "React" },
    { iconName: "co-angular", toolName: "Angular" },
    { iconName: "si-vuedotjs", toolName: "Vue.js" },
    { iconName: "co-next-js", toolName: "Next.js" },
    { iconName: "co-redux", toolName: "Redux" },
    { iconName: "si-tailwindcss", toolName: "TailwindCSS" },
    { iconName: "fa-bootstrap", toolName: "Bootstrap" },
    { iconName: "gi-jester-hat", toolName: "Jest" },
    { iconName: "si-reactrouter", toolName: "React Router" },
    { iconName: "si-antdesign", toolName: "Ant Design" },
    { iconName: "si-semanticuireact", toolName: "Semantic UI React" },
    { iconName: "si-reactquery", toolName: "React Query" }
  ],
  'BACKEND': [
    { iconName: "la-node-js", toolName: "Node.js" },
    { iconName: "si-express", toolName: "Express" },
    { iconName: "fa-hard-hat", toolName: "Hardhat" },
    { iconName: "co-graphql", toolName: "GraphQL" },
    { iconName: "co-socket-io", toolName: "Socket.io" },
    { iconName: "si-prisma", toolName: "Prisma" },
    { iconName: "co-postman", toolName: "Postman" },
    { iconName: "si-jsonwebtokens", toolName: "JWT" },
    { iconName: "co-docker", toolName: "Docker" },
    { iconName: "ai-zotero", toolName: "Zod" },
    { iconName: "io-logo-vercel", toolName: "Vercel" },
    { iconName: "co-lets-encrypt", toolName: "Encryption" }
  ],
  DATABASE: [
    { iconName: "si-postgresql", toolName: "PostgreSQL" },
    { iconName: "co-mysql", toolName: "MySQL" },
    { iconName: "si-sqlite", toolName: "SQLite" },
    { iconName: "si-microsoftsqlserver", toolName: "SQL Server" },
    { iconName: "si-supabase", toolName: "Supabase" },
    { iconName: "si-mongodb", toolName: "MongoDB" }
  ],
  MOBILE: [
    { iconName: "si-react", toolName: "React Native" },
    { iconName: "co-expo", toolName: "Expo" },
    { iconName: "co-gradle", toolName: "Gradle" },
    { iconName: "io-logo-google-playstore", toolName: "Google Play" },
    { iconName: "si-androidstudio", toolName: "Android Studio" },
    { iconName: "co-android-alt", toolName: "Android" }
  ],
  TOOLING: [
    { iconName: "bi-git", toolName: "Git" },
    { iconName: "bi-github", toolName: "GitHub" },
    { iconName: "co-visual-studio-code", toolName: "Visual Studio Code" },
    { iconName: "gi-artificial-intelligence", toolName: "AI tools" },
    { iconName: "la-jira", toolName: "Jira" },
    { iconName: "co-npm", toolName: "NPM" },
    { iconName: "co-eslint", toolName: "ESLint" },
    { iconName: "fa-figma", toolName: "Figma" },
    { iconName: "co-confluence", toolName: "Confluence" },
    { iconName: "si-vite", toolName: "Vite" },
    { iconName: "si-netlify", toolName: "Netlify" },
    { iconName: "co-canva", toolName: "Canva" }
  ]
}