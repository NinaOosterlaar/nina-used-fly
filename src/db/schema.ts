import { is } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const continent = sqliteTable('continents', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
});

export const country = sqliteTable('countries', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    continentId: integer('continent_id')
        .references(() => continent.id, { onDelete: 'cascade' }),
});

export const location = sqliteTable('locations', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    countryId: integer('country_id')
        .references(() => country.id, { onDelete: 'cascade' }),
});

export const plans = sqliteTable('plans', {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    createdAt : text('created_at').notNull(),
    updatedAt: text('updated_at'),
    isPublished: integer('is_published').notNull().default(0), // 0 for false, 1 for true
});

export const travel = sqliteTable('travels', {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    startDate: text('start_date'),
    endDate: text('end_date'),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at'),
    isPublished: integer('is_published').notNull().default(0), // 0 for false, 1 for true
    planId : integer('plan_id')
        .references(() => plans.id, { onDelete: 'cascade' }),
});

// Junction table for many-to-many relationship between travels and locations
export const travelLocations = sqliteTable('travel_locations', {
    id: integer('id').primaryKey(),
    travelId: integer('travel_id')
        .references(() => travel.id, { onDelete: 'cascade' })
        .notNull(),
    locationId: integer('location_id')
        .references(() => location.id, { onDelete: 'cascade' })
        .notNull(),
});

// Junction table for many-to-many relationship between plans and locations
export const planLocations = sqliteTable('plan_locations', {
    id: integer('id').primaryKey(),
    planId: integer('plan_id')
        .references(() => plans.id, { onDelete: 'cascade' }).notNull(),
    locationId: integer('location_id')
        .references(() => location.id, { onDelete: 'cascade' }).notNull(),
});

export const post = sqliteTable('posts', {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    locationId: integer('location_id')
        .references(() => location.id, { onDelete: 'cascade' }).notNull(),
    travelId: integer('travel_id')
        .references(() => travel.id, { onDelete: 'cascade' }), // Optional - for posts about completed travels
    planId: integer('plan_id')
        .references(() => plans.id, { onDelete: 'cascade' }), // Optional - for posts about future plans
    startDate: text('start_date'),
    endDate: text('end_date'),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at'),
    isPublished: integer('is_published').notNull().default(0), // 0 for false, 1 for true
});

export const tag = sqliteTable('tags', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
});

export const postTags = sqliteTable('post_tags', {
    id: integer('id').primaryKey(),
    postId: integer('post_id')
        .references(() => post.id, { onDelete: 'cascade' }).notNull(),
    tagId: integer('tag_id')
        .references(() => tag.id, { onDelete: 'cascade' }).notNull(),
});

// Exporting all tables for use in the database connection
export const schema = {
    continent,
    country,
    location,
    plans,
    travel,
    travelLocations,
    planLocations,
    post,
    tag,
    postTags,
};



    
  