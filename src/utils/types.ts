export interface ISource {
  id?: string
  name: string
  description?: string
  url?: string
  category?: string
  language?: string
  country?: string
}

export interface IArticle {
  author: string
  content: string
  description: string
  publishedAt: string
  source: ISource
  title: string
  url: string
  urlToImage: string
}

