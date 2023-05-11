var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import dayjs from 'dayjs';
import 'dayjs/locale/nl'; // import locale
dayjs.locale('nl');
let VtbFlight = class VtbFlight extends LitElement {
    constructor() {
        super(...arguments);
        this.timezone = '02:00';
        this.dateformat = 'DD MMM (hh:mm)';
        this.type = 'departure';
    }
    render() {
        const datestring = `${this.date}T${this.time}:00`;
        const date = dayjs(datestring);
        if (!this.dateformat || this.dateformat == '') {
            return html `
        <div class="row ${this.type}">
          <div class="date-time"></div>
          <div class="description"><slot></slot></div>
        </div>
      `;
        }
        else {
            return html `
        <div class="row ${this.type}">
          <div class="date-time">${date.format(this.dateformat)}</div>
          <div class="description"><slot></slot></div>
        </div>
      `;
        }
    }
};
VtbFlight.styles = css `
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
__decorate([
    property({ type: String })
], VtbFlight.prototype, "IATA", void 0);
__decorate([
    property({ type: String })
], VtbFlight.prototype, "date", void 0);
__decorate([
    property({ type: String })
], VtbFlight.prototype, "time", void 0);
__decorate([
    property({ type: String })
], VtbFlight.prototype, "timezone", void 0);
__decorate([
    property({ type: String })
], VtbFlight.prototype, "dateformat", void 0);
VtbFlight = __decorate([
    customElement('vtb-flight')
], VtbFlight);
let VtbFlightDeparture = class VtbFlightDeparture extends VtbFlight {
    constructor() {
        super(...arguments);
        this.type = 'departure';
    }
};
VtbFlightDeparture = __decorate([
    customElement('vtb-flight-departure')
], VtbFlightDeparture);
export { VtbFlightDeparture };
let VtbFlightArrival = class VtbFlightArrival extends VtbFlight {
    constructor() {
        super(...arguments);
        this.type = 'arrival';
    }
};
VtbFlightArrival = __decorate([
    customElement('vtb-flight-arrival')
], VtbFlightArrival);
export { VtbFlightArrival };
let VtbFlightElement = class VtbFlightElement extends LitElement {
    render() {
        return html `
      <div class="flight">
        <slot></slot>
        <div class="carrier">${this.carrier}</div>
      </div>
    `;
    }
};
VtbFlightElement.styles = css `
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
__decorate([
    property({ type: String })
], VtbFlightElement.prototype, "flightnumber", void 0);
__decorate([
    property({ type: String })
], VtbFlightElement.prototype, "carrier", void 0);
VtbFlightElement = __decorate([
    customElement('vtb-flight-element')
], VtbFlightElement);
export { VtbFlightElement };
let VtbFlightSchedule = class VtbFlightSchedule extends LitElement {
    constructor() {
        super(...arguments);
        this.dateformat = 'DD MMM (hh:mm)';
    }
    render() {
        let _innerHTML = '';
        if (this.children.length == 0 && this.flightinfo) {
            _innerHTML = this._renderFlightInfo();
        }
        return html `
      <div class="flight-schedule">
        <slot>${_innerHTML}</slot>
      </div>
    `;
    }
    _renderFlightInfo() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        const flightinfo = this.flightinfo;
        const scheduleTemplates = [];
        for (const _schedule of flightinfo) {
            let departure_date = null;
            let departure_time = null;
            let arrival_date = null;
            let arrival_time = null;
            if (((_a = _schedule.departure) === null || _a === void 0 ? void 0 : _a.date) &&
                typeof ((_b = _schedule.departure) === null || _b === void 0 ? void 0 : _b.date) == 'string') {
                departure_date = dayjs((_c = _schedule.departure) === null || _c === void 0 ? void 0 : _c.date);
            }
            if (((_d = _schedule.departure) === null || _d === void 0 ? void 0 : _d.time) &&
                typeof ((_e = _schedule.departure) === null || _e === void 0 ? void 0 : _e.time) == 'string') {
                const _time = _schedule.departure.time;
                const _s = _time.split(/:/);
                departure_time = dayjs()
                    .set('hour', parseInt(_s[0], 10))
                    .set('minute', parseInt(_s[1], 10))
                    .set('second', 0);
            }
            if (((_f = _schedule.arrival) === null || _f === void 0 ? void 0 : _f.date) &&
                typeof ((_g = _schedule.arrival) === null || _g === void 0 ? void 0 : _g.date) == 'string') {
                arrival_date = dayjs((_h = _schedule.arrival) === null || _h === void 0 ? void 0 : _h.date);
            }
            if (((_j = _schedule.arrival) === null || _j === void 0 ? void 0 : _j.time) &&
                typeof ((_k = _schedule.arrival) === null || _k === void 0 ? void 0 : _k.time) == 'string') {
                const _time = _schedule.arrival.time;
                const _s = _time.split(/:/);
                arrival_time = dayjs()
                    .set('hour', parseInt(_s[0], 10))
                    .set('minute', parseInt(_s[1], 10))
                    .set('second', 0);
            }
            scheduleTemplates.push(html `
        <vtb-flight-element carrier=${ifDefined((_l = _schedule.carrier) === null || _l === void 0 ? void 0 : _l.name)}>
          <vtb-flight-departure
            date=${ifDefined(departure_date === null || departure_date === void 0 ? void 0 : departure_date.format('YYYY-MM-DD'))}
            time=${ifDefined(departure_time === null || departure_time === void 0 ? void 0 : departure_time.format('HH:mm'))}
            IATA=${ifDefined((_m = _schedule.departure) === null || _m === void 0 ? void 0 : _m.IATA)}
            dateformat=${this.dateformat}
          >
            ${ifDefined((_o = _schedule.departure) === null || _o === void 0 ? void 0 : _o.description)}
          </vtb-flight-departure>
          <vtb-flight-arrival
            date=${ifDefined(arrival_date === null || arrival_date === void 0 ? void 0 : arrival_date.format('YYYY-MM-DD'))}
            time=${ifDefined(arrival_time === null || arrival_time === void 0 ? void 0 : arrival_time.format('HH:mm'))}
            IATA=${ifDefined((_p = _schedule.arrival) === null || _p === void 0 ? void 0 : _p.IATA)}
            dateformat=${this.dateformat}
          >
            ${ifDefined((_q = _schedule.arrival) === null || _q === void 0 ? void 0 : _q.description)}
          </vtb-flight-arrival>
        </vtb-flight-element>
      `);
        }
        return html `${scheduleTemplates}`;
    }
};
__decorate([
    property({
        type: Array,
    })
], VtbFlightSchedule.prototype, "flightinfo", void 0);
__decorate([
    property({ type: String })
], VtbFlightSchedule.prototype, "dateformat", void 0);
VtbFlightSchedule = __decorate([
    customElement('vtb-flightschedule')
], VtbFlightSchedule);
export { VtbFlightSchedule };
export class VtbFlightData {
    constructor() {
        this.dateformat = 'DD MMM';
        this.timezone = 'UTC+01:00';
    }
}
export class VtbFlightCarrier {
}
export class VtbFlightElementData {
}
export class VtbFlightDataTransformer {
    load(vtbSrcData) {
        const flightElements = [];
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
//# sourceMappingURL=vtb-flightschedule.js.map