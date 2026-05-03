// Approximate continent silhouettes as polygons in [lng, lat] space.
// Used by WorldMap and Globe to produce a continent-shaped dot pattern
// instead of a random / fully even distribution.
//
// Coordinates are intentionally rough — the dot grid resolution hides the
// imperfection. The goal is recognizable, not cartographically accurate.

export const LAND_POLYGONS: ReadonlyArray<ReadonlyArray<readonly [number, number]>> = [
  // North America (mainland)
  [
    [-168, 65], [-160, 70], [-145, 70], [-125, 70], [-108, 75], [-85, 75],
    [-72, 76], [-60, 70], [-55, 60], [-55, 50], [-65, 45], [-72, 42],
    [-80, 33], [-87, 30], [-95, 28], [-105, 22], [-110, 23], [-115, 30],
    [-120, 34], [-124, 40], [-128, 50], [-138, 58], [-155, 60], [-165, 60],
  ],
  // Greenland
  [
    [-72, 78], [-30, 83], [-15, 78], [-25, 65], [-50, 60], [-60, 70],
  ],
  // South America
  [
    [-78, 12], [-72, 11], [-60, 10], [-50, 0], [-44, -3], [-35, -5],
    [-35, -22], [-44, -23], [-50, -32], [-58, -38], [-66, -45], [-72, -52],
    [-72, -45], [-78, -10], [-80, 0],
  ],
  // Europe (incl. UK, Scandinavia, western Russia)
  [
    [-10, 62], [-5, 70], [10, 71], [25, 72], [40, 70], [60, 65], [60, 50],
    [50, 45], [40, 38], [25, 36], [10, 36], [-2, 38], [-10, 50],
  ],
  // Iceland
  [[-22, 67], [-13, 67], [-13, 63], [-22, 63]],
  // Africa
  [
    [-17, 35], [-5, 35], [10, 38], [25, 33], [35, 30], [50, 12], [50, 0],
    [40, -10], [40, -25], [30, -35], [18, -35], [13, -25], [10, -10],
    [-5, 5], [-15, 12], [-17, 25],
  ],
  // Middle East / Arabia
  [
    [33, 38], [50, 38], [60, 25], [55, 12], [40, 12], [33, 28],
  ],
  // Russia / Northern Asia
  [
    [60, 70], [100, 78], [140, 75], [180, 70], [180, 60], [165, 55],
    [140, 50], [125, 50], [105, 53], [85, 55], [60, 60], [60, 70],
  ],
  // China / Mongolia / Central Asia
  [
    [60, 50], [120, 50], [125, 35], [120, 22], [110, 20], [100, 22],
    [95, 28], [80, 35], [70, 38], [65, 42], [60, 50],
  ],
  // India + South Asia
  [
    [70, 30], [78, 32], [88, 28], [95, 28], [95, 22], [88, 22],
    [80, 8], [73, 18], [70, 22],
  ],
  // SE Asia / Indonesia
  [
    [95, 8], [110, 8], [125, 5], [140, -3], [140, -10], [130, -10],
    [115, -8], [105, -2], [98, 3],
  ],
  // Japan
  [[130, 30], [142, 36], [145, 45], [140, 45], [135, 38], [131, 33]],
  // Philippines
  [[120, 18], [126, 18], [127, 5], [120, 5]],
  // Australia
  [
    [114, -12], [136, -10], [145, -12], [153, -22], [153, -32],
    [140, -39], [125, -35], [115, -33], [113, -22],
  ],
  // New Zealand
  [[167, -36], [178, -42], [173, -47], [167, -45]],
  // Antarctica (strip below -65° as a coarse approximation)
  [[-180, -65], [180, -65], [180, -90], [-180, -90]],
];

/** Ray-casting point-in-polygon. */
export function isLand(lat: number, lng: number): boolean {
  for (const poly of LAND_POLYGONS) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i]!;
      const [xj, yj] = poly[j]!;
      const intersect =
        yi > lat !== yj > lat &&
        lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    if (inside) return true;
  }
  return false;
}

/** Equirectangular projection: lat/lng → x/y in a 1000×500 viewBox. */
export function project(lat: number, lng: number): [number, number] {
  const x = ((lng + 180) / 360) * 1000;
  const y = ((90 - lat) / 180) * 500;
  return [x, y];
}

/** Spherical linear interpolation between two lat/lng points along a great circle. */
export function slerpLatLng(
  start: { lat: number; lng: number },
  end: { lat: number; lng: number },
  t: number
): { lat: number; lng: number } {
  const sφ = (start.lat * Math.PI) / 180;
  const sλ = (start.lng * Math.PI) / 180;
  const eφ = (end.lat * Math.PI) / 180;
  const eλ = (end.lng * Math.PI) / 180;
  const sx = Math.cos(sφ) * Math.cos(sλ);
  const sy = Math.sin(sφ);
  const sz = Math.cos(sφ) * Math.sin(sλ);
  const ex = Math.cos(eφ) * Math.cos(eλ);
  const ey = Math.sin(eφ);
  const ez = Math.cos(eφ) * Math.sin(eλ);

  const dot = Math.max(-1, Math.min(1, sx * ex + sy * ey + sz * ez));
  const omega = Math.acos(dot);
  const sinO = Math.sin(omega);

  if (sinO < 1e-10) return { lat: start.lat, lng: start.lng };

  const a = Math.sin((1 - t) * omega) / sinO;
  const b = Math.sin(t * omega) / sinO;
  const x = a * sx + b * ex;
  const y = a * sy + b * ey;
  const z = a * sz + b * ez;

  return {
    lat: (Math.asin(Math.max(-1, Math.min(1, y))) * 180) / Math.PI,
    lng: (Math.atan2(z, x) * 180) / Math.PI,
  };
}
