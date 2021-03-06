import { Controller, Get } from '@nestjs/common';
import { DNSHealthIndicator, HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TestRequestService } from '../../../services/test/test-request.service';
import { TestOutput } from '../../../entity/tabt-soap/TabTAPI_Port';
import { TabtHeadersDecorator } from '../../../common/decorators/tabt-headers.decorator';
import { ContextService } from '../../../common/context/context.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private dns: DNSHealthIndicator,
    private testRequest: TestRequestService,
    private contextService: ContextService,
  ) {
  }

  @Get()
  @ApiOperation({
    operationId: 'checkHealth',
  })
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.dns.pingCheck('AFTT API', 'https://resultats.aftt.be/api/?wsdl'),
      () => this.dns.pingCheck('VTTL API', 'https://api.vttl.be/?wsdl'),
    ]);
  }

  @Get('test')
  @ApiOperation({
    operationId: 'testRequest',
  })
  @ApiOkResponse({
    type: TestOutput,
    description: 'Test request',
  })
  @TabtHeadersDecorator()
  test() {
    return this.testRequest.testRequest();
  }

  @Get('context')
  @ApiOperation({
    operationId: 'testRequest',
  })
  @TabtHeadersDecorator()
  context() {
    return this.contextService.context;
  }


}
