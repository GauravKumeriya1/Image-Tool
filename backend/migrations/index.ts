import { query } from '../config/database'

export const runMigrations = async () => {
  try {
    console.log('Running migrations...')

    // Run all migrations
    const migrations = [
      require('./001_init'),
    ]

    for (const migration of migrations) {
      console.log(`Running migration: ${migration.name}`)
      await query(migration.up)
    }

    console.log('Migrations completed successfully')
  } catch (error) {
    console.error('Migration error:', error)
    process.exit(1)
  }
}

runMigrations()
