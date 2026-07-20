// ============================================================
// TERRADEX ENTRY DATA
// ------------------------------------------------------------
// Entries are authored in code, with Claude, and shipped as
// commits. To add a place: append an object to DEX, bump the
// cache version in sw.js, push.
//
// status: 'visited' | 'upcoming' | 'wishlist'
//   (marking COLLECTED in the app overrides via localStorage)
// sprite: pixel art, rows of chars — '.' paper, '#' ink,
//   'R' red, 'G' green, 'g' gray. Any width up to ~24 cols.
// deepTime / history: chronological, oldest first.
// ============================================================

const DEX = [
  {
    id: 'missoula-mt',
    num: 1,
    name: 'Missoula',
    region: 'Montana, USA',
    country: 'USA',
    types: ['RIVER VALLEY', 'COLLEGE TOWN'],
    status: 'upcoming',
    coords: { lat: 46.8721, lon: -113.994 },
    sprite: [
      '....................',
      '..........#.........',
      '.........#.##.......',
      '....#...##...#......',
      '...###..#..R..##....',
      '..##.####......##...',
      '.##...##........##..',
      '##.....#.........###',
      '....................',
      'G.GG..GG..GG..GG..G.',
      '.G..GG..GG..GG..GG..',
      '....................',
    ],
    flavor: 'A river town at the bottom of a vanished ice-age lake. The shorelines are still striped on the mountainsides above it.',
    stats: {
      'ELEVATION': '3,209 FT',
      'FOUNDED': '1866',
      'POPULATION': '~78,000',
      'RIVERS': '3 CONVERGE',
      'VALLEYS': 'HUB OF 5',
      'NICKNAME': 'GARDEN CITY',
    },
    facts: [
      'Three rivers meet here: the Clark Fork, the Bitterroot, and the Blackfoot. Five mountain valleys converge on the town — locals call it the Hub of Five Valleys.',
      'The name comes from the Salish name for the river and canyon, often rendered nmesuletkw, commonly translated as "place of frozen water."',
      'Hellgate Canyon, the eastern entrance to town, was named Porte de l\'Enfer — "Gate of Hell" — by French-Canadian trappers.',
      'Horizontal stripes on Mount Sentinel and Mount Jumbo are wave-cut shorelines of Glacial Lake Missoula, still visible ~13,000 years after the lake drained for the last time.',
      'Missoula hosts the largest smokejumper base in the United States — firefighters who parachute into remote wildfires.',
      'The concrete "M" on Mount Sentinel sits 620 feet above campus; students first built one in 1908, and hiking the switchbacks to it is the town ritual.',
      'In 1897 the 25th Infantry Bicycle Corps — Black soldiers stationed at Fort Missoula — rode 1,900 miles to St. Louis to test bicycles for the Army.',
      'Norman Maclean\'s "A River Runs Through It" is set here; the Blackfoot River of the novella is a short drive from downtown.',
      'Rock Creek and Gem Mountain, southwest of town, are classic digs for Montana sapphires.',
      'Pacific maritime air leaks over the Bitterroots, giving Missoula a climate mild enough for its old nickname: the Garden City.',
    ],
    history: [
      { era: 'DEEP PAST', title: 'Séliš homeland', text: 'For millennia this valley is home and travel corridor for the Séliš (Salish) and Ql̓ispé (Pend d\'Oreille) people, moving through Hellgate Canyon between the mountains and the bison plains.' },
      { era: '1805–06', title: 'Lewis & Clark', text: 'The expedition camps at Traveler\'s Rest near present-day Lolo, just south of town — the only campsite on the entire route verified by physical archaeological evidence.' },
      { era: '1860', title: 'Hell Gate Trading Post', text: 'Founders set up a trading post at Hell Gate village west of the present townsite, serving traffic on the new Mullan Road.' },
      { era: '1866', title: 'Missoula Mills', text: 'A sawmill and flour mill move the settlement to the riverbank at the mouth of Hellgate Canyon; the county seat follows and the town takes root.' },
      { era: '1877', title: 'Fort Missoula', text: 'The Army establishes Fort Missoula. Twenty years later it becomes home to the 25th Infantry Bicycle Corps.' },
      { era: '1883', title: 'The railroad', text: 'The Northern Pacific arrives and Missoula incorporates as a city the same year — timber and rail set its course for the next century.' },
      { era: '1893', title: 'University of Montana', text: 'The state university is chartered at the foot of Mount Sentinel, making Missoula a college town for good.' },
      { era: '1954', title: 'Smokejumpers', text: 'The Forest Service opens the Aerial Fire Depot; Missoula becomes the capital of wildfire science and the nation\'s largest smokejumper base.' },
      { era: '2008', title: 'The river unbound', text: 'Milltown Dam is removed upstream and the Clark Fork–Blackfoot confluence flows free for the first time in a century, capping a Superfund cleanup.' },
    ],
    deepTime: [
      { era: '1.45 BILLION YRS', title: 'The Belt Sea', text: 'Fine mud settles for ages in the vast, shallow Belt Basin. Those Precambrian mudstones — the Belt Supergroup — are the very rock of Mount Sentinel and Mount Jumbo today. The only life on Earth is microbial; local stromatolite fossils record it.' },
      { era: '500–300 MILLION', title: 'Tropical shallows', text: 'Montana rides near the equator under warm, shallow seas that come and go for hundreds of millions of years. Trilobites scuttle across seafloors that will one day be high, dry mountain country.' },
      { era: '~150–80 MILLION', title: 'The Rockies rise', text: 'Colliding plates to the west stack and shove huge slabs of old Belt rock eastward (the Sevier orogeny). Western Montana crumples into highlands — the ancestral Rockies of dinosaur times.' },
      { era: '~75 MILLION', title: 'Dinosaur Montana', text: 'While Missoula\'s ground is already ancient uplifted rock, eastern Montana is a warm coastal plain on the Western Interior Seaway. Maiasaura nests in colonies at Egg Mountain ~150 miles northeast — the find that proved some dinosaurs cared for their young. T. rex and Triceratops will follow in the Hell Creek country before the end.' },
      { era: '66 MILLION', title: 'Impact', text: 'The Chicxulub asteroid ends the Cretaceous. Eastern Montana\'s Hell Creek badlands preserve one of the world\'s best records of the boundary — and of the last dinosaurs.' },
      { era: '~50 MILLION', title: 'The valley opens', text: 'The crust stretches and blocks drop along faults. The Missoula Valley begins to form as a downfaulted basin; nearby, the Sapphire block slides east off the rising Bitterroot dome, opening the Bitterroot Valley.' },
      { era: '20,000–13,000 YRS', title: 'Glacial Lake Missoula', text: 'A lobe of the Cordilleran ice sheet dams the Clark Fork in Idaho. Water backs up ~950 feet deep over the future townsite — a lake holding roughly 500 cubic miles. Again and again the ice dam fails, releasing some of the largest floods known on Earth, carving Washington\'s Channeled Scablands. The lake\'s shorelines still stripe the mountains above town.' },
      { era: '~12,000 YRS', title: 'People arrive', text: 'As the ice age closes, the first people move into the Northern Rockies. Salish oral tradition carries knowledge of this landscape from deep time into the present.' },
    ],
  },

  // ---- future entries land here ----
];

// Number of grayed-out "???" slots shown after the last entry.
const DEX_UNKNOWN_SLOTS = 3;
