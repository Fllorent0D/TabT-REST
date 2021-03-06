import { HttpService, Injectable } from '@nestjs/common';
import { OSMAddress } from '../../entity/osm/osm-search.model';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class GeocoderService {

  constructor(
    private httpClient: HttpService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(GeocoderService.name);
  }


  async search(street: string, town: string, postalCode: string) {
    const url = `https://nominatim.openstreetmap.org/search`;
    this.logger.debug({
      street: street,
      town: town,
      postalcode: postalCode,
    });
    const response = await this.httpClient.get<OSMAddress[]>(url, {
      params: {
        street: street,
        town: town,
        postalcode: postalCode,
        format: 'json',
        limit: 1,
        addressdetails: 1,
        country: 'be',
      },
      headers: {
        'User-Agent': 'BePing',
      },
    }).toPromise();

    const data = response.data;
    this.logger.debug(data);
    if (data.length > 0) {
      return data[0];
    }

    throw new Error('Address details not found');
  }

}
