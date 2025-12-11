export type Lang = 'en'|'es'

export type MenuItem = {
  text: string,
  href: string
}

export type FrameworkItem = {
  toolName: string
  iconName: string,
}

export type Frameworks = {
  'FRONTEND': Array<FrameworkItem>
  'BACKEND': Array<FrameworkItem>
  'DATABASE': Array<FrameworkItem>
  'MOBILE': Array<FrameworkItem>
  'TOOLING': Array<FrameworkItem>
}