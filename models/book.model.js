const { pgTable, uuid, varchar, text } = require("drizzle-orm/pg-core");
const authorTable = require("./author.model")

const bookTable = pgTable("bookLibrary", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({length: 255}).notNull(),
    description: text().notNull(),
    authorId: uuid().references(()=> authorTable.id).notNull()
})

module.exports = bookTable