const terrainTileBase = "https://services.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile";
const tileZoom = 3;
const tileGridSize = 2 ** tileZoom;
const maxMercatorLatitude = 85.05112878;

const destinations = [
  {
    slug: "paris",
    city: "Paris",
    country: "France",
    region: "Europe",
    lat: 48.8566,
    lng: 2.3522,
    color: "#d7b56d",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2200&q=86",
    summary: "River light, old stone, and a city made for slow arrivals.",
    quote: "Paris is not a place you visit; it is a mood you return to."
  },
  {
    slug: "kyoto",
    city: "Kyoto",
    country: "Japan",
    region: "Asia",
    lat: 35.0116,
    lng: 135.7681,
    color: "#c7a46a",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2200&q=86",
    summary: "A quiet composition of cedar, temple roofs, and seasonal light.",
    quote: "In Kyoto, beauty arrives softly and stays after dark."
  },
  {
    slug: "marrakech",
    city: "Marrakech",
    country: "Morocco",
    region: "Africa",
    lat: 31.6295,
    lng: -7.9811,
    color: "#c86f52",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=2200&q=86",
    summary: "Desert heat, red walls, and courtyards held in shadow.",
    quote: "Marrakech turns color into memory."
  },
  {
    slug: "new-york",
    city: "New York",
    country: "United States",
    region: "North America",
    lat: 40.7128,
    lng: -74.006,
    color: "#8eb8d8",
    image: "https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?auto=format&fit=crop&w=2200&q=86",
    summary: "A vertical city of riverlines, rooflines, and restless energy.",
    quote: "New York is the world edited into one skyline."
  },
  {
    slug: "rio",
    city: "Rio de Janeiro",
    country: "Brazil",
    region: "South America",
    lat: -22.9068,
    lng: -43.1729,
    color: "#78b995",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=2200&q=86",
    summary: "Mountains fall into ocean, and the city follows the rhythm.",
    quote: "Rio is landscape with a heartbeat."
  },
  {
    slug: "cape-town",
    city: "Cape Town",
    country: "South Africa",
    region: "Africa",
    lat: -33.9249,
    lng: 18.4241,
    color: "#8eb8d8",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=2200&q=86",
    summary: "A city framed by mountain, ocean, and edge-of-continent drama.",
    quote: "Cape Town is where the map learns to breathe."
  },
  {
    slug: "reykjavik",
    city: "Reykjavik",
    country: "Iceland",
    region: "Europe",
    lat: 64.1466,
    lng: -21.9426,
    color: "#c86f52",
    image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=2200&q=86",
    summary: "Atlantic air, volcanic ground, and light that feels unedited.",
    quote: "Reykjavik is the pause before the wild begins."
  },
  {
    slug: "istanbul",
    city: "Istanbul",
    country: "Turkey",
    region: "Europe / Asia",
    lat: 41.0082,
    lng: 28.9784,
    color: "#d7b56d",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=2200&q=86",
    summary: "A strait, a skyline, and two continents in one glance.",
    quote: "Istanbul is a crossing disguised as a city."
  },
  {
    slug: "queenstown",
    city: "Queenstown",
    country: "New Zealand",
    region: "Oceania",
    lat: -45.0312,
    lng: 168.6626,
    color: "#8eb8d8",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=86",
    summary: "Alpine water, hard ridgelines, and roads built for wonder.",
    quote: "Queenstown makes distance feel cinematic."
  },
  {
    slug: "singapore",
    city: "Singapore",
    country: "Singapore",
    region: "Asia",
    lat: 1.3521,
    lng: 103.8198,
    color: "#c86f52",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=2200&q=86",
    summary: "Tropical precision, garden light, and a harbor in motion.",
    quote: "Singapore is the future softened by rain."
  },
  {
    slug: "santorini",
    city: "Santorini",
    country: "Greece",
    region: "Europe",
    lat: 36.3932,
    lng: 25.4615,
    color: "#d7b56d",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=2200&q=86",
    summary: "White cliffs, blue air, and a horizon cut by volcanic stone.",
    quote: "Santorini is a cliffside conversation with the Aegean."
  },
  {
    slug: "dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    lat: 25.2048,
    lng: 55.2708,
    color: "#d7b56d",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=86",
    summary: "Glass towers rise from desert geometry and Gulf light.",
    quote: "Dubai builds mirages you can walk through."
  },
  {
    slug: "sydney",
    city: "Sydney",
    country: "Australia",
    region: "Oceania",
    lat: -33.8688,
    lng: 151.2093,
    color: "#8eb8d8",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2200&q=86",
    summary: "Harbor water, white sails, and sunlit civic theatre.",
    quote: "Sydney is a harbor that learned to perform."
  },
  {
    slug: "los-angeles",
    city: "Los Angeles",
    country: "United States",
    region: "North America",
    lat: 34.0522,
    lng: -118.2437,
    color: "#c86f52",
    image: "https://images.unsplash.com/photo-1534253893894-10d024888e49?auto=format&fit=crop&w=2200&q=86",
    summary: "Canyon roads, ocean haze, and cinema in the afternoon light.",
    quote: "Los Angeles is a dream projected onto weather."
  },
  {
    slug: "banff",
    city: "Banff",
    country: "Canada",
    region: "North America",
    lat: 51.1784,
    lng: -115.5708,
    color: "#78b995",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2200&q=86",
    summary: "Glacial lakes, dark pines, and the silence of high country.",
    quote: "Banff is blue water held inside a mountain dream."
  },
  {
    slug: "cairo",
    city: "Cairo",
    country: "Egypt",
    region: "Africa",
    lat: 30.0444,
    lng: 31.2357,
    color: "#c86f52",
    image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=2200&q=86",
    summary: "Desert light, ancient geometry, and a city built beside eternity.",
    quote: "Cairo measures time in stone and sunlight."
  },
  {
    slug: "machu-picchu",
    city: "Machu Picchu",
    country: "Peru",
    region: "South America",
    lat: -13.1631,
    lng: -72.545,
    color: "#78b995",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2200&q=86",
    summary: "Stone terraces suspended between cloud forest and mountain.",
    quote: "Machu Picchu is the altitude of memory."
  },
  {
    slug: "venice",
    city: "Venice",
    country: "Italy",
    region: "Europe",
    lat: 45.4408,
    lng: 12.3155,
    color: "#d7b56d",
    image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=2200&q=86",
    summary: "Stone, water, and a city held together by reflection.",
    quote: "Venice is a mirror that became a city."
  },
  {
    slug: "bali",
    city: "Bali",
    country: "Indonesia",
    region: "Asia",
    lat: -8.5069,
    lng: 115.2625,
    color: "#78b995",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2200&q=86",
    summary: "Rice terraces, temple smoke, and warm island rain.",
    quote: "Bali is a soft climate for the spirit."
  },
  {
    slug: "maldives",
    city: "Maldives",
    country: "Maldives",
    region: "Asia",
    lat: 4.1755,
    lng: 73.5093,
    color: "#8eb8d8",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=86",
    summary: "Atoll water, private horizons, and silence made visible.",
    quote: "The Maldives turns blue into architecture."
  },
  {
    slug: "tokyo",
    city: "Tokyo",
    country: "Japan",
    region: "Asia",
    lat: 35.6762,
    lng: 139.6503,
    color: "#c86f52",
    image: "https://images.unsplash.com/photo-1759970752518-b0ffa38c130b?auto=format&fit=crop&w=2200&q=86",
    summary: "Neon precision, quiet alleys, and a city tuned to detail.",
    quote: "Tokyo is the future speaking softly."
  },
  {
    slug: "barcelona",
    city: "Barcelona",
    country: "Spain",
    region: "Europe",
    lat: 41.3874,
    lng: 2.1686,
    color: "#d7b56d",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=2200&q=86",
    summary: "Sea air, tiled geometry, and streets that bend toward art.",
    quote: "Barcelona is a city drawn in sunlight."
  },
  {
    slug: "seoul",
    city: "Seoul",
    country: "South Korea",
    region: "Asia",
    lat: 37.5665,
    lng: 126.978,
    color: "#8eb8d8",
    image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=2200&q=86",
    summary: "Palace roofs, glass towers, and mountains at the edge of night.",
    quote: "Seoul moves quickly, but remembers everything."
  },
  {
    slug: "amalfi-coast",
    city: "Amalfi Coast",
    country: "Italy",
    region: "Europe",
    lat: 40.6333,
    lng: 14.6029,
    color: "#d7b56d",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2200&q=86",
    summary: "Cliff roads, lemon air, and villages suspended over blue.",
    quote: "The Amalfi Coast is a coastline with a sense of theatre."
  },
  {
    slug: "petra",
    city: "Petra",
    country: "Jordan",
    region: "Middle East",
    lat: 30.3285,
    lng: 35.4444,
    color: "#c86f52",
    image: "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?auto=format&fit=crop&w=2200&q=86",
    summary: "Rose stone, canyon shadow, and history carved into heat.",
    quote: "Petra is a doorway cut from time."
  },
  {
    slug: "patagonia",
    city: "Patagonia",
    country: "Argentina / Chile",
    region: "South America",
    lat: -49.3315,
    lng: -72.8863,
    color: "#78b995",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2200&q=86",
    summary: "Glacier wind, granite towers, and distances that feel untouched.",
    quote: "Patagonia is weather written at monumental scale."
  },
  {
    slug: "nairobi",
    city: "Nairobi",
    country: "Kenya",
    region: "Africa",
    lat: -1.2921,
    lng: 36.8219,
    color: "#78b995",
    image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=2200&q=86",
    summary: "Savanna light, modern motion, and wilderness close to the city.",
    quote: "Nairobi keeps the horizon near."
  },
  {
    slug: "lisbon",
    city: "Lisbon",
    country: "Portugal",
    region: "Europe",
    lat: 38.7223,
    lng: -9.1393,
    color: "#d7b56d",
    image: "https://images.unsplash.com/photo-1501927023255-9063be98970c?auto=format&fit=crop&w=2200&q=86",
    summary: "Tilework, Atlantic light, and hills rolling toward the river.",
    quote: "Lisbon is nostalgia made bright."
  },
  {
    slug: "madeira",
    city: "Madeira",
    country: "Portugal",
    region: "Europe",
    lat: 32.6669,
    lng: -16.9241,
    color: "#78b995",
    image: "https://images.unsplash.com/photo-1589026465540-6b31a8f8f7a2?auto=format&fit=crop&w=2200&q=86",
    summary: "Ocean cliffs, laurel forests, and roads above the clouds.",
    quote: "Madeira is an island built vertically."
  },
  {
    slug: "lofoten",
    city: "Lofoten",
    country: "Norway",
    region: "Europe",
    lat: 67.9324,
    lng: 13.0896,
    color: "#8eb8d8",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=2200&q=86",
    summary: "Arctic beaches, knife-edge peaks, and afterglow over cold water.",
    quote: "Lofoten is the north made cinematic."
  },
  {
    slug: "hong-kong",
    city: "Hong Kong",
    country: "China",
    region: "Asia",
    lat: 22.3193,
    lng: 114.1694,
    color: "#d7b56d",
    image: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=2200&q=86",
    summary: "Harbor light, vertical streets, and a skyline sharpened by weather.",
    quote: "Hong Kong is a city written in altitude and neon."
  },
  {
    slug: "shanghai",
    city: "Shanghai",
    country: "China",
    region: "Asia",
    lat: 31.2304,
    lng: 121.4737,
    color: "#8eb8d8",
    image: "https://images.unsplash.com/photo-1548919973-5cef591cdbc9?auto=format&fit=crop&w=2200&q=86",
    summary: "River glass, art deco shadows, and a skyline in constant revision.",
    quote: "Shanghai is tomorrow reflected across the river."
  },
  {
    slug: "beijing",
    city: "Beijing",
    country: "China",
    region: "Asia",
    lat: 39.9042,
    lng: 116.4074,
    color: "#c86f52",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=2200&q=86",
    summary: "Imperial axis, winter light, and courtyards holding long memory.",
    quote: "Beijing carries history at monumental scale."
  },
  {
    slug: "bangkok",
    city: "Bangkok",
    country: "Thailand",
    region: "Asia",
    lat: 13.7563,
    lng: 100.5018,
    color: "#d7b56d",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=2200&q=86",
    summary: "River temples, night markets, and gold catching tropical rain.",
    quote: "Bangkok is motion gilded by heat."
  },
  {
    slug: "chiang-mai",
    city: "Chiang Mai",
    country: "Thailand",
    region: "Asia",
    lat: 18.7883,
    lng: 98.9853,
    color: "#78b995",
    image: "https://images.unsplash.com/photo-1598970605070-a38a6ccd3a2d?auto=format&fit=crop&w=2200&q=86",
    summary: "Mountain haze, temple bells, and mornings wrapped in green.",
    quote: "Chiang Mai lets the mountains lower their voice."
  },
  {
    slug: "phuket",
    city: "Phuket",
    country: "Thailand",
    region: "Asia",
    lat: 7.8804,
    lng: 98.3923,
    color: "#8eb8d8",
    image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=2200&q=86",
    summary: "Limestone bays, blue coves, and monsoon light over warm water.",
    quote: "Phuket turns coastline into a slow invitation."
  },
  {
    slug: "hanoi",
    city: "Hanoi",
    country: "Vietnam",
    region: "Asia",
    lat: 21.0278,
    lng: 105.8342,
    color: "#78b995",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2200&q=86",
    summary: "Lakeside mist, old quarter rhythm, and balconies softened by time.",
    quote: "Hanoi is memory moving at street level."
  },
  {
    slug: "ho-chi-minh-city",
    city: "Ho Chi Minh City",
    country: "Vietnam",
    region: "Asia",
    lat: 10.8231,
    lng: 106.6297,
    color: "#c86f52",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=2200&q=86",
    summary: "Motorbike rivers, colonial facades, and humid evenings of light.",
    quote: "Ho Chi Minh City moves like electricity in warm rain."
  },
  {
    slug: "siem-reap",
    city: "Siem Reap",
    country: "Cambodia",
    region: "Asia",
    lat: 13.3671,
    lng: 103.8448,
    color: "#c86f52",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=2200&q=86",
    summary: "Temple stone, jungle shade, and dawn reflected in ancient water.",
    quote: "Siem Reap wakes history before sunrise."
  },
  {
    slug: "jaipur",
    city: "Jaipur",
    country: "India",
    region: "Asia",
    lat: 26.9124,
    lng: 75.7873,
    color: "#c86f52",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=2200&q=86",
    summary: "Pink sandstone, palace geometry, and desert light in motion.",
    quote: "Jaipur makes color feel ceremonial."
  },
  {
    slug: "goa",
    city: "Goa",
    country: "India",
    region: "Asia",
    lat: 15.4909,
    lng: 73.8278,
    color: "#8eb8d8",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2200&q=86",
    summary: "Palms, white churches, and evenings drifting toward the Arabian Sea.",
    quote: "Goa keeps its horizon barefoot."
  },
  {
    slug: "muscat",
    city: "Muscat",
    country: "Oman",
    region: "Middle East",
    lat: 23.588,
    lng: 58.3829,
    color: "#d7b56d",
    image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=2200&q=86",
    summary: "White forts, copper mountains, and a harbor shaped by desert wind.",
    quote: "Muscat is desert silence meeting the sea."
  },
  {
    slug: "doha",
    city: "Doha",
    country: "Qatar",
    region: "Middle East",
    lat: 25.2854,
    lng: 51.531,
    color: "#d7b56d",
    image: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=2200&q=86",
    summary: "Museum stone, Gulf reflections, and skyline drawn from sand.",
    quote: "Doha builds quiet drama out of horizon and heat."
  },
  {
    slug: "jerusalem",
    city: "Jerusalem",
    country: "Israel",
    region: "Middle East",
    lat: 31.7683,
    lng: 35.2137,
    color: "#c7a46a",
    image: "https://images.unsplash.com/photo-1542743408-218cc173cda0?auto=format&fit=crop&w=2200&q=86",
    summary: "Stone lanes, sacred light, and centuries folded into one hill.",
    quote: "Jerusalem is a city where time becomes visible."
  },
  {
    slug: "athens",
    city: "Athens",
    country: "Greece",
    region: "Europe",
    lat: 37.9838,
    lng: 23.7275,
    color: "#d7b56d",
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=2200&q=86",
    summary: "Marble ruins, rooftop nights, and a city under ancient silhouettes.",
    quote: "Athens keeps the first light of the old world."
  },
  {
    slug: "rome",
    city: "Rome",
    country: "Italy",
    region: "Europe",
    lat: 41.9028,
    lng: 12.4964,
    color: "#c86f52",
    image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=2200&q=86",
    summary: "Fountains, ruins, and evening stone warmed by centuries.",
    quote: "Rome is history made walkable."
  },
  {
    slug: "florence",
    city: "Florence",
    country: "Italy",
    region: "Europe",
    lat: 43.7696,
    lng: 11.2558,
    color: "#d7b56d",
    image: "https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?auto=format&fit=crop&w=2200&q=86",
    summary: "Renaissance walls, river dusk, and art held in golden air.",
    quote: "Florence teaches light to remember."
  },
  {
    slug: "prague",
    city: "Prague",
    country: "Czech Republic",
    region: "Europe",
    lat: 50.0755,
    lng: 14.4378,
    color: "#8eb8d8",
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=2200&q=86",
    summary: "Spired roofs, river bridges, and winter light over old stone.",
    quote: "Prague is a fairytale sharpened by shadow."
  },
  {
    slug: "vienna",
    city: "Vienna",
    country: "Austria",
    region: "Europe",
    lat: 48.2082,
    lng: 16.3738,
    color: "#d7b56d",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=2200&q=86",
    summary: "Imperial facades, concert hall hush, and coffeehouse afternoons.",
    quote: "Vienna is elegance measured in quiet intervals."
  },
  {
    slug: "zurich",
    city: "Zurich",
    country: "Switzerland",
    region: "Europe",
    lat: 47.3769,
    lng: 8.5417,
    color: "#78b995",
    image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=2200&q=86",
    summary: "Lake glass, alpine air, and streets composed with precision.",
    quote: "Zurich is clarity with mountains in the distance."
  }
];

