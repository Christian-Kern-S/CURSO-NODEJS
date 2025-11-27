import type { LoadFacebookUserApi } from '../../../src/data/contracts/apis/facebook.js'
import { AuthenticationError } from '../../../src/domain/features/errors/authentication.js'
import type { FacebookAuthentication } from '../../../src/domain/features/facebook-authentication.js'
import type { LoadUserAccountRepository } from '../../../src/data/contracts/repos/user-account.js'

export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserApi: LoadFacebookUserApi,
    private readonly loadUserAccountRepo: LoadUserAccountRepository
  ) { }

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.loadFacebookUserApi.loadUser(params)
    if (fbData !== undefined) {
      await this.loadUserAccountRepo.load({ email: fbData.email })
    }
    return new AuthenticationError()
  }
}
