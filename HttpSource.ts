import { RequestOptions, RESTDataSource } from "apollo-datasource-rest"
import { Body, RequestInit, Response } from "apollo-server-env"


export interface MockMethod<ResponseType = any> {
  (method: string, path: string, body?: Body, init?: RequestInit): Promise<
    ResponseType
  >
}

export abstract class HttpSource extends RESTDataSource {
  public fetchMock: MockMethod | null = null

  protected constructor() {
    super()
    // unfortunately the mocking story with jest, apollo-server-env, and node fetch is not straightforward
    // so we provide testing hooks that we can control to allow for easily inserting a jest mock
    if (process.env.NODE_ENV === "test") {
      ;["post", "delete", "get", "put", "patch"].forEach(method => {
        ;(this as any)[method] = (path: any, body?: any, init?: any) => {
          if (this.fetchMock) {
            return init
              ? this.fetchMock(method, path, body, init)
              : this.fetchMock(method, path, body)
          } else {
            return (this as any)[method](path, body, init)
          }
        }
      })
    }
  }

  // this works in conjunction with our mocking in the constructor
  // to allow us to insert a mock implementation for our various http methods
  public setMock(mock: MockMethod) {
    if (process.env.NODE_ENV === "test") {
      this.fetchMock = mock
    } else {
      throw new Error(
        'You may only use HttpSource.setMock in test. Ensure that you are not using this in another environment and that process.env.NODE_ENV is "test"'
      )
    }
  }
}