const expandedDestinations = [
  {
    slug: "london",
    city: "London",
    country: "United Kingdom",
    region: "Europe",
    lat: 51.5072,
    lng: -0.1276,
    color: "#8eb8d8",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2200&q=86",
    summary: "River bridges, museum rooms, and a city wrapped in silver weather.",
    quote: "London is history moving through a modern fog.",
    types: ["city", "culture"],
    budget: 3400
  },
  {
    slug: "amsterdam",
    city: "Amsterdam",
    country: "Netherlands",
    region: "Europe",
    lat: 52.3676,
    lng: 4.9041,
    color: "#d7b56d",
    image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=2200&q=86",
    summary: "Canal light, brick facades, and slow mornings on quiet water.",
    quote: "Amsterdam turns reflection into architecture.",
    types: ["city", "culture"],
    budget: 3000
  },
  {
    slug: "copenhagen",
    city: "Copenhagen",
    country: "Denmark",
    region: "Europe",
    lat: 55.6761,
    lng: 12.5683,
    color: "#9fc5a2",
    image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=2200&q=86",
    summary: "Harbor color, Nordic restraint, and design softened by water.",
    quote: "Copenhagen is calm with a civic pulse.",
    types: ["city", "culture"],
    budget: 3300
  },
  {
    slug: "stockholm",
    city: "Stockholm",
    country: "Sweden",
    region: "Europe",
    lat: 59.3293,
    lng: 18.0686,
    color: "#8eb8d8",
    image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=2200&q=86",
    summary: "Islands, pale facades, and northern light spread across water.",
    quote: "Stockholm is an archipelago drawn in gold and blue.",
    types: ["city", "culture", "nature"],
    budget: 3400
  },
  {
    slug: "budapest",
    city: "Budapest",
    country: "Hungary",
    region: "Europe",
    lat: 47.4979,
    lng: 19.0402,
    color: "#d7b56d",
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=2200&q=86",
    summary: "Thermal steam, river grandeur, and bridges lit after dusk.",
    quote: "Budapest is a river wearing a crown.",
    types: ["city", "culture"],
    budget: 2200
  },
  {
    slug: "dubrovnik",
    city: "Dubrovnik",
    country: "Croatia",
    region: "Europe",
    lat: 42.6507,
    lng: 18.0944,
    color: "#c86f52",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2200&q=86",
    summary: "Limestone walls, Adriatic blue, and a city held above the sea.",
    quote: "Dubrovnik is a stone citadel facing pure water.",
    types: ["city", "culture", "island"],
    budget: 2800
  },
  {
    slug: "porto",
    city: "Porto",
    country: "Portugal",
    region: "Europe",
    lat: 41.1579,
    lng: -8.6291,
    color: "#d7b56d",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=2200&q=86",
    summary: "River cellars, tiled walls, and Atlantic evenings in amber.",
    quote: "Porto is a hillside poured in blue tile and wine light.",
    types: ["city", "culture"],
    budget: 2300
  },
  {
    slug: "azores",
    city: "Azores",
    country: "Portugal",
    region: "Atlantic",
    lat: 37.7394,
    lng: -25.6687,
    color: "#78b995",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Caldera%20of%20Sete%20Cidades%20-%20Azores%20-%20panoramio.jpg?width=2200",
    summary: "Crater lakes, hydrangea roads, and volcanic islands in Atlantic mist.",
    quote: "The Azores feel like earth still deciding its shape.",
    types: ["island", "mountain", "nature"],
    budget: 3000
  },
  {
    slug: "faroe-islands",
    city: "Faroe Islands",
    country: "Faroe Islands",
    region: "North Atlantic",
    lat: 62.0079,
    lng: -6.79,
    color: "#8eb8d8",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Faroe%20Islands%20(Unsplash%20eRwWGWkh0vU).jpg?width=2200",
    summary: "Sea cliffs, grass roofs, and weather moving like a living thing.",
    quote: "The Faroes are where silence meets the Atlantic.",
    types: ["island", "mountain", "nature"],
    budget: 3800
  },
  {
    slug: "zanzibar",
    city: "Zanzibar",
    country: "Tanzania",
    region: "Africa",
    lat: -6.1659,
    lng: 39.2026,
    color: "#78b995",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Stone%20Town%20of%20Zanzibar-108834.jpg?width=2200",
    summary: "Spice air, coral water, and old stone lanes beside the Indian Ocean.",
    quote: "Zanzibar is an island written in tide and spice.",
    types: ["island", "culture", "nature"],
    budget: 2600
  },
  {
    slug: "seychelles",
    city: "Seychelles",
    country: "Seychelles",
    region: "Indian Ocean",
    lat: -4.6191,
    lng: 55.4513,
    color: "#8eb8d8",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Granite%20rocks%20on%20the%20island%20la%20digue%2C%20Seychelles%20(25731827328).jpg?width=2200",
    summary: "Granite boulders, clear water, and palms leaning into warm wind.",
    quote: "Seychelles is tropical geometry made gentle.",
    types: ["island", "nature"],
    budget: 5200
  },
  {
    slug: "mauritius",
    city: "Mauritius",
    country: "Mauritius",
    region: "Indian Ocean",
    lat: -20.3484,
    lng: 57.5522,
    color: "#78b995",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Le%20Morne%20Beach%20with%20Le%20Morne%20Brabant%20Mountain%20in%20the%20background%2C%20Mauritius%20(53698223315).jpg?width=2200",
    summary: "Lagoon color, sugarcane fields, and mountain shadows near the sea.",
    quote: "Mauritius is a green island edged in impossible blue.",
    types: ["island", "mountain", "nature"],
    budget: 3900
  },
  {
    slug: "victoria-falls",
    city: "Victoria Falls",
    country: "Zimbabwe / Zambia",
    region: "Africa",
    lat: -17.9243,
    lng: 25.8572,
    color: "#78b995",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Victoria%20Falls%2C%20Zimbabwe1.jpg?width=2200",
    summary: "Mist columns, basalt edges, and river power heard before it is seen.",
    quote: "Victoria Falls is water becoming weather.",
    types: ["nature"],
    budget: 3100
  },
  {
    slug: "namib-desert",
    city: "Namib Desert",
    country: "Namibia",
    region: "Africa",
    lat: -24.7274,
    lng: 15.3424,
    color: "#c86f52",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=2200&q=86",
    summary: "Red dunes, Atlantic fog, and desert silence at monumental scale.",
    quote: "The Namib is minimalism written by wind.",
    types: ["desert", "nature"],
    budget: 3600
  },
  {
    slug: "serengeti",
    city: "Serengeti",
    country: "Tanzania",
    region: "Africa",
    lat: -2.4497,
    lng: 34.8333,
    color: "#d7b56d",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2200&q=86",
    summary: "Golden grass, moving herds, and horizon lines that never close.",
    quote: "Serengeti is distance alive with motion.",
    types: ["nature"],
    budget: 4200
  },
  {
    slug: "luxor",
    city: "Luxor",
    country: "Egypt",
    region: "Africa",
    lat: 25.6872,
    lng: 32.6396,
    color: "#c86f52",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Luxor%20Temple%20-%20Egypt.JPG?width=2200",
    summary: "Temple columns, Nile air, and late sun on ancient stone.",
    quote: "Luxor is history standing in warm light.",
    types: ["culture", "desert"],
    budget: 2300
  },
  {
    slug: "chefchaouen",
    city: "Chefchaouen",
    country: "Morocco",
    region: "Africa",
    lat: 35.1688,
    lng: -5.2684,
    color: "#8eb8d8",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Chefchaouen%20-%20blue%20city%20in%20Morocco%202.jpg?width=2200",
    summary: "Blue alleys, mountain edges, and a medina softened by shade.",
    quote: "Chefchaouen is color turned into quiet.",
    types: ["city", "culture", "mountain"],
    budget: 1800
  },
  {
    slug: "montreal",
    city: "Montreal",
    country: "Canada",
    region: "North America",
    lat: 45.5019,
    lng: -73.5674,
    color: "#8eb8d8",
    image: "https://images.unsplash.com/photo-1519178614-68673b201f36?auto=format&fit=crop&w=2200&q=86",
    summary: "Old stone, winter light, and North American streets with French rhythm.",
    quote: "Montreal is a city with two tempos.",
    types: ["city", "culture"],
    budget: 2700
  },
  {
    slug: "san-francisco",
    city: "San Francisco",
    country: "United States",
    region: "North America",
    lat: 37.7749,
    lng: -122.4194,
    color: "#c86f52",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2200&q=86",
    summary: "Bay fog, steep streets, and red steel holding the horizon.",
    quote: "San Francisco is weather with a skyline.",
    types: ["city", "nature"],
    budget: 3800
  },
  {
    slug: "mexico-city",
    city: "Mexico City",
    country: "Mexico",
    region: "North America",
    lat: 19.4326,
    lng: -99.1332,
    color: "#d7b56d",
    image: "https://images.unsplash.com/photo-1518659526054-190340b32735?auto=format&fit=crop&w=2200&q=86",
    summary: "Museum courtyards, volcanic altitude, and neighborhoods full of color.",
    quote: "Mexico City is altitude, appetite, and art in motion.",
    types: ["city", "culture"],
    budget: 2100
  },
  {
    slug: "oaxaca",
    city: "Oaxaca",
    country: "Mexico",
    region: "North America",
    lat: 17.0732,
    lng: -96.7266,
    color: "#c86f52",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Oaxaca%20street.JPG?width=2200",
    summary: "Courtyard meals, painted streets, and mountain air filled with craft.",
    quote: "Oaxaca is culture you can taste in the afternoon.",
    types: ["city", "culture", "mountain"],
    budget: 1800
  },
  {
    slug: "havana",
    city: "Havana",
    country: "Cuba",
    region: "Caribbean",
    lat: 23.1136,
    lng: -82.3666,
    color: "#d7b56d",
    image: "https://images.unsplash.com/photo-1500759285222-a95626b934cb?auto=format&fit=crop&w=2200&q=86",
    summary: "Sea walls, old cars, and pastel facades moving through music.",
    quote: "Havana is time with the windows open.",
    types: ["island", "city", "culture"],
    budget: 2200
  },
  {
    slug: "buenos-aires",
    city: "Buenos Aires",
    country: "Argentina",
    region: "South America",
    lat: -34.6037,
    lng: -58.3816,
    color: "#c86f52",
    image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=2200&q=86",
    summary: "Parisian facades, late dinners, and a city that dances after midnight.",
    quote: "Buenos Aires is melancholy with rhythm.",
    types: ["city", "culture"],
    budget: 2400
  },
  {
    slug: "cartagena",
    city: "Cartagena",
    country: "Colombia",
    region: "South America",
    lat: 10.391,
    lng: -75.4794,
    color: "#d7b56d",
    image: "https://images.unsplash.com/photo-1583997052301-0042b33fc598?auto=format&fit=crop&w=2200&q=86",
    summary: "Caribbean walls, balcony flowers, and old-town heat after rain.",
    quote: "Cartagena is color with sea air in its lungs.",
    types: ["city", "culture", "island"],
    budget: 2300
  },
  {
    slug: "galapagos",
    city: "Galapagos",
    country: "Ecuador",
    region: "Pacific",
    lat: -0.7433,
    lng: -90.3157,
    color: "#78b995",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Gal%C3%A1pagos%20wildlife.jpg?width=2200",
    summary: "Lava coast, clear water, and wildlife unafraid of the world.",
    quote: "Galapagos is nature before it learned to perform.",
    types: ["island", "nature"],
    budget: 5200
  },
  {
    slug: "uyuni",
    city: "Salar de Uyuni",
    country: "Bolivia",
    region: "South America",
    lat: -20.1338,
    lng: -67.4891,
    color: "#8eb8d8",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Uyuni%20Salt%20Flats%20Bolivia.jpg?width=2200",
    summary: "Salt flats, mirror skies, and horizons that erase scale.",
    quote: "Uyuni is the sky learning to stand still.",
    types: ["desert", "nature"],
    budget: 2800
  },
  {
    slug: "cusco",
    city: "Cusco",
    country: "Peru",
    region: "South America",
    lat: -13.5319,
    lng: -71.9675,
    color: "#d7b56d",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Andes%2C%20Cusco%2C%20Peru%20-%20panoramio.jpg?width=2200",
    summary: "Stone streets, thin air, and a mountain city full of old empires.",
    quote: "Cusco is altitude with memory under every step.",
    types: ["city", "culture", "mountain"],
    budget: 2400
  },
  {
    slug: "kathmandu",
    city: "Kathmandu",
    country: "Nepal",
    region: "Asia",
    lat: 27.7172,
    lng: 85.324,
    color: "#c86f52",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Pashupatinath%20Temple%2C%20Kathmandu%2C%20Nepal%20(39076).jpg?width=2200",
    summary: "Prayer flags, temple squares, and Himalayan air at the city edge.",
    quote: "Kathmandu is a threshold to the high world.",
    types: ["city", "culture", "mountain"],
    budget: 1900
  },
  {
    slug: "bhutan",
    city: "Bhutan",
    country: "Bhutan",
    region: "Asia",
    lat: 27.4712,
    lng: 89.6339,
    color: "#78b995",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Paro%20Taktsang%2C%20Bhutan%20(edited).jpg?width=2200",
    summary: "Monasteries on cliffs, green valleys, and ceremonial mountain quiet.",
    quote: "Bhutan is elevation with a spiritual architecture.",
    types: ["mountain", "culture", "nature"],
    budget: 4200
  },
  {
    slug: "sri-lanka",
    city: "Sri Lanka",
    country: "Sri Lanka",
    region: "Asia",
    lat: 7.957,
    lng: 80.7603,
    color: "#78b995",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tea-plantation%20Nuwara%20Eliya-2567.jpg?width=2200",
    summary: "Tea hills, temple ruins, and palm coasts folded into one island.",
    quote: "Sri Lanka is an island of many climates.",
    types: ["island", "culture", "nature"],
    budget: 2100
  },
  {
    slug: "palawan",
    city: "Palawan",
    country: "Philippines",
    region: "Asia",
    lat: 11.2027,
    lng: 119.4167,
    color: "#8eb8d8",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tropical%20lagoon%20with%20limestone%20rocks%2C%20Bacuit%20Bay%2C%20Palawan%2C%20Philippines.jpg?width=2200",
    summary: "Limestone lagoons, emerald water, and islands scattered like sculpture.",
    quote: "Palawan is the sea carving a private cathedral.",
    types: ["island", "nature"],
    budget: 2400
  },
  {
    slug: "tahiti",
    city: "Tahiti",
    country: "French Polynesia",
    region: "Pacific",
    lat: -17.5516,
    lng: -149.5585,
    color: "#8eb8d8",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Cr%C3%A9puscule%20sur%20les%20eaux%20de%20Tahiti%20(Ifremer%2000567-67913%20-%2047852).jpg?width=2200",
    summary: "Black peaks, lagoon blues, and warm Pacific distance.",
    quote: "Tahiti is a horizon that slows the body down.",
    types: ["island", "mountain", "nature"],
    budget: 5600
  },
  {
    slug: "fiji",
    city: "Fiji",
    country: "Fiji",
    region: "Pacific",
    lat: -18.1248,
    lng: 178.4501,
    color: "#78b995",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Fiji%20Public%20Beach.jpg?width=2200",
    summary: "Reef water, soft rain, and village warmth across scattered islands.",
    quote: "Fiji is hospitality held by the ocean.",
    types: ["island", "nature"],
    budget: 4400
  }
];

