// ─── data.js — Country names, region groups & passport database ───────────────

// ── ISO Numeric → Country Name ──────────────────────────────────────────────
const N = {
  4:"Afghanistan",8:"Albania",12:"Algeria",20:"Andorra",24:"Angola",
  32:"Argentina",36:"Australia",40:"Austria",48:"Bahrain",50:"Bangladesh",
  51:"Armenia",52:"Barbados",56:"Belgium",60:"Bermuda",64:"Bhutan",
  68:"Bolivia",70:"Bosnia & Herz.",72:"Botswana",76:"Brazil",84:"Belize",
  90:"Solomon Islands",96:"Brunei",100:"Bulgaria",104:"Myanmar",108:"Burundi",
  112:"Belarus",116:"Cambodia",120:"Cameroon",124:"Canada",132:"Cabo Verde",
  136:"Cayman Islands",140:"Central African Rep.",144:"Sri Lanka",148:"Chad",
  152:"Chile",156:"China",158:"Taiwan",166:"Cocos Islands",170:"Colombia",
  174:"Comoros",175:"Mayotte",178:"Congo",180:"DR Congo",184:"Cook Islands",
  188:"Costa Rica",191:"Croatia",192:"Cuba",196:"Cyprus",203:"Czech Republic",
  204:"Benin",208:"Denmark",212:"Dominica",214:"Dominican Rep.",218:"Ecuador",
  222:"El Salvador",226:"Equatorial Guinea",231:"Ethiopia",232:"Eritrea",
  233:"Estonia",238:"Falkland Islands",242:"Fiji",246:"Finland",250:"France",
  254:"French Guiana",258:"French Polynesia",262:"Djibouti",266:"Gabon",
  268:"Georgia",276:"Germany",288:"Ghana",292:"Gibraltar",300:"Greece",
  304:"Greenland",308:"Grenada",312:"Guadeloupe",316:"Guam",320:"Guatemala",
  324:"Guinea",328:"Guyana",332:"Haiti",340:"Honduras",344:"Hong Kong",
  348:"Hungary",352:"Iceland",356:"India",360:"Indonesia",364:"Iran",
  368:"Iraq",372:"Ireland",376:"Israel",380:"Italy",383:"Kosovo",
  384:"Côte d'Ivoire",388:"Jamaica",392:"Japan",398:"Kazakhstan",400:"Jordan",
  404:"Kenya",408:"North Korea",410:"South Korea",414:"Kuwait",417:"Kyrgyzstan",
  418:"Laos",422:"Lebanon",426:"Lesotho",428:"Latvia",430:"Liberia",
  434:"Libya",438:"Liechtenstein",440:"Lithuania",442:"Luxembourg",
  450:"Madagascar",454:"Malawi",458:"Malaysia",462:"Maldives",466:"Mali",
  470:"Malta",478:"Mauritania",480:"Mauritius",484:"Mexico",496:"Mongolia",
  498:"Moldova",499:"Montenegro",504:"Morocco",508:"Mozambique",
  512:"Oman",516:"Namibia",524:"Nepal",528:"Netherlands",
  540:"New Caledonia",548:"Vanuatu",554:"New Zealand",558:"Nicaragua",
  562:"Niger",566:"Nigeria",578:"Norway",580:"N. Mariana Islands",
  586:"Pakistan",591:"Panama",598:"Papua New Guinea",600:"Paraguay",
  604:"Peru",608:"Philippines",616:"Poland",620:"Portugal",
  624:"Guinea-Bissau",626:"Timor-Leste",630:"Puerto Rico",634:"Qatar",
  642:"Romania",643:"Russia",646:"Rwanda",659:"St. Kitts & Nevis",
  662:"St. Lucia",670:"St. Vincent & Grenadines",678:"São Tomé & Príncipe",
  682:"Saudi Arabia",686:"Senegal",688:"Serbia",694:"Sierra Leone",
  702:"Singapore",703:"Slovakia",704:"Vietnam",705:"Slovenia",
  706:"Somalia",710:"South Africa",716:"Zimbabwe",720:"South Sudan",
  724:"Spain",740:"Suriname",748:"Eswatini",752:"Sweden",756:"Switzerland",
  760:"Syria",762:"Tajikistan",764:"Thailand",768:"Togo",776:"Tonga",
  780:"Trinidad & Tobago",784:"UAE",788:"Tunisia",792:"Turkey",
  795:"Turkmenistan",800:"Uganda",804:"Ukraine",807:"N. Macedonia",
  818:"Egypt",826:"United Kingdom",834:"Tanzania",840:"United States",
  854:"Burkina Faso",858:"Uruguay",860:"Uzbekistan",862:"Venezuela",
  882:"Samoa",887:"Yemen",894:"Zambia",
};

