const status = {
  SUCCESS: 200,
  CREATED: 201,
  ERROR: 500,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  CONFLICT: 409,
  FORBIDDEN: 403,
  NOTFOUND: 404,
}

const MSG = {
  notFound: 'Not Found',
  notAuthorized: 'Path not authorized',
  dataNotFound: 'Data Not Found',
  somethingWentWrong: 'Something went wrong',
  alreadyExists: 'Already Exists',
  missingRequiredData: 'Missing required data',
  successfulLogin: 'Login successfully',
  notExists: 'Your account not Exists!',
  invalidCredentials: 'Invalid credentials',
  invalidId: 'Invalid ID',
  invalidEmail: 'Invalid E-mail',
  invalidMobileNo: 'Invalid Mobile no.',
  invalidData: 'Invalid data.',
  invalidDateTime: 'Invalid date and time',
  dataCreated: 'Data created',
  unauthorizedAccess: 'Your are not authorized to login, please don\'t try to log in again',
  registeredSuccessfully: 'Registered successfully',
  addedSuccessfully: 'Added successfully',
  loginSuccessfully: 'Login successfully',
  foundSuccessfully: 'Data Found Successfully',
  updatedSuccessfully: 'Updated Successfully',
  deletedSuccessfully: 'Deleted Successfully',
  alreadyDeleted: 'Already deleted',
  releasedLockSuccessfully: 'Lock Released Successfully',
  releasedMultipleLockSuccessfully: 'Multiple Locks Released Successfully',
  userExist: 'User data is already used.',
}


module.exports = {
  status,
  MSG,
}