destinations.push(...expandedDestinations);

const editorialTitles = {
  paris: "PARIS RIVERLIGHT",
  kyoto: "KYOTO RAINLINE",
  marrakech: "MARRAKECH SHADOWLINE",
  "new-york": "NEW YORK AFTERDARK",
  rio: "RIO TIDELINE",
  "cape-town": "CAPE TOWN HORIZON",
  reykjavik: "REYKJAVIK NORTHLIGHT",
  istanbul: "ISTANBUL CROSSING",
  queenstown: "QUEENSTOWN RIDGELINE",
  singapore: "SINGAPORE RAINLIGHT",
  santorini: "SANTORINI CALDERA",
  dubai: "DUBAI MIRAGE",
  sydney: "SYDNEY HARBORLINE",
  "los-angeles": "LOS ANGELES HAZE",
  banff: "BANFF BLUE HOUR",
  cairo: "CAIRO SUNSTONE",
  "machu-picchu": "MACHU PICCHU CLOUDLINE",
  venice: "VENICE MIRROR TIDE"
};

const editorialMeta = {
  paris: { duration: "3 nights", season: "Apr to Jun" },
  kyoto: { duration: "4 nights", season: "May to Jun" },
  marrakech: { duration: "3 nights", season: "Oct to Mar" },
  "new-york": { duration: "5 nights", season: "Sep to Nov" },
  rio: { duration: "4 nights", season: "Dec to Mar" },
  "cape-town": { duration: "5 nights", season: "Nov to Apr" },
  reykjavik: { duration: "4 nights", season: "Sep to Mar" },
  istanbul: { duration: "3 nights", season: "Apr to Jun" },
  queenstown: { duration: "5 nights", season: "Dec to Feb" },
  singapore: { duration: "3 nights", season: "Feb to Apr" },
  santorini: { duration: "4 nights", season: "May to Sep" },
  dubai: { duration: "3 nights", season: "Nov to Mar" },
  sydney: { duration: "4 nights", season: "Sep to Nov" },
  "los-angeles": { duration: "5 nights", season: "Mar to May" },
  banff: { duration: "4 nights", season: "Jun to Sep" },
  cairo: { duration: "3 nights", season: "Oct to Apr" },
  "machu-picchu": { duration: "4 nights", season: "May to Oct" },
  venice: { duration: "3 nights", season: "Apr to Jun" },
  bali: { duration: "5 nights", season: "Apr to Oct" },
  maldives: { duration: "5 nights", season: "Nov to Apr" },
  tokyo: { duration: "4 nights", season: "Mar to May" },
  barcelona: { duration: "4 nights", season: "May to Jun" },
  seoul: { duration: "4 nights", season: "Apr to Jun" },
  "amalfi-coast": { duration: "4 nights", season: "May to Sep" },
  petra: { duration: "3 nights", season: "Oct to Apr" },
  patagonia: { duration: "7 nights", season: "Nov to Mar" },
  nairobi: { duration: "5 nights", season: "Jun to Oct" },
  lisbon: { duration: "4 nights", season: "Mar to Jun" },
  madeira: { duration: "5 nights", season: "Apr to Oct" },
  lofoten: { duration: "5 nights", season: "Nov to Mar" }
};

