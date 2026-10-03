import { z } from 'zod'
import { createTool } from '@mastra/core/tools'
import { browserbase } from '@browserbasehq/stagehand'

const BROWSERBASE_SEARCH_RESULTS_LIMIT = 5

interface WebSearchResult {
  id: string
  title: string
  url: string
  author: string | null
  favicon: string | null
  image: string | null
  publishedDate: string | null
  content: string | Record<string, unknown>
  contentType: string
}

export const webSearchTool = createTool({
  id: 'web-search-tool',
  description:
    'Searches the web for a given query and fetches the full page content (as markdown) for each top result. Use this when you need current information, facts, or content not available in your training data — news, documentation, articles, or anything requiring up-to-date web content. Returns a list of results, each with title, URL, author, published date, and the fetched page content.',
  inputSchema: z.object({
    query: z.string(),
  }),
  outputSchema: z.object({
    results: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        url: z.string(),
        author: z.string().nullable(),
        favicon: z.string().nullable(),
        image: z.string().nullable(),
        publishedDate: z.string().nullable(),
        content: z.string().or(z.record(z.string(), z.unknown())),
        contentType: z.string(),
      })
    ),
  }),
  execute: async ({ query }, { abortSignal }) => {
    let searchResults: WebSearchResult[] = []
    const apiKey = process.env.BROWSERBASE_API_KEY!

    const { results } = await browserbase.search({
      apiKey,
      query,
      numResults: BROWSERBASE_SEARCH_RESULTS_LIMIT,
    })

    // fetch top results content
    const settled = await Promise.allSettled(
      results.map(async result => {
        const page = await browserbase.fetch({
          apiKey,
          url: result.url,
          format: 'markdown',
        })

        return {
          id: result.id,
          title: result.title,
          url: result.url,
          author: result?.author ?? null,
          favicon: result?.favicon ?? null,
          image: result?.image ?? null,
          publishedDate: result?.publishedDate ?? null,
          content: page.content,
          contentType: page.contentType,
        } satisfies WebSearchResult
      })
    )

    searchResults = settled
      .filter(
        (s): s is PromiseFulfilledResult<WebSearchResult> =>
          s.status == 'fulfilled'
      )
      .map(s => s.value)

    return {
      results: searchResults,
    }
  },
})
