import { IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsString()
	email: String

	@MinLength(6, { message: 'Password must be at least 6 characterks long' })
	@IsString()
	password: String
}