const destinationProfiles = {
  paris: { types: ["city", "culture"], budget: 3400, signal: "museum hours, river walks, and refined city light" },
  kyoto: { types: ["city", "culture", "nature"], budget: 3000, signal: "temple corridors, cedar shade, and quiet seasonal rituals" },
  marrakech: { types: ["city", "culture", "desert"], budget: 2100, signal: "courtyard shadows, desert heat, and old-city texture" },
  "new-york": { types: ["city", "culture"], budget: 4200, signal: "vertical energy, galleries, and late-night skyline weather" },
  rio: { types: ["island", "city", "nature"], budget: 2600, signal: "coastline drama, mountain silhouettes, and ocean rhythm" },
  "cape-town": { types: ["mountain", "city", "nature"], budget: 3100, signal: "table mountain, Atlantic edges, and vineyard air" },
  reykjavik: { types: ["mountain", "nature"], budget: 3800, signal: "volcanic roads, northlight weather, and thermal quiet" },
  istanbul: { types: ["city", "culture"], budget: 2400, signal: "strait crossings, layered history, and golden-hour domes" },
  queenstown: { types: ["mountain", "nature"], budget: 3600, signal: "alpine water, hard ridgelines, and long scenic drives" },
  singapore: { types: ["city", "culture"], budget: 2900, signal: "garden architecture, tropical rain, and harbor precision" },
  santorini: { types: ["island", "nature"], budget: 2900, signal: "volcanic cliffs, blue air, and slow Aegean evenings" },
  dubai: { types: ["city", "desert"], budget: 3300, signal: "desert geometry, Gulf light, and cinematic towers" },
  sydney: { types: ["island", "city", "nature"], budget: 3500, signal: "harbor water, coastal walks, and civic theatre" },
  "los-angeles": { types: ["city", "nature"], budget: 3700, signal: "canyon roads, ocean haze, and cinema light" },
  banff: { types: ["mountain", "nature"], budget: 3200, signal: "glacial lakes, pine silence, and high-country air" },
  cairo: { types: ["city", "culture", "desert"], budget: 2300, signal: "ancient geometry, desert sun, and stone memory" },
  "machu-picchu": { types: ["mountain", "culture", "nature"], budget: 2800, signal: "cloud forest, altitude, and archaeological silence" },
  venice: { types: ["island", "city", "culture"], budget: 3100, signal: "water corridors, stone reflection, and quiet arrivals" },
  bali: { types: ["island", "culture", "nature"], budget: 2400, signal: "rice terraces, temple smoke, and warm rain" },
  maldives: { types: ["island", "nature"], budget: 5200, signal: "atoll water, private horizons, and blue silence" },
  tokyo: { types: ["city", "culture"], budget: 3600, signal: "neon precision, quiet alleys, and detail-rich rituals" },
  barcelona: { types: ["city", "culture"], budget: 2800, signal: "sea air, tiled geometry, and architectural sunlight" },
  seoul: { types: ["city", "culture", "mountain"], budget: 3000, signal: "palace roofs, glass towers, and mountain edges" },
  "amalfi-coast": { types: ["island", "culture", "nature"], budget: 3900, signal: "cliff roads, lemon air, and theatrical sea views" },
  petra: { types: ["desert", "culture"], budget: 2600, signal: "rose stone, canyon shadow, and carved history" },
  patagonia: { types: ["mountain", "nature"], budget: 4800, signal: "glacier wind, granite towers, and untouched distances" },
  nairobi: { types: ["city", "nature"], budget: 2700, signal: "savanna light, modern motion, and close wilderness" },
  lisbon: { types: ["city", "culture"], budget: 2500, signal: "Atlantic light, tilework, and river-facing hills" },
  madeira: { types: ["island", "mountain", "nature"], budget: 3200, signal: "ocean cliffs, laurel forests, and cloud roads" },
  lofoten: { types: ["island", "mountain", "nature"], budget: 4300, signal: "Arctic beaches, sharp peaks, and cold-water afterglow" },
  "hong-kong": { types: ["city", "culture"], budget: 3100, signal: "harbor light, vertical streets, and cinematic skyline weather" },
  shanghai: { types: ["city", "culture"], budget: 2600, signal: "river glass, art deco shadows, and future-facing skyline light" },
  beijing: { types: ["city", "culture"], budget: 2400, signal: "imperial axes, courtyard quiet, and monumental history" },
  bangkok: { types: ["city", "culture"], budget: 1900, signal: "river temples, night markets, and tropical gold" },
  "chiang-mai": { types: ["mountain", "culture", "nature"], budget: 1800, signal: "temple bells, mountain haze, and green morning air" },
  phuket: { types: ["island", "nature"], budget: 2200, signal: "limestone bays, warm water, and monsoon coastlines" },
  hanoi: { types: ["city", "culture"], budget: 1700, signal: "old quarter rhythm, lakeside mist, and layered street life" },
  "ho-chi-minh-city": { types: ["city", "culture"], budget: 1700, signal: "humid evenings, kinetic avenues, and colonial facades" },
  "siem-reap": { types: ["culture", "nature"], budget: 1600, signal: "temple stone, jungle shade, and dawn archaeology" },
  jaipur: { types: ["city", "culture", "desert"], budget: 1800, signal: "palace geometry, desert light, and ceremonial color" },
  goa: { types: ["island", "nature", "culture"], budget: 1900, signal: "palm coastlines, Portuguese traces, and barefoot horizons" },
  muscat: { types: ["city", "desert", "culture"], budget: 2600, signal: "white forts, copper mountains, and sea-facing desert silence" },
  doha: { types: ["city", "desert", "culture"], budget: 3200, signal: "museum stone, Gulf reflections, and skyline drama" },
  jerusalem: { types: ["city", "culture"], budget: 2800, signal: "sacred stone, old lanes, and visible layers of time" },
  athens: { types: ["city", "culture"], budget: 2400, signal: "marble silhouettes, rooftop nights, and ancient civic light" },
  rome: { types: ["city", "culture"], budget: 3000, signal: "fountains, ruins, and centuries warmed by evening stone" },
  florence: { types: ["city", "culture"], budget: 2900, signal: "Renaissance walls, river dusk, and golden museum air" },
  prague: { types: ["city", "culture"], budget: 2300, signal: "spired roofs, river bridges, and winter storybook shadow" },
  vienna: { types: ["city", "culture"], budget: 2700, signal: "imperial facades, concert hall hush, and elegant afternoons" },
  zurich: { types: ["city", "mountain", "nature"], budget: 4200, signal: "lake glass, alpine air, and polished urban precision" }
};

