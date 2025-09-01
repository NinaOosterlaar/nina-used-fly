import { db } from './index.js';
import { continent, country, location, plans, travel, post, tag, travelLocations, planLocations, postTags } from './schema.js';

// Define your seed data structure
const seedData = {
    continents: [
        { name: 'Europe' },
        { name: 'Asia' },
        { name: 'North America' },
        { name: 'South America' },
        { name: 'Africa' },
        { name: 'Australia' },
        { name: 'Antarctica' },
    ],

    countries: {
        'Europe': [
            'France', 'Italy', 'Germany', 'Spain', 'Netherlands', 'Belgium', 'Sweden',
            'United Kingdom', 'Portugal', 'Greece', 'Finland', 'Denmark', 'Norway',
            'Ireland', 'Switzerland', 'Austria', 'Poland', 'Czech Republic', 'Hungary',
            'Croatia', 'Slovakia', 'Slovenia', 'Bulgaria', 'Romania', 'Iceland'
        ],
        'Asia': [
            'Japan', 'China', 'India', 'South Korea', 'Thailand', 'Vietnam',
            'Indonesia', 'Malaysia', 'Singapore', 'Philippines', 'Pakistan'
        ],
        'North America': ['USA', 'Canada', 'Mexico'],
        'South America': [
            'Brazil', 'Argentina', 'Chile', 'Colombia', 'Peru', 'Venezuela',
            'Ecuador', 'Bolivia', 'Paraguay', 'Uruguay'
        ],
        'Africa': [
            'Nigeria', 'South Africa', 'Kenya', 'Egypt', 'Ghana', 'Morocco',
            'Tanzania', 'Uganda', 'Algeria', 'Sudan', 'Angola', 'Mozambique'
        ],
        'Australia': ['Australia', 'New Zealand'],
        'Antarctica': ['Antarctica']
    },

    locations: {
        // European locations
        'France': ['Paris', 'Lyon', 'Marseille'],
        'Italy': ['Rome', 'Milan', 'Florence', 'Siena', 'Venice', 'Naples'],
        'Spain': ['Madrid', 'Barcelona', 'Seville'],
        'Netherlands': ['Amsterdam', 'Rotterdam', 'The Hague', 'Keukenhof', 'Ameland', 'Texel'],
        'United Kingdom': ['London', 'Edinburgh', 'Manchester'],
        'Germany': ['Berlin', 'Munich', 'Hamburg', 'Leipzig', 'Dresden', 'Passau', 'Tegernsee'],
        'Belgium': ['Brussels', 'Antwerp', 'Ghent', 'Bruges'],
        'Croatia': ['Dubrovnik', 'Zagreb', 'Split', 'Plitvice Lakes'],
        'Portugal': ['Lisbon', 'Porto', 'Funchal'],
        'Greece': ['Athens', 'Thessaloniki', 'Santorini'],
        'Finland': ['Helsinki', 'Rovaniemi', 'Tampere'],
        'Denmark': ['Copenhagen', 'Aarhus', 'Odense'],
        'Norway': ['Oslo', 'Bergen', 'Stavanger'],
        'Ireland': ['Dublin', 'Cork', 'Galway', 'Glendalough', 'Kilkenny', 'Ring of Kerry', 'Cliffs of Moher', 'Kinsale', 'Cashel'],
        'Switzerland': ['Zurich', 'Geneva', 'Lucerne'],
        'Austria': ['Vienna', 'Salzburg', 'Innsbruck'],
        'Poland': ['Warsaw', 'Krakow', 'Gdansk', 'Auschwitz', 'Wroclaw', 'Zakopane'],
        'Iceland': ['Reykjavik', 'Blue Lagoon'],
        'Czech Republic': ['Prague', 'Cesky Krumlov', 'Karlovy Vary'],
        'Hungary': ['Budapest', 'Eger', 'Lake Balaton'],
        'Slovakia': ['Bratislava', 'High Tatras'],
        'Slovenia': ['Ljubljana', 'Lake Bled'],
        'Bulgaria': ['Sofia', 'Plovdiv', 'Varna'],
        'Romania': ['Bucharest', 'Transylvania', 'Sibiu'],
        // Asian locations
        'India': ['New Delhi', 'Mumbai', 'Bangalore', 'Jaipur', 'Goa'],
        'South Korea': ['Seoul', 'Busan', 'Gyeongju', 'Jeju Island', 'Andong', 'Sokcho', 'Jeonju', 'Naejangsan National Park', 'Mount Gayasan'],
        'Vietnam': ['Hanoi', 'Ho Chi Minh City', 'Da Nang'],
        'Japan': ['Tokyo', 'Osaka', 'Kyoto'],
        'China': ['Beijing', 'Shanghai', 'Chengdu'],
        'Thailand': ['Bangkok', 'Chiang Mai', 'Phuket'],
        // North American locations
        'USA': ['New York', 'Los Angeles', 'Chicago'],
        'Canada': ['Toronto', 'Vancouver', 'Montreal'],
        'Mexico': ['Mexico City', 'Cancun', 'Guadalajara'],
        // South American locations
        'Brazil': ['Rio de Janeiro', 'Sao Paulo', 'Salvador'],
        'Argentina': ['Buenos Aires', 'Mendoza', 'Bariloche'],
        'Chile': ['Santiago', 'Valparaiso', 'Atacama Desert'],
        'Colombia': ['Bogota', 'Medellin', 'Cartagena'],
        'Peru': ['Lima', 'Cusco', 'Machu Picchu'],
        // African locations
        'Nigeria': ['Lagos', 'Abuja', 'Calabar'],
        'South Africa': ['Cape Town', 'Johannesburg', 'Durban'],
        'Kenya': ['Nairobi', 'Mombasa', 'Maasai Mara'],
        'Egypt': ['Cairo', 'Luxor', 'Aswan'],
        // Australian locations
        'Australia': ['Sydney', 'Melbourne', 'Brisbane'],
        'New Zealand': ['Auckland', 'Wellington', 'Christchurch']
    },

    // Template for plans (future trip ideas)
    plans: [
        {
            title: 'South_Korea_Adventure',
            createdAt: new Date().toISOString(),
            isPublished: 0,
        },
    ],

    // Template for travels (actual trips you've taken)
    travels: [
        {
            title: 'Musical_Trip_to_Belgium',
            startDate: '2025-08-07',
            endDate: '2025-08-10',
            createdAt: new Date().toISOString(),
            isPublished: 0,
        },
        {
            title: 'Pokémon_in_Paris',
            startDate: '2025-06-13',
            endDate: '2025-06-15',
            createdAt: new Date().toISOString(),
            isPublished: 0
        },
    ],

    // Template for tags
    tags: [
        { name: 'Food' },
        { name: 'Culture' },
        { name: 'Sightseeing' },
        { name: 'Adventure' },
        { name: 'Photography' },
        { name: 'Museums' },
        { name: 'Nature' },
        { name: 'History' },
        { name: 'Architecture' },
        { name: 'Nightlife' },
        { name: 'Shopping' },
        { name: 'Relaxation' },
        { name: 'Festival' },
        { name: 'Wildlife' },
        { name: 'Beaches' },
        { name: 'Hiking' },
        { name: 'Road Trips' },
        { name: 'Camping' },
        { name: 'Cycling' },
        { name: 'Pokémon' },
        { name: 'Music' },
        { name: 'Art' },
        { name: 'Literature' },
        { name: 'Sports' },
        { name: 'Wellness' },
    ],

    // Template for posts (blog posts about specific places)
    posts: [
        {
            title: 'Pokémon_in_Paris',
            location: 'Paris',
            travel: 'Pokémon_in_Paris',
            startDate: '2025-06-13',
            endDate: '2025-06-15',
            createdAt: new Date().toISOString(),
            isPublished: 0,
            previous: null,
            next: null
        },
        {
            title: 'Ed_Sheeran_Antwerp',
            location: 'Antwerp',
            travel: 'Musical_Trip_to_Belgium',
            startDate: '2025-08-07',
            createdAt: new Date().toISOString(),
            isPublished: 0,
            previous: null,
            next: null
        },
        {
            title: 'Vibing_in_Bruges',
            location: 'Bruges',
            travel: 'Musical_Trip_to_Belgium',
            startDate: '2025-08-08',
            endDate: '2025-08-10',
            createdAt: new Date().toISOString(),
            isPublished: 0,
            previous: null,
            next: null
        },
        {
            title: 'Exploring_Ghent',
            location: 'Ghent',
            travel: 'Musical_Trip_to_Belgium',
            startDate: '2025-08-10',
            createdAt: new Date().toISOString(),
            isPublished: 0,
            previous: null,
            next: null
        },
    ],

    // Template for travel-location relationships (which places you visited during each trip)
    travelLocations: [
        {
            travel: 'Pokémon_in_Paris', // Will be converted to travelId
            locations: ['Paris'] // Will be converted to locationIds
        },
        {
            travel: 'Musical_Trip_to_Belgium', // Will be converted to travelId
            locations: ['Antwerp', 'Bruges', 'Ghent'] // Will be converted to locationIds
        },
    ],

    // Template for plan-location relationships (places you want to visit in future plans)
    planLocations: [
        {
            plan: 'South_Korea_Adventure', // Will be converted to planId
            locations: ['Seoul', 'Busan', 'Gyeongju', 'Jeju Island', 'Andong', 'Sokcho', 'Jeonju', 'Naejangsan National Park', 'Mount Gayasan'] // Will be converted to locationIds
        },
    ],

    // Template for post-tag relationships (categorize your posts)
    postTags: [
        {
            post: 'Pokémon_in_Paris', // Will be converted to postId
            tags: ['Pokémon'] // Will be converted to tagIds
        },
        {
            post: 'Ed_Sheeran_Antwerp', // Will be converted to postId
            tags: ['Music'] // Will be converted to tagIds
        },
        {
            post: 'Vibing_in_Bruges',
            tags: ['Music', 'Culture', 'Festival', 'History', 'Architecture'] // Will be converted to tagIds
        },
        {
            post: 'Exploring_Ghent',
            tags: ['History', 'Culture'] // Will be converted to tagIds
        },
    ]
};



