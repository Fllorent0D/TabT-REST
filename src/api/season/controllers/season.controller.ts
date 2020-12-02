import { Controller, Get } from '@nestjs/common';
import { SeasonService } from '../../../services/seasons/season.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SeasonEntry } from '../../../entity/tabt-soap/TabTAPI_Port';
import { TabtException } from '../../../common/filter/tabt-exceptions.filter';

@Controller('seasons')
@ApiTags('Seasons')
export class SeasonController {
  constructor(
    private seasonService: SeasonService,
  ) {
  }

  @Get()
  @ApiOperation({
    operationId: 'findAllSeason'
  })
  @ApiResponse({
    description: 'A list of seasons.',
    type: [SeasonEntry],
    status: 200,
  })
  @ApiResponse({
    status: 400,
    type: TabtException,
  })
  findAll() {
    return this.seasonService.getSeasons();
  }

  @Get('current')
  @ApiOperation({
    operationId: 'findCurrentSeason'
  })
  @ApiResponse({
    description: 'The current season.',
    type: SeasonEntry,
    status: 200,
  })
  @ApiResponse({
    status: 400,
    type: TabtException,
  })
  findCurrentSeason() {
    return this.seasonService.getCurrentSeason();
  }

}