const terrainTiles = document.querySelector("#terrain-tiles");
const terrainMap = document.querySelector("#terrain-map");
const mapCanvas = document.querySelector("#map-canvas");
const destinationLayer = document.querySelector("#destination-layer");
const routePath = document.querySelector("#animated-route");
const activeRegion = document.querySelector("#active-region");
const modal = document.querySelector("#destination-modal");
const modalClose = document.querySelector("#modal-close");
const modalImage = document.querySelector("#modal-image");
const modalTitle = document.querySelector("#modal-title");
const modalQuote = document.querySelector("#modal-quote");
const guideGenerate = document.querySelector("#guide-generate");
const guidePanel = document.querySelector("#guide-panel");
const guideClose = document.querySelector("#guide-close");
const guideIntro = document.querySelector("#guide-intro");
const guideSpots = document.querySelector("#guide-spots");
const guideRhythm = document.querySelector("#guide-rhythm");
const locatorTerrainTiles = document.querySelector("#locator-terrain-tiles");
const locatorTarget = document.querySelector("#locator-target");
const matchToggle = document.querySelector("#match-toggle");
const matchPopover = document.querySelector("#match-popover");
const matchClose = document.querySelector("#match-close");
const matchForm = document.querySelector("#match-form");
const travelType = document.querySelector("#travel-type");
const travelBudget = document.querySelector("#travel-budget");
const journeyTransition = document.querySelector("#journey-transition");
const journeyTerrainTiles = document.querySelector("#journey-terrain-tiles");
const journeyTarget = document.querySelector("#journey-target");
const journeyTitle = document.querySelector("#journey-title");
const luxuryOpener = document.querySelector("#luxury-opener");
const openerScrollTiles = document.querySelector("#opener-scroll-tiles");
const openerSkip = document.querySelector("#opener-skip");

