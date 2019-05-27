import {CustomDataSource} from "../CustomDataSource"
import {mockSource} from "./datasourceTestUtil"

describe("Mocking apollo data sources", () => {
  it("we can use our custom mock wrapper to mock http requests from a subclass", async () => {
    const [source, mock] = mockSource(new CustomDataSource(), async (method) => {
      return "hi"
    })

    const response = await source.greet()
    expect(mock).toHaveBeenCalledWith(
      "post",
      "/greeting",
      { greeting: "hello" }
    )
    expect(response).toEqual("we received a response of: hi")
  })
})