// ── Regional Groups (ISO numeric arrays) ────────────────────────────────────
const G = {
  // Core EU/Schengen
  eu:  [40,56,100,191,203,208,233,246,250,276,300,348,372,380,428,440,442,470,
        528,616,620,642,703,705,724,752,196],
  // EFTA
  efta:[578,756,352,438],
  // Five Eyes
  five:[36,124,554,826,840],
  // ASEAN
  asean:[96,116,360,418,458,104,608,702,764,704],
  // South America
  sam: [32,68,76,152,170,218,328,600,604,740,858,862],
  // Central America & Caribbean
  cam: [84,188,214,222,320,332,340,388,484,558,591,
        52,212,659,662,670,780],
  // Eastern Europe (non-EU)
  eeur:[8,70,383,499,807,688,112,498,804],
  // Caucasus
  cauc:[51,268],
  // Central Asia
  cas: [398,417,762,795,860,496],
  // East Africa
  eaf: [108,174,231,404,646,706,800,834,262,232,450,454,480],
  // West Africa
  waf: [204,854,132,384,266,288,324,624,430,466,478,562,566,686,694,768,678],
  // Southern Africa
  saf: [24,72,426,516,710,748,716,894,508],
  // MENA
  mena:[12,48,818,364,368,400,414,422,434,504,512,634,682,760,788,887],
  // South Asia
  saarc:[50,64,356,462,524,586,144,4],
  // Pacific
  pac: [36,554,242,548,598,776,882,90],
};

function u(...args){
  return [...new Set(args.flatMap(a => Array.isArray(a) ? a : (G[a] || [])))];
}

// ── Passport Database ────────────────────────────────────────────────────────
// Each entry: { name, flag, n (ISO numeric), rank, s:{vf,voa,req}, total,
//               insight, vf:[], voa:[] }
// Countries not in vf[] or voa[] are implicitly "visa required".