async function seed() {
    console.log('🌱 Seeding database with structured data...');

    try {
        // 1. Add Continents
        const continents = await db.insert(continent).values(seedData.continents).returning();
        console.log('✅ Added continents');

        // 2. Add Countries with continent mapping
        const countryInserts = [];
        const countryMap: Record<string, number> = {};

        for (const insertedContinent of continents) {
            const countriesForContinent = seedData.countries[insertedContinent.name as keyof typeof seedData.countries];
            if (countriesForContinent) {
                for (const countryName of countriesForContinent) {
                    countryInserts.push({
                        name: countryName,
                        continentId: insertedContinent.id
                    });
                }
            }
        }

        const countries = await db.insert(country).values(countryInserts).returning();

        // Create country lookup map
        countries.forEach(country => {
            countryMap[country.name] = country.id;
        });

        console.log('✅ Added countries');

        // 3. Add Locations with country mapping
        const locationInserts = [];

        for (const [countryName, locations] of Object.entries(seedData.locations)) {
            const countryId = countryMap[countryName];
            if (countryId) {
                for (const locationName of locations) {
                    locationInserts.push({
                        name: locationName,
                        countryId: countryId
                    });
                }
            }
        }

        const locations = await db.insert(location).values(locationInserts).returning();
        console.log('✅ Added locations');

        // Create location lookup map
        const locationMap: Record<string, number> = {};
        locations.forEach(location => {
            locationMap[location.name] = location.id;
        });

        // 4. Add Plans (future trip ideas)
        const plansData = seedData.plans.length > 0
            ? await db.insert(plans).values(seedData.plans).returning()
            : [];
        console.log('✅ Added plans');

        // Create plans lookup map
        const planMap: Record<string, number> = {};
        plansData.forEach(plan => {
            planMap[plan.title] = plan.id;
        });

        // 5. Add Travels (actual trips you've taken)
        const travelsData = seedData.travels.length > 0
            ? await db.insert(travel).values(seedData.travels).returning()
            : [];
        console.log('✅ Added travels');

        // Create travels lookup map
        const travelMap: Record<string, number> = {};
        travelsData.forEach(travelItem => {
            travelMap[travelItem.title] = travelItem.id;
        });

        // 6. Add Tags for categorizing posts
        const tagsData = seedData.tags.length > 0
            ? await db.insert(tag).values(seedData.tags).returning()
            : [];
        console.log('✅ Added tags');

        // Create tags lookup map
        const tagMap: Record<string, number> = {};
        tagsData.forEach(tag => {
            tagMap[tag.name] = tag.id;
        });

        // 7. Add Posts (blog posts about specific places)
        const postInserts = seedData.posts.map((post: any) => ({
            title: post.title,
            locationId: locationMap[post.location],
            travelId: travelMap[post.travel],
            startDate: post.startDate,
            endDate: post.endDate,
            createdAt: post.createdAt,
            isPublished: post.isPublished
        }));

        const postsData = postInserts.length > 0
            ? await db.insert(post).values(postInserts).returning()
            : [];
        console.log('✅ Added posts');

        // Create posts lookup map
        const postMap: Record<string, number> = {};
        postsData.forEach((postItem, index) => {
            if (seedData.posts[index]) {
                postMap[(seedData.posts[index] as any).title] = postItem.id;
            }
        });

        // 8. Link Travels to Locations (many-to-many)
        const travelLocationInserts = [];
        for (const travelLocationData of seedData.travelLocations as any[]) {
            const travelId = travelMap[travelLocationData.travel];
            if (travelId) {
                for (const locationName of travelLocationData.locations) {
                    const locationId = locationMap[locationName];
                    if (locationId) {
                        travelLocationInserts.push({
                            travelId,
                            locationId
                        });
                    }
                }
            }
        }

        if (travelLocationInserts.length > 0) {
            await db.insert(travelLocations).values(travelLocationInserts);
        }
        console.log('✅ Added travel-location connections');

        // 9. Link Plans to Locations (many-to-many)
        const planLocationInserts = [];
        for (const planLocationData of seedData.planLocations as any[]) {
            const planId = planMap[planLocationData.plan];
            if (planId) {
                for (const locationName of planLocationData.locations) {
                    const locationId = locationMap[locationName];
                    if (locationId) {
                        planLocationInserts.push({
                            planId,
                            locationId
                        });
                    }
                }
            }
        }

        if (planLocationInserts.length > 0) {
            await db.insert(planLocations).values(planLocationInserts);
        }
        console.log('✅ Added plan-location connections');

        // 10. Link Posts to Tags (many-to-many)
        const postTagInserts = [];
        for (const postTagData of seedData.postTags as any[]) {
            const postId = postMap[postTagData.post];
            if (postId) {
                for (const tagName of postTagData.tags) {
                    const tagId = tagMap[tagName];
                    if (tagId) {
                        postTagInserts.push({
                            postId,
                            tagId
                        });
                    }
                }
            }
        }

        if (postTagInserts.length > 0) {
            await db.insert(postTags).values(postTagInserts);
        }
        console.log('✅ Added post-tag connections');

        console.log('🎉 Database seeded successfully!');
        console.log(`
📊 Summary:
- ${continents.length} continents
- ${countries.length} countries  
- ${locations.length} locations
- ${plansData.length} plans
- ${travelsData.length} travels
- ${tagsData.length} tags
- ${postsData.length} posts
- ${travelLocationInserts.length} travel-location connections
- ${planLocationInserts.length} plan-location connections
- ${postTagInserts.length} post-tag connections
`);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
    }
}

// Run the seed function
seed();
