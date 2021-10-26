import {authorExists} from '../authorExists'

describe("Does author exists", () => {
  test('author number 3 exists', async () => {
    const author_id = 3
    const author = authorExists(author_id)
    expect(author).toBeTruthy()
  })
  test('author number 999 does not exists', async () => {
    const author_id = 999
    const author = authorExists(author_id)
    expect(author).toBeFalsy()
  })

})
