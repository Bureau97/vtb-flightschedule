import { LitElement } from 'lit';
import { TemplateResult } from 'lit-element';
import 'dayjs/locale/nl';
declare class VtbFlight extends LitElement {
    IATA?: string;
    date?: string;
    time?: string;
    timezone: string;
    dateformat: string;
    type: string;
    static styles: import("lit").CSSResult;
    render(): TemplateResult<1>;
}
export declare class VtbFlightDeparture extends VtbFlight {
    type: string;
}
export declare class VtbFlightArrival extends VtbFlight {
    type: string;
}
export declare class VtbFlightElement extends LitElement {
    flightnumber?: string;
    carrier?: string;
    static styles: import("lit").CSSResult;
    render(): TemplateResult<1>;
}
export declare class VtbFlightSchedule extends LitElement {
    flightinfo?: Array<VtbFlightData>;
    dateformat: string;
    render(): TemplateResult<1>;
    private _renderFlightInfo;
}
declare global {
    interface HTMLElementTagNameMap {
        'vtb-flightschedule': VtbFlightSchedule;
        'vtb-flight-element': VtbFlightElement;
        'vtb-flight-departure': VtbFlightDeparture;
        'vtb-flight-arrival': VtbFlightArrival;
    }
}
export declare class VtbFlightData {
    date?: Date;
    time?: Date;
    IATA?: string;
    dateformat?: string;
    timezone?: string;
    country?: string;
    city?: string;
    description?: string;
}
export declare class VtbFlightCarrier {
    name?: string;
    code?: string;
}
export declare class VtbFlightElementData {
    departure?: VtbFlightData;
    arrival?: VtbFlightData;
    carrier?: VtbFlightCarrier;
    flightnumber?: string;
    day?: number;
}
export declare class VtbFlightDataTransformer {
    load(vtbSrcData: any): VtbFlightElementData[];
}
export {};
//# sourceMappingURL=vtb-flightschedule.d.ts.map