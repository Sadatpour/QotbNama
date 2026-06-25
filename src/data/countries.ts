/**
 * Country dataset for the interactive world map.
 *
 * Keyed by the ISO 3166-1 **numeric** id used by `world-atlas/countries-110m`
 * (the same value react-simple-maps exposes as `geo.id`). A small by-name map
 * covers the handful of map features that lack a numeric id (Kosovo,
 * N. Cyprus, Somaliland).
 *
 * Localized country names are produced at runtime with `Intl.DisplayNames`
 * from the `a2` (alpha-2) code, so we don't hand-translate ~190 names. Only the
 * government-system labels and region names are translated (locale files).
 *
 * `system` is a neutral, high-level classification. Populations are recent
 * approximate estimates for educational purposes. Capitals are kept in Latin
 * script (proper nouns) and rendered LTR.
 */

export type SystemKey =
  | 'presidential'
  | 'semi-presidential'
  | 'parliamentary-republic'
  | 'constitutional-monarchy'
  | 'absolute-monarchy'
  | 'one-party'
  | 'theocratic'
  | 'directorial'
  | 'provisional'
  | 'territory'
  | 'disputed'
  | 'none'

export type RegionKey =
  | 'asia'
  | 'europe'
  | 'africa'
  | 'north-america'
  | 'south-america'
  | 'oceania'
  | 'antarctica'

export interface CountryInfo {
  a2: string | null
  capital: string | null
  population: number
  region: RegionKey
  system: SystemKey
}

/** Accent color + optional related education topic for each system type. */
export const SYSTEM_META: Record<SystemKey, { color: string; topicId?: string }> = {
  presidential: { color: '#f97316', topicId: 'presidential' },
  'semi-presidential': { color: '#fb923c', topicId: 'presidential' },
  'parliamentary-republic': { color: '#2563eb', topicId: 'parliamentary' },
  'constitutional-monarchy': { color: '#06b6d4', topicId: 'constitutional-monarchy' },
  'absolute-monarchy': { color: '#7c3aed', topicId: 'absolute-monarchy' },
  'one-party': { color: '#b91c1c', topicId: 'authoritarianism' },
  theocratic: { color: '#4f46e5', topicId: 'secularism' },
  directorial: { color: '#0891b2', topicId: 'republic' },
  provisional: { color: '#a16207', topicId: 'authoritarianism' },
  territory: { color: '#94a3b8' },
  disputed: { color: '#64748b' },
  none: { color: '#cbd5e1' },
}

export const SYSTEM_KEYS: SystemKey[] = [
  'presidential',
  'semi-presidential',
  'parliamentary-republic',
  'constitutional-monarchy',
  'absolute-monarchy',
  'one-party',
  'theocratic',
  'directorial',
  'provisional',
  'territory',
  'disputed',
]

export const REGION_KEYS: RegionKey[] = [
  'asia',
  'europe',
  'africa',
  'north-america',
  'south-america',
  'oceania',
]

// Compact tuple form keeps this large table readable: [a2, capital, population, region, system]
type Row = [string | null, string | null, number, RegionKey, SystemKey]

const R = (
  a2: string | null,
  capital: string | null,
  population: number,
  region: RegionKey,
  system: SystemKey,
): CountryInfo => ({ a2, capital, population, region, system })

