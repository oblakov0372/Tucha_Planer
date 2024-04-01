import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { PomodoroService } from './pomodoro.service'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { PomodoroRoundDto, PomodoroSessionDto } from './pomodoro.dto'

@Controller('user/timer')
export class PomodoroController {
	constructor(private readonly pomodoroService: PomodoroService) {}

	@Get('today')
	@Auth()
	async getTodaySession(@CurrentUser('id') userId: string) {
		return this.pomodoroService.getTodaySession(userId)
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@Auth()
	@HttpCode(200)
	async create(@CurrentUser('id') userId: string) {
		return this.pomodoroService.create(userId)
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@Auth()
	@HttpCode(200)
	async update(
		@Body() dto: PomodoroSessionDto,
		@CurrentUser('id') userId: string,
		@Param('id') id: string
	) {
		return this.pomodoroService.update(dto, userId, id)
	}

	@UsePipes(new ValidationPipe())
	@Put('/round/:id')
	@Auth()
	@HttpCode(200)
	async updateRound(@Body() dto: PomodoroRoundDto, @Param('id') id: string) {
		return this.pomodoroService.updateRound(dto, id)
	}

	@Delete(':id')
	@Auth()
	@HttpCode(200)
	async delete(@CurrentUser('id') userId: string, @Param('id') id: string) {
		return this.pomodoroService.deleteSession(id, userId)
	}
}
