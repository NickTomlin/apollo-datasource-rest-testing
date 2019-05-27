import { HttpSource, MockMethod } from "../HttpSource"
import { HTTPCache } from "apollo-datasource-rest"

export function mockSource<SourceType extends HttpSource>(
  source: SourceType,
  mockImpl?: MockMethod
): [SourceType, MockMethod] {
  const store = new Map<string, string>()
  source.httpCache = new HTTPCache({
    async get(key: string) {
      return store.get(key)
    },
    async set(key: string, value: string) {
      store.set(key, value)
    },
    async delete(key: string) {
      store.delete(key)
    }
  })

  const mock = mockImpl
    ? jest.fn().mockImplementation(mockImpl)
    : jest.fn().mockImplementation(async () => null)
  source.fetchMock = mock
  return [source, mock]
}