let matchedSlug = "santorini";
let lastRouteHash = window.location.hash;
let luxuryOpenerTimer;
let currentModalDestination = destinations[0];

function getEditorialTitle(destination) {
  return editorialTitles[destination.slug] ?? `${destination.city.toUpperCase()} FIELD STUDY`;
}

function getEditorialMeta(destination) {
  return editorialMeta[destination.slug] ?? { duration: "4 nights", season: "Year round" };
}

function getDestinationProfile(destination) {
  return destinationProfiles[destination.slug] ?? {
    types: destination.types ?? ["city"],
    budget: destination.budget ?? 3000,
    signal: destination.summary.toLowerCase()
  };
}

function scoreDestination(destination, requestedType, budget) {
  const profile = getDestinationProfile(destination);
  const typeScore = requestedType === "surprise" || profile.types.includes(requestedType) ? 68 : 0;
  const budgetDistance = Math.abs(profile.budget - budget);
  const budgetScore = Math.max(0, 34 - budgetDistance / 95);
  const regionScore = destination.region === "Europe" ? 3 : 0;
  const quietBoost = requestedType === "culture" && profile.types.includes("culture") ? 5 : 0;

  return typeScore + budgetScore + regionScore + quietBoost;
}

function findBestDestination(requestedType, budget) {
  return destinations
    .map((destination) => ({
      destination,
      score: scoreDestination(destination, requestedType, budget)
    }))
    .sort((a, b) => b.score - a.score || a.destination.city.localeCompare(b.destination.city))[0].destination;
}

function renderMatchResult(destination, requestedType, budget) {
  matchedSlug = destination.slug;
  return { requestedType, budget };
}

