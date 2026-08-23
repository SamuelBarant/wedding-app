-- =========================================================
-- WEDDING BINGO - DATABASE SCHEMA
-- =========================================================

CREATE TABLE users (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                       firebase_uid VARCHAR(128) UNIQUE,

                       name VARCHAR(100) NOT NULL,

                       profile_photo VARCHAR(500),

                       role VARCHAR(20) NOT NULL DEFAULT 'GUEST'
                           CHECK (role IN ('GUEST', 'ADMIN')),

                       created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- CHALLENGES
-- =========================================================

CREATE TABLE challenges (
                            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                            title VARCHAR(255) NOT NULL,

                            description TEXT,

                            points INTEGER NOT NULL DEFAULT 10
                                CHECK (points >= 0),

                            position INTEGER NOT NULL,

                            active BOOLEAN NOT NULL DEFAULT TRUE,

                            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                            CONSTRAINT unique_challenge_position
                                UNIQUE (position)
);


-- =========================================================
-- PHOTOS
-- =========================================================

CREATE TABLE photos (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                        user_id UUID NOT NULL,

                        challenge_id UUID,

                        filename VARCHAR(255) NOT NULL,

                        path VARCHAR(500) NOT NULL,

                        caption TEXT,

                        status VARCHAR(20) NOT NULL DEFAULT 'PENDING'
                            CHECK (status IN (
                                              'PENDING',
                                              'APPROVED',
                                              'REJECTED'
                                )),

                        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                        reviewed_at TIMESTAMP,

                        reviewed_by UUID,

                        CONSTRAINT fk_photo_user
                            FOREIGN KEY (user_id)
                                REFERENCES users(id)
                                ON DELETE CASCADE,

                        CONSTRAINT fk_photo_challenge
                            FOREIGN KEY (challenge_id)
                                REFERENCES challenges(id)
                                ON DELETE SET NULL,

                        CONSTRAINT fk_photo_reviewer
                            FOREIGN KEY (reviewed_by)
                                REFERENCES users(id)
                                ON DELETE SET NULL
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