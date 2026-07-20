// ============================================================
// TERRADEX ENTRY DATA
// ------------------------------------------------------------
// Entries are authored in code, with Claude, and shipped as
// commits. To add a place: append an object to DEX, bump the
// cache version in sw.js, push.
//
// status: 'visited' | 'upcoming' | 'wishlist'
//   (marking COLLECTED in the app overrides via localStorage)
// art: engraved-style SVG scene, 400x170 viewBox, drawn with the
//   5-color palette. Shared shading patterns (defined in index.html):
//   url(#hg) gray hatch · url(#hi) ink hatch · url(#hx) cross-hatch
//   url(#dt) stipple · url(#wl) gray water · url(#wg) green water
//   url(#wv) vertical fall lines. Colors via var(--ink/--gray/--red/
//   --green/--paper).
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
    art: `
      <!-- Mt Jumbo, far, with Glacial Lake Missoula strandlines -->
      <path d="M0 100 L58 58 L112 88 L168 42 L238 92 L400 92" fill="none" stroke="var(--ink)" stroke-width="1.8"/>
      <path d="M148 60 L190 60 M136 70 L204 70 M124 80 L218 80 M40 72 L80 72 M30 82 L94 82" stroke="var(--gray)" stroke-width="1.2"/>
      <!-- valley floor and the river (tucks behind Sentinel) -->
      <path d="M0 118 L220 138 L200 170 L0 170 Z" fill="url(#dt)" stroke="none"/>
      <path d="M0 132 C60 130 130 140 204 154 L196 168 C130 154 60 142 0 144 Z" fill="url(#wg)" stroke="var(--green)" stroke-width="1.6"/>
      <path d="M26 128 l7 -13 l7 13 Z M66 122 l7 -13 l7 13 Z M118 130 l6 -11 l6 11 Z" fill="var(--ink)"/>
      <!-- Mt Sentinel, near, hatched, with the M -->
      <path d="M176 170 L262 84 L336 128 L400 104 L400 170 Z" fill="var(--paper)"/>
      <path d="M176 170 L262 84 L336 128 L400 104 L400 170 Z" fill="url(#hg)" stroke="var(--ink)" stroke-width="2"/>
      <path d="M258 138 L262 108 L274 126 L286 108 L290 138" fill="var(--paper)" stroke="var(--paper)" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="M258 138 L262 108 L274 126 L286 108 L290 138" fill="none" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>`,
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

  {
    id: 'firestone-co',
    num: 2,
    name: 'Firestone',
    region: 'Colorado, USA',
    country: 'USA',
    types: ['HIGH PLAINS', 'COAL TOWN'],
    status: 'visited',
    coords: { lat: 40.1128, lon: -104.9367 },
    art: `
      <!-- red plains sun -->
      <circle cx="322" cy="46" r="20" fill="var(--red)"/>
      <circle cx="322" cy="46" r="27" fill="none" stroke="var(--red)" stroke-width="1.4"/>
      <!-- Front Range on the horizon, Longs Peak tallest -->
      <path d="M0 92 L26 78 L48 88 L74 66 L96 84 L118 74 L142 86 L170 80 L192 90 L210 86 L228 92" fill="none" stroke="var(--ink)" stroke-width="1.6"/>
      <path d="M64 76 L74 66 L84 76 Z" fill="var(--ink)"/>
      <!-- plains: long field lines -->
      <path d="M0 104 L400 104" stroke="var(--ink)" stroke-width="2"/>
      <path d="M0 118 L400 118 M0 132 L400 132 M0 146 L400 146 M0 160 L400 160" stroke="var(--gray)" stroke-width="1"/>
      <!-- mine headframe -->
      <path d="M258 104 L272 40 L286 104 M264 78 L281 78 M261 92 L284 92" fill="none" stroke="var(--ink)" stroke-width="2.4"/>
      <circle cx="272" cy="46" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/>
      <path d="M272 46 L302 104" stroke="var(--gray)" stroke-width="1.4"/>
      <path d="M250 104 L294 104 L294 96 L250 96 Z" fill="url(#hi)" stroke="var(--ink)" stroke-width="1.5"/>
      <!-- grass tufts -->
      <g stroke="var(--green)" stroke-width="1.6" fill="none">
        <path d="M30 132 l-4 -9 M30 132 l0 -11 M30 132 l4 -9"/>
        <path d="M96 146 l-4 -9 M96 146 l0 -11 M96 146 l4 -9"/>
        <path d="M172 132 l-4 -9 M172 132 l0 -11 M172 132 l4 -9"/>
        <path d="M348 146 l-4 -9 M348 146 l0 -11 M348 146 l4 -9"/>
        <path d="M390 124 l-4 -9 M390 124 l0 -11 M390 124 l4 -9"/>
      </g>`,
    flavor: 'A plains town that grew on coal dug from dinosaur-age swamps, with the Front Range standing on the western horizon.',
    stats: {
      'ELEVATION': '4,970 FT',
      'INCORPORATED': '1908',
      'POPULATION': '~17,000',
      'NAMED FOR': 'JACOB FIRESTONE',
      'VALLEY': 'CARBON VALLEY',
      'HORIZON': 'LONGS PEAK',
    },
    facts: [
      'Firestone, Frederick, and Dacono make up Colorado\'s "Carbon Valley" — a tri-town cluster named for the coal seams beneath it.',
      'The town was platted in 1907 on land owned by Jacob Firestone and incorporated in 1908, one of a string of company coal camps in the Boulder–Weld coal field.',
      'The coal dug here formed in swamps at the edge of a retreating inland sea near the end of the age of dinosaurs — miners were burning 68-million-year-old forest.',
      'From the streets you can see Longs Peak and the Front Range wall rising 40 miles to the west — the classic high-plains view.',
      'Firestone was one of Colorado\'s fastest-growing towns of the 2000s, jumping from under 2,000 people in 2000 to over 10,000 by 2010.',
      'Saint Vrain State Park just west of town shelters one of Colorado\'s largest great blue heron rookeries among old gravel-pit ponds.',
      'Underground mining faded by mid-century as natural gas took over — then the same ground boomed again a half-century later, this time for the oil and gas beneath the old coal.',
    ],
    history: [
      { era: 'DEEP PAST', title: 'Cheyenne & Arapaho plains', text: 'The high plains between the South Platte and the mountains are Cheyenne and Arapaho country — bison range crossed by trade and travel routes along the creeks.' },
      { era: '1860s', title: 'St. Vrain settlement', text: 'Homesteaders and ranchers spread along St. Vrain Creek after the Colorado gold rush, farming the bottomlands the trails followed.' },
      { era: '1907–08', title: 'Coal camp', text: 'The Denver-basin coal boom reaches Weld County. Firestone is platted on Jacob Firestone\'s land and incorporates in 1908, alongside sister camps Frederick and Dacono.' },
      { era: '1910s–40s', title: 'Mining years', text: 'Dozens of mines work the Boulder–Weld field. Union halls, boarding houses, and mine whistles set the rhythm of Carbon Valley life.' },
      { era: '1950s', title: 'The seams go quiet', text: 'Natural gas undercuts coal and the mines close one by one; the valley settles into farm country.' },
      { era: '2000s', title: 'Front Range boom', text: 'Denver\'s northern edge arrives. Firestone multiplies five-fold in a decade, turning coal camp into commuter town.' },
    ],
    deepTime: [
      { era: '~70 MILLION YRS', title: 'The Pierre Sea', text: 'The Western Interior Seaway covers eastern Colorado. Thousands of feet of dark marine mud — the Pierre Shale — pile up beneath the future town while mosasaurs hunt overhead.' },
      { era: '~68 MILLION', title: 'Coal swamps of the dinosaurs', text: 'The sea retreats east. Rivers, lagoons, and peat swamps take its place, laying down the Laramie Formation coal that Carbon Valley would one day mine. Duck-billed dinosaurs and tyrannosaurs of the Denver Basin walk these very lowlands.' },
      { era: '~70–40 MILLION', title: 'The Front Range rises', text: 'The Laramide orogeny pushes ancient basement rock skyward just to the west. The plains tilt and buckle as the modern Rocky Mountain front — Firestone\'s horizon line — is built.' },
      { era: '~34–5 MILLION', title: 'Burying and stripping', text: 'Debris shed from the mountains buries the plains kilometers deep, then rivers strip most of it away again — leaving the gentle surface the town sits on.' },
      { era: '~13,000 YRS', title: 'Mammoths and Clovis hunters', text: 'Ice-age megafauna roam the South Platte country. At the Dent site, barely 15 miles northeast, Clovis spear points were found among mammoth bones in 1932 — the first clear evidence that people hunted mammoths in North America.' },
    ],
  },

  {
    id: 'estes-park-co',
    num: 3,
    name: 'Estes Park',
    region: 'Colorado, USA',
    country: 'USA',
    types: ['ALPINE VALLEY', 'PARK GATEWAY'],
    status: 'visited',
    coords: { lat: 40.3772, lon: -105.5217 },
    art: `
      <!-- Longs Peak with the hatched Diamond face -->
      <path d="M0 96 L54 66 L92 82 L150 26 L216 92 L258 74 L306 96" fill="none" stroke="var(--ink)" stroke-width="1.8"/>
      <path d="M150 26 L134 42 L156 68 L182 58 Z" fill="url(#hi)" stroke="var(--ink)" stroke-width="1.5"/>
      <path d="M92 82 L118 58 M182 58 L204 80 M134 42 L116 64" stroke="var(--ink)" stroke-width="1.2" fill="none"/>
      <!-- meadow -->
      <path d="M0 120 L400 120 L400 170 L0 170 Z" fill="url(#dt)" stroke="none"/>
      <path d="M0 120 L400 120" stroke="var(--ink)" stroke-width="1.6"/>
      <!-- pines -->
      <g stroke="var(--ink)" stroke-width="1.4">
        <path d="M262 118 l0 -34 M262 92 l-13 22 l26 0 Z M262 104 l-10 16 l20 0 Z" fill="var(--green)"/>
        <path d="M300 118 l0 -46 M300 80 l-16 27 l32 0 Z M300 96 l-13 20 l26 0 Z" fill="var(--green)"/>
        <path d="M348 118 l0 -38 M348 88 l-14 24 l28 0 Z M348 102 l-11 17 l22 0 Z" fill="var(--green)"/>
        <path d="M382 118 l0 -30 M382 96 l-11 18 l22 0 Z" fill="var(--green)"/>
      </g>
      <!-- bull elk -->
      <g fill="var(--ink)">
        <ellipse cx="112" cy="124" rx="30" ry="12"/>
        <path d="M88 130 L72 102 L84 96 L98 122 Z"/>
        <ellipse cx="74" cy="97" rx="11" ry="6.5" transform="rotate(-24 74 97)"/>
        <path d="M84 90 L92 84 L90 94 Z"/>
        <path d="M140 118 L146 114 L146 122 Z"/>
      </g>
      <g stroke="var(--ink)" stroke-width="3.4" stroke-linecap="round" fill="none">
        <path d="M92 132 L88 152 M100 134 L99 154 M124 134 L126 153 M134 131 L139 151"/>
      </g>
      <g stroke="var(--ink)" stroke-width="2.2" stroke-linecap="round" fill="none">
        <path d="M78 90 C90 74 108 66 126 68"/>
        <path d="M76 88 C84 70 98 60 112 58"/>
        <path d="M88 80 L83 66 M100 72 L98 58 M113 68 L114 54 M122 68 L128 58"/>
      </g>`,
    flavor: 'A glacier-carved valley at 7,500 feet where elk own the golf course and a mile of vertical granite owns the skyline.',
    stats: {
      'ELEVATION': '7,522 FT',
      'SETTLED': '1859',
      'POPULATION': '~5,900',
      'GUARDIAN': 'LONGS PK 14,259',
      'PARK EST.': '1915',
      'ROAD CREST': '12,183 FT',
    },
    facts: [
      'Estes Park is the east gateway to Rocky Mountain National Park, established in 1915 largely through the campaigning of naturalist Enos Mills.',
      'Longs Peak (14,259 ft) towers over the valley — the northernmost fourteener in the Rockies and the mountain on the Colorado quarter.',
      'Trail Ridge Road crests at 12,183 feet, the highest continuous paved road in the United States, crossing eleven miles of alpine tundra.',
      'F.O. Stanley, inventor of the Stanley Steamer automobile, came for his health and built the Stanley Hotel in 1909 — the hotel that later inspired Stephen King\'s "The Shining" after his 1974 stay in room 217.',
      'In the 1870s the Irish Earl of Dunraven schemed to claim the entire valley as his private hunting preserve; locals out-homesteaded him.',
      'Hundreds of elk wander into town every fall for the rut, bugling on the golf course and stopping traffic on Elkhorn Avenue.',
      'The Lawn Lake dam failure in 1982 sent a flood wave down Fall River through downtown — the alluvial fan it left is now a park landmark.',
      'The valley is a glacial "park" — mountain-speak for a wide grassy basin — carved and framed by ice-age moraines you can walk on in Moraine Park.',
    ],
    history: [
      { era: 'DEEP PAST', title: 'Ute and Arapaho high country', text: 'Ute and Arapaho people hunt and cross this valley for generations; Trail Ridge follows a route used long before it was a road.' },
      { era: '1859', title: 'Joel Estes', text: 'Kentucky-born Joel Estes rides into the valley during the gold rush era and settles his family; the "park" soon carries his name.' },
      { era: '1870s', title: 'The Earl\'s land grab', text: 'The Earl of Dunraven quietly amasses claims to make the valley a private game preserve. Settlers and surveyors unravel the scheme, and homesteads win.' },
      { era: '1909', title: 'The Stanley Hotel', text: 'F.O. Stanley opens his grand white hotel, ferrying guests up from the plains in Stanley Steamer mountain wagons — resort-town Estes Park is born.' },
      { era: '1915', title: 'A national park', text: 'After years of advocacy by Enos Mills, Rocky Mountain National Park is established; Estes Park becomes its front door.' },
      { era: '1932', title: 'Trail Ridge Road', text: 'Crews complete the road over the tundra to Grand Lake, replacing the old Fall River wagon route and opening the high country to everyone.' },
      { era: '1982', title: 'Lawn Lake flood', text: 'An old irrigation dam fails in the high country; the flood scours Fall River and swamps downtown, reshaping how the town lives with water.' },
      { era: '2013', title: 'The September flood', text: 'A week of record rain cuts every road out of town for a time — and the canyons are rebuilt tougher.' },
    ],
    deepTime: [
      { era: '1.7 BILLION YRS', title: 'Basement rock', text: 'The gneiss and schist of the high peaks form as sediments and volcanics are cooked deep in the crust during ancient continental collisions — some of the oldest rock in Colorado.' },
      { era: '1.4 BILLION', title: 'Granite intrudes', text: 'Vast blobs of magma rise and freeze underground as Silver Plume granite — the pale rock of Longs Peak, Lumpy Ridge, and the Twin Owls.' },
      { era: '~300 MILLION', title: 'Ancestral Rockies', text: 'A first version of the Rockies rises here, then erodes away almost completely over the following 100 million years. Mountains are temporary; this valley has seen two sets.' },
      { era: '~150–70 MILLION', title: 'Dinosaurs at the shore', text: 'During the dinosaur age this ground is low country near an inland sea. Just east along the hogbacks, the Jurassic Morrison Formation yields Stegosaurus and Apatosaurus — Colorado\'s classic dinosaurs lived at the foot of a range that didn\'t exist yet.' },
      { era: '~70–40 MILLION', title: 'The Rockies, take two', text: 'The Laramide orogeny heaves the ancient basement rock miles upward. The modern Front Range — and the raw granite of Longs Peak — begins its climb into the sky.' },
      { era: '~150,000–15,000 YRS', title: 'Rivers of ice', text: 'Valley glaciers pour off the high peaks again and again, gouging cirques and U-shaped valleys and bulldozing the moraines that fence Moraine Park and dam the valley\'s lakes. The last big ice melts out ~15,000 years ago; a few pocket glaciers still hide in the shadows.' },
    ],
  },

  {
    id: 'rochester-ny',
    num: 4,
    name: 'Rochester',
    region: 'New York, USA',
    country: 'USA',
    types: ['CANAL CITY', 'FALLS CITY'],
    status: 'visited',
    coords: { lat: 43.1566, lon: -77.6088 },
    art: `
      <!-- mill buildings flanking High Falls -->
      <g stroke="var(--ink)" stroke-width="2" fill="var(--paper)">
        <path d="M18 116 L18 34 L120 34 L120 116"/>
        <path d="M256 116 L256 24 L372 24 L372 116"/>
      </g>
      <path d="M18 34 L120 34 M256 24 L372 24" stroke="var(--ink)" stroke-width="3"/>
      <!-- windows -->
      <g fill="url(#hi)">
        <rect x="32" y="46" width="14" height="18"/><rect x="62" y="46" width="14" height="18"/><rect x="92" y="46" width="14" height="18"/>
        <rect x="32" y="76" width="14" height="18"/><rect x="62" y="76" width="14" height="18"/><rect x="92" y="76" width="14" height="18"/>
        <rect x="272" y="36" width="14" height="18"/><rect x="302" y="36" width="14" height="18"/><rect x="332" y="36" width="14" height="18"/>
        <rect x="272" y="66" width="14" height="18"/><rect x="332" y="66" width="14" height="18"/>
      </g>
      <!-- red mill sign -->
      <rect x="298" y="64" width="22" height="22" fill="var(--red)"/>
      <!-- gorge ledge and the falls -->
      <path d="M120 116 L176 112 L232 116 L256 116" fill="none" stroke="var(--ink)" stroke-width="2.4"/>
      <path d="M154 113 L154 152 L216 152 L216 114 Z" fill="url(#wv)" stroke="none"/>
      <path d="M154 113 L154 152 M216 114 L216 152" stroke="var(--ink)" stroke-width="1.6"/>
      <!-- gorge walls -->
      <path d="M120 116 L120 170 L0 170 L0 116 Z" fill="url(#hg)" stroke="var(--ink)" stroke-width="1.6"/>
      <path d="M256 116 L256 170 L400 170 L400 116 Z" fill="url(#hg)" stroke="var(--ink)" stroke-width="1.6"/>
      <!-- plunge pool -->
      <path d="M120 170 L120 156 C160 148 210 148 256 158 L256 170 Z" fill="url(#wl)" stroke="var(--ink)" stroke-width="1.4"/>`,
    flavor: 'America\'s first boomtown: a 96-foot waterfall in the middle of downtown once turned flour mills, then film factories.',
    stats: {
      'ELEVATION': '505 FT',
      'FOUNDED': '1812',
      'POPULATION': '~210,000',
      'HIGH FALLS': '96 FT',
      'RIVER': 'GENESEE',
      'LAKE': 'ONTARIO',
    },
    facts: [
      'The Genesee River drops 96 feet at High Falls in the middle of downtown — the water power that built the city.',
      'When the Erie Canal arrived in the 1820s, Rochester became known as America\'s first boomtown: the "Flour City," milling Genesee Valley wheat for the world.',
      'As the flour trade moved west, nurseries and seed houses took over and the nickname shifted one letter — to the "Flower City," celebrated every May at the Lilac Festival in Highland Park.',
      'Frederick Douglass published the North Star here and called Rochester home for 25 years; he\'s buried in Mount Hope Cemetery.',
      'Susan B. Anthony was arrested at her Madison Street home in 1872 for the crime of voting; her house is now a museum, and visitors leave "I Voted" stickers on her grave.',
      'George Eastman founded Kodak here in 1888 and put photography in ordinary hands; Xerox and Bausch & Lomb made Rochester the world capital of optics and imaging.',
      'The Broad Street bridge downtown is the old Erie Canal aqueduct — the canal literally crossed the river on it.',
      'The local delicacy is the Garbage Plate: home fries, macaroni salad, burgers, and hot sauce in one pile, born at Nick Tahou Hots.',
    ],
    history: [
      { era: 'DEEP PAST', title: 'Seneca country', text: 'This is the land of the Onöndowa\'ga:\' (Seneca), keepers of the western door of the Haudenosaunee Confederacy; the falls and river are fishing and portage places long before any mill.' },
      { era: '1812', title: 'The Hundred Acre Tract', text: 'Col. Nathaniel Rochester and partners plat a village at the falls. It is swampy, mosquito-ridden, and perfectly positioned.' },
      { era: '1825', title: 'The Erie Canal', text: 'The canal opens through town, crossing the Genesee on a stone aqueduct. Flour milled at the falls can suddenly reach New York City in days — the boom is on.' },
      { era: '1830s–40s', title: 'Flour City', text: 'Rochester is among the fastest-growing places in America and its largest flour producer; reform movements — abolition, temperance, women\'s rights — take root in the boomtown churn.' },
      { era: '1847', title: 'The North Star', text: 'Frederick Douglass launches his abolitionist newspaper here; Rochester becomes a hub on the Underground Railroad, a last stop before Canada.' },
      { era: '1872', title: 'Anthony votes', text: 'Susan B. Anthony casts a ballot in the presidential election and is arrested and tried for it — a landmark act of the suffrage movement.' },
      { era: '1888', title: 'Kodak', text: '"You press the button, we do the rest." George Eastman\'s roll-film camera turns Rochester into the imaging capital of the world for a century.' },
      { era: '1900s–NOW', title: 'After film', text: 'Kodak\'s fall reshapes the city; optics, imaging science, and the universities carry the lens-grinding tradition into new forms.' },
    ],
    deepTime: [
      { era: '~430 MILLION YRS', title: 'A tropical sea', text: 'Western New York lies south of the equator under a warm, shallow sea. The Rochester Shale — yes, geologists named it for this city — preserves whole gardens of sea lilies and some of the world\'s finest trilobites.' },
      { era: '~420 MILLION', title: 'The falls are laid down', text: 'Hard Lockport dolostone caps softer shales — the exact rock sandwich that makes waterfalls. High Falls and Niagara Falls pour over the same ledge, 70 miles apart.' },
      { era: '~415 MILLION', title: 'A dying sea of salt', text: 'The sea shrinks to briny lagoons, leaving thick beds of rock salt beneath the region — the Salina Group, still mined on a vast scale south of the city.' },
      { era: '250–66 MILLION', title: 'The missing pages', text: 'No Mesozoic rock survives here: through the entire age of dinosaurs this was high ground, eroding instead of collecting sediment. Dinosaurs almost certainly walked western New York — the pages that recorded it were simply torn out.' },
      { era: '~24,000 YRS', title: 'A mile of ice', text: 'The Laurentide ice sheet buries the region, deepening the Ontario basin and smearing the land into one of the world\'s great drumlin fields — ten thousand whale-back hills between Rochester and Syracuse.' },
      { era: '~13,000 YRS', title: 'Lake Iroquois', text: 'As the ice retreats, a swollen ancestor of Lake Ontario laps against a shoreline that today runs along Ridge Road. The young Genesee, thrown off its old course, saws the fresh gorge and falls through downtown. Mastodons browse the tundra edge as people arrive.' },
    ],
  },

  {
    id: 'geneseo-ny',
    num: 5,
    name: 'Geneseo',
    region: 'New York, USA',
    country: 'USA',
    types: ['VALLEY VILLAGE', 'COLLEGE TOWN'],
    status: 'visited',
    coords: { lat: 42.7959, lon: -77.817 },
    art: `
      <!-- valley walls, seen from the hilltop -->
      <path d="M0 66 C70 46 150 44 220 54 C290 64 340 60 400 44" fill="none" stroke="var(--ink)" stroke-width="1.6"/>
      <path d="M0 92 C80 74 170 72 250 82 C310 89 360 86 400 74" fill="none" stroke="var(--gray)" stroke-width="1.2"/>
      <!-- valley flats -->
      <path d="M0 92 C80 74 170 72 250 82 C310 89 360 86 400 74 L400 170 L0 170 Z" fill="url(#dt)" stroke="none"/>
      <!-- oxbow meanders of the Genesee -->
      <path d="M0 128 C40 112 60 140 100 126 C140 112 150 146 196 132 C242 118 250 150 300 136 C344 124 360 148 400 134"
            fill="none" stroke="var(--green)" stroke-width="5" stroke-linecap="round"/>
      <path d="M96 120 C102 128 102 132 98 138 M200 124 C206 132 206 138 200 142" fill="none" stroke="var(--green)" stroke-width="2"/>
      <!-- hedgerows and a barn -->
      <path d="M20 156 L120 150 M240 158 L340 152" stroke="var(--gray)" stroke-width="1.4"/>
      <g stroke="var(--ink)" stroke-width="1.8" fill="var(--paper)">
        <path d="M296 96 L296 78 L310 68 L324 78 L324 96 Z"/>
        <path d="M328 96 L328 84 L344 84 L344 96 Z"/>
      </g>
      <rect x="305" y="84" width="10" height="12" fill="url(#hi)"/>
      <!-- the Main Street bear, on its column -->
      <path d="M36 162 L76 162 L76 155 L36 155 Z M42 155 L70 155 L70 149 L42 149 Z" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.8"/>
      <rect x="52" y="128" width="8" height="21" fill="var(--ink)"/>
      <rect x="38" y="124" width="36" height="4" fill="var(--ink)"/>
      <g fill="var(--ink)">
        <circle cx="56" cy="98" r="6.5"/>
        <circle cx="51" cy="92" r="2.6"/>
        <circle cx="61" cy="92" r="2.6"/>
        <path d="M56 100 L62 103 L56 105 Z"/>
        <path d="M49 104 C46 104 44 108 44 114 C44 120 46 124 50 124 L62 124 C66 124 68 120 68 114 C68 108 66 104 63 104 Z"/>
        <path d="M46 108 C42 110 41 114 43 117 M66 108 C70 110 71 114 69 117" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" fill="none"/>
      </g>`,
    flavor: 'A hilltop village above the oxbows of the Genesee, in the valley the Seneca called beautiful.',
    stats: {
      'ELEVATION': '~880 FT',
      'SETTLED': '1790',
      'POPULATION': '~10,000',
      'NAME': '"BEAUTIFUL VALLEY"',
      'COLLEGE': 'SUNY GENESEO',
      'GORGE NEARBY': '550 FT',
    },
    facts: [
      'The name comes from the Seneca Jo-nis-hi-yuh — "beautiful valley" — the same root that named the Genesee River.',
      'Main Street, with its 19th-century storefronts and the bronze bear fountain (1888) standing in the middle of the road, is a National Historic Landmark district.',
      'SUNY Geneseo began as the Geneseo Normal School in 1871, training teachers on the hill above the valley.',
      'The valley floor below the village is laced with oxbow bends of the Genesee — some of the most textbook river meanders in the Northeast.',
      'The National Warplane Museum\'s summer airshow flies vintage warbirds over the valley, including "Whiskey 7," a C-47 that led paratroop drops on D-Day and later returned to Normandy for the anniversary.',
      'Letchworth State Park, the "Grand Canyon of the East," is a short drive upstream — the Genesee runs 550 feet deep in a gorge there.',
      'The Wadsworth family, land agents who arrived in 1790, still farm some of the same valley ground more than two centuries later.',
      'Conesus Lake, the westernmost of the Finger Lakes, fills a glacial trough just east of the village.',
    ],
    history: [
      { era: 'DEEP PAST', title: 'Chenussio', text: 'The Genesee Valley is the western heartland of the Seneca Nation; Chenussio, near present Geneseo, is among the largest Seneca towns of the 1700s, surrounded by vast cornfields and orchards.' },
      { era: '1779', title: 'The Sullivan Campaign', text: 'In the Revolutionary War, Washington sends the Sullivan–Clinton expedition against the Haudenosaunee; Seneca towns and crops throughout the valley are burned, forcing survivors west.' },
      { era: '1790', title: 'The Wadsworths', text: 'Brothers James and William Wadsworth arrive from Connecticut as land agents and begin farming the valley on a grand scale; the village grows on the hill above their flats.' },
      { era: '1871', title: 'The Normal School', text: 'Geneseo wins the competition for a state teachers\' college; education becomes the village\'s second crop.' },
      { era: '1888', title: 'The bear on Main Street', text: 'The Emmeline fountain — a bronze bear atop a column — is set in the middle of Main Street to water horses, and never leaves.' },
      { era: '1972', title: 'After Agnes', text: 'Hurricane Agnes floods the Genesee catastrophically; the Mount Morris dam at Letchworth\'s foot proves its worth protecting the valley below.' },
      { era: '1991', title: 'Landmark Main Street', text: 'The village center is designated a National Historic Landmark — one of the best-preserved 19th-century main streets in the country.' },
    ],
    deepTime: [
      { era: '~420 MILLION YRS', title: 'Salt beneath the valley', text: 'Evaporating Silurian seas leave beds of rock salt deep under the valley. At Retsof, a few miles north, they were mined for over a century in what became the largest salt mine in the Western Hemisphere — until its dramatic collapse in 1994.' },
      { era: '~385 MILLION', title: 'The Genesee sea', text: 'A warm Devonian sea deposits the shales and limestones of the valley walls — rocks so classic that geologists named the Genesee Group after this river. Brachiopods, crinoids, and early fish swim where cornfields lie now.' },
      { era: '250–66 MILLION', title: 'The missing pages', text: 'Like the rest of western New York, the valley preserves no rock from the age of dinosaurs — it was high ground shedding sediment, not collecting it. The dinosaurs\' footprints washed away with the land they walked on.' },
      { era: '~24,000 YRS', title: 'Ice fills the valley', text: 'The Laurentide ice sheet plows south through the old river valley, deepening and straightening it, and gouging the trough that will hold Conesus Lake.' },
      { era: '~14,000 YRS', title: 'The river reinvents itself', text: 'Retreating ice leaves the old Genesee channel plugged with debris. The river, forced sideways, saws the brand-new gorge at Letchworth through solid rock — a 550-foot canyon younger than human occupation of the valley.' },
      { era: '~11,000 YRS', title: 'Mastodon meadows', text: 'Spruce parkland covers the young valley; mastodons browse it, and their bones still turn up in Livingston County bogs. The modern floodplain\'s lazy oxbows are the river\'s final, gentle draft.' },
    ],
  },

  {
    id: 'leavenworth-ks',
    num: 6,
    name: 'Leavenworth',
    region: 'Kansas, USA',
    country: 'USA',
    types: ['RIVER BLUFF', 'GARRISON TOWN'],
    status: 'visited',
    coords: { lat: 39.3111, lon: -94.9225 },
    art: `
      <!-- the Missouri below the bluff -->
      <path d="M0 140 C90 128 200 132 400 122 L400 170 L0 170 Z" fill="url(#wl)" stroke="var(--ink)" stroke-width="1.6"/>
      <!-- sternwheeler -->
      <g stroke="var(--ink)" stroke-width="1.8" fill="var(--paper)">
        <path d="M60 148 L150 148 L142 158 L70 158 Z"/>
        <path d="M76 148 L76 138 L128 138 L128 148 Z"/>
        <path d="M86 138 L86 130 L114 130 L114 138 Z"/>
        <circle cx="142" cy="146" r="9"/>
      </g>
      <path d="M96 130 L96 116 M104 130 L104 116" stroke="var(--ink)" stroke-width="2.4"/>
      <path d="M96 116 C88 108 82 106 72 104 M104 116 C98 106 92 100 84 94" fill="none" stroke="var(--gray)" stroke-width="1.6"/>
      <!-- the bluff -->
      <path d="M212 122 C260 108 320 100 400 96 L400 40 L212 40 Z" fill="none"/>
      <path d="M212 122 C260 108 320 100 400 96" fill="none" stroke="var(--ink)" stroke-width="2"/>
      <path d="M212 122 C260 108 320 100 400 96 L400 122 Z" fill="url(#hg)"/>
      <!-- fort blockhouse and stockade -->
      <g stroke="var(--ink)" stroke-width="2" fill="var(--paper)">
        <path d="M268 100 L268 66 L316 66 L316 100 Z"/>
        <path d="M262 66 L292 44 L322 66 Z" fill="url(#hi)"/>
      </g>
      <rect x="286" y="80" width="12" height="20" fill="url(#hi)"/>
      <rect x="272" y="72" width="9" height="9" fill="url(#hi)"/>
      <rect x="303" y="72" width="9" height="9" fill="url(#hi)"/>
      <path d="M292 44 L292 22 L314 27 L292 33" fill="var(--red)" stroke="var(--ink)" stroke-width="1.4"/>
      <path d="M330 100 l0 -14 m10 14 l0 -14 m10 14 l0 -14 m10 14 l0 -14 m10 14 l0 -14 m10 14 l0 -14 m10 14 l0 -14"
            stroke="var(--ink)" stroke-width="2.2"/>
      <path d="M330 90 L400 90" stroke="var(--ink)" stroke-width="1.4"/>`,
    flavor: 'The first city of Kansas, standing on Missouri River bluffs beside the oldest active Army post west of the Mississippi.',
    stats: {
      'ELEVATION': '~800 FT',
      'FOUNDED': '1854',
      'POPULATION': '~37,000',
      'FORT EST.': '1827',
      'RIVER': 'MISSOURI',
      'TITLE': 'FIRST CITY OF KS',
    },
    facts: [
      'Fort Leavenworth, established by Col. Henry Leavenworth in 1827, is the oldest continuously active U.S. Army post west of the Mississippi River.',
      'Leavenworth was the first city incorporated in Kansas Territory (1854) — it still calls itself the "First City of Kansas."',
      'The Buffalo Soldiers of the 10th Cavalry were activated at Fort Leavenworth in 1866; the monument to them on post was championed by Colin Powell.',
      'The Army\'s Command and General Staff College at the fort has schooled officers since 1881 — Eisenhower, Patton, and Powell among them.',
      'The federal penitentiary north of town, opened in 1906 and built largely by inmate labor, made "Leavenworth" a byword for federal prison.',
      'Before the railroads, Leavenworth was a great outfitting port: the freighting firm Russell, Majors & Waddell — founders of the Pony Express — ran its empire from here.',
      'Young William "Buffalo Bill" Cody grew up in the Salt Creek valley just outside town in the 1850s.',
      'Wagon ruts from the military road and trails west can still be traced on the fort grounds above the river.',
    ],
    history: [
      { era: 'DEEP PAST', title: 'Kanza and Osage country', text: 'The lower Missouri bluffs are Kanza and Osage homeland — the river a highway of trade for centuries, traveled by Lewis & Clark in 1804.' },
      { era: '1827', title: 'The fort on the bluff', text: 'Col. Henry Leavenworth establishes a cantonment to protect Santa Fe Trail commerce; it grows into the Army\'s great gateway to the West.' },
      { era: '1854', title: 'First city', text: 'Days after the Kansas–Nebraska Act opens the territory, town founders (many pro-slavery Missourians) plat Leavenworth — the territory\'s first incorporated city, soon its largest.' },
      { era: '1850s', title: 'Bleeding Kansas', text: 'The border war over slavery swirls through the young city; Leavenworth booms anyway as the outfitting port for freight, stagecoach, and Pony Express empires.' },
      { era: '1866', title: 'Buffalo Soldiers', text: 'The all-Black 10th Cavalry Regiment is activated at the fort, beginning the storied history of the Buffalo Soldiers on the frontier.' },
      { era: '1881', title: 'The Army\'s schoolhouse', text: 'Gen. Sherman founds the school that becomes the Command and General Staff College — the intellectual heart of the Army ever since.' },
      { era: '1906', title: 'The Big House', text: 'The U.S. Penitentiary opens after years of construction by its own future inmates; the town\'s name becomes shorthand for hard federal time.' },
    ],
    deepTime: [
      { era: '~305 MILLION YRS', title: 'Equatorial Kansas', text: 'Kansas sits at the equator, alternately flooded by shallow tropical seas and covered in steamy coal swamps as ice ages far to the south pull sea level up and down. The bluffs\' layered limestones and shales record dozens of these cycles.' },
      { era: '~300 MILLION', title: 'A namesake rock layer', text: 'One thin, remarkably persistent limestone bed in those cycles is officially named the Leavenworth Limestone — a few feet thick but traceable across hundreds of miles, laid down when this spot was open sea.' },
      { era: '~100–80 MILLION', title: 'Dinosaur coastlines', text: 'In the Cretaceous, the Western Interior Seaway splits North America just west of here. Eastern Kansas is coastal lowland; farther west the chalk seas swarm with mosasaurs, giant fish, and pteranodons whose fossils made Kansas famous.' },
      { era: '~700,000 YRS', title: 'The ice edge', text: 'Pre-Illinoian ice sheets reach their southern limit in northeast Kansas — the only corner of the state ever glaciated. The ice shoves the Missouri River into roughly its present course and strews pink Sioux quartzite boulders, carried from South Dakota, across the hills.' },
      { era: '~20,000 YRS', title: 'Dust and loess', text: 'Winds off the glacial outwash plains stack deep loess on the bluffs — the fertile, easily carved silt the fort and city stand on. Mammoths graze the valley until people arrive to hunt them.' },
    ],
  },

  {
    id: 'washington-dc',
    num: 7,
    name: 'Washington',
    region: 'District of Columbia, USA',
    country: 'USA',
    types: ['CAPITAL', 'FALL LINE'],
    status: 'visited',
    coords: { lat: 38.9072, lon: -77.0369 },
    art: `
      <!-- cherry branch across the sky -->
      <path d="M0 22 C60 30 110 26 150 44 M64 27 C80 20 92 20 104 14 M118 32 C132 30 140 24 148 20"
            fill="none" stroke="var(--ink)" stroke-width="2"/>
      <g fill="var(--red)">
        <circle cx="70" cy="20" r="4"/><circle cx="88" cy="14" r="4"/><circle cx="104" cy="12" r="4"/>
        <circle cx="126" cy="26" r="4"/><circle cx="146" cy="18" r="4"/><circle cx="46" cy="30" r="4"/>
      </g>
      <g fill="var(--paper)">
        <circle cx="70" cy="20" r="1.4"/><circle cx="88" cy="14" r="1.4"/><circle cx="104" cy="12" r="1.4"/>
        <circle cx="126" cy="26" r="1.4"/><circle cx="146" cy="18" r="1.4"/><circle cx="46" cy="30" r="1.4"/>
      </g>
      <!-- the Monument, color change a third up, beacon on top -->
      <path d="M236 118 L244 30 L252 30 L260 118 Z" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/>
      <path d="M244 30 L248 18 L252 30 Z" fill="var(--ink)"/>
      <circle cx="248" cy="14" r="3" fill="var(--red)"/>
      <path d="M239 88 L257 88" stroke="var(--gray)" stroke-width="1.8"/>
      <!-- mall trees -->
      <g fill="var(--green)" stroke="var(--ink)" stroke-width="1.2">
        <path d="M160 118 C158 104 172 100 176 108 C186 102 196 108 192 118 Z"/>
        <path d="M196 118 C194 106 206 102 210 110 C218 105 226 110 223 118 Z"/>
        <path d="M274 118 C272 104 286 100 290 108 C300 102 310 108 306 118 Z"/>
        <path d="M310 118 C308 106 320 102 324 110 C332 105 340 110 337 118 Z"/>
      </g>
      <path d="M0 118 L400 118" stroke="var(--ink)" stroke-width="2"/>
      <!-- reflecting pool with the monument doubled -->
      <path d="M120 128 L376 128 L376 162 L120 162 Z" fill="url(#wl)" stroke="var(--ink)" stroke-width="1.6"/>
      <path d="M242 128 L245 152 L251 152 L254 128" fill="none" stroke="var(--gray)" stroke-width="1.2"/>`,
    flavor: 'A planned city built where the Piedmont rock dives under the Coastal Plain — with a dinosaur of its own buried beneath the Capitol\'s neighborhood.',
    stats: {
      'ELEVATION': '0–409 FT',
      'FOUNDED': '1790',
      'POPULATION': '~680,000',
      'MONUMENT': '555 FT',
      'RIVER': 'POTOMAC',
      'STATE DINOSAUR': 'CAPITALSAURUS',
    },
    facts: [
      'The city sits exactly on the Fall Line — where the hard Piedmont rock plunges beneath soft Coastal Plain sediments — which is why ocean-going ships historically stopped at Georgetown.',
      'In 1898, workers digging a sewer at First and F Streets SE unearthed a large theropod vertebra: "Capitalsaurus," now the District\'s official dinosaur, with its find site named Capitalsaurus Court.',
      'The Washington Monument (1884) was the tallest structure on Earth until the Eiffel Tower; a visible color change a third of the way up marks a 25-year construction pause.',
      'Pierre L\'Enfant drew the city\'s radial plan in 1791 on land ceded by Maryland — diagonal avenues slashed across a grid, with the Capitol at the hub.',
      'British troops burned the Capitol and the President\'s House in August 1814; rebuilt and whitewashed, the mansion\'s name settled as the White House.',
      'The 1910 Height of Buildings Act keeps the skyline low — no skyscrapers, so the monuments and the sky do the work.',
      'The famous cherry trees were a 1912 gift of 3,000 trees from the mayor of Tokyo; the first two are still standing by the Tidal Basin.',
      'James Smithson, the British chemist whose bequest founded the Smithsonian in 1846, never once set foot in the United States.',
    ],
    history: [
      { era: 'DEEP PAST', title: 'Nacotchtank', text: 'The Anacostan (Nacotchtank) people live and trade at the Potomac–Anacostia confluence; the fall line is a natural meeting point of tidewater and upland worlds.' },
      { era: '1790–91', title: 'A capital by design', text: 'The Residence Act plants the federal city on the Potomac; L\'Enfant plans it and Benjamin Banneker, a free Black astronomer, helps survey its bounds.' },
      { era: '1814', title: 'The city burns', text: 'British forces torch the Capitol, the Library of Congress, and the President\'s House. A thunderstorm — and stubbornness — save the young capital.' },
      { era: '1862–65', title: 'Wartime crossroads', text: 'The Civil War swells Washington with soldiers, hospitals, and freedpeople; slavery is abolished in the District nine months before the Emancipation Proclamation.' },
      { era: '1884', title: 'The Monument tops out', text: 'After decades of fits and starts, the 555-foot obelisk is capped with a small aluminum pyramid — then the most exotic of metals.' },
      { era: '1901', title: 'The Mall perfected', text: 'The McMillan Plan sweeps railyards from the Mall and lays out the monumental core of parks, museums, and memorials we know today.' },
      { era: '1963', title: 'The Dream', text: 'A quarter-million people march for jobs and freedom; from the Lincoln Memorial steps, Dr. King tells the country his dream.' },
      { era: '1976', title: 'Metro opens', text: 'The Bicentennial brings the first Metro trains — brutalist coffered vaults that become the city\'s underground signature.' },
    ],
    deepTime: [
      { era: '~460 MILLION YRS', title: 'Collision rock', text: 'The Piedmont bedrock under Northwest DC is forged as volcanic island arcs slam into ancient North America — roots of mountains that once may have rivaled the Andes, now planed down to river hills.' },
      { era: '~115 MILLION', title: 'Capitalsaurus country', text: 'In the Early Cretaceous, slow rivers wander a lush floodplain here, burying dinosaur bones in clay. From these Potomac Formation beds came Capitalsaurus — and, nearby in Maryland, the long-necked Astrodon. Capitol Hill is literally built on dinosaur ground.' },
      { era: '35 MILLION', title: 'The Chesapeake impact', text: 'An asteroid or comet strikes the shallow shelf near the mouth of the future bay, blasting a 50-mile-wide buried crater — the largest known impact site in the U.S. Its sag still steers the lower Chesapeake\'s shape.' },
      { era: '~15 MILLION', title: 'Megalodon seas', text: 'Warm Miocene seas flood the Coastal Plain time and again; at Calvert Cliffs, an hour east, the same beds spill megalodon teeth onto the beach.' },
      { era: '~20,000 YRS', title: 'Tundra on the Potomac', text: 'The ice sheets never quite reach DC, but the city site is frozen tundra-steppe, and the ocean lies a hundred miles east of today\'s shore — the Susquehanna cuts a canyon where the bay will be.' },
      { era: '~10,000 YRS', title: 'The bay drowns in', text: 'Meltwater seas flood the old river valleys, creating the Chesapeake and the tidal Potomac. The fall line becomes the head of navigation — and, eventually, the reason a capital is planted here.' },
    ],
  },

  {
    id: 'atchison-ks',
    num: 8,
    name: 'Atchison',
    region: 'Kansas, USA',
    country: 'USA',
    types: ['RIVER BLUFF', 'RAIL TOWN'],
    status: 'visited',
    coords: { lat: 39.5631, lon: -95.1216 },
    art: `
      <!-- the river and loess bluffs below -->
      <path d="M0 132 C60 122 140 128 220 120 C300 112 350 118 400 110 L400 170 L0 170 Z" fill="url(#wl)" stroke="var(--ink)" stroke-width="1.6"/>
      <path d="M0 104 C60 96 110 100 150 108 L150 132 C100 126 40 130 0 134 Z" fill="url(#hg)" stroke="var(--ink)" stroke-width="1.6"/>
      <!-- truss bridge -->
      <path d="M210 120 L390 112 M210 128 L390 120" stroke="var(--ink)" stroke-width="1.8"/>
      <path d="M222 120 L232 108 L244 119 L256 107 L268 118 L280 106 L292 117 L304 105 L316 116 L328 104 L340 115 L352 103 L364 114 L376 112"
            fill="none" stroke="var(--ink)" stroke-width="1.2"/>
      <!-- the Electra in profile, flying east -->
      <g transform="translate(120 30)">
        <path d="M-14 24 L-26 4 L-16 6 L-4 20" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.8"/>
        <path d="M-12 26 L-38 28 L-38 33 L-10 31 Z" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.8"/>
        <path d="M-14 24 C10 16 80 14 104 21 C112 23 112 28 104 30 C80 36 10 36 -14 30 C-18 28 -18 26 -14 24 Z"
              fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/>
        <path d="M84 18 L96 18 L100 22 L88 22 Z" fill="var(--ink)"/>
        <path d="M54 30 L6 62 L22 68 L64 34 Z" fill="url(#hg)" stroke="var(--ink)" stroke-width="1.8"/>
        <path d="M46 22 C42 16 58 12 66 15 C72 17 72 27 66 29 C58 32 42 30 46 22 Z" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.8"/>
        <circle cx="72" cy="22" r="9" fill="none" stroke="var(--gray)" stroke-width="1.6"/>
        <circle cx="72" cy="22" r="2.4" fill="var(--ink)"/>
        <circle cx="108" cy="25.5" r="4.5" fill="var(--red)"/>
        <path d="M-8 27 L40 27" stroke="var(--red)" stroke-width="2"/>
      </g>
      <!-- slipstream -->
      <path d="M56 62 C76 58 92 58 106 62 M64 72 C82 68 96 68 108 71" fill="none" stroke="var(--gray)" stroke-width="1.2"/>`,
    flavor: 'Amelia Earhart\'s hometown on the Missouri bluffs, where a railroad with a singing name began.',
    stats: {
      'ELEVATION': '~810 FT',
      'FOUNDED': '1854',
      'POPULATION': '~10,000',
      'FAMOUS CHILD': 'EARHART, 1897',
      'RAILROAD': 'AT&SF, 1859',
      'RIVER': 'MISSOURI',
    },
    facts: [
      'Amelia Earhart was born here in 1897 in her grandparents\' house on the bluff above the Missouri River — now the Amelia Earhart Birthplace Museum.',
      'The Atchison, Topeka & Santa Fe Railway — the railroad of song and legend — was chartered here in 1859 by town founder Cyrus K. Holliday.',
      'Lewis and Clark camped at the mouth of Independence Creek just north of town on July 4, 1804, fired the keelboat cannon, and named the creek for the holiday — often called the first Fourth of July celebrated west of the Mississippi.',
      'The town is named for Senator David Rice Atchison, best remembered for the legend that he was "President for a day" on March 4, 1849.',
      'The International Forest of Friendship, honoring aviators from around the world, was planted here for the 1976 Bicentennial by the city and the Ninety-Nines, the women-pilots organization Earhart helped found.',
      'Benedictine College and its abbey have crowned the bluffs since the 1850s.',
      'Atchison leans into its reputation as "the most haunted town in Kansas" — the Sallie House is its star attraction every October.',
    ],
    history: [
      { era: 'DEEP PAST', title: 'Kanza river country', text: 'The Kanza people, for whom Kansas is named, live along this stretch of the Missouri; the river terraces hold villages and trails long before the town.' },
      { era: '1804', title: 'Independence Creek', text: 'Lewis and Clark\'s Corps of Discovery marks the young nation\'s birthday here with a cannon shot and an extra ration of whiskey, naming the creek for the day.' },
      { era: '1854', title: 'A border town is born', text: 'Pro-slavery Missourians plat Atchison as a rival to free-state towns; through the Bleeding Kansas years it is a hard-edged river port on the line between futures.' },
      { era: '1859', title: 'A railroad with a singing name', text: 'Cyrus K. Holliday charters the Atchison, Topeka & Santa Fe. The line will eventually stretch to the Pacific, and its name will outlive it in swing music.' },
      { era: '1860s–80s', title: 'Port and junction', text: 'Steamboats, freight wagons, and then a web of rail lines make little Atchison an outsized shipping point; brick commercial blocks rise on the levee.' },
      { era: '1897', title: 'Amelia', text: 'Amelia Earhart is born in the Otis house on Quality Hill and spends her early childhood watching the river — before going on to cross oceans no woman had flown.' },
      { era: '1937–NOW', title: 'Keeping her light', text: 'After Earhart vanishes over the Pacific, her hometown becomes keeper of her memory — museum, memorial bridge, an airborne festival every July.' },
    ],
    deepTime: [
      { era: '~305 MILLION YRS', title: 'Cyclothem country', text: 'Like Leavenworth downstream, Atchison\'s bluffs are stacked Pennsylvanian sea floors and coal swamps, laid down when Kansas straddled the equator and sea level pulsed with far-off ice ages.' },
      { era: '~100 MILLION', title: 'Edge of the seaway', text: 'In the age of dinosaurs, the Western Interior Seaway laps just west of here; rivers crossing this coastal strip drop the sandy Dakota beds whose plant fossils record some of the earliest flowering trees.' },
      { era: '~700,000 YRS', title: 'Under the ice', text: 'Atchison sits squarely in Kansas\'s glaciated northeast corner. Ice sheets override the site itself, and the Missouri River takes up its great trench along the melting margin.' },
      { era: '~20,000 YRS', title: 'The loess bluffs', text: 'Glacial winds bank deep loess onto the uplands — the smooth, steep-shouldered bluffs Earhart\'s house looks out from are drifts of ice-age dust.' },
      { era: '~13,000 YRS', title: 'First hunters', text: 'Clovis-era people move along the Missouri corridor among mammoths and giant bison; fluted points from these first Kansans still surface in plowed fields.' },
    ],
  },

  {
    id: 'hamilton-mt',
    num: 9,
    name: 'Hamilton',
    region: 'Montana, USA',
    country: 'USA',
    types: ['VALLEY TOWN', 'BITTERROOT'],
    status: 'upcoming',
    coords: { lat: 46.2466, lon: -114.1593 },
    art: `
      <!-- the Bitterroot front: canyon-notched wall -->
      <path d="M0 108 L36 44 L70 84 L104 36 L140 86 L176 40 L212 88 L248 34 L284 84 L318 46 L352 88 L378 62 L400 84"
            fill="none" stroke="var(--ink)" stroke-width="1.8"/>
      <path d="M36 44 L52 66 L36 66 Z M104 36 L120 60 L104 60 Z M176 40 L192 64 L176 64 Z M248 34 L264 58 L248 58 Z M318 46 L332 66 L318 66 Z" fill="var(--ink)"/>
      <path d="M0 108 L400 108 L400 84 L378 62 L352 88 L318 46 L284 84 L248 34 L212 88 L176 40 L140 86 L104 36 L70 84 L36 44 Z" fill="url(#hg)" opacity="1"/>
      <!-- U-canyon mouths -->
      <path d="M56 108 C56 92 84 92 84 108 M128 108 C128 94 154 94 154 108 M200 108 C200 94 226 94 226 108 M272 108 C272 94 298 94 298 108" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.6"/>
      <path d="M0 108 L400 108" stroke="var(--ink)" stroke-width="2"/>
      <!-- the Bitterroot River -->
      <path d="M0 132 C70 124 140 138 210 130 C280 122 340 136 400 128 L400 146 C340 152 280 140 210 148 C140 156 70 142 0 150 Z" fill="url(#wg)" stroke="var(--green)" stroke-width="1.4"/>
      <!-- fly fisher -->
      <g stroke="var(--ink)" stroke-width="2" fill="none">
        <circle cx="330" cy="112" r="4" fill="var(--ink)"/>
        <path d="M330 116 L330 130 M330 130 L324 142 M330 130 L336 142 M330 120 L340 114 M340 114 L354 102"/>
      </g>
      <path d="M354 102 C372 108 378 122 372 132" fill="none" stroke="var(--gray)" stroke-width="1.2"/>
      <!-- bitterroot flower -->
      <g transform="translate(52 152)">
        <g stroke="var(--red)" stroke-width="3.4" stroke-linecap="round">
          <path d="M0 0 L0 -13 M0 0 L9 -9 M0 0 L13 0 M0 0 L9 9 M0 0 L0 13 M0 0 L-9 9 M0 0 L-13 0 M0 0 L-9 -9"/>
          <path d="M0 0 L5 -12 M0 0 L12 -5 M0 0 L12 5 M0 0 L5 12 M0 0 L-5 12 M0 0 L-12 5 M0 0 L-12 -5 M0 0 L-5 -12"/>
        </g>
        <circle cx="0" cy="0" r="3.4" fill="var(--ink)"/>
      </g>`,
    flavor: 'A copper king\'s town in the Salish homeland valley, beneath canyon walls carved by ice and a lake that drowned it all.',
    stats: {
      'ELEVATION': '3,570 FT',
      'FOUNDED': '1890',
      'POPULATION': '~5,000',
      'BUILT BY': 'MARCUS DALY',
      'HIGH POINT': 'TRAPPER PK 10,157',
      'RIVER': 'BITTERROOT',
    },
    facts: [
      'Hamilton was created almost overnight in 1890 by Anaconda copper king Marcus Daly, who wanted a proper town beside his beloved Bitterroot Stock Farm.',
      'Daly\'s 24,000-square-foot summer mansion, "Riverside," still stands at the edge of town with its own museum and grounds.',
      'Daly bred champion racehorses here — including Tammany, for whom he built a lavish "castle" of a barn.',
      'Rocky Mountain Laboratories in Hamilton began with tick research on deadly Rocky Mountain spotted fever; Howard Ricketts proved tick transmission in the Bitterroot in 1906, and the bacteria genus Rickettsia bears his name.',
      'Today RML is an NIH campus with one of the nation\'s few BSL-4 labs — Ebola and other formidable pathogens are studied a few blocks from Main Street.',
      'The town faces the Bitterroot Range\'s eastern front — a 40-mile wall of granite canyons; Trapper Peak, the range\'s highest at 10,157 feet, anchors it to the south.',
      'The bitterroot flower (Lewisia rediviva), Montana\'s state flower and a staple food of the Salish, blooms pink across the valley each spring and gives river, range, and valley their name.',
      'The Bitterroot River through town is blue-ribbon trout water — the valley is one of fly fishing\'s holy places.',
    ],
    history: [
      { era: 'DEEP PAST', title: 'Heart of Salish country', text: 'The Bitterroot Valley is the traditional heartland of the Séliš (Salish) people — the place their oral histories name as home, its seasons marked by the bitterroot harvest.' },
      { era: '1805', title: 'Lewis & Clark pass through', text: 'The expedition descends the valley after crossing Lost Trail Pass, meeting the Salish near Ross\' Hole — a meeting the Salish remember as an act of their own hospitality.' },
      { era: '1841', title: 'St. Mary\'s Mission', text: 'Jesuits found St. Mary\'s Mission downvalley at present Stevensville — the first permanent Euro-American settlement in what becomes Montana.' },
      { era: '1890', title: 'Daly\'s town', text: 'Marcus Daly plats Hamilton (named for James Hamilton, who laid it out) with wide streets and a big sawmill to cut timbers for his Butte copper mines.' },
      { era: '1891', title: 'The forced removal', text: 'Chief Charlo\'s Salish band, having refused to leave their Bitterroot homeland for two decades, are marched north to the Flathead Reservation — a grief the valley still carries.' },
      { era: '1900s', title: 'Spotted fever', text: 'Settlers\' "black measles" deaths draw scientists to the valley; the tick lab they build grows into Rocky Mountain Laboratories.' },
      { era: '1928–NOW', title: 'Lab town', text: 'RML produces spotted-fever vaccine, then decades of frontier microbiology; Hamilton becomes a rare thing — a ranch town with a world-class research campus.' },
    ],
    deepTime: [
      { era: '1.4 BILLION YRS', title: 'Belt rocks east, future granite west', text: 'The Sapphire Mountains east of town are stacked Belt Supergroup mudstones — the same ancient sea floor as Missoula\'s peaks. The west side\'s story comes later, from deep magma.' },
      { era: '~90–65 MILLION', title: 'Magma under the dinosaurs', text: 'While duck-bills and tyrannosaurs roam eastern Montana\'s coastal plains, enormous magma bodies — the Idaho batholith — swell and freeze beneath this very ground. The Bitterroots\' granite is the cooled heart of dinosaur-age mountains.' },
      { era: '~75–50 MILLION', title: 'The great slide', text: 'The rising Bitterroot dome sheds the entire Sapphire block, which slides tens of miles east. The gap left behind widens into the Bitterroot Valley; the range\'s strangely smooth, tilted east face is the polished fault surface of that escape.' },
      { era: '~2 MILLION–15,000 YRS', title: 'Ice sculpts the wall', text: 'Valley glaciers pour repeatedly out of the high Bitterroots, gouging the evenly spaced U-shaped canyons — Blodgett, Mill, Bear — that give the range its trademark saw-toothed front.' },
      { era: '~15,000 YRS', title: 'Under Lake Missoula', text: 'When ice dams the Clark Fork, an arm of Glacial Lake Missoula floods north up the Bitterroot Valley; the future townsite lies hundreds of feet underwater, and lake silts settle on the valley floor now grazed by horses.' },
      { era: '~12,000 YRS', title: 'The people of the bitterroot', text: 'As the waters go for good, the ancestors of the Salish make the valley home, gathering sp̓eƛ̓m — bitterroot — on its benches each spring for the next twelve thousand years.' },
    ],
  },

  {
    id: 'los-angeles-ca',
    num: 10,
    name: 'Los Angeles',
    region: 'California, USA',
    country: 'USA',
    types: ['BASIN CITY', 'PACIFIC COAST'],
    status: 'upcoming',
    coords: { lat: 34.0522, lon: -118.2437 },
    art: `
      <!-- low red sun over the Pacific -->
      <circle cx="86" cy="84" r="24" fill="var(--red)"/>
      <circle cx="86" cy="84" r="32" fill="none" stroke="var(--red)" stroke-width="1.4"/>
      <path d="M0 108 L180 108" stroke="var(--ink)" stroke-width="1.8"/>
      <path d="M0 112 L180 112 L180 136 C120 140 60 138 0 142 Z" fill="url(#wl)" stroke="none"/>
      <!-- Griffith hill with observatory domes -->
      <path d="M164 122 C220 84 300 78 400 96" fill="none" stroke="var(--ink)" stroke-width="1.8"/>
      <path d="M164 122 C220 84 300 78 400 96 L400 122 Z" fill="url(#hx)"/>
      <g stroke="var(--ink)" stroke-width="1.8" fill="var(--paper)">
        <path d="M258 84 L258 74 L306 74 L306 84 Z"/>
        <path d="M262 74 C262 64 278 64 278 74 Z" fill="url(#hi)"/>
        <path d="M296 74 C296 66 308 66 308 74 Z" fill="url(#hi)"/>
        <path d="M240 84 L326 84"/>
      </g>
      <!-- downtown skyline -->
      <g fill="url(#hi)" stroke="var(--ink)" stroke-width="1.4">
        <rect x="196" y="112" width="14" height="34"/>
        <rect x="214" y="102" width="16" height="44"/>
        <rect x="234" y="118" width="12" height="28"/>
        <rect x="250" y="108" width="16" height="38"/>
        <rect x="270" y="120" width="12" height="26"/>
      </g>
      <path d="M0 146 L400 146" stroke="var(--ink)" stroke-width="2"/>
      <!-- palms -->
      <g stroke="var(--ink)" stroke-width="2.6" fill="none">
        <path d="M322 146 C324 120 322 100 316 86"/>
        <path d="M370 146 C368 116 370 96 376 82"/>
      </g>
      <g stroke="var(--green)" stroke-width="2.2" fill="none" stroke-linecap="round">
        <path d="M316 86 C306 78 296 76 286 78 M316 86 C312 74 306 68 298 64 M316 86 C320 74 328 68 338 66 M316 86 C326 80 336 80 344 84"/>
        <path d="M376 82 C366 74 356 72 346 74 M376 82 C372 70 366 64 358 60 M376 82 C380 70 388 64 398 62 M376 82 C386 76 396 76 400 80"/>
      </g>`,
    flavor: 'A city stacked on top of an ice-age trap: saber-toothed cats still surface in the asphalt while the whole basin slides slowly toward San Francisco.',
    stats: {
      'ELEVATION': '285 FT',
      'FOUNDED': '1781',
      'POPULATION': '~3,800,000',
      'RANGE': 'SAN GABRIELS',
      'COAST': 'PACIFIC',
      'LANGUAGES': '220+',
    },
    facts: [
      'The La Brea Tar Pits sit in the middle of the city, still bubbling — they\'ve yielded millions of ice-age fossils, including over 400 dire wolf skulls displayed on one glowing wall and the saber-toothed cat, California\'s state fossil.',
      'The city was founded in 1781 as El Pueblo de Nuestra Señora la Reina de los Ángeles by 44 settlers, most of them of African and Indigenous descent.',
      'This is Tongva homeland; the village of Yaanga stood near today\'s downtown, and Tongva mariners crossed to the Channel Islands in sewn-plank canoes.',
      'The film industry came in the 1910s for the sunshine and the variety of scenery — and, in part, to put a continent between themselves and Edison\'s patent enforcers.',
      'The Hollywood Sign went up in 1923 as "HOLLYWOODLAND," a real-estate advertisement meant to last about a year and a half.',
      'Griffith Observatory has been free to the public since it opened in 1935 — a condition of Griffith J. Griffith\'s bequest.',
      'The 1913 Los Angeles Aqueduct brought Owens Valley water 233 miles by gravity alone; at its opening William Mulholland said, in full: "There it is. Take it."',
      'After a catastrophic 1938 flood, the LA River was encased in concrete — 51 miles of it, now the world\'s most filmed drainage ditch.',
      'The ports of LA and Long Beach together form the busiest container port complex in the Western Hemisphere.',
      'LA will host the Olympics for the third time in 2028 — only London has hosted three as well.',
    ],
    history: [
      { era: 'DEEP PAST', title: 'Tongva basin', text: 'The Tongva people live throughout the basin and on the islands offshore; Yaanga, near the river\'s bend, is among the largest villages when the Spanish arrive.' },
      { era: '1781', title: 'El Pueblo', text: 'Forty-four pobladores recruited from northern Mexico found the pueblo beside the river — a farming village at the edge of an empire.' },
      { era: '1821–48', title: 'Rancho years', text: 'Under Mexico, mission lands become vast cattle ranchos; hides and tallow are the currency of a town of adobes.' },
      { era: '1876–87', title: 'Rails and the boom', text: 'The Southern Pacific, then the Santa Fe, reach town; a fare war briefly drops a ticket from Kansas City to $1, and the great Southern California land boom is on.' },
      { era: '1892', title: 'Oil under the streets', text: 'Edward Doheny strikes oil near downtown; within years derricks forest the neighborhoods, and LA becomes an oil town — it still pumps from urban wells.' },
      { era: '1913', title: 'Water arrives', text: 'The Owens Valley aqueduct opens and the city\'s limits effectively vanish; the San Fernando Valley is annexed and the metropolis begins.' },
      { era: '1910s–20s', title: 'Hollywood', text: 'Filmmakers settle a sleepy temperance suburb; within a decade it is the world capital of the movies, and "Hollywood" stops meaning a place.' },
      { era: '1932', title: 'First Olympics', text: 'Depression-era LA stages the Games anyway, inventing the Olympic Village and the three-tier medal podium.' },
      { era: '1965', title: 'Watts', text: 'Six days of uprising in Watts force the country to look at redlining, policing, and the city\'s divided geography — struggles that continue to shape LA.' },
      { era: '1984–2028', title: 'The Olympic city', text: 'The profitable \'84 Games remake Olympic hosting; the 2028 Games will make LA a three-time host.' },
    ],
    deepTime: [
      { era: '~150–66 MILLION YRS', title: 'No ground yet', text: 'Through most of the dinosaur age, much of the ground LA sits on doesn\'t exist — the coast is a subduction zone offshore, still assembling California. The state\'s rare dinosaur fossils, like duck-billed Augustynolophus (California\'s state dinosaur), come from animals washed out to sea.' },
      { era: '~18–5 MILLION', title: 'The basin tears open', text: 'Caught in the developing San Andreas plate boundary, whole crustal blocks rotate like turntables and the LA Basin pulls apart and sinks, filling with miles of marine sediment. The organic-rich Monterey muds of this sea become the oil LA later drills.' },
      { era: '~15 MILLION', title: 'Megalodon offshore', text: 'Warm Miocene seas cover the basin; whales, sea cows, and megalodon cruise above the future freeways. Shark teeth still weather out of the Palos Verdes hills.' },
      { era: '~5 MILLION–NOW', title: 'Riding the Pacific plate', text: 'LA sits west of the San Andreas fault, on the Pacific plate, sliding northwest about two inches a year — the city creeps toward San Francisco\'s latitude a few million years from now. The young, broken San Gabriels rise fast and shed rock at the city\'s edge.' },
      { era: '50,000–11,000 YRS', title: 'The tar traps', text: 'Asphalt seeps at Rancho La Brea snare mammoths, ground sloths, dire wolves, and saber-toothed cats — then the predators that came for them. It becomes one of the richest ice-age fossil sites on Earth, downtown-adjacent.' },
      { era: '~13,000 YRS', title: 'First Californians', text: 'People reach the Channel Islands by boat — Arlington Springs Man is among the oldest human remains in North America. Millennia later, one woman\'s remains in the tar at La Brea record the basin\'s early people directly.' },
    ],
  },

  // ---- future entries land here ----
];

// Number of grayed-out "???" slots shown after the last entry.
const DEX_UNKNOWN_SLOTS = 3;