function getGuidePlaybook(destination) {
  const profile = getDestinationProfile(destination);
  const primaryType = profile.types[0] ?? "city";
  const playbooks = {
    city: [
      "Start with the district that carries the city rhythm before the major landmarks fill up.",
      "Reserve one architectural stop, one market or food hall, and one late-view skyline moment.",
      "Leave the final hour unplanned so the route can follow light, weather, and street energy."
    ],
    island: [
      "Begin close to the water, then move inland when the sun is strongest.",
      "Pair one slow beach window with a boat ride, cliff walk, or harbor meal.",
      "Save sunset for the most open horizon rather than the busiest viewpoint."
    ],
    mountain: [
      "Start early with the clearest trail or ridge view before clouds gather.",
      "Build the day around one ascent, one quiet water stop, and one lodge-style meal.",
      "Keep the evening simple so the landscape, not the schedule, carries the drama."
    ],
    culture: [
      "Anchor the route with one museum, temple, palace, or old quarter walk.",
      "Book a guided context stop before wandering independently through smaller lanes.",
      "End with a local performance, tea room, courtyard dinner, or night market."
    ],
    desert: [
      "Move slowly through the morning light, when stone and sand have the most depth.",
      "Pair one heritage site with one open-landscape drive or camp-style dinner.",
      "Avoid overpacking the afternoon; heat and distance are part of the experience."
    ],
    nature: [
      "Let the route follow the strongest natural feature first: water, forest, cliff, or valley.",
      "Add one low-effort scenic stop between bigger moments so the day feels cinematic.",
      "Keep the last movement quiet, with enough time to watch the light change."
    ]
  };

  return playbooks[primaryType] ?? playbooks.city;
}

function buildDestinationGuide(destination) {
  const profile = getDestinationProfile(destination);
  const meta = getEditorialMeta(destination);
  const playbook = getGuidePlaybook(destination);
  const typeLabel = profile.types.slice(0, 2).join(" and ");

  return {
    intro: `${destination.city} works best as a ${typeLabel} journey: ${profile.signal}. Give it ${meta.duration.toLowerCase()} if you want the place to unfold instead of rushing through it.`,
    spots: playbook.map((text, index) => ({
      title: ["Opening move", "Signature play", "After dark"][index] ?? "Field note",
      text
    })),
    rhythm: `Best window: ${meta.season}. Budget mood: around USD ${profile.budget.toLocaleString()} for a polished but not overbuilt route.`
  };
}

function renderGuide(destination) {
  const guide = buildDestinationGuide(destination);

  guideIntro.textContent = guide.intro;
  guideSpots.innerHTML = guide.spots.map((spot) => `
    <article class="guide-card">
      <span>${spot.title}</span>
      <p>${spot.text}</p>
    </article>
  `).join("");
  guideRhythm.textContent = guide.rhythm;
}

function openGuidePanel() {
  renderGuide(currentModalDestination);
  guidePanel.hidden = false;
  guidePanel.classList.remove("is-visible");
  modal.classList.remove("is-guide-open");
  void guidePanel.offsetWidth;
  guidePanel.classList.add("is-visible");
  modal.classList.add("is-guide-open");
  guideGenerate.textContent = "Refresh guide";
}

function closeGuidePanel() {
  guidePanel.hidden = true;
  guidePanel.classList.remove("is-visible");
  modal.classList.remove("is-guide-open");
  guideGenerate.textContent = "Open guide";
}

function openDestinationGuidePage({ updateHash = true } = {}) {
  renderGuide(currentModalDestination);
  guidePanel.hidden = false;
  guidePanel.classList.add("is-visible");
  modal.classList.add("is-guide-open", "is-guide-page");
  guideGenerate.textContent = "Guide open";
  document.body.dataset.view = "guide";

  if (updateHash && window.location.hash !== `#/${currentModalDestination.slug}/guide`) {
    history.pushState({ slug: currentModalDestination.slug, guide: true }, "", `#/${currentModalDestination.slug}/guide`);
  }
  lastRouteHash = window.location.hash;
}

function closeDestinationGuidePage() {
  modal.classList.remove("is-guide-page");
  closeGuidePanel();
  document.body.dataset.view = "detail";
}

function setMatchPopover(open) {
  matchPopover.hidden = !open;
  matchToggle.setAttribute("aria-expanded", String(open));
  matchToggle.classList.toggle("is-active", open);

  if (open) {
    travelType.focus({ preventScroll: true });
  }
}

function playJourneyTransition(destination) {
  const point = projectDestination(destination);

  journeyTitle.textContent = destination.city;
  journeyTarget.style.left = `${point.x}%`;
  journeyTarget.style.top = `${point.y}%`;
  journeyTransition.style.setProperty("--journey-x", `${point.x}%`);
  journeyTransition.style.setProperty("--journey-y", `${point.y}%`);
  journeyTransition.hidden = false;
  journeyTransition.classList.remove("is-playing");
  document.body.classList.add("is-transitioning");
  void journeyTransition.offsetWidth;
  journeyTransition.classList.add("is-playing");

  window.setTimeout(() => {
    journeyTransition.hidden = true;
    journeyTransition.classList.remove("is-playing");
    document.body.classList.remove("is-transitioning");
    openDestinationModal(destination.slug);
  }, 2000);
}

function handleMatchSubmit(event) {
  event.preventDefault();
  const requestedType = travelType.value;
  const budget = Number.parseInt(travelBudget.value, 10) || 2800;
  const destination = findBestDestination(requestedType, budget);

  renderMatchResult(destination, requestedType, budget);
  setActiveDestination(destination.slug);
  setMatchPopover(false);
  window.setTimeout(() => playJourneyTransition(destination), 180);
}

function renderMercatorTiles(container, loadingForRow = (row) => (row < 4 ? "eager" : "lazy")) {
  if (!container) {
    return;
  }

  const fragments = [];

  for (let row = 0; row < tileGridSize; row += 1) {
    for (let col = 0; col < tileGridSize; col += 1) {
      fragments.push(`<img src="${terrainTileBase}/${tileZoom}/${row}/${col}" alt="" loading="${loadingForRow(row)}">`);
    }
  }

  container.innerHTML = fragments.join("");
}

function renderTerrainTiles() {
  renderMercatorTiles(terrainTiles);
}

function renderJourneyTerrainTiles() {
  renderMercatorTiles(journeyTerrainTiles);
}

function renderLocatorTerrainTiles() {
  renderMercatorTiles(locatorTerrainTiles, () => "lazy");
}

function renderOpenerScrollTiles() {
  renderMercatorTiles(openerScrollTiles);
}

function finishLuxuryOpener() {
  if (!luxuryOpener || luxuryOpener.hidden) {
    return;
  }

  window.clearTimeout(luxuryOpenerTimer);
  luxuryOpener.classList.add("is-closing");
  document.body.classList.add("is-map-arriving");
  document.body.classList.remove("is-opening-atlas");

  window.setTimeout(() => {
    luxuryOpener.hidden = true;
  }, 980);

  window.setTimeout(() => {
    document.body.classList.remove("is-map-arriving");
  }, 1580);
}

function beginLuxuryOpener() {
  if (!luxuryOpener) {
    return;
  }

  document.body.classList.add("is-opening-atlas");
  luxuryOpener.hidden = false;
  luxuryOpener.classList.remove("is-closing");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  luxuryOpenerTimer = window.setTimeout(finishLuxuryOpener, prefersReducedMotion ? 360 : 4700);
}

function projectDestination(destination) {
  const clampedLat = Math.min(maxMercatorLatitude, Math.max(-maxMercatorLatitude, destination.lat));
  const x = ((destination.lng + 180) / 360) * 100;
  const latRad = clampedLat * Math.PI / 180;
  const mercatorY = (0.5 - Math.log((1 + Math.sin(latRad)) / (1 - Math.sin(latRad))) / (4 * Math.PI)) * 100;
  return {
    x: Math.min(99, Math.max(1, x)),
    y: Math.min(99, Math.max(1, mercatorY))
  };
}

function updateDestinationLocator(destination) {
  const point = projectDestination(destination);
  locatorTarget.style.left = `${point.x}%`;
  locatorTarget.style.top = `${point.y}%`;
  modal.style.setProperty("--locator-x", `${point.x}%`);
  modal.style.setProperty("--locator-y", `${point.y}%`);
}

