import {describe, expect, test} from '@jest/globals'
import {bookExists} from '../bookExists'

describe("Does book exists", () => {
  test('book number 3 exists', async () => {
    const book_id = 3
    const book = bookExists(book_id)
    expect(book).toBeTruthy()
  })
  test('book number 999 does not exists', async () => {
    const book_id = 999
    const book = bookExists(book_id)
    expect(book).toBeFalsy()
  })

})