const P = {

  // ── TIER 1 — Elite (Rank 1-5) ──────────────────────────────────────────────

  JPN:{name:"Japan",flag:"🇯🇵",n:392,rank:1,
    s:{vf:193,voa:31,req:10},total:195,
    insight:"World's most powerful passport — unrivaled global access across 193 destinations.",
    vf:u('eu','efta','five','sam','cam',
        [410,702,458,156,704,764,608,116,360,51,268,8,70,383,499,807,688,
         400,376,504,710,516,894,646,834,242,598,776,882,480]),
    voa:u([50,64,356,462,524,404,566,800,231,288,682,634,784,792,418,496,398,762,860,12])},

  SGP:{name:"Singapore",flag:"🇸🇬",n:702,rank:2,
    s:{vf:192,voa:29,req:11},total:195,
    insight:"Asia's passport powerhouse — tied for 2nd globally with seamless ASEAN connectivity.",
    vf:u('eu','efta','five','sam','cam',
        [392,410,458,156,704,764,608,116,360,51,268,8,70,383,499,807,688,
         400,376,504,710,516,894,646,834,242,480]),
    voa:u([50,64,356,462,524,404,566,800,231,288,682,634,784,792,418,496,398,762,860])},

  KOR:{name:"South Korea",flag:"🇰🇷",n:410,rank:2,
    s:{vf:192,voa:28,req:12},total:195,
    insight:"Tied with Singapore — remarkable rise driven by Korea's expanding diplomatic influence.",
    vf:u('eu','efta','five','sam','cam',
        [392,702,458,156,704,764,608,116,360,51,268,8,70,383,499,807,688,
         400,376,504,710,516,894,646,834,242,480]),
    voa:u([50,64,356,462,524,404,566,800,231,288,682,634,784,792,418,496,398,762,860])},

  DEU:{name:"Germany",flag:"🇩🇪",n:276,rank:3,
    s:{vf:190,voa:30,req:12},total:195,
    insight:"Europe's strongest diplomatic passport — Schengen hub with near-universal reach.",
    vf:u('eu','efta','five','sam','cam',
        [392,702,410,458,156,704,764,608,116,360,51,268,8,70,383,499,807,688,
         400,376,504,710,516,894,646,834,242,480]),
    voa:u([50,64,356,462,524,404,566,800,231,288,682,634,784,792,418,496,398,762,860])},

  ITA:{name:"Italy",flag:"🇮🇹",n:380,rank:3,
    s:{vf:190,voa:30,req:12},total:195,
    insight:"Ancient empire, modern mobility — Italy ties Germany at rank 3 worldwide.",
    vf:u('eu','efta','five','sam','cam',
        [392,702,410,458,156,704,764,608,116,360,51,268,8,70,383,499,807,688,
         400,376,504,710,516,894,646,834,242,480]),
    voa:u([50,64,356,462,524,404,566,800,231,288,682,634,784,792,418,496,398,762,860])},

  FRA:{name:"France",flag:"🇫🇷",n:250,rank:4,
    s:{vf:189,voa:30,req:13},total:195,
    insight:"The Grande Nation's passport opens 189 doors — backed by EU and Francophonie networks.",
    vf:u('eu','efta','five','sam','cam',
        [392,702,410,458,156,704,764,608,116,360,51,268,8,70,383,499,807,688,
         400,376,504,710,516,894,646,834,242]),
    voa:u([50,64,356,462,524,404,566,800,231,288,682,634,784,792,418,496,398,762,860])},

  ESP:{name:"Spain",flag:"🇪🇸",n:724,rank:3,
    s:{vf:190,voa:30,req:12},total:195,
    insight:"Iberian global reach — Spain's Schengen membership and Latin American ties make it top-tier.",
    vf:u('eu','efta','five','sam','cam',
        [392,702,410,458,156,704,764,608,116,360,51,268,8,70,383,499,807,688,
         400,376,504,710,516,894,646,834,242,480]),
    voa:u([50,64,356,462,524,404,566,800,231,288,682,634,784,792,418,496,398,762,860])},

  SWE:{name:"Sweden",flag:"🇸🇪",n:752,rank:3,
    s:{vf:190,voa:30,req:12},total:195,
    insight:"Scandinavian excellence — Sweden consistently ranks among the world's top 3 passports.",
    vf:u('eu','efta','five','sam','cam',
        [392,702,410,458,156,704,764,608,116,360,51,268,8,70,383,499,807,688,
         400,376,504,710,516,894,646,834,242,480]),
    voa:u([50,64,356,462,524,404,566,800,231,288,682,634,784,792,418,496,398,762,860])},

  NOR:{name:"Norway",flag:"🇳🇴",n:578,rank:3,
    s:{vf:190,voa:30,req:12},total:195,
    insight:"EFTA powerhouse with Schengen access — Norway punches above its weight diplomatically.",
    vf:u('eu','efta','five','sam','cam',
        [392,702,410,458,156,704,764,608,116,360,51,268,8,70,383,499,807,688,
         400,376,504,710,516,894,646,834,242,480]),
    voa:u([50,64,356,462,524,404,566,800,231,288,682,634,784,792,418,496,398,762,860])},

  CHE:{name:"Switzerland",flag:"🇨🇭",n:756,rank:3,
    s:{vf:190,voa:30,req:12},total:195,
    insight:"Neutral Switzerland's passport is far from neutral in power — elite global access.",
    vf:u('eu','efta','five','sam','cam',
        [392,702,410,458,156,704,764,608,116,360,51,268,8,70,383,499,807,688,
         400,376,504,710,516,894,646,834,242,480]),
    voa:u([50,64,356,462,524,404,566,800,231,288,682,634,784,792,418,496,398,762,860])},

  NLD:{name:"Netherlands",flag:"🇳🇱",n:528,rank:4,
    s:{vf:189,voa:30,req:13},total:195,
    insight:"Dutch Golden Age diplomacy lives on — Netherlands holds firm in the global top 5.",
    vf:u('eu','efta','five','sam','cam',
        [392,702,410,458,156,704,764,608,116,360,51,268,8,70,383,499,807,688,
         400,376,504,710,516,894,646,834,242,480]),
    voa:u([50,64,356,462,524,404,566,800,231,288,682,634,784,792,418,496,398,762,860])},

  // ── TIER 2 — Strong (Rank 6-15) ────────────────────────────────────────────

  GBR:{name:"United Kingdom",flag:"🇬🇧",n:826,rank:4,
    s:{vf:187,voa:30,req:15},total:195,
    insight:"Post-Brexit passport retains elite status — Commonwealth ties provide unique advantages.",
    vf:u('eu','efta',[36,124,554,840],'sam','cam',
        [392,702,410,458,156,704,764,608,116,360,51,268,8,70,383,499,807,688,
         400,376,504,710,516,894,646,834,242,480]),
    voa:u([50,64,356,462,524,404,566,800,231,288,682,634,784,792,418,496,398,762,860])},

  USA:{name:"United States",flag:"🇺🇸",n:840,rank:6,
    s:{vf:186,voa:28,req:18},total:195,
    insight:"Global superpower passport with some restrictions in MENA — still undeniably elite tier.",
    vf:u('eu','efta',[36,124,554,826],'sam','cam',
        [392,702,410,458,704,764,608,116,360,51,268,8,70,383,499,807,688,
         376,504,710,516,894,646,834,242,480]),
    voa:u([50,64,356,462,524,404,566,800,231,288,682,634,784,418,496,398,762,860])},

  AUS:{name:"Australia",flag:"🇦🇺",n:36,rank:7,
    s:{vf:185,voa:30,req:17},total:195,
    insight:"Pacific powerhouse — exceptional Asia-Pacific reach and Commonwealth advantages.",
    vf:u('eu','efta',[124,554,826,840],'sam','cam',
        [392,702,410,458,156,704,764,608,116,360,51,268,8,70,383,499,807,688,
         400,376,504,710,516,894,646,834,242,776,882]),
    voa:u([50,64,356,462,524,404,566,800,231,288,682,634,784,792,418,496,398,762,860])},

  CAN:{name:"Canada",flag:"🇨🇦",n:124,rank:7,
    s:{vf:185,voa:30,req:17},total:195,
    insight:"North America's diplomatic heavyweight — G7 status ensures near-universal access.",
    vf:u('eu','efta',[36,554,826,840],'sam','cam',
        [392,702,410,458,156,704,764,608,116,360,51,268,8,70,383,499,807,688,
         400,376,504,710,516,894,646,834,242,480]),
    voa:u([50,64,356,462,524,404,566,800,231,288,682,634,784,792,418,496,398,762,860])},

  NZL:{name:"New Zealand",flag:"🇳🇿",n:554,rank:7,
    s:{vf:185,voa:30,req:17},total:195,
    insight:"Pacific gem passport — New Zealand's neutrality and trade links unlock near-global access.",
    vf:u('eu','efta',[36,124,826,840],'sam','cam',
        [392,702,410,458,156,704,764,608,116,360,51,268,8,70,383,499,807,688,
         400,376,504,710,516,894,646,834,242,776,882,548]),
    voa:u([50,64,356,462,524,404,566,800,231,288,682,634,784,792,418,496,398,762,860])},

  MYS:{name:"Malaysia",flag:"🇲🇾",n:458,rank:12,
    s:{vf:183,voa:28,req:20},total:195,
    insight:"ASEAN's second-strongest passport — surprising global reach for a developing economy.",
    vf:u('eu','efta','five','sam','cam',
        [392,702,410,156,704,764,608,116,360,51,268,8,70,383,499,807,688,
         400,376,504,710,516,894,646,834,242,480]),
    voa:u([50,64,356,462,524,404,566,800,231,288,682,634,784,792,418,496,398,762,860,96])},

  POL:{name:"Poland",flag:"🇵🇱",n:616,rank:12,
    s:{vf:183,voa:28,req:20},total:195,
    insight:"EU integration transformed Poland's passport from restricted to world-class in one generation.",
    vf:u('eu','efta','five','sam','cam',
        [392,702,410,458,156,704,764,608,116,360,51,268,8,70,383,499,807,688,
         400,376,504,710,516,894,646,834,242]),
    voa:u([50,64,356,462,524,404,566,800,231,288,682,634,784,792,418,496,398,762,860])},

  ARE:{name:"UAE",flag:"🇦🇪",n:784,rank:11,
    s:{vf:180,voa:45,req:17},total:195,
    insight:"The fastest-improving passport of the decade — reshaping Gulf mobility diplomacy.",
    vf:u('eu','efta','five','sam','cam',
        [392,702,410,458,156,704,764,608,116,360,400,504,710,516,894,646,834,682,634,788,20,438]),
    voa:u([50,64,356,462,524,404,566,800,231,288,792,418,496,398,762,860,51,268,156])},

  ISR:{name:"Israel",flag:"🇮🇱",n:376,rank:24,
    s:{vf:163,voa:28,req:46},total:195,
    insight:"Strong Western ties offset MENA restrictions — Israel ranks solidly in global top 25.",
    vf:u('eu','efta','five','sam','cam',
        [392,702,410,458,156,704,764,608,116,360,51,268,8,70,383,499,807,688,
         504,710,516,894,646,834,242]),
    voa:u([50,64,356,462,524,404,566,800,231,288,634,792,418,496,398,762,860])},

  // ── TIER 3 — Good (Rank 16-40) ─────────────────────────────────────────────

  BRA:{name:"Brazil",flag:"🇧🇷",n:76,rank:19,
    s:{vf:171,voa:35,req:37},total:195,
    insight:"Latin America's heavyweight — strong European and MERCOSUR connectivity.",
    vf:u('eu','efta',[554,826,840,36,124],'sam','cam',
        [702,410,458,704,764,608,116,360,504,710,516,894,400,376,242,480]),
    voa:u([50,64,356,462,524,404,566,800,231,288,682,634,784,792,418,496,398,762,860,156,392])},

  ARG:{name:"Argentina",flag:"🇦🇷",n:32,rank:19,
    s:{vf:171,voa:33,req:39},total:195,
    insight:"South America's most traveled passport — Mercosur integration and strong EU links.",
    vf:u('eu','efta',[554,826,840,36,124,76],'sam','cam',
        [702,410,458,704,764,608,116,360,504,710,516,894,400,376,242]),
    voa:u([50,64,356,462,524,404,566,800,231,288,682,634,784,792,418,496,398,762,860,156,392])},

  MEX:{name:"Mexico",flag:"🇲🇽",n:484,rank:25,
    s:{vf:160,voa:40,req:52},total:195,
    insight:"NAFTA neighbor with broad reach — Mexico's passport benefits from deep US trade ties.",
    vf:u('eu','efta',[554,826,840,36,124,76,32,152,170,218,600,604,858,740,328],'cam',
        [702,410,458,704,764,608,116,360,504,710,516,894,400,242]),
    voa:u([50,64,356,462,524,404,566,800,231,288,682,634,784,792,418,496,398,762,860,156])},

  UKR:{name:"Ukraine",flag:"🇺🇦",n:804,rank:35,
    s:{vf:148,voa:30,req:64},total:195,
    insight:"Biometric reform and EU visa liberalisation gave Ukraine a major ranking boost post-2017.",
    vf:u('eu','efta','sam','cam',
        [392,702,410,458,156,704,764,608,116,360,51,268,8,70,383,499,807,688,
         504,710,516,894,646,834,400,242]),
    voa:u([50,64,356,462,524,404,566,800,231,288,682,634,784,792,418,496,398,762,860])},

  // ── TIER 4 — Average (Rank 41-70) ──────────────────────────────────────────

  TUR:{name:"Turkey",flag:"🇹🇷",n:792,rank:51,
    s:{vf:110,voa:42,req:80},total:195,
    insight:"EU candidacy stalled, yet Turkey's passport grants respectable MENA and Turkic access.",
    vf:u('eeur','cauc','cas','sam','cam',
        [458,116,764,608,418,496,104,360,702,410,504,516,894,710,834,646,400,680,400,788]),
    voa:u([50,64,356,462,524,566,288,686,204,634,682,784,512,12,500])},

  ZAF:{name:"South Africa",flag:"🇿🇦",n:710,rank:53,
    s:{vf:105,voa:49,req:68},total:195,
    insight:"Africa's strongest passport — BRICS membership and visa-free SADC travel underpin its rank.",
    vf:u('saf','eaf','waf',
        [76,32,152,170,218,600,604,858,740,328,84,188,214,222,320,332,340,388,484,558,591,
         116,360,458,764,608,702,410,242,776,598]),
    voa:u([50,64,356,462,524,404,566,800,231,288,634,682,784,512,400,504,788,156,392,276,250,724,380,528])},

  SAU:{name:"Saudi Arabia",flag:"🇸🇦",n:682,rank:67,
    s:{vf:79,voa:52,req:81},total:195,
    insight:"Oil diplomacy and Vision 2030 reforms are steadily expanding Saudi passport power.",
    vf:u([48,414,512,634,784,400,788],[116,360,458,764,608,418,104,96,702,410],[504,400,12]),
    voa:u([50,64,356,462,524,404,566,800,231,288,646,834,516,894,710,
           8,70,383,499,807,688,51,268,496,762,860,398,417,204,854,132,384,266,288,
           324,624,430,466,478,562,686,694,768,24,72,426,508,748,716,894,174,262])},

  THA:{name:"Thailand",flag:"🇹🇭",n:764,rank:64,
    s:{vf:82,voa:39,req:91},total:195,
    insight:"ASEAN's travel hub — Thailand leverages its central SE Asia position for broad regional access.",
    vf:u([96,116,360,418,458,104,608,702,704],[51,268,8,70,383,499,807,688,496,762,860,398,417,795],
         [32,68,152,170,218,600,604,858,740,328],[204,854,132,384,266,288,324,624,430,466,478,562,686,694,768]),
    voa:u([50,64,356,462,524,404,566,800,231,288,646,834,516,894,710,400,504,682,634,784,792,12])},

  IDN:{name:"Indonesia",flag:"🇮🇩",n:360,rank:63,
    s:{vf:83,voa:45,req:89},total:195,
    insight:"The world's largest archipelago nation — ASEAN membership gives Indonesia solid regional footing.",
    vf:u([96,116,418,458,104,608,702,764,704],[51,268,8,70,383,499,807,688,496,762,860,398,417,795],
         [32,68,152,170,218,600,604,858,740,328],[204,854,132,384,266,288,324,624,430,466,478,562,686,694,768]),
    voa:u([50,64,356,462,524,404,566,800,231,288,646,834,516,894,710,400,504,682,634,784,792])},

  EGY:{name:"Egypt",flag:"🇪🇬",n:818,rank:94,
    s:{vf:44,voa:57,req:102},total:195,
    insight:"Gateway of civilisations, limited modern mobility — strong intra-Arab and African VoA access.",
    vf:u([204,854,132,384,266,288,324,624,430,466,478,562,686,694,768],
         [108,174,262],[24,72,426,508,748,716,894]),
    voa:u([116,360,458,764,608,418,104,96,702,410,156],[404,646,800,834,516,710,231,288,566,686],
          [400,504,784,634,682,512,792,788,48,414,422])},

  // ── TIER 5 — Restricted (Rank 71-103) ──────────────────────────────────────

  PHL:{name:"Philippines",flag:"🇵🇭",n:608,rank:76,
    s:{vf:67,voa:41,req:94},total:195,
    insight:"OFW diaspora diplomacy helps — but the Philippines still faces significant visa hurdles.",
    vf:u([96,116,360,418,458,104,702,764,704],
         [51,268,496,762,860,398,417,795],
         [204,854,132,384,266,288,324,624,430,466,478,562,686,694,768],
         [32,68,152,170,218,600,604,858,740,328,84,188,214,222,320,332,340,388,484,558,591]),
    voa:u([50,64,356,462,524,404,566,800,231,288,710,516,894,646,834,400,504,682,634,784,792])},

  RUS:{name:"Russia",flag:"🇷🇺",n:643,rank:49,
    s:{vf:119,voa:34,req:89},total:195,
    insight:"Sanctions have diminished reach — but CIS and Asian access remains significant.",
    vf:u('eeur','cauc','cas',
        [116,418,458,104,360,764,704,608,96,702,156,392,410,496],
        [32,68,152,170,218,600,604,858,76,484],
        [400,504,516,894,710,834,646,231,404,800]),
    voa:u([50,64,356,462,524,566,288,686],[682,634,784,792,512,788])},

  CHN:{name:"China",flag:"🇨🇳",n:156,rank:62,
    s:{vf:85,voa:47,req:110},total:195,
    insight:"Rapidly expanding through BRI diplomacy — grew from 40 to 85 visa-free destinations in a decade.",
    vf:u([116,418,458,104,360,764,704,608,96,702,410],
         [496,762,860,398,417,795],
         [400,504,516,710,894,834,646],
         [32,68,152,170,218,600,604,858]),
    voa:u([50,64,356,462,524,404,566,800,231,288,634,784,12,788,512],
          [8,70,499,807],[242,598])},

  IRN:{name:"Iran",flag:"🇮🇷",n:364,rank:99,
    s:{vf:37,voa:42,req:143},total:195,
    insight:"Sanctions and geopolitical isolation make Iran's passport one of the world's most restricted.",
    vf:u([116,418,458,104,360,764,704,608,96,702,496,762,860,398,417,795],
         [51,268,8,70,383,499,807,688]),
    voa:u([50,64,356,462,524,404,566,800,231,288,710,516,894,646,834,400,504,682,512])},

  IND:{name:"India",flag:"🇮🇳",n:356,rank:82,
    s:{vf:58,voa:39,req:145},total:195,
    insight:"Modest global standing reflects complex geopolitics — strong in Africa and Southeast Asia.",
    vf:u([116,360,462,458,704],[231,404,646,516,894,800,834,710,174,262,426,508,748,716,450]),
    voa:u([50,64,524,702,764,608,96,104,418,496],[566,288,686,204,854,132,384,266,324,624,430,466,478,562,694,768],
          [682,634,784,792,400,512,48,414])},

  NGA:{name:"Nigeria",flag:"🇳🇬",n:566,rank:92,
    s:{vf:46,voa:43,req:153},total:195,
    insight:"West Africa's giant faces global mobility barriers — intra-African movement is strongest.",
    vf:u([204,854,132,384,266,288,324,624,430,466,478,562,686,694,768],
         [108,174,262,450,454,480],[388,484,170,218,328,600,604,858]),
    voa:u([116,360,458,702,764,608,418,104,96,410],
          [404,646,800,834,516,894,710,231,426,508,748,716],
          [400,504,784,634,682,512,792,48,414])},

  PAK:{name:"Pakistan",flag:"🇵🇰",n:586,rank:101,
    s:{vf:33,voa:42,req:167},total:195,
    insight:"Among the world's most restricted passports — geopolitical tensions limit global access.",
    vf:u([116,418,458,104,360,764,704,608,96,702],[231,404,516,894,800,646,174,426,450,454]),
    voa:u([50,64,356,462,524,496,762,860,398,417,795],
          [566,288,686,204,834,710,454],[682,634,784,792,400,512,504])},

  AFG:{name:"Afghanistan",flag:"🇦🇫",n:4,rank:103,
    s:{vf:28,voa:38,req:176},total:195,
    insight:"The world's least powerful passport — only 28 destinations accessible without a prior visa.",
    vf:u([116,418,458,104,360,764,704,608,96,702,50,64,356,524]),
    voa:u([462,496,762,860,398,417,795],
          [566,288,686,204,646,834,710,231,404,516,894,800,450,454,174],
          [682,634,784,400,512])},
};