function getPointerMapPoint(event) {
  const rect = mapCanvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * 100,
    y: ((event.clientY - rect.top) / rect.height) * 100
  };
}

function findNearestDestination(point, threshold = 4.6) {
  const nearest = destinations
    .map((destination) => {
      const projected = projectDestination(destination);
      const distance = Math.hypot(projected.x - point.x, projected.y - point.y);
      return { destination, distance };
    })
    .sort((a, b) => a.distance - b.distance)[0];

  return nearest.distance <= threshold ? nearest.destination : null;
}

function handleMapPointerMove(event) {
  const destination = findNearestDestination(getPointerMapPoint(event), 2.8);

  if (destination) {
    setActiveDestination(destination.slug);
  }
}

function handleMapClick(event) {
  const destination = findNearestDestination(getPointerMapPoint(event), 3.1);

  if (destination) {
    openDestinationModal(destination.slug);
  }
}

function handleMarkerClick(event) {
  event.preventDefault();
  event.stopPropagation();
  const clickedDestination = findNearestDestination(getPointerMapPoint(event), 4.2);
  openDestinationModal(clickedDestination?.slug ?? event.currentTarget.dataset.slug);
}

function renderMarkers() {
  destinationLayer.innerHTML = destinations.map((destination, index) => {
    const point = projectDestination(destination);
    return `
      <button
        class="map-marker"
        data-slug="${destination.slug}"
        style="left: ${point.x}%; top: ${point.y}%; color: ${destination.color}; animation-delay: ${Math.min(1.4, 0.18 + index * 0.018)}s"
        type="button"
        aria-label="${destination.city}, ${destination.country}"
      >
        <span class="marker-anchor" aria-hidden="true"></span>
        <span class="marker-beacon" aria-hidden="true">
          <span class="marker-glint"></span>
        </span>
        <span class="marker-label">
          <span>${destination.city}</span>
          <small>${destination.country}</small>
        </span>
      </button>
    `;
  }).join("");

  destinationLayer.querySelectorAll(".map-marker").forEach((marker) => {
    marker.addEventListener("click", handleMarkerClick);
    marker.addEventListener("pointerenter", () => setActiveDestination(marker.dataset.slug));
    marker.addEventListener("focus", () => setActiveDestination(marker.dataset.slug));
  });
}

function setActiveDestination(slug) {
  const destination = destinations.find((item) => item.slug === slug) ?? destinations[0];

  document.querySelectorAll(".map-marker").forEach((marker) => {
    marker.classList.toggle("is-active", marker.dataset.slug === destination.slug);
  });

  const paris = projectDestination(destinations[0]);
  const point = projectDestination(destination);
  routePath.setAttribute(
    "d",
    `M ${paris.x.toFixed(2)} ${paris.y.toFixed(2)} C ${(paris.x + point.x) / 2} ${Math.min(paris.y, point.y) - 12}, ${(paris.x + point.x) / 2} ${Math.max(paris.y, point.y) + 10}, ${point.x.toFixed(2)} ${point.y.toFixed(2)}`
  );

  activeRegion.textContent = `${destination.region} / ${destination.city}`;
}

function fillModal(destination) {
  currentModalDestination = destination;
  modalImage.src = destination.image;
  modalImage.alt = `${destination.city} destination photograph`;
  modalTitle.textContent = destination.city;
  modalQuote.textContent = destination.quote;
  updateDestinationLocator(destination);
  closeDestinationGuidePage();
}

function openDestinationModal(slug, { guidePage = false, updateHash = true } = {}) {
  const destination = destinations.find((item) => item.slug === slug) ?? destinations[0];
  fillModal(destination);
  setActiveDestination(destination.slug);
  modal.hidden = false;
  modal.classList.remove("is-opening");
  void modal.offsetWidth;
  modal.classList.add("is-opening");
  document.body.classList.add("is-modal-open");
  document.body.dataset.view = "detail";

  if (guidePage) {
    openDestinationGuidePage({ updateHash: false });
  }

  if (updateHash && window.location.hash !== `#/${destination.slug}`) {
    history.pushState({ slug: destination.slug }, "", `#/${destination.slug}`);
  }
  lastRouteHash = window.location.hash;
}

function closeDestinationModal({ updateHash = true } = {}) {
  modal.hidden = true;
  modal.classList.remove("is-opening");
  closeDestinationGuidePage();
  document.body.classList.remove("is-modal-open");
  document.body.dataset.view = "home";

  if (updateHash && window.location.hash !== "#/") {
    history.pushState({}, "", "#/");
  }
  lastRouteHash = window.location.hash;
}

function routeFromHash() {
  const parts = window.location.hash.replace("#/", "").split("/").filter(Boolean);
  const slug = parts[0] ?? "";
  const isGuideRoute = parts[1] === "guide";
  const destination = destinations.find((item) => item.slug === slug);
  lastRouteHash = window.location.hash;

  if (destination) {
    openDestinationModal(destination.slug, { guidePage: isGuideRoute, updateHash: false });
    return;
  }

  closeDestinationModal({ updateHash: false });
}

function watchRouteHash() {
  if (window.location.hash !== lastRouteHash) {
    routeFromHash();
  }

  window.requestAnimationFrame(watchRouteHash);
}

function resetInitialRouteHash() {
  if (window.location.hash && window.location.hash !== "#/") {
    history.replaceState({}, "", "#/");
    lastRouteHash = window.location.hash;
  }
}

function syncScrollEffects() {
  const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, window.scrollY / total));
  document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(3));
}

function initScrollObservers() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  }, { threshold: 0.18 });

  document.querySelectorAll(".scroll-story").forEach((section) => observer.observe(section));
}

function initMapMotion() {
  terrainMap.addEventListener("pointermove", (event) => {
    const rect = terrainMap.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) - 0.5;
    const y = ((event.clientY - rect.top) / rect.height) - 0.5;
    document.documentElement.style.setProperty("--map-x", x.toFixed(3));
    document.documentElement.style.setProperty("--map-y", y.toFixed(3));
  });

  terrainMap.addEventListener("pointerleave", () => {
    document.documentElement.style.setProperty("--map-x", "0");
    document.documentElement.style.setProperty("--map-y", "0");
  });
}

modalClose.addEventListener("click", () => closeDestinationModal());
function handleDestinationModalClick(event) {
  if (modal.hidden || modal.classList.contains("is-guide-page")) {
    return;
  }

  if (event.target.closest("[data-modal-control]")) {
    return;
  }

  openDestinationGuidePage();
}

modal.addEventListener("click", handleDestinationModalClick);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeDestinationModal();
  }

  if (event.key === "Escape" && !matchPopover.hidden) {
    setMatchPopover(false);
  }
});
window.addEventListener("popstate", routeFromHash);
window.addEventListener("hashchange", routeFromHash);
window.addEventListener("scroll", syncScrollEffects, { passive: true });
mapCanvas.addEventListener("pointermove", handleMapPointerMove);
mapCanvas.addEventListener("click", handleMapClick);
matchToggle.addEventListener("click", () => setMatchPopover(matchPopover.hidden));
matchClose.addEventListener("click", () => setMatchPopover(false));
matchForm.addEventListener("submit", handleMatchSubmit);
openerSkip.addEventListener("click", finishLuxuryOpener);
guideGenerate.addEventListener("click", () => openDestinationGuidePage());
guideClose.addEventListener("click", closeGuidePanel);

renderTerrainTiles();
renderJourneyTerrainTiles();
renderLocatorTerrainTiles();
renderOpenerScrollTiles();
renderMarkers();
renderMatchResult(destinations.find((destination) => destination.slug === matchedSlug) ?? destinations[10], travelType.value, Number.parseInt(travelBudget.value, 10) || 2800);
initScrollObservers();
initMapMotion();
syncScrollEffects();
setActiveDestination("paris");
resetInitialRouteHash();
routeFromHash();
beginLuxuryOpener();
watchRouteHash();
