// import { serial, varchar } from "drizzle-orm/mysql-core";
import { integer, json, pgTable,serial,varchar } from "drizzle-orm/pg-core";

export const CarListing=pgTable('carListing',{
    id:serial("id").primaryKey(),
    listingTitle:varchar('listingTitle').notNull(),
    tagLine:varchar('tagLine'),
    originalPrice:varchar('originalPrice'),
    SellingPrice:varchar('SellingPrice'),
    category:varchar('category'),
    condition:varchar('condition'),
    make:varchar('make'),
    model:varchar('model'),
    year:varchar('year'),
    driveType:varchar('driveType'),
    transmission:varchar('transmission'),
    fuelType:varchar('fuelType'),
    engineSize:varchar('engineSize'),
    cylinder:varchar('cylinder'),
    color:varchar('color'),
    door:varchar('door'),
    vin:varchar('vin'),
    offerType:varchar('offerType'),
    listingDescription:varchar('listingDescription'),
    features:json('features'),
    createdBy:varchar("createdBy").notNull(),
    userName:varchar('userName').notNull().default("Anonymous"),
    userImageUrl:varchar("userImageUrl").default("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"),
    postedOn:varchar('postedOn')
})


export const CarImages=pgTable('carImages',{
    id:serial('id').primaryKey(),
    imageUrl:varchar('imageUrl').notNull(),
    carListingId:integer('carListingId').notNull().references(()=>CarListing.id)
})