import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
// import { styleMap, StyleInfo } from "lit/directives/style-map.js";
// import { ifDefined } from "lit/directives/if-defined.js";

import * as dayjs from 'dayjs';
import 'dayjs/locale/nl' // import locale

dayjs.locale('nl');

@customElement('vtb-flight')
class VtbFlight extends LitElement {

  @property({type:String})
  IATA?:string;

  @property({type:String})
  date?:string;

  @property({type:String})
  time?:string;

  @property({type:String})
  timezone:string = '02:00';

  @property({type:String})
  dateformat: string = 'DD MMM (hh:mm)';

  type: string = 'departure';

  static override styles = css`
    :host {
      width: 100%;
    }

    .row {
      // display: flex;
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
    }
    else {

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
  override type: string = 'departure';
}

@customElement('vtb-flight-arrival')
export class VtbFlightArrival extends VtbFlight {
  override type: string = 'arrival';
}


@customElement("vtb-flight-element")
export class VtbFlightElement extends LitElement {
  @property({type: String})
  flightnumber?: string;

  @property({type:String})
  carrier?:string;

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

@customElement("vtb-flightschedule")
export class VtbFlightSchedule extends LitElement {

  @property({type: Object})
  flightinfo?:Object|Array<any>;

  static override styles = css`
    :host {
    }
  `;

  override render() {
    console.info(this.children, this.flightinfo);
    let _innerHTML = '';
    if (this.children.length == 0 && this.flightinfo) {
      _innerHTML = 'render time@';
    }
    return html`
      <div class="flight-schedule">
        <slot>${_innerHTML}</slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "vtb-flightschedule": VtbFlightSchedule,
    "vtb-flight-element": VtbFlightElement,
    "vtb-flight-departure": VtbFlightDeparture,
    "vtb-flight-arrival": VtbFlightArrival,
  }
}
