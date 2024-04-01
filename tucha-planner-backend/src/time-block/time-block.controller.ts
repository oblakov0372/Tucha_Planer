import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Logger,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { TimeBlockService } from './time-block.service'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { TimeBlockDto } from './dto/time-block.dto'
import { UpdateOrderDto } from './dto/update-order.dto'

@Controller('user/time-blocks')
export class TimeBlockController {
	constructor(private readonly timeBlockService: TimeBlockService) {}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: string) {
		Logger.debug('12345')
		return this.timeBlockService.getAll(userId)
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@Auth()
	@HttpCode(200)
	async create(@Body() dto: TimeBlockDto, @CurrentUser('id') userId: string) {
		return this.timeBlockService.create(dto, userId)
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@Auth()
	@HttpCode(200)
	async update(
		@Body() dto: TimeBlockDto,
		@CurrentUser('id') userId: string,
		@Param('id') id: string
	) {
		Logger.debug('12345')
		return this.timeBlockService.update(dto, userId, id)
	}

	@Delete(':id')
	@Auth()
	@HttpCode(200)
	async delete(@CurrentUser('id') userId: string, @Param('id') id: string) {
		return this.timeBlockService.delete(id, userId)
	}

	@UsePipes(new ValidationPipe())
	@Put('update-order')
	@Auth()
	@HttpCode(200)
	async updateOrder(@Body() updateOrderDto: UpdateOrderDto) {
		Logger.debug('1234')
		return this.timeBlockService.updateOrder(updateOrderDto.ids)
	}
}
