import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {TemplateResult} from 'lit-element';

import dayjs, {type Dayjs} from 'dayjs';
import 'dayjs/locale/nl'; // import locale
dayjs.locale('nl');

@customElement('vtb-flight')
class VtbFlight extends LitElement {
  @property({type: String})
  IATA?: string;

  @property({type: String})
  date?: string;

  @property({type: String})
  time?: string;

  @property({type: String})
  timezone = '02:00';

  @property({type: String})
  dateformat = 'DD MMM (hh:mm)';

  type = 'departure';

  static override styles = css`
    :host {
      width: 100%;
    }

    .row > div {
      display: inline-block;
    }

    .date,
    .time,
    .description,
    .carrier {
      padding: 0 1rem;
    }
  `;

  override render() {
    const datestring = `${this.date}T${this.time}:00`;
    const date = dayjs(datestring);

    if (!this.dateformat || this.dateformat == '') {
      return html`
        <div class="row ${this.type}">
          <div class="date-time"></div>
          <div class="description"><slot></slot></div>
        </div>
      `;
    } else {
      return html`
        <div class="row ${this.type}">
          <div class="date-time">${date.format(this.dateformat)}</div>
          <div class="description"><slot></slot></div>
        </div>
      `;
    }
  }
}

@customElement('vtb-flight-departure')
export class VtbFlightDeparture extends VtbFlight {
  override type = 'departure';
}

@customElement('vtb-flight-arrival')
export class VtbFlightArrival extends VtbFlight {
  override type = 'arrival';
}

@customElement('vtb-flight-element')
export class VtbFlightElement extends LitElement {
  @property({type: String})
  flightnumber?: string;

  @property({type: String})
  carrier?: string;

  static override styles = css`
    :host {
      width: 100%;
    }

    .flight {
      display: grid;
      grid-template-columns: 2fr 2fr 1fr;
      column-gap: 0.5rem;
      row-gap: 0.5rem;
    }
  `;

  override render() {
    return html`
      <div class="flight">
        <slot></slot>
        <div class="carrier">${this.carrier}</div>
      </div>
    `;
  }
}

@customElement('vtb-flightschedule')
export class VtbFlightSchedule extends LitElement {
  @property({
    type: Array,
  })
  flightinfo?: Array<VtbFlightData>;

  @property({type: String})
  dateformat = 'DD MMM (hh:mm)';

  override render() {
    let _innerHTML: string | TemplateResult = '';
    if (this.children.length == 0 && this.flightinfo) {
      _innerHTML = this._renderFlightInfo();
    }
    return html`
      <div class="flight-schedule">
        <slot>${_innerHTML}</slot>
      </div>
    `;
  }

  private _renderFlightInfo() {
    const flightinfo = this.flightinfo as Array<VtbFlightElementData>;

    const scheduleTemplates = [];
    for (const _schedule of flightinfo) {
      let departure_date: string | Dayjs | Date | null = null;
      let departure_time: string | Dayjs | Date | null = null;
      let arrival_date: string | Dayjs | Date | null = null;
      let arrival_time: string | Dayjs | Date | null = null;

      if (
        _schedule.departure?.date &&
        typeof _schedule.departure?.date == 'string'
      ) {
        departure_date = dayjs(_schedule.departure?.date);
      }

      if (
        _schedule.departure?.time &&
        typeof _schedule.departure?.time == 'string'
      ) {
        const _time = _schedule.departure.time as string;
        const _s = _time.split(/:/);

        departure_time = dayjs()
          .set('hour', parseInt(_s[0], 10))
          .set('minute', parseInt(_s[1], 10))
          .set('second', 0);
      }

      if (
        _schedule.arrival?.date &&
        typeof _schedule.arrival?.date == 'string'
      ) {
        arrival_date = dayjs(_schedule.arrival?.date);
      }

      if (
        _schedule.arrival?.time &&
        typeof _schedule.arrival?.time == 'string'
      ) {
        const _time = _schedule.arrival.time as string;
        const _s = _time.split(/:/);

        arrival_time = dayjs()
          .set('hour', parseInt(_s[0], 10))
          .set('minute', parseInt(_s[1], 10))
          .set('second', 0);
      }

      scheduleTemplates.push(html`
        <vtb-flight-element carrier=${ifDefined(_schedule.carrier?.name)}>
          <vtb-flight-departure
            date=${ifDefined(departure_date?.format('YYYY-MM-DD'))}
            time=${ifDefined(departure_time?.format('HH:mm'))}
            IATA=${ifDefined(_schedule.departure?.IATA)}
            dateformat=${this.dateformat}
          >
            ${ifDefined(_schedule.departure?.description)}
          </vtb-flight-departure>
          <vtb-flight-arrival
            date=${ifDefined(arrival_date?.format('YYYY-MM-DD'))}
            time=${ifDefined(arrival_time?.format('HH:mm'))}
            IATA=${ifDefined(_schedule.arrival?.IATA)}
            dateformat=${this.dateformat}
          >
            ${ifDefined(_schedule.arrival?.description)}
          </vtb-flight-arrival>
        </vtb-flight-element>
      `);
    }
    return html`${scheduleTemplates}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vtb-flightschedule': VtbFlightSchedule;
    'vtb-flight-element': VtbFlightElement;
    'vtb-flight-departure': VtbFlightDeparture;
    'vtb-flight-arrival': VtbFlightArrival;
  }
}

export class VtbFlightData {
  date?: Date;
  time?: Date;
  IATA?: string;
  dateformat?: string = 'DD MMM';
  timezone?: string = 'UTC+01:00';
  country?: string;
  city?: string;
  description?: string;
}

export class VtbFlightCarrier {
  name?: string;
  code?: string;
}

export class VtbFlightElementData {
  departure?: VtbFlightData;
  arrival?: VtbFlightData;
  carrier?: VtbFlightCarrier;
  flightnumber?: string;
  day?: number;
}

export class VtbFlightDataTransformer {
  load(vtbSrcData: any) {  // eslint-disable-line @typescript-eslint/no-explicit-any
    const flightElements: Array<VtbFlightElementData> = [];
    for (const segment of vtbSrcData.segments) {
      if (!segment.flightinfo || segment.flightinfo.length <= 0) {
        continue;
      }

      for (const flight of segment.flightinfo) {
        const carrier = new VtbFlightCarrier();
        carrier.name = flight.airlineObject.carrier_name;
        carrier.code = flight.airlineObject.carrier_code;

        const departure = new VtbFlightData();
        departure.date = new Date(flight.departureDate);
        // departure.time = new Date().setTime(flight.departureTime);
        departure.IATA = flight.departureAirport;
        departure.description = flight.departureAirportObject.description;
        departure.country = flight.departureAirportObject.country;
        departure.city = flight.departureAirportObject.city;

        const arrival = new VtbFlightData();
        arrival.date = new Date(flight.arrivalDate);
        // arrival.time = new Date().setTime(flight.arrivalTime);
        arrival.IATA = flight.arrivalAirport;
        arrival.description = flight.arrivalAirportObject.description;
        arrival.country = flight.arrivalAirportObject.country;
        arrival.city = flight.arrivalAirportObject.city;

        const flightElement = new VtbFlightElementData();
        flightElement.carrier = carrier;
        flightElement.departure = departure;
        flightElement.arrival = arrival;
        flightElement.flightnumber = flight.flightNumber;
        flightElement.day = segment.day;

        flightElements.push(flightElement);
      }
    }

    return flightElements;
  }
}
