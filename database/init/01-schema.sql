CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================================================
-- WEDDING BINGO - DATABASE SCHEMA
-- =========================================================

CREATE TABLE users (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                       firebase_uid VARCHAR(128) UNIQUE,

                       name VARCHAR(100) NOT NULL,

                       profile_photo_path VARCHAR(500),

                       role VARCHAR(20) NOT NULL DEFAULT 'GUEST',

                       points INTEGER NOT NULL DEFAULT 0,

                       created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                       CONSTRAINT users_role_check
                           CHECK (role IN ('GUEST', 'ADMIN'))
);

-- =========================================================
-- PHOTOS
-- =========================================================

CREATE TABLE photos (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                        user_id UUID NOT NULL,

                        original_filename VARCHAR(255) NOT NULL,

                        stored_filename VARCHAR(255) NOT NULL,

                        storage_path VARCHAR(500) NOT NULL,

                        content_type VARCHAR(100) NOT NULL,

                        file_size BIGINT NOT NULL,

                        caption VARCHAR(500),

                        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                        CONSTRAINT fk_photos_user
                            FOREIGN KEY (user_id)
                                REFERENCES users(id)
                                ON DELETE CASCADE
);

-- =========================================================
-- INDEXES
-- =========================================================

CREATE INDEX idx_users_firebase_uid
    ON users(firebase_uid);

CREATE INDEX idx_photos_user_id
    ON photos(user_id);

CREATE INDEX idx_photos_created_at
    ON photos(created_at);