const T: Record<string, Row> = {
  '004': ['AF', 'Kabul', 41000000, 'asia', 'provisional'],
  '008': ['AL', 'Tirana', 2800000, 'europe', 'parliamentary-republic'],
  '012': ['DZ', 'Algiers', 44000000, 'africa', 'presidential'],
  '024': ['AO', 'Luanda', 35000000, 'africa', 'presidential'],
  '010': [null, null, 0, 'antarctica', 'none'],
  '032': ['AR', 'Buenos Aires', 46000000, 'south-america', 'presidential'],
  '051': ['AM', 'Yerevan', 3000000, 'asia', 'parliamentary-republic'],
  '036': ['AU', 'Canberra', 26000000, 'oceania', 'constitutional-monarchy'],
  '040': ['AT', 'Vienna', 9000000, 'europe', 'parliamentary-republic'],
  '031': ['AZ', 'Baku', 10000000, 'asia', 'presidential'],
  '044': ['BS', 'Nassau', 400000, 'north-america', 'constitutional-monarchy'],
  '050': ['BD', 'Dhaka', 171000000, 'asia', 'parliamentary-republic'],
  '112': ['BY', 'Minsk', 9200000, 'europe', 'presidential'],
  '056': ['BE', 'Brussels', 11700000, 'europe', 'constitutional-monarchy'],
  '084': ['BZ', 'Belmopan', 410000, 'north-america', 'constitutional-monarchy'],
  '204': ['BJ', 'Porto-Novo', 13000000, 'africa', 'presidential'],
  '064': ['BT', 'Thimphu', 780000, 'asia', 'constitutional-monarchy'],
  '068': ['BO', 'Sucre', 12000000, 'south-america', 'presidential'],
  '070': ['BA', 'Sarajevo', 3200000, 'europe', 'parliamentary-republic'],
  '072': ['BW', 'Gaborone', 2600000, 'africa', 'parliamentary-republic'],
  '076': ['BR', 'Brasília', 215000000, 'south-america', 'presidential'],
  '096': ['BN', 'Bandar Seri Begawan', 450000, 'asia', 'absolute-monarchy'],
  '100': ['BG', 'Sofia', 6800000, 'europe', 'parliamentary-republic'],
  '854': ['BF', 'Ouagadougou', 22000000, 'africa', 'provisional'],
  '108': ['BI', 'Gitega', 12000000, 'africa', 'presidential'],
  '116': ['KH', 'Phnom Penh', 16700000, 'asia', 'constitutional-monarchy'],
  '120': ['CM', 'Yaoundé', 27000000, 'africa', 'presidential'],
  '124': ['CA', 'Ottawa', 39000000, 'north-america', 'constitutional-monarchy'],
  '140': ['CF', 'Bangui', 5500000, 'africa', 'presidential'],
  '148': ['TD', "N'Djamena", 17000000, 'africa', 'provisional'],
  '152': ['CL', 'Santiago', 19600000, 'south-america', 'presidential'],
  '156': ['CN', 'Beijing', 1412000000, 'asia', 'one-party'],
  '170': ['CO', 'Bogotá', 51000000, 'south-america', 'presidential'],
  '178': ['CG', 'Brazzaville', 5800000, 'africa', 'presidential'],
  '188': ['CR', 'San José', 5200000, 'north-america', 'presidential'],
  '384': ['CI', 'Yamoussoukro', 28000000, 'africa', 'presidential'],
  '191': ['HR', 'Zagreb', 3900000, 'europe', 'parliamentary-republic'],
  '192': ['CU', 'Havana', 11000000, 'north-america', 'one-party'],
  '196': ['CY', 'Nicosia', 1200000, 'europe', 'presidential'],
  '203': ['CZ', 'Prague', 10500000, 'europe', 'parliamentary-republic'],
  '180': ['CD', 'Kinshasa', 99000000, 'africa', 'semi-presidential'],
  '208': ['DK', 'Copenhagen', 5900000, 'europe', 'constitutional-monarchy'],
  '262': ['DJ', 'Djibouti', 1100000, 'africa', 'presidential'],
  '214': ['DO', 'Santo Domingo', 11000000, 'north-america', 'presidential'],
  '218': ['EC', 'Quito', 18000000, 'south-america', 'presidential'],
  '818': ['EG', 'Cairo', 109000000, 'africa', 'semi-presidential'],
  '222': ['SV', 'San Salvador', 6300000, 'north-america', 'presidential'],
  '226': ['GQ', 'Malabo', 1500000, 'africa', 'presidential'],
  '232': ['ER', 'Asmara', 3600000, 'africa', 'one-party'],
  '233': ['EE', 'Tallinn', 1300000, 'europe', 'parliamentary-republic'],
  '748': ['SZ', 'Mbabane', 1200000, 'africa', 'absolute-monarchy'],
  '231': ['ET', 'Addis Ababa', 123000000, 'africa', 'parliamentary-republic'],
  '238': ['FK', 'Stanley', 3700, 'south-america', 'territory'],
  '242': ['FJ', 'Suva', 930000, 'oceania', 'parliamentary-republic'],
  '246': ['FI', 'Helsinki', 5500000, 'europe', 'parliamentary-republic'],
  '260': ['TF', null, 150, 'antarctica', 'territory'],
  '250': ['FR', 'Paris', 68000000, 'europe', 'semi-presidential'],
  '266': ['GA', 'Libreville', 2400000, 'africa', 'provisional'],
  '270': ['GM', 'Banjul', 2700000, 'africa', 'presidential'],
  '268': ['GE', 'Tbilisi', 3700000, 'asia', 'parliamentary-republic'],
  '276': ['DE', 'Berlin', 84000000, 'europe', 'parliamentary-republic'],
  '288': ['GH', 'Accra', 33000000, 'africa', 'presidential'],
  '300': ['GR', 'Athens', 10400000, 'europe', 'parliamentary-republic'],
  '304': ['GL', 'Nuuk', 56000, 'north-america', 'territory'],
  '320': ['GT', 'Guatemala City', 17000000, 'north-america', 'presidential'],
  '324': ['GN', 'Conakry', 13500000, 'africa', 'provisional'],
  '624': ['GW', 'Bissau', 2000000, 'africa', 'semi-presidential'],
  '328': ['GY', 'Georgetown', 800000, 'south-america', 'presidential'],
  '332': ['HT', 'Port-au-Prince', 11500000, 'north-america', 'provisional'],
  '340': ['HN', 'Tegucigalpa', 10000000, 'north-america', 'presidential'],
  '348': ['HU', 'Budapest', 9600000, 'europe', 'parliamentary-republic'],
  '352': ['IS', 'Reykjavík', 380000, 'europe', 'parliamentary-republic'],
  '356': ['IN', 'New Delhi', 1417000000, 'asia', 'parliamentary-republic'],
  '360': ['ID', 'Jakarta', 276000000, 'asia', 'presidential'],
  '364': ['IR', 'Tehran', 88000000, 'asia', 'theocratic'],
  '368': ['IQ', 'Baghdad', 43000000, 'asia', 'parliamentary-republic'],
  '372': ['IE', 'Dublin', 5100000, 'europe', 'parliamentary-republic'],
  '376': ['IL', 'Jerusalem', 9700000, 'asia', 'parliamentary-republic'],
  '380': ['IT', 'Rome', 59000000, 'europe', 'parliamentary-republic'],
  '388': ['JM', 'Kingston', 2800000, 'north-america', 'constitutional-monarchy'],
  '392': ['JP', 'Tokyo', 125000000, 'asia', 'constitutional-monarchy'],
  '400': ['JO', 'Amman', 11000000, 'asia', 'constitutional-monarchy'],
  '398': ['KZ', 'Astana', 19000000, 'asia', 'presidential'],
  '404': ['KE', 'Nairobi', 54000000, 'africa', 'presidential'],
  '414': ['KW', 'Kuwait City', 4300000, 'asia', 'constitutional-monarchy'],
  '417': ['KG', 'Bishkek', 6700000, 'asia', 'presidential'],
  '418': ['LA', 'Vientiane', 7500000, 'asia', 'one-party'],
  '428': ['LV', 'Riga', 1880000, 'europe', 'parliamentary-republic'],
  '422': ['LB', 'Beirut', 5500000, 'asia', 'parliamentary-republic'],
  '426': ['LS', 'Maseru', 2200000, 'africa', 'constitutional-monarchy'],
  '430': ['LR', 'Monrovia', 5300000, 'africa', 'presidential'],
  '434': ['LY', 'Tripoli', 6800000, 'africa', 'provisional'],
  '440': ['LT', 'Vilnius', 2800000, 'europe', 'semi-presidential'],
  '442': ['LU', 'Luxembourg', 660000, 'europe', 'constitutional-monarchy'],
  '807': ['MK', 'Skopje', 2080000, 'europe', 'parliamentary-republic'],
  '450': ['MG', 'Antananarivo', 29000000, 'africa', 'semi-presidential'],
  '454': ['MW', 'Lilongwe', 20000000, 'africa', 'presidential'],
  '458': ['MY', 'Kuala Lumpur', 33000000, 'asia', 'constitutional-monarchy'],
  '466': ['ML', 'Bamako', 22000000, 'africa', 'provisional'],
  '478': ['MR', 'Nouakchott', 4700000, 'africa', 'presidential'],
  '484': ['MX', 'Mexico City', 128000000, 'north-america', 'presidential'],
  '498': ['MD', 'Chișinău', 2600000, 'europe', 'parliamentary-republic'],
  '496': ['MN', 'Ulaanbaatar', 3400000, 'asia', 'semi-presidential'],
  '499': ['ME', 'Podgorica', 620000, 'europe', 'parliamentary-republic'],
  '504': ['MA', 'Rabat', 37000000, 'africa', 'constitutional-monarchy'],
  '508': ['MZ', 'Maputo', 32000000, 'africa', 'presidential'],
  '104': ['MM', 'Naypyidaw', 54000000, 'asia', 'provisional'],
  '516': ['NA', 'Windhoek', 2600000, 'africa', 'presidential'],
  '524': ['NP', 'Kathmandu', 30000000, 'asia', 'parliamentary-republic'],
  '528': ['NL', 'Amsterdam', 17700000, 'europe', 'constitutional-monarchy'],
  '540': ['NC', 'Nouméa', 270000, 'oceania', 'territory'],
  '554': ['NZ', 'Wellington', 5100000, 'oceania', 'constitutional-monarchy'],
  '558': ['NI', 'Managua', 6800000, 'north-america', 'presidential'],
  '562': ['NE', 'Niamey', 25000000, 'africa', 'provisional'],
  '566': ['NG', 'Abuja', 218000000, 'africa', 'presidential'],
  '408': ['KP', 'Pyongyang', 26000000, 'asia', 'one-party'],
  '578': ['NO', 'Oslo', 5400000, 'europe', 'constitutional-monarchy'],
  '512': ['OM', 'Muscat', 4500000, 'asia', 'absolute-monarchy'],
  '586': ['PK', 'Islamabad', 235000000, 'asia', 'parliamentary-republic'],
  '275': ['PS', 'Ramallah', 5300000, 'asia', 'semi-presidential'],
  '591': ['PA', 'Panama City', 4400000, 'north-america', 'presidential'],
  '598': ['PG', 'Port Moresby', 10000000, 'oceania', 'constitutional-monarchy'],
  '600': ['PY', 'Asunción', 6800000, 'south-america', 'presidential'],
  '604': ['PE', 'Lima', 34000000, 'south-america', 'presidential'],
  '608': ['PH', 'Manila', 115000000, 'asia', 'presidential'],
  '616': ['PL', 'Warsaw', 38000000, 'europe', 'parliamentary-republic'],
  '620': ['PT', 'Lisbon', 10300000, 'europe', 'semi-presidential'],
  '630': ['PR', 'San Juan', 3200000, 'north-america', 'territory'],
  '634': ['QA', 'Doha', 2700000, 'asia', 'absolute-monarchy'],
  '642': ['RO', 'Bucharest', 19000000, 'europe', 'semi-presidential'],
  '643': ['RU', 'Moscow', 144000000, 'europe', 'semi-presidential'],
  '646': ['RW', 'Kigali', 13500000, 'africa', 'presidential'],
  '728': ['SS', 'Juba', 11000000, 'africa', 'presidential'],
  '682': ['SA', 'Riyadh', 36000000, 'asia', 'absolute-monarchy'],
  '686': ['SN', 'Dakar', 17000000, 'africa', 'presidential'],
  '688': ['RS', 'Belgrade', 6800000, 'europe', 'parliamentary-republic'],
  '694': ['SL', 'Freetown', 8400000, 'africa', 'presidential'],
  '703': ['SK', 'Bratislava', 5400000, 'europe', 'parliamentary-republic'],
  '705': ['SI', 'Ljubljana', 2100000, 'europe', 'parliamentary-republic'],
  '090': ['SB', 'Honiara', 720000, 'oceania', 'constitutional-monarchy'],
  '706': ['SO', 'Mogadishu', 17000000, 'africa', 'parliamentary-republic'],
  '710': ['ZA', 'Pretoria', 60000000, 'africa', 'parliamentary-republic'],
  '410': ['KR', 'Seoul', 51700000, 'asia', 'presidential'],
  '724': ['ES', 'Madrid', 47000000, 'europe', 'constitutional-monarchy'],
  '144': ['LK', 'Sri Jayawardenepura Kotte', 22000000, 'asia', 'semi-presidential'],
  '729': ['SD', 'Khartoum', 46000000, 'africa', 'provisional'],
  '740': ['SR', 'Paramaribo', 620000, 'south-america', 'presidential'],
  '752': ['SE', 'Stockholm', 10500000, 'europe', 'constitutional-monarchy'],
  '756': ['CH', 'Bern', 8700000, 'europe', 'directorial'],
  '760': ['SY', 'Damascus', 22000000, 'asia', 'provisional'],
  '158': ['TW', 'Taipei', 23500000, 'asia', 'semi-presidential'],
  '762': ['TJ', 'Dushanbe', 9700000, 'asia', 'presidential'],
  '834': ['TZ', 'Dodoma', 63000000, 'africa', 'presidential'],
  '764': ['TH', 'Bangkok', 70000000, 'asia', 'constitutional-monarchy'],
  '626': ['TL', 'Dili', 1300000, 'asia', 'semi-presidential'],
  '768': ['TG', 'Lomé', 8800000, 'africa', 'presidential'],
  '780': ['TT', 'Port of Spain', 1500000, 'north-america', 'parliamentary-republic'],
  '788': ['TN', 'Tunis', 12000000, 'africa', 'presidential'],
  '792': ['TR', 'Ankara', 85000000, 'asia', 'presidential'],
  '795': ['TM', 'Ashgabat', 6400000, 'asia', 'presidential'],
  '800': ['UG', 'Kampala', 47000000, 'africa', 'presidential'],
  '804': ['UA', 'Kyiv', 38000000, 'europe', 'semi-presidential'],
  '784': ['AE', 'Abu Dhabi', 9400000, 'asia', 'absolute-monarchy'],
  '826': ['GB', 'London', 67000000, 'europe', 'constitutional-monarchy'],
  '840': ['US', 'Washington, D.C.', 333000000, 'north-america', 'presidential'],
  '858': ['UY', 'Montevideo', 3400000, 'south-america', 'presidential'],
  '860': ['UZ', 'Tashkent', 35000000, 'asia', 'presidential'],
  '548': ['VU', 'Port Vila', 320000, 'oceania', 'parliamentary-republic'],
  '862': ['VE', 'Caracas', 28000000, 'south-america', 'presidential'],
  '704': ['VN', 'Hanoi', 98000000, 'asia', 'one-party'],
  '732': ['EH', 'El Aaiún', 600000, 'africa', 'disputed'],
  '887': ['YE', "Sana'a", 33000000, 'asia', 'provisional'],
  '894': ['ZM', 'Lusaka', 20000000, 'africa', 'presidential'],
  '716': ['ZW', 'Harare', 16000000, 'africa', 'presidential'],
}

export const COUNTRIES: Record<string, CountryInfo> = Object.fromEntries(
  Object.entries(T).map(([id, r]) => [id, R(...r)]),
)

/** Map features without a numeric id are matched by their English name. */
export const COUNTRIES_BY_NAME: Record<string, CountryInfo> = {
  Kosovo: R('XK', 'Pristina', 1800000, 'europe', 'parliamentary-republic'),
  'N. Cyprus': R(null, 'North Nicosia', 380000, 'asia', 'disputed'),
  Somaliland: R(null, 'Hargeisa', 5700000, 'africa', 'disputed'),
}

/** Convert an alpha-2 code to its flag emoji (regional indicator symbols). */
export function flagEmoji(a2: string | null): string {
  if (!a2 || a2.length !== 2) return '🏳️'
  const base = 0x1f1e6
  const cc = a2.toUpperCase()
  return String.fromCodePoint(base + (cc.charCodeAt(0) - 65), base + (cc.charCodeAt(1) - 65))
}
