import { HttpSource } from "./HttpSource"

export class CustomDataSource extends HttpSource {
  constructor() {
    super()
    this.baseURL = `http://localhost:1337/api`
  }

  async greet() {
    const response = await this.post("/greeting", { greeting: 'hello' })

    return `we received a response of: ${response}`
  }
}
