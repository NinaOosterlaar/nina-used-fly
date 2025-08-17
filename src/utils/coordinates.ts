// Coordinate data for major cities and locations
export const locationCoordinates: Record<string, { lat: number; lng: number }> = {
  // European locations - France
  'Paris': { lat: 48.8566, lng: 2.3522 },
  'Lyon': { lat: 45.7640, lng: 4.8357 },
  'Marseille': { lat: 43.2965, lng: 5.3698 },
  
  // Italy
  'Rome': { lat: 41.9028, lng: 12.4964 },
  'Milan': { lat: 45.4642, lng: 9.1900 },
  'Florence': { lat: 43.7696, lng: 11.2558 },
  'Siena': { lat: 43.3188, lng: 11.3307 },
  'Venice': { lat: 45.4408, lng: 12.3155 },
  'Naples': { lat: 40.8518, lng: 14.2681 },
  
  // Spain
  'Madrid': { lat: 40.4168, lng: -3.7038 },
  'Barcelona': { lat: 41.3851, lng: 2.1734 },
  'Seville': { lat: 37.3891, lng: -5.9845 },
  
  // Netherlands
  'Amsterdam': { lat: 52.3676, lng: 4.9041 },
  'Rotterdam': { lat: 51.9244, lng: 4.4777 },
  'The Hague': { lat: 52.0705, lng: 4.3007 },
  'Keukenhof': { lat: 52.2699, lng: 4.5457 },
  'Ameland': { lat: 53.4500, lng: 5.7667 },
  'Texel': { lat: 53.0667, lng: 4.8333 },
  
  // United Kingdom
  'London': { lat: 51.5074, lng: -0.1278 },
  'Edinburgh': { lat: 55.9533, lng: -3.1883 },
  'Manchester': { lat: 53.4808, lng: -2.2426 },
  
  // Germany
  'Berlin': { lat: 52.5200, lng: 13.4050 },
  'Munich': { lat: 48.1351, lng: 11.5820 },
  'Hamburg': { lat: 53.5511, lng: 9.9937 },
  'Leipzig': { lat: 51.3397, lng: 12.3731 },
  'Dresden': { lat: 51.0504, lng: 13.7373 },
  'Passau': { lat: 48.5665, lng: 13.4307 },
  'Tegernsee': { lat: 47.7167, lng: 11.7500 },
  
  // Belgium
  'Brussels': { lat: 50.8503, lng: 4.3517 },
  'Antwerp': { lat: 51.2194, lng: 4.4025 },
  'Ghent': { lat: 51.0543, lng: 3.7174 },
  'Bruges': { lat: 51.2093, lng: 3.2247 },
  
  // Croatia
  'Dubrovnik': { lat: 42.6507, lng: 18.0944 },
  'Zagreb': { lat: 45.8150, lng: 15.9819 },
  'Split': { lat: 43.5081, lng: 16.4402 },
  'Plitvice Lakes': { lat: 44.8654, lng: 15.5820 },
  
  // Portugal
  'Lisbon': { lat: 38.7223, lng: -9.1393 },
  'Porto': { lat: 41.1579, lng: -8.6291 },
  'Funchal': { lat: 32.6669, lng: -16.9241 },
  
  // Greece
  'Athens': { lat: 37.9838, lng: 23.7275 },
  'Thessaloniki': { lat: 40.6401, lng: 22.9444 },
  'Santorini': { lat: 36.3932, lng: 25.4615 },
  
  // Nordic countries
  'Helsinki': { lat: 60.1699, lng: 24.9384 },
  'Rovaniemi': { lat: 66.5039, lng: 25.7294 },
  'Tampere': { lat: 61.4991, lng: 23.7871 },
  'Copenhagen': { lat: 55.6761, lng: 12.5683 },
  'Aarhus': { lat: 56.1629, lng: 10.2039 },
  'Odense': { lat: 55.4038, lng: 10.4024 },
  'Oslo': { lat: 59.9139, lng: 10.7522 },
  'Bergen': { lat: 60.3913, lng: 5.3221 },
  'Stavanger': { lat: 58.9700, lng: 5.7331 },
  
  // Ireland
  'Dublin': { lat: 53.3498, lng: -6.2603 },
  'Cork': { lat: 51.8985, lng: -8.4756 },
  'Galway': { lat: 53.2707, lng: -9.0568 },
  'Glendalough': { lat: 53.0096, lng: -6.3275 },
  'Kilkenny': { lat: 52.6541, lng: -7.2448 },
  'Ring of Kerry': { lat: 51.8792, lng: -10.2134 },
  'Cliffs of Moher': { lat: 52.9715, lng: -9.4265 },
  'Kinsale': { lat: 51.7058, lng: -8.5309 },
  'Cashel': { lat: 52.5150, lng: -7.8869 },
  
  // Switzerland
  'Zurich': { lat: 47.3769, lng: 8.5417 },
  'Geneva': { lat: 46.2044, lng: 6.1432 },
  'Lucerne': { lat: 47.0502, lng: 8.3093 },
  
  // Austria
  'Vienna': { lat: 48.2082, lng: 16.3738 },
  'Salzburg': { lat: 47.8095, lng: 13.0550 },
  'Innsbruck': { lat: 47.2692, lng: 11.4041 },
  
  // Poland
  'Warsaw': { lat: 52.2297, lng: 21.0122 },
  'Krakow': { lat: 50.0647, lng: 19.9450 },
  'Gdansk': { lat: 54.3520, lng: 18.6466 },
  'Auschwitz': { lat: 50.0279, lng: 19.2041 },
  'Wroclaw': { lat: 51.1079, lng: 17.0385 },
  'Zakopane': { lat: 49.2992, lng: 19.9496 },
  
  // Iceland
  'Reykjavik': { lat: 64.1466, lng: -21.9426 },
  'Blue Lagoon': { lat: 63.8804, lng: -22.4495 },
  
  // Czech Republic
  'Prague': { lat: 50.0755, lng: 14.4378 },
  'Cesky Krumlov': { lat: 48.8127, lng: 14.3175 },
  'Karlovy Vary': { lat: 50.2329, lng: 12.8716 },
  
  // Hungary
  'Budapest': { lat: 47.4979, lng: 19.0402 },
  'Eger': { lat: 47.9030, lng: 20.3731 },
  'Lake Balaton': { lat: 46.8355, lng: 17.7362 },
  
  // Slovakia
  'Bratislava': { lat: 48.1486, lng: 17.1077 },
  'High Tatras': { lat: 49.1500, lng: 20.1667 },
  
  // Slovenia
  'Ljubljana': { lat: 46.0569, lng: 14.5058 },
  'Lake Bled': { lat: 46.3683, lng: 14.1147 },
  
  // Bulgaria
  'Sofia': { lat: 42.6977, lng: 23.3219 },
  'Plovdiv': { lat: 42.1354, lng: 24.7453 },
  'Varna': { lat: 43.2141, lng: 27.9147 },
  
  // Romania
  'Bucharest': { lat: 44.4268, lng: 26.1025 },
  'Transylvania': { lat: 45.7494, lng: 24.7402 },
  'Sibiu': { lat: 45.7983, lng: 24.1256 },
  
  // Asian locations - India
  'New Delhi': { lat: 28.6139, lng: 77.2090 },
  'Mumbai': { lat: 19.0760, lng: 72.8777 },
  'Bangalore': { lat: 12.9716, lng: 77.5946 },
  'Jaipur': { lat: 26.9124, lng: 75.7873 },
  'Goa': { lat: 15.2993, lng: 74.1240 },
  
  // South Korea
  'Seoul': { lat: 37.5665, lng: 126.9780 },
  'Busan': { lat: 35.1796, lng: 129.0756 },
  'Gyeongju': { lat: 35.8562, lng: 129.2247 },
  'Jeju Island': { lat: 33.4996, lng: 126.5312 },
  'Andong': { lat: 36.5684, lng: 128.7294 },
  'Sokcho': { lat: 38.2070, lng: 128.5918 },
  'Jeonju': { lat: 35.8428, lng: 127.1480 },
  'Naejangsan National Park': { lat: 35.4983, lng: 126.8947 },
  'Mount Gayasan': { lat: 35.8019, lng: 128.1156 },
  
  // Vietnam
  'Hanoi': { lat: 21.0285, lng: 105.8542 },
  'Ho Chi Minh City': { lat: 10.8231, lng: 106.6297 },
  'Da Nang': { lat: 16.0471, lng: 108.2068 },
  
  // Japan
  'Tokyo': { lat: 35.6762, lng: 139.6503 },
  'Osaka': { lat: 34.6937, lng: 135.5023 },
  'Kyoto': { lat: 35.0116, lng: 135.7681 },
  
  // China
  'Beijing': { lat: 39.9042, lng: 116.4074 },
  'Shanghai': { lat: 31.2304, lng: 121.4737 },
  'Chengdu': { lat: 30.5728, lng: 104.0668 },
  
  // Thailand
  'Bangkok': { lat: 13.7563, lng: 100.5018 },
  'Chiang Mai': { lat: 18.7883, lng: 98.9853 },
  'Phuket': { lat: 7.8804, lng: 98.3923 },
  
  // North America - USA
  'New York': { lat: 40.7128, lng: -74.0060 },
  'Los Angeles': { lat: 34.0522, lng: -118.2437 },
  'Chicago': { lat: 41.8781, lng: -87.6298 },
  
  // Canada
  'Toronto': { lat: 43.6532, lng: -79.3832 },
  'Vancouver': { lat: 49.2827, lng: -123.1207 },
  'Montreal': { lat: 45.5017, lng: -73.5673 },
  
  // Mexico
  'Mexico City': { lat: 19.4326, lng: -99.1332 },
  'Cancun': { lat: 21.1619, lng: -86.8515 },
  'Guadalajara': { lat: 20.6597, lng: -103.3496 },
  
  // South America - Brazil
  'Rio de Janeiro': { lat: -22.9068, lng: -43.1729 },
  'Sao Paulo': { lat: -23.5505, lng: -46.6333 },
  'Salvador': { lat: -12.9714, lng: -38.5124 },
  
  // Argentina
  'Buenos Aires': { lat: -34.6118, lng: -58.3960 },
  'Mendoza': { lat: -32.8895, lng: -68.8458 },
  'Bariloche': { lat: -41.1335, lng: -71.3103 },
  
  // Chile
  'Santiago': { lat: -33.4489, lng: -70.6693 },
  'Valparaiso': { lat: -33.0472, lng: -71.6127 },
  'Atacama Desert': { lat: -24.5000, lng: -69.2500 },
  
  // Colombia
  'Bogota': { lat: 4.7110, lng: -74.0721 },
  'Medellin': { lat: 6.2442, lng: -75.5812 },
  'Cartagena': { lat: 10.3910, lng: -75.4794 },
  
  // Peru
  'Lima': { lat: -12.0464, lng: -77.0428 },
  'Cusco': { lat: -13.5319, lng: -71.9675 },
  'Machu Picchu': { lat: -13.1631, lng: -72.5450 },
  
  // Africa - Nigeria
  'Lagos': { lat: 6.5244, lng: 3.3792 },
  'Abuja': { lat: 9.0765, lng: 7.3986 },
  'Calabar': { lat: 4.9517, lng: 8.3222 },
  
  // South Africa
  'Cape Town': { lat: -33.9249, lng: 18.4241 },
  'Johannesburg': { lat: -26.2041, lng: 28.0473 },
  'Durban': { lat: -29.8587, lng: 31.0218 },
  
  // Kenya
  'Nairobi': { lat: -1.2921, lng: 36.8219 },
  'Mombasa': { lat: -4.0435, lng: 39.6682 },
  'Maasai Mara': { lat: -1.4061, lng: 35.0086 },
  
  // Egypt
  'Cairo': { lat: 30.0444, lng: 31.2357 },
  'Luxor': { lat: 25.6872, lng: 32.6396 },
  'Aswan': { lat: 24.0889, lng: 32.8998 },
  
  // Australia
  'Sydney': { lat: -33.8688, lng: 151.2093 },
  'Melbourne': { lat: -37.8136, lng: 144.9631 },
  'Brisbane': { lat: -27.4705, lng: 153.0260 },
  
  // New Zealand
  'Auckland': { lat: -36.8485, lng: 174.7633 },
  'Wellington': { lat: -41.2865, lng: 174.7762 },
  'Christchurch': { lat: -43.5321, lng: 172.6362 },
};
