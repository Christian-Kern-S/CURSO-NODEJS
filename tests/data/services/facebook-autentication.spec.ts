import { AuthenticationError } from '../../../src/domain/features/errors/authentication.js'
import type { FacebookAuthentication } from '../../../src/domain/features/facebook-authentication.js'
import type { LoadFacebookUserApi } from '../../../src/data/contracts/apis/facebook.js'

class FacebookAuthenticationService {
  constructor (private readonly loadFacebookUserApi: LoadFacebookUserApi) { }

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.loadFacebookUserApi.loadUser(params)
    return new AuthenticationError()
  }
}

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  result = undefined

  async loadUser (params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    this.token = params.token
    return this.result
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.token).toBe('any_token')
  })

  it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    loadFacebookUserApi.result = undefined
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
