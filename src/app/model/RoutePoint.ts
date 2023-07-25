//   { lon: -76.012, lat: 40.789, alt: 2000 },

export type RoutePoint = {
    lon: number;
    lat: number;
    alt: number;
};

export type Route = Array<RoutePoint>;
