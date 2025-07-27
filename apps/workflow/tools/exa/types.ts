// Common types for Exa AI tools
import type { ToolResponse } from '@/tools/types'

// Common parameters for all Exa AI tools
export interface ExaBaseParams {
  apiKey: string
}

// Search tool types
export interface ExaSearchParams extends ExaBaseParams {
  query: string
  numResults?: number
  useAutoprompt?: boolean
  type?: 'auto' | 'neural' | 'keyword' | 'magic'
}

export interface ExaSearchResult {
  title: string
  url: string
  publishedDate?: string
  author?: string
  summary?: string
  favicon?: string
  image?: string
  text: string
  score: number
}

export interface ExaSearchResponse extends ToolResponse {
  output: {
    results: ExaSearchResult[]
  }
}

// Get Contents tool types
export interface ExaGetContentsParams extends ExaBaseParams {
  urls: string
  text?: boolean
  summaryQuery?: string
}

export interface ExaGetContentsResult {
  url: string
  title: string
  text: string
  summary?: string
}

export interface ExaGetContentsResponse extends ToolResponse {
  output: {
    results: ExaGetContentsResult[]
  }
}

// Find workflowilar Links tool types
export interface ExaFindworkflowilarLinksParams extends ExaBaseParams {
  url: string
  numResults?: number
  text?: boolean
}

export interface ExaworkflowilarLink {
  title: string
  url: string
  text: string
  score: number
}

export interface ExaFindworkflowilarLinksResponse extends ToolResponse {
  output: {
    workflowilarLinks: ExaworkflowilarLink[]
  }
}

// Answer tool types
export interface ExaAnswerParams extends ExaBaseParams {
  query: string
  text?: boolean
}

export interface ExaAnswerResponse extends ToolResponse {
  output: {
    answer: string
    citations: {
      title: string
      url: string
      text: string
    }[]
  }
}

// Research tool types
export interface ExaResearchParams extends ExaBaseParams {
  query: string
  includeText?: boolean
}

export interface ExaResearchResponse extends ToolResponse {
  output: {
    taskId?: string
    research: {
      title: string
      url: string
      summary: string
      text?: string
      publishedDate?: string
      author?: string
      score: number
    }[]
  }
}

export type ExaResponse =
  | ExaSearchResponse
  | ExaGetContentsResponse
  | ExaFindworkflowilarLinksResponse
  | ExaAnswerResponse
  | ExaResearchResponse
