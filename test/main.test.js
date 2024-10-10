import { describe, expect, test } from 'vitest'
import data from '../src/services/batoibooks'

describe('Ficheros creados', () => {
  test('Existe data en datos.js y contiene 5 libros', () => {
    expect(data.books.length).toBe(5)
  })
})