export interface ISource {
  id?: string
  name: string
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
