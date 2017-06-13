/* global expect, test */
import generateRandomId from './generate-random-id'

export function apiKeyTests (space) {
  test('Gets apiKeys', () => {
    return space.getApiKeys()
    .then((response) => {
      expect(response.sys).toBeTruthy()
      expect(response.items).toBeTruthy()
    })
  })

  test('Create apiKey with id', () => {
    const id = generateRandomId('apiKey')
    return space.createApiKeyWithId(id, {
      name: generateRandomId('testapiKey'),
      description: 'test api key'
    })
    .then((apiKey) => {
      expect(apiKey.sys.id).toBe(id)
      return apiKey.delete()
    })
  })

  test('Create apiKey', () => {
    const name = generateRandomId('name')
    return space.createApiKey({
      name: name,
      description: 'test api key'
    })
    .then((apiKey) => {
      expect(apiKey.names).toBe(name)
      const updatedname = generateRandomId('updatedname')
      apiKey.name = updatedname
      apiKey.update()
      .then((updatedApiKey) => {
        expect(updatedApiKey.name).toBe(updatedname)
        return updatedApiKey.delete()
      })
    })
  })
}
