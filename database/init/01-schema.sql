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
-- CHALLENGES
-- =========================================================

CREATE TABLE challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    title VARCHAR(150) NOT NULL,

    description TEXT,

    points INTEGER NOT NULL DEFAULT 1,

    icon VARCHAR(100),

    active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT challenges_points_check
    CHECK (points >= 0)
);

-- =========================================================
-- PHOTOS
-- =========================================================

CREATE TABLE photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    challenge_id UUID,

    original_filename VARCHAR(255) NOT NULL,

    stored_filename VARCHAR(255) NOT NULL,

    storage_path VARCHAR(500) NOT NULL,

    content_type VARCHAR(100) NOT NULL,

    file_size BIGINT NOT NULL,

    caption VARCHAR(500),

    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_photos_user
        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE,

    CONSTRAINT fk_photos_challenge
        FOREIGN KEY (challenge_id)
            REFERENCES challenges(id)
            ON DELETE SET NULL,

    CONSTRAINT photos_status_check
        CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED'))
);


-- =========================================================
-- BINGO PROGRESS
-- =========================================================

CREATE TABLE bingo_progress (
                                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                                user_id UUID NOT NULL,

                                challenge_id UUID NOT NULL,

                                photo_id UUID,

                                completed_at TIMESTAMP,

                                CONSTRAINT fk_bingo_user
                                    FOREIGN KEY (user_id)
                                        REFERENCES users(id)
                                        ON DELETE CASCADE,

                                CONSTRAINT fk_bingo_challenge
                                    FOREIGN KEY (challenge_id)
                                        REFERENCES challenges(id)
                                        ON DELETE CASCADE,

                                CONSTRAINT fk_bingo_photo
                                    FOREIGN KEY (photo_id)
                                        REFERENCES photos(id)
                                        ON DELETE SET NULL,

                                CONSTRAINT unique_user_challenge
                                    UNIQUE (user_id, challenge_id)
);


-- =========================================================
-- INDEXES
-- =========================================================

CREATE INDEX idx_users_firebase_uid
    ON users(firebase_uid);

CREATE INDEX idx_challenges_active
    ON challenges(active);

CREATE INDEX idx_photos_user_id
    ON photos(user_id);

CREATE INDEX idx_photos_challenge_id
    ON photos(challenge_id);

CREATE INDEX idx_photos_status
    ON photos(status);

CREATE INDEX idx_photos_created_at
    ON photos(created_at);

CREATE INDEX idx_bingo_user_id
    ON bingo_progress(user_id);

CREATE INDEX idx_bingo_challenge_id
    ON bingo_progress(challenge_id);