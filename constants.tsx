
import { TimeZoneData } from './types';

export const TARGET_DATE = new Date('2026-01-01T00:00:00Z');

export const TIMEZONES: TimeZoneData[] = [
  { id: 'dubai', name: 'DUBÁI / EMIRATOS ÁRABES', offset: 4, isCelebrated: true },
  { id: 'moscow', name: 'RUSIA (MOSCÚ) / TURQUÍA / ARABIA SAUDITA', offset: 3 },
  { id: 'spain', name: 'ESPAÑA / ALEMANIA / ITALIA / FRANCIA', offset: 1 },
  { id: 'uk', name: 'REINO UNIDO / PORTUGAL', offset: 0 },
  { id: 'brazil', name: 'ARGENTINA / URUGUAY / BRASIL', offset: -3 },
  { id: 'chile', name: 'CHILE / PARAGUAY', offset: -3 },
  { id: 'bolivia', name: 'BOLIVIA / VENEZUELA', offset: -4 },
  { id: 'dominican', name: 'REP. DOMINICANA / P. RICO / CUBA', offset: -4 },
  { id: 'peru', name: 'PERÚ / COLOMBIA / ECUADOR', offset: -5 },
  { id: 'miami', name: 'PANAMÁ / BELICE / MIAMI / NY', offset: -5 },
  { id: 'mexico', name: 'MÉXICO CENTRAL (CDMX / ECATEPEC)', offset: -6 },
  { id: 'costarica', name: 'COSTA RICA / GUATEMALA / HONDURAS', offset: -6 },
  { id: 'elsalvador', name: 'EL SALVADOR / NICARAGUA', offset: -6 },
  { id: 'sonora', name: 'SONORA (MX) / ARIZONA (EE.UU)', offset: -7 },
  { id: 'tijuana', name: 'MEXICALI / TIJUANA / TECATE', offset: -8 },
];
