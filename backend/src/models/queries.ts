// User Queries

export const CREATE_USER = `
  INSERT INTO users (id, name, email, password, created_at)
  VALUES ($1, $2, $3, $4, NOW())
  RETURNING id, name, email, created_at
`

export const GET_USER_BY_EMAIL = `
  SELECT id, name, email, password, created_at, role
  FROM users
  WHERE email = $1
`

export const GET_USER_BY_ID = `
  SELECT id, name, email, created_at, role
  FROM users
  WHERE id = $1
`

export const UPDATE_USER = `
  UPDATE users
  SET name = $1, email = $2, updated_at = NOW()
  WHERE id = $3
  RETURNING id, name, email, created_at
`

export const DELETE_USER = `
  DELETE FROM users
  WHERE id = $1
`

// Project Queries

export const CREATE_PROJECT = `
  INSERT INTO projects (id, user_id, name, file_path, duration, status, created_at)
  VALUES ($1, $2, $3, $4, $5, $6, NOW())
  RETURNING id, user_id, name, status, created_at
`

export const GET_PROJECT_BY_ID = `
  SELECT id, user_id, name, file_path, duration, status, created_at, updated_at
  FROM projects
  WHERE id = $1
`

export const GET_USER_PROJECTS = `
  SELECT id, user_id, name, duration, status, created_at, updated_at
  FROM projects
  WHERE user_id = $1
  ORDER BY created_at DESC
`

export const UPDATE_PROJECT_STATUS = `
  UPDATE projects
  SET status = $1, updated_at = NOW()
  WHERE id = $2
  RETURNING id, status
`

// Subtitle Queries

export const CREATE_SUBTITLE = `
  INSERT INTO subtitles (id, project_id, format, content, created_at)
  VALUES ($1, $2, $3, $4, NOW())
  RETURNING id, project_id, format, created_at
`

export const GET_PROJECT_SUBTITLES = `
  SELECT id, project_id, format, created_at
  FROM subtitles
  WHERE project_id = $1
  ORDER BY created_at DESC
`
