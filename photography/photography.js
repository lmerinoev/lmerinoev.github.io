// ============================================================
// Street Practice — deck, weekly rotation, stamps
//
// To add a challenge: append an object to CHALLENGES below.
// slug: stable id (share links + saved progress — don't rename)
// difficulty: 1 easy afternoon … 3 test of nerve
// themes: light | people | composition | courage | discipline | play
// study: optional link to a master's official archive
// images: optional [{src, alt, credit}] — CC-licensed only,
//         credit must name author + license + source
// ============================================================

(function () {
    'use strict';

    var STUDY = {
        meyerowitz: { label: 'Joel Meyerowitz', url: 'https://www.joelmeyerowitz.com/' },
        moriyama: { label: 'Daidō Moriyama', url: 'https://www.moriyamadaido.com/en/' },
        maier: { label: 'Vivian Maier', url: 'https://www.vivianmaier.com/' },
        lintaro: { label: 'Samuel Lintaro', url: 'https://www.youtube.com/@samuelstreetlife' }
    };

    var CHALLENGES = [
        {
            slug: 'work-the-corner',
            title: 'Work the Corner',
            brief: 'Pick one busy corner and stay for 45 minutes. Don’t chase anything. The stage refills itself — shoot only what walks into your frame.',
            difficulty: 1,
            themes: ['people'],
            camera: 'X100V',
            master: 'after Joel Meyerowitz',
            study: STUDY.meyerowitz
        },
        {
            slug: 'snap-no-chimping',
            title: 'Snap Focus, No Chimping',
            brief: 'Snap focus at 2m, f/8, auto ISO. Shoot 100 frames and don’t look at the screen once until you’re home.',
            difficulty: 2,
            themes: ['courage', 'discipline'],
            camera: 'GR II'
        },
        {
            slug: 'are-bure-boke',
            title: 'Are, Bure, Boke',
            brief: 'Rough, blurred, out of focus — on purpose. High-contrast black and white, ISO 3200+, shoot while walking, through glass, from a moving bus.',
            difficulty: 2,
            themes: ['play'],
            camera: 'GR II',
            master: 'after Daidō Moriyama',
            study: STUDY.moriyama
        },
        {
            slug: 'two-worlds',
            title: 'Two Worlds, One Frame',
            brief: 'Shop windows, puddles, mirrors. Layer the street and its reflection so both read clearly. Bonus: put yourself in one.',
            difficulty: 2,
            themes: ['composition'],
            camera: 'any',
            master: 'after Vivian Maier',
            study: STUDY.maier
        },
        {
            slug: 'noon-light',
            title: 'Noon Is Not the Enemy',
            brief: 'Go out at the worst hour. Expose for the highlights, let the shadows go black, and use the hard edges as walls in your frame.',
            difficulty: 1,
            themes: ['light'],
            camera: 'any'
        },
        {
            slug: 'follow-one-color',
            title: 'Follow One Color',
            brief: 'Pick a color at your front door and follow it across the city for an afternoon. It’s a leash: you only shoot where it appears.',
            difficulty: 1,
            themes: ['play'],
            camera: 'X-M1'
        },
        {
            slug: 'mono-week',
            title: 'Seven Days of Monochrome',
            brief: 'Black and white JPEG only, for a week. No color safety net, no converting later. Learn what survives without color.',
            difficulty: 2,
            themes: ['discipline'],
            camera: 'X100V'
        },
        {
            slug: 'hands',
            title: 'Hands',
            brief: 'An afternoon of gestures only: pointing, carrying, waving, holding. No faces required. The hand is the most candid part of a person.',
            difficulty: 2,
            themes: ['people'],
            camera: 'any'
        },
        {
            slug: 'not-close-enough',
            title: 'Not Close Enough',
            brief: 'Everything at arm’s length: 1.5 meters or less at 28mm. If your pictures aren’t good enough — you know the line.',
            difficulty: 3,
            themes: ['courage'],
            camera: 'GR II'
        },
        {
            slug: 'theatre-of-waiting',
            title: 'The Theatre of Waiting',
            brief: 'Bus stops, platforms, queues, laundromats. People waiting are people unguarded. Photograph the pause, not the action.',
            difficulty: 1,
            themes: ['people'],
            camera: 'any',
            master: 'after Vivian Maier',
            study: STUDY.maier
        },
        {
            slug: 'follow-the-light',
            title: 'Follow the Light, Not the Subject',
            brief: 'For one hour, walk only toward the best light you can see — and photograph whatever happens to be standing in it.',
            difficulty: 1,
            themes: ['light'],
            camera: 'any',
            master: 'after Joel Meyerowitz',
            study: STUDY.meyerowitz
        },
        {
            slug: 'thirty-six-exposures',
            title: 'Thirty-Six Exposures',
            brief: 'One day, 36 frames, no deleting. When the roll is done, you’re done. Every press of the shutter has to earn itself.',
            difficulty: 2,
            themes: ['discipline'],
            camera: 'digicam'
        },
        {
            slug: 'bad-weather-only',
            title: 'Bad Weather Only',
            brief: 'Only shoot when it rains. Umbrellas, hunched shoulders, neon in puddles. The city changes costume — be there for it.',
            difficulty: 2,
            themes: ['light', 'courage'],
            camera: 'any'
        },
        {
            slug: 'tourist-at-home',
            title: 'Tourist at Home',
            brief: 'Photograph your daily route as if you land there tomorrow and will never come back. Familiarity is the enemy; break it.',
            difficulty: 1,
            themes: ['discipline'],
            camera: 'any'
        },
        {
            slug: 'after-dark',
            title: 'After Dark, No Flash',
            brief: 'Night. ISO 6400, shutter as slow as you dare, streetlights as your studio strobes. Embrace the grain and the blur.',
            difficulty: 3,
            themes: ['light'],
            camera: 'X100V',
            master: 'after Daidō Moriyama',
            study: STUDY.moriyama
        },
        {
            slug: 'three-planes',
            title: 'Three Planes',
            brief: 'One frame, three depths: something happening in the foreground, the middle ground, and the background. The hardest picture in street photography.',
            difficulty: 3,
            themes: ['composition'],
            camera: 'any',
            master: 'after Joel Meyerowitz',
            study: STUDY.meyerowitz
        },
        {
            slug: 'visual-pun',
            title: 'The Visual Pun',
            brief: 'Sign plus person, poster plus passerby — the accidental joke the city writes. You just have to be standing in the right place.',
            difficulty: 2,
            themes: ['composition'],
            camera: 'any',
            master: 'after Vivian Maier',
            study: STUDY.maier
        },
        {
            slug: 'same-spot-four-lights',
            title: 'Same Spot, Four Lights',
            brief: 'One location, four visits: morning, noon, dusk, night. Same framing every time. Watch the light do all the work.',
            difficulty: 2,
            themes: ['light', 'discipline'],
            camera: 'any'
        },
        {
            slug: 'shadow-is-the-subject',
            title: 'The Shadow Is the Subject',
            brief: 'Shoot only shadows for a day. The person casting one is incidental. Long morning light or hard noon light both work.',
            difficulty: 1,
            themes: ['light'],
            camera: 'any'
        },
        {
            slug: 'waist-level',
            title: 'Waist Level',
            brief: 'No viewfinder, no screen, all day. Camera at your chest or hip, like Maier’s Rolleiflex. Learn to frame with your body.',
            difficulty: 2,
            themes: ['courage'],
            camera: 'GR II',
            master: 'after Vivian Maier',
            study: STUDY.maier
        },
        {
            slug: 'the-exit',
            title: 'The Exit',
            brief: 'Station exits, escalators, doorways: thresholds where people step from dark into light. Stand on the bright side and wait.',
            difficulty: 2,
            themes: ['people', 'light'],
            camera: 'any'
        },
        {
            slug: 'digicam-sunday',
            title: 'Digicam Sunday',
            brief: 'Take the worst camera you own. CCD colors, tiny sensor, slow autofocus. When the tool can’t be precise, you stop being precious.',
            difficulty: 1,
            themes: ['play'],
            camera: 'digicam'
        },
        {
            slug: 'carry-the-big-camera',
            title: 'Carry the Big Camera',
            brief: 'Take the DSLR to the street. You’ll be visible — so be visible. Nod, smile, keep shooting. Learn how presence changes the scene.',
            difficulty: 3,
            themes: ['courage'],
            camera: 'Nikon DSLR',
            master: 'after Samuel Lintaro',
            study: STUDY.lintaro
        },
        {
            slug: 'one-scene-thirty-frames',
            title: 'One Scene, Thirty Frames',
            brief: 'Find one good scene and work it for thirty frames — angles, distances, waits — before walking away. The first frame is never the picture.',
            difficulty: 2,
            themes: ['discipline'],
            camera: 'X100V',
            master: 'after Samuel Lintaro',
            study: STUDY.lintaro
        },
        {
            slug: 'no-people-street',
            title: 'Street Without People',
            brief: 'A candid photo of the city itself: chairs left mid-conversation, a glove on a railing, steam from a grate. Evidence of people, no people.',
            difficulty: 1,
            themes: ['composition', 'play'],
            camera: 'X-M1'
        }
    ];

    // ------------------------------------------------------------
    // Example photographs — every entry license-verified against the
    // Wikimedia Commons API (CC0 / public domain / CC BY / CC BY-SA).
    // file → thumbnail via Special:FilePath; pageUrl → attribution.
    // ------------------------------------------------------------
    var IMAGES = {
        'work-the-corner': [
            { file: 'File:Cross The Street (200876449).jpeg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Cross_The_Street_(200876449).jpeg',
              author: 'Daniel Steuri', license: 'CC BY 3.0',
              alt: 'Black-and-white view down a wide New York avenue as pedestrians cross the intersection mid-stride' },
            { file: 'File:Tokyo Shibuya Scramble Crossing 2018-10-09.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg',
              author: 'Benh LIEU SONG', license: 'CC BY-SA 2.0',
              alt: 'Crowds of pedestrians streaming across Tokyo\'s Shibuya scramble crossing at dusk under neon signs' }
        ],
        'snap-no-chimping': [
            { file: 'File:Waiting On The Crossroad (210075649).jpeg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Waiting_On_The_Crossroad_(210075649).jpeg',
              author: 'Daniel Steuri', license: 'CC BY 3.0',
              alt: 'Candid black-and-white shot of a woman checking her phone while waiting at a Hong Kong crosswalk' },
            { file: 'File:Urban Encounter Dublin Ireland Black And White Street Photography (157695877).jpeg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Urban_Encounter_Dublin_Ireland_Black_And_White_Street_Photography_(157695877).jpeg',
              author: 'Giuseppe Milo', license: 'CC BY 3.0',
              alt: 'Close wide-angle candid of backlit pedestrians on a Dublin sidewalk beside a double-decker bus' }
        ],
        'are-bure-boke': [
            { file: 'File:Walking with motion blur at Copenhagen Central Station by Thomas Leuthard (14250556323).jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Walking_with_motion_blur_at_Copenhagen_Central_Station_by_Thomas_Leuthard_(14250556323).jpg',
              author: 'Thomas Leuthard', license: 'CC BY 2.0',
              alt: 'Motion-blurred figure striding past a train at Copenhagen Central Station in grainy black and white' },
            { file: 'File:Night moves - Flickr - Edna Winti.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Night_moves_-_Flickr_-_Edna_Winti.jpg',
              author: 'Edna Winti', license: 'CC BY 2.0',
              alt: 'Blurred cars streak through a rain-slicked night intersection under glowing streetlights' }
        ],
        'two-worlds': [
            { file: 'File:Puddle reflection (explore) - Flickr - Maria Eklind.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Puddle_reflection_(explore)_-_Flickr_-_Maria_Eklind.jpg',
              author: 'Maria Eklind', license: 'CC BY-SA 2.0',
              alt: 'City buildings and a dramatic cloudy sky mirrored in a large street puddle in Malmo' },
            { file: 'File:Shop window reflection Philip Lane Tottenham London N15 England 01.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Shop_window_reflection_Philip_Lane_Tottenham_London_N15_England_01.jpg',
              author: 'Acabashi', license: 'CC BY-SA 4.0',
              alt: 'London street and terraced houses layered over cafe furniture in a shop window reflection' }
        ],
        'noon-light': [
            { file: 'File:The Step Dublin Ireland Black And White Street Photography (143674539).jpeg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:The_Step_Dublin_Ireland_Black_And_White_Street_Photography_(143674539).jpeg',
              author: 'Giuseppe Milo', license: 'CC BY 3.0',
              alt: 'Silhouetted walker casting a long hard shadow on Dublin\'s sunlit quayside cobbles' },
            { file: 'File:Pedestrian Crossing New York Black And White Street Photography (239013123).jpeg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Pedestrian_Crossing_New_York_Black_And_White_Street_Photography_(239013123).jpeg',
              author: 'Giuseppe Milo', license: 'CC BY 3.0',
              alt: 'Lone pedestrian crossing a New York street carved by harsh sunlight and deep black shadows' }
        ],
        'follow-one-color': [
            { file: 'File:Red umbrella - Flickr - darko149.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Red_umbrella_-_Flickr_-_darko149.jpg',
              author: 'Darko B', license: 'CC0',
              alt: 'A single bright red umbrella crossing a muted stone-paved square seen from above' },
            { file: 'File:Yellow Cabs in NYC (Unsplash).jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Yellow_Cabs_in_NYC_(Unsplash).jpg',
              author: 'Ferdinand Stöhr', license: 'CC0',
              alt: 'Yellow taxis repeating down a grey Manhattan street canyon at West 23rd Street' }
        ],
        'mono-week': [
            { file: 'File:Under the city - Stockholm, Sweden - Black and white street photography (23154504561).jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Under_the_city_-_Stockholm,_Sweden_-_Black_and_white_street_photography_(23154504561).jpg',
              author: 'Giuseppe Milo', license: 'CC BY 2.0',
              alt: 'Lone silhouetted figure walking toward the bright exit of a dark Stockholm underpass, deep blacks against blown highlights' },
            { file: 'File:Grand Central Station - New York - Black and white street photography (37855074185).jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Grand_Central_Station_-_New_York_-_Black_and_white_street_photography_(37855074185).jpg',
              author: 'Giuseppe Milo', license: 'CC BY 2.0',
              alt: 'Backlit commuters cast long shadows across the glowing floor of Grand Central Terminal in high-contrast black and white' }
        ],
        'hands': [
            { file: 'File:India - Varanasi green peas - 2714.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:India_-_Varanasi_green_peas_-_2714.jpg',
              author: 'Jorge Royan', license: 'CC BY-SA 3.0',
              alt: 'Weathered, bangle-covered hands of a Varanasi market vendor cupping a handful of bright green chickpeas' },
            { file: 'File:DFC 2099 A bustling market stall piled high with bright green grapes and other fresh fruit as a vendor hands a bag to a customer - a colorful scene of everyday produce trade.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:DFC_2099_A_bustling_market_stall_piled_high_with_bright_green_grapes_and_other_fresh_fruit_as_a_vendor_hands_a_bag_to_a_customer_-_a_colorful_scene_of_everyday_produce_trade.jpg',
              author: 'PattayaPatrol', license: 'CC BY-SA 4.0',
              alt: 'Hands exchanging a bag of fruit over piles of green grapes at a Thai night-market stall' }
        ],
        'not-close-enough': [
            { file: 'File:Market Vendor - Old City - Dhaka - Bangladesh (12851018314).jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Market_Vendor_-_Old_City_-_Dhaka_-_Bangladesh_(12851018314).jpg',
              author: 'Adam Jones', license: 'CC BY-SA 2.0',
              alt: 'Tight candid of a Dhaka market vendor in a green headscarf, her hand pressed to her forehead, face filling the frame' },
            { file: 'File:India - Koyambedu Market - Faces 01 (3983959747).jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:India_-_Koyambedu_Market_-_Faces_01_(3983959747).jpg',
              author: 'McKay Savage', license: 'CC BY 2.0',
              alt: 'Close-in candid of labourers shoulder-to-shoulder hoisting huge fruit baskets overhead at Koyambedu market, Chennai' }
        ],
        'theatre-of-waiting': [
            { file: 'File:Moscow 1982 train station waiting on platform.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Moscow_1982_train_station_waiting_on_platform.jpg',
              author: 'Smiley.toerist', license: 'CC BY-SA 3.0',
              alt: 'Passengers sitting on luggage and pacing a long covered platform beside a train at a Moscow station, 1982' },
            { file: 'File:WAITING FOR THE BUS-ON NICOLLET MALL - NARA - 551448.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:WAITING_FOR_THE_BUS-ON_NICOLLET_MALL_-_NARA_-_551448.jpg',
              author: 'Donald Emmerich', license: 'Public domain',
              alt: 'Young woman waiting for the bus barefoot on a bench on Nicollet Mall, Minneapolis, her sandals parked on the pavement below (1970s DOCUMERICA)' }
        ],
        'follow-the-light': [
            { file: 'File:Manhattanhenge 2016-07-11 sunset crowd on W42 jeh.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Manhattanhenge_2016-07-11_sunset_crowd_on_W42_jeh.jpg',
              author: 'Jim.henderson', license: 'CC0',
              alt: 'Golden Manhattanhenge sunset light raking down West 42nd Street across a crowd of upturned faces' },
            { file: 'File:Auckland Street With Rays, And Cyclist.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Auckland_Street_With_Rays,_And_Cyclist.jpg',
              author: 'Ingolfson', license: 'Public domain',
              alt: 'Shafts of morning sun cutting through fog and trees on an Auckland street as a cyclist rides through the beams' },
            { file: 'File:Grand Central rays of light.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Grand_Central_rays_of_light.jpg',
              author: 'WPA Federal Writers\' Project', license: 'Public domain',
              alt: 'Iconic shafts of sunlight streaming through the tall windows of Grand Central Terminal onto commuters below' }
        ],
        'thirty-six-exposures': [
            { file: 'File:H Street Corridor Washington D. C. 1978 people on sidewalk.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:H_Street_Corridor_Washington_D._C._1978_people_on_sidewalk.jpg',
              author: 'Acabashi', license: 'CC BY-SA 4.0',
              alt: 'Classic 1978 black-and-white 35mm frame of people gathered on an H Street sidewalk in Washington D.C., shot on a Kodak Retinette film camera' },
            { file: 'File:Hermann Peffer fotografeert Willem van de Poll, Bestanddeelnr 254-4081.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Hermann_Peffer_fotografeert_Willem_van_de_Poll,_Bestanddeelnr_254-4081.jpg',
              author: 'Willem van de Poll', license: 'CC0',
              alt: 'Man in a corduroy jacket aiming a vintage 35mm rangefinder camera straight at the viewer from a terrace' }
        ],
        'bad-weather-only': [
            { file: 'File:Voetgangers steken over bij de Munt in een regenachtig Amsterdam, Bestanddeelnr 252-0964.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Voetgangers_steken_over_bij_de_Munt_in_een_regenachtig_Amsterdam,_Bestanddeelnr_252-0964.jpg',
              author: 'Willem van de Poll', license: 'CC0',
              alt: 'Black-and-white scene of pedestrians with umbrellas crossing rain-slicked cobblestones near the Munt in Amsterdam' },
            { file: 'File:Rainy day at Merchant\'s Arch, Temple Bar, Dublin.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Rainy_day_at_Merchant%27s_Arch,_Temple_Bar,_Dublin.jpg',
              author: 'David Kernan', license: 'CC BY 4.0',
              alt: 'People with umbrellas, one bright red, walking down a rainy neon-lit alley in Dublin\'s Temple Bar' }
        ],
        'tourist-at-home': [
            { file: 'File:KL subway commuters - Flickr - Franck Michel.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:KL_subway_commuters_-_Flickr_-_Franck_Michel.jpg',
              author: 'Franck Michel', license: 'CC BY 2.0',
              alt: 'Crowded Kuala Lumpur metro carriage with commuters absorbed in their phones' },
            { file: 'File:Argentina-01873 - Rush Hour... (49005212511).jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Argentina-01873_-_Rush_Hour..._(49005212511).jpg',
              author: 'Dennis G. Jarvis', license: 'CC BY-SA 2.0',
              alt: 'Commuters streaming along the platform beneath the vaulted iron roof of Retiro station, Buenos Aires' },
            { file: 'File:Métro Lamarck - Caulaincourt (32585204717).jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Métro_Lamarck_-_Caulaincourt_(32585204717).jpg',
              author: 'madras91', license: 'CC BY 2.0',
              alt: 'Everyday Montmartre street life around the Lamarck-Caulaincourt metro entrance seen from the stairs above' }
        ],
        'after-dark': [
            { file: 'File:Walking around Kabukicho, Shinjuku at night. (29362321701).jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Walking_around_Kabukicho,_Shinjuku_at_night._(29362321701).jpg',
              author: 'Daniel Ramirez', license: 'CC BY 2.0',
              alt: 'Pedestrians on a rain-damp Kabukicho street at night surrounded by glowing neon signs, Tokyo' },
            { file: 'File:Mong Kok Neon Signs Night (48127904386).jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Mong_Kok_Neon_Signs_Night_(48127904386).jpg',
              author: 'Benh Lieu Song', license: 'CC BY-SA 2.0',
              alt: 'Busy Mong Kok street at night under a canopy of colourful neon signs, Hong Kong' },
            { file: 'File:Madrid (2019-10) - 50654214692.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Madrid_(2019-10)_-_50654214692.jpg',
              author: 'Nicolas Vigier', license: 'CC0',
              alt: 'Night crowd outside a Madrid bar in the rain, lit only by streetlights and shopfronts' }
        ],
        'three-planes': [
            { file: 'File:India - Chennai - busy T. Nagar market 2 (3059483658).jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:India_-_Chennai_-_busy_T._Nagar_market_2_(3059483658).jpg',
              author: 'McKay Savage', license: 'CC BY 2.0',
              alt: 'Dense Chennai market street with faces in the foreground, a crowd in the middle and receding signs beyond' },
            { file: 'File:Busy crowd on Market Place at St Albans Market.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Busy_crowd_on_Market_Place_at_St_Albans_Market.jpg',
              author: 'James Ó Nuanáin', license: 'CC BY-SA 2.0',
              alt: 'Layered St Albans market scene: stalls in the foreground, shoppers in the middle, clock tower and rooftops behind' }
        ],
        'visual-pun': [
            { file: 'File:Advertising, no one sees it anymore (47958434013).jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Advertising,_no_one_sees_it_anymore_(47958434013).jpg',
              author: 'madras91', license: 'CC BY 2.0',
              alt: 'Three people chat obliviously beneath a giant bright-blue Fenty advertising wall in Paris' },
            { file: 'File:William Goldberg, 771 Broadway, Manhattan (NYPL b13668355-482782).jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:William_Goldberg,_771_Broadway,_Manhattan_(NYPL_b13668355-482782).jpg',
              author: 'Berenice Abbott', license: 'Public domain',
              alt: 'A sandwich-board man echoes the wall of suit-sale signs covering a 1930s Broadway clothing store' }
        ],
        'same-spot-four-lights': [
            { file: 'File:Street and canal at dusk, Oudezijds Voorburgwal \'blue hour\', 7 januari 2011 (5821465439).jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Street_and_canal_at_dusk,_Oudezijds_Voorburgwal_%27blue_hour%27,_7_januari_2011_(5821465439).jpg',
              author: 'Jorge Láscar', license: 'CC BY 2.0',
              alt: 'Amsterdam canal street at blue hour, deep blue sky against warm lamplit windows and bicycles' },
            { file: 'File:Manchester at blue hour - England.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Manchester_at_blue_hour_-_England.jpg',
              author: 'Jorge Franganillo', license: 'CC BY 4.0',
              alt: 'Manchester backstreet at blue hour where fading daylight mixes with green and orange building lights' }
        ],
        'shadow-is-the-subject': [
            { file: 'File:Into the Light - Flickr - Johnragai-Moment Catcher.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Into_the_Light_-_Flickr_-_Johnragai-Moment_Catcher.jpg',
              author: 'John Ragai', license: 'CC BY 2.0',
              alt: 'Backlit market walkers cast long black shadows toward the camera on wet asphalt' },
            { file: 'File:Bogeyman (15784425120).jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Bogeyman_(15784425120).jpg',
              author: 'Anne Worner', license: 'CC BY-SA 2.0',
              alt: 'A hatted figure\'s looming shadow thrown across a sunlit textured wall dappled with tree shadows' },
            { file: 'File:32909689377 - Flickr - Keith Vaughton.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:32909689377_-_Flickr_-_Keith_Vaughton.jpg',
              author: 'Keith Vaughton', license: 'CC BY 2.0',
              alt: 'Lone man on his phone in a Manchester alley as a fire escape throws hard diagonal shadows around him' }
        ],
        'waist-level': [
            { file: 'File:Paul Almásy 423-5-003.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Paul_Almásy_423-5-003.jpg',
              author: 'Yves Tessier', license: 'CC BY-SA 4.0',
              alt: 'Photographer Paul Almásy peering down into the waist-level viewfinder of his twin-lens Rolleiflex outdoors' },
            { file: 'File:Paul Almásy 423-4-004.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Paul_Almásy_423-4-004.jpg',
              author: 'Yves Tessier', license: 'CC BY-SA 4.0',
              alt: 'Paul Almásy standing on a street with his Rolleiflex twin-lens camera slung at hip level, ready to shoot' }
        ],
        'the-exit': [
            { file: 'File:Subway exit (16225414148).jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Subway_exit_(16225414148).jpg',
              author: 'Roberto Ciucci', license: 'CC BY 2.0',
              alt: 'Black-and-white frame of two commuters emerging from a dark Shinjuku subway exit into daylight' },
            { file: 'File:Canary Wharf tube station MMB 02.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Canary_Wharf_tube_station_MMB_02.jpg',
              author: 'mattbuck', license: 'CC BY-SA 3.0',
              alt: 'Rush-hour crowd descending the escalators at Canary Wharf tube station, figures blurring in the low light' },
            { file: 'File:Milan, Metro station Duomo.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Milan%2C_Metro_station_Duomo.jpg',
              author: 'Bjørn Giesenbauer', license: 'CC BY-SA 2.0',
              alt: 'People climbing the metro exit stairs at Duomo station in Milan, stepping up into open light with the cathedral spires ahead' }
        ],
        'digicam-sunday': [
            { file: 'File:Impromptu live gig in Shibuya Historical photo of Shibuya 2005.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Impromptu_live_gig_in_Shibuya_Historical_photo_of_Shibuya_2005.jpg',
              author: 'Carl Johan Crafoord', license: 'CC BY 2.0',
              alt: 'Casual 2005 compact-digicam snapshot of a crowd watching an impromptu street gig in Shibuya, Tokyo' },
            { file: 'File:Tenka-ippin Shibuya shop (天下一品 渋谷店) (2004-09-21 05.24.41 by Antonio Fucito).jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Tenka-ippin_Shibuya_shop_(天下一品_渋谷店)_(2004-09-21_05.24.41_by_Antonio_Fucito).jpg',
              author: 'Antonio Fucito', license: 'CC BY-SA 2.0',
              alt: '2004 point-and-shoot snap of a red-lanterned Shibuya ramen shopfront with the saturated colors of an early CCD digicam' }
        ],
        'carry-the-big-camera': [
            { file: 'File:Photographer at the protest at Trump Tower 11-10 - 01.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Photographer_at_the_protest_at_Trump_Tower_11-10_-_01.jpg',
              author: 'Rhododendrites', license: 'CC BY-SA 4.0',
              alt: 'Photographer holding a DSLR with a large lens while working openly in a dense night-time street crowd in Manhattan' },
            { file: 'File:Washington, D.C. Street photographer in front of the Capitol 8d26795v.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Washington%2C_D.C._Street_photographer_in_front_of_the_Capitol_8d26795v.jpg',
              author: 'Esther Bubley', license: 'Public domain',
              alt: '1940s street photographer working openly with a big tripod-mounted box camera as passers-by gather in front of the U.S. Capitol' }
        ],
        'one-scene-thirty-frames': [
            { file: 'File:Fire and audience (24724911424).jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Fire_and_audience_(24724911424).jpg',
              author: 'Jeremy Segrott', license: 'CC BY 2.0',
              alt: 'Fire-eating street performer arched back mid-act on Cardiff\'s Queen Street with a semicircle of onlookers reacting behind' },
            { file: 'File:Women at Market Stall - Tbilisi - Georgia (18090590504) (2).jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Women_at_Market_Stall_-_Tbilisi_-_Georgia_(18090590504)_(2).jpg',
              author: 'Adam Jones', license: 'CC BY-SA 2.0',
              alt: 'Candid tableau of three women chatting around a sidewalk fruit-and-vegetable stall in Tbilisi' },
            { file: 'File:Street Performer Entertains Crowd with Fire Act Under Porto\'s Iconic Arches (55246923179).jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Street_Performer_Entertains_Crowd_with_Fire_Act_Under_Porto%27s_Iconic_Arches_(55246923179).jpg',
              author: 'Michael Gaylard', license: 'CC BY 4.0',
              alt: 'Night plaza scene of a fire performer working beneath a floodlit stone arch in Porto while a seated crowd watches' }
        ],
        'no-people-street': [
            { file: 'File:(2005) NYC\'s Steamy Manhole (5684925415).jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:(2005)_NYC%27s_Steamy_Manhole_(5684925415).jpg',
              author: 'Diego Torres Silvestre', license: 'CC BY 2.0',
              alt: 'Steam rising from a manhole on an empty New York street, human presence implied but no one in frame' },
            { file: 'File:Pristine abandoned dress shoes, Rovisco Pais Avenue, Lisbon, Portugal julesvernex2.jpg',
              pageUrl: 'https://commons.wikimedia.org/wiki/File:Pristine_abandoned_dress_shoes%2C_Rovisco_Pais_Avenue%2C_Lisbon%2C_Portugal_julesvernex2.jpg',
              author: 'Jules Verne Times Two', license: 'CC BY-SA 4.0',
              alt: 'Pair of abandoned black dress shoes left on Lisbon cobblestones scattered with fallen leaves' }
        ]
    };

    CHALLENGES.forEach(function (ch) {
        if (IMAGES[ch.slug]) ch.images = IMAGES[ch.slug];
    });

    // progress carries over from the previous design — same key
    var STORAGE_KEY = 'photo-challenges-done';
    // Monday, Jan 5 2026 UTC — anchor for the weekly rotation
    var WEEK_ANCHOR = Date.UTC(2026, 0, 5);
    var MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

    var KANJI = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

    var list = document.getElementById('chal-list');
    var weeklySlot = document.getElementById('weekly-slot');
    var filterWrap = document.getElementById('chal-filters');
    var progressCount = document.getElementById('progress-count');
    var progressEnso = document.getElementById('progress-enso');
    var progressReset = document.getElementById('progress-reset');
    var dealBtn = document.getElementById('deal-btn');

    var activeFilter = 'all';

    // ---------- helpers ----------

    function kanjiNum(n) {
        if (n <= 10) return KANJI[n - 1];
        if (n < 20) return '十' + (n % 10 ? KANJI[n % 10 - 1] : '');
        return KANJI[Math.floor(n / 10) - 1] + '十' + (n % 10 ? KANJI[n % 10 - 1] : '');
    }

    // ---------- progress (localStorage, this device only) ----------

    function loadDone() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            var arr = raw ? JSON.parse(raw) : [];
            return Array.isArray(arr) ? arr : [];
        } catch (e) {
            return [];
        }
    }

    function saveDone(slugs) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
        } catch (e) { /* private mode — stamps just won't persist */ }
    }

    function isDone(slug) {
        return loadDone().indexOf(slug) !== -1;
    }

    function toggleDone(slug) {
        var done = loadDone();
        var i = done.indexOf(slug);
        if (i === -1) done.push(slug); else done.splice(i, 1);
        saveDone(done);
        return i === -1;
    }

    // ---------- weekly rotation (same for every visitor) ----------

    function weekIndex() {
        return Math.floor((Date.now() - WEEK_ANCHOR) / MS_PER_WEEK);
    }

    function weeklyChallenge() {
        var n = CHALLENGES.length;
        var idx = ((weekIndex() % n) + n) % n;
        return CHALLENGES[idx];
    }

    function weekLabel() {
        var monday = new Date(WEEK_ANCHOR + weekIndex() * MS_PER_WEEK);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return 'Week of ' + months[monday.getUTCMonth()] + ' ' + monday.getUTCDate() + ', ' + monday.getUTCFullYear();
    }

    // ---------- rendering ----------

    function difficultyHtml(d) {
        var out = [];
        for (var i = 1; i <= 3; i++) {
            out.push('<span' + (i <= d ? '' : ' class="dim"') + '>' + KANJI[i - 1] + '</span>');
        }
        return '<span class="entry-difficulty" title="Difficulty ' + d + ' of 3">' + out.join(' ') + '</span>';
    }

    function entryHtml(ch, opts) {
        var weekly = opts && opts.weekly;
        var done = isDone(ch.slug);
        var num = kanjiNum(CHALLENGES.indexOf(ch) + 1);

        var images = '';
        if (ch.images && ch.images.length) {
            images =
                '<div class="entry-strip' + (ch.images.length < 3 ? ' entry-strip--' + ch.images.length : '') + '">' +
                ch.images.map(function (im) {
                    var src = 'https://commons.wikimedia.org/wiki/Special:FilePath/' +
                        encodeURIComponent(im.file.replace(/^File:/, '')) + '?width=900';
                    return '<img src="' + src + '" alt="' + im.alt + '" loading="lazy">';
                }).join('') +
                '</div>' +
                '<p class="entry-credit">Photos: ' +
                ch.images.map(function (im) {
                    return '<a href="' + im.pageUrl + '" target="_blank" rel="noopener">' +
                        im.author + '</a> (' + im.license + ')';
                }).join(' · ') +
                ' · via Wikimedia Commons</p>';
        }

        var study = ch.study
            ? '<p class="entry-study">Study: <a href="' + ch.study.url + '" target="_blank" rel="noopener">' + ch.study.label + '</a></p>'
            : '';

        return '' +
            '<article class="entry' + (weekly ? ' entry--weekly' : '') + (done ? ' entry--done' : '') + '"' +
            ' data-slug="' + ch.slug + '"' + (weekly ? '' : ' id="' + ch.slug + '"') + '>' +
            (weekly ? '<span class="entry-vertical" aria-hidden="true">今週の課題</span>' : '') +
            (done ? '<span class="entry-hanko" aria-hidden="true">済</span>' : '') +
            (weekly
                ? '<p class="entry-week">This week · ' + weekLabel() + '</p>'
                : '<p class="entry-num" aria-label="Challenge ' + (CHALLENGES.indexOf(ch) + 1) + '">' + num + '</p>') +
            '<h3 class="entry-title">' + ch.title + '</h3>' +
            '<p class="entry-brief">' + ch.brief + '</p>' +
            (ch.master ? '<p class="entry-master">' + ch.master + '</p>' : '') +
            '<div class="entry-meta">' +
            difficultyHtml(ch.difficulty) +
            '<span>' + ch.camera + '</span>' +
            ch.themes.map(function (t) { return '<span>' + t + '</span>'; }).join('') +
            '</div>' +
            images +
            study +
            '<div class="entry-actions">' +
            '<button class="entry-done-btn" type="button" data-action="done" aria-pressed="' + done + '">' +
            (done ? 'Stamped 済' : 'Mark done') +
            '</button>' +
            '<button class="entry-share-btn" type="button" data-action="share">Copy link</button>' +
            '</div>' +
            '</article>';
    }

    function render() {
        var visible = CHALLENGES.filter(function (ch) {
            return activeFilter === 'all' || ch.themes.indexOf(activeFilter) !== -1;
        });
        list.innerHTML = visible.map(function (ch) { return entryHtml(ch); }).join('');
        weeklySlot.innerHTML = entryHtml(weeklyChallenge(), { weekly: true });

        var doneCount = loadDone().filter(function (slug) {
            return CHALLENGES.some(function (ch) { return ch.slug === slug; });
        }).length;

        progressCount.textContent = doneCount + ' / ' + CHALLENGES.length;

        // ink the ensō in proportion to stamped challenges
        var len = progressEnso.getTotalLength();
        var drawn = len * (doneCount / CHALLENGES.length);
        progressEnso.style.strokeDasharray = drawn + ' ' + len;
    }

    // ---------- interactions ----------

    function flash(entry) {
        entry.classList.remove('entry--flash');
        void entry.offsetWidth; // restart the animation
        entry.classList.add('entry--flash');
    }

    function goToEntry(slug) {
        var entry = list.querySelector('[data-slug="' + slug + '"]');
        if (!entry) {
            activeFilter = 'all';
            filterWrap.querySelectorAll('.deck-filter').forEach(function (f) {
                f.classList.toggle('active', f.dataset.filter === 'all');
            });
            render();
            entry = list.querySelector('[data-slug="' + slug + '"]');
        }
        if (entry) {
            entry.scrollIntoView({ behavior: 'smooth', block: 'center' });
            flash(entry);
        }
    }

    function copyLink(slug, btn) {
        var url = location.origin + location.pathname + '#' + slug;
        function ok() {
            var prev = btn.textContent;
            btn.textContent = 'Copied';
            btn.classList.add('copied');
            setTimeout(function () {
                btn.textContent = prev;
                btn.classList.remove('copied');
            }, 1600);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(ok, function () {
                window.prompt('Copy this link:', url);
            });
        } else {
            window.prompt('Copy this link:', url);
        }
    }

    document.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-action]');
        if (!btn) return;
        var entry = btn.closest('.entry');
        if (!entry) return;
        var slug = entry.dataset.slug;

        if (btn.dataset.action === 'done') {
            var nowDone = toggleDone(slug);
            render();
            if (nowDone) {
                // press the fresh stamp(s) for this slug
                document.querySelectorAll('.entry[data-slug="' + slug + '"] .entry-hanko')
                    .forEach(function (h) { h.classList.add('pressed'); });
            }
        } else if (btn.dataset.action === 'share') {
            copyLink(slug, btn);
        }
    });

    filterWrap.addEventListener('click', function (e) {
        var btn = e.target.closest('.deck-filter');
        if (!btn) return;
        activeFilter = btn.dataset.filter;
        filterWrap.querySelectorAll('.deck-filter').forEach(function (f) {
            f.classList.toggle('active', f === btn);
        });
        render();
    });

    progressReset.addEventListener('click', function () {
        if (loadDone().length === 0) return;
        if (window.confirm('Clear all stamps on this device?')) {
            saveDone([]);
            render();
        }
    });

    dealBtn.addEventListener('click', function () {
        var pool = CHALLENGES.filter(function (ch) { return !isDone(ch.slug); });
        if (pool.length === 0) pool = CHALLENGES;
        var pick = pool[Math.floor(Math.random() * pool.length)];
        goToEntry(pick.slug);
    });

    // ---------- init ----------

    render();

    if (location.hash) {
        var slug = location.hash.slice(1);
        if (CHALLENGES.some(function (ch) { return ch.slug === slug; })) {
            // let layout settle before scrolling to the shared entry
            setTimeout(function () { goToEntry(slug); }, 100);
        }
    }
})();
