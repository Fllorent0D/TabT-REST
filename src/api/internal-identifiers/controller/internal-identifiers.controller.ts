import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InternalIdentifiers, UniqueIdentifiers } from '../dto/register.dto';
import { InternalIdMapperService } from '../../../services/id-mapper/internal-id-mapper.service';

@ApiTags('Internal Identifiers')
@Controller('internal-identifiers')
export class InternalIdentifiersController {

  constructor(
    private readonly internalMapper: InternalIdMapperService,
  ) {
  }

  @Get()
  @ApiOperation({
    operationId: 'getRegisterLink',
  })
  @ApiOkResponse({
    type: InternalIdentifiers,
    description: 'Get a link to be able to register a user',
  })
  async findAll(
    @Query() input: UniqueIdentifiers,
  ): Promise<InternalIdentifiers> {
    const playerId = await this.internalMapper.getInternalPlayerId(input.playerUniqueIndex);
    const clubId = await this.internalMapper.getInternalClubId(input.clubUniqueIndex);

    return {
      playerInternalIdentifier: playerId,
      clubInternalIdentifier: clubId,
    };
  }
}
