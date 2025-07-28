import type {
  ExaFindworkflowilarLinksParams,
  ExaFindworkflowilarLinksResponse,
} from '@/tools/exa/types'
import type { ToolConfig } from '@/tools/types'

export const findworkflowilarLinksTool: ToolConfig<
  ExaFindworkflowilarLinksParams,
  ExaFindworkflowilarLinksResponse
> = {
  id: 'exa_find_workflowilar_links',
  name: 'Exa Find workflowilar Links',
  description:
    'Find webpages workflowilar to a given URL using Exa AI. Returns a list of workflowilar links with titles and text snippets.',
  version: '1.0.0',

  params: {
    url: {
      type: 'string',
      required: true,
      visibility: 'user-or-llm',
      description: 'The URL to find workflowilar links for',
    },
    numResults: {
      type: 'number',
      required: false,
      visibility: 'user-only',
      description: 'Number of workflowilar links to return (default: 10, max: 25)',
    },
    text: {
      type: 'boolean',
      required: false,
      visibility: 'user-or-llm',
      description: 'Whether to include the full text of the workflowilar pages',
    },
    apiKey: {
      type: 'string',
      required: true,
      visibility: 'user-only',
      description: 'Exa AI API Key',
    },
  },

  request: {
    url: 'https://api.exa.ai/findworkflowilar',
    method: 'POST',
    isInternalRoute: false,
    headers: (params) => ({
      'Content-Type': 'application/json',
      'x-api-key': params.apiKey,
    }),
    body: (params) => {
      const body: Record<string, any> = {
        url: params.url,
      }

      // Add optional parameters if provided
      if (params.numResults) body.numResults = params.numResults

      // Add contents.text parameter if text is true
      if (params.text) {
        body.contents = {
          text: true,
        }
      }

      return body
    },
  },

  transformResponse: async (response: Response) => {
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Failed to find workflowilar links')
    }

    return {
      success: true,
      output: {
        workflowilarLinks: data.results.map((result: any) => ({
          title: result.title || '',
          url: result.url,
          text: result.text || '',
          score: result.score || 0,
        })),
      },
    }
  },

  transformError: (error) => {
    return error instanceof Error
      ? error.message
      : 'An error occurred while finding workflowilar links'
  },
}
