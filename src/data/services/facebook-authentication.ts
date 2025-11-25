import type { LoadFacebookUserApi } from '../../../src/data/contracts/apis/facebook.js'
import { AuthenticationError } from '../../../src/domain/features/errors/authentication.js'
import type { FacebookAuthentication } from '../../../src/domain/features/facebook-authentication.js'

export class FacebookAuthenticationService {
  constructor (private readonly loadFacebookUserApi: LoadFacebookUserApi) { }

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.loadFacebookUserApi.loadUser(params)
    return new AuthenticationError()
  }
}
