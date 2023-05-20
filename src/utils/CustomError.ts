import { GraphQLError } from 'graphql'

import { type CustomErrorType } from '@src/globalTypes/CustomErrorType'

const defaultErrors = [
  {
    code: 'UNAUTHENTICATED',
    message: 'Es necesario que se autentique a la aplicación',
  },
  {
    code: 'FAILDTODOOPERATION',
    message: 'Hubo un error al realizar la operacion',
  },
  {
    code: 'DBCONNECTION',
    message: 'Hubo un error al conectarse DB.',
  },
]

const CustomError = (error: CustomErrorType): void => {
  const finalError =
    defaultErrors.filter(
      (defaultError) => defaultError.code === error.code,
    )[0] ?? error
  throw new GraphQLError(finalError.message, {
    extensions: { code: error.code },
  })
}

export default CustomError
