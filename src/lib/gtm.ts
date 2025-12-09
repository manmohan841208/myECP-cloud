
export type GTMEvent = {
  event: string;
  [key: string]: any;
};

/** Pushes an event into the GTM dataLayer */
export function pushToDataLayer(evt: GTMEvent) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(evt);
  }
}
