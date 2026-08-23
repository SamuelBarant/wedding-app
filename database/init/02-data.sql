-- =========================================================
-- WEDDING BINGO - INITIAL DATA
-- =========================================================

INSERT INTO challenges (
    title,
    description,
    points,
    icon,
    active
)
VALUES
    (
        'La novia riendo a carcajadas',
        'Haz una foto de la novia riéndose a carcajadas.',
        10,
        'sentiment_very_satisfied',
        TRUE
    ),
    (
        'Un beso inesperado',
        'Captura un beso inesperado durante la celebración.',
        10,
        'favorite',
        TRUE
    ),
    (
        'Alguien llorando de emoción',
        'Encuentra a alguien emocionándose durante la boda.',
        15,
        'sentiment_satisfied',
        TRUE
    ),
    (
        'El centro de mesa más bonito',
        'Haz una foto de uno de los centros de mesa.',
        5,
        'local_florist',
        TRUE
    ),
    (
        'Foto con los novios',
        'Consigue una foto junto a los novios',
        50,
        'local_florist',
        true
    ),
    (
        'Alguien bailando',
        'Haz una foto de alguien bailando',
        25,
        'local_florist',
        true
    ),
    (
        'Un brindis',
        'Captura un brindis durante la celebración',
        30,
        'local_florist',
        true
    ),
    (
        'Alguien riendo',
        'Consigue una foto de alguien riéndose',
        20,
        'local_florist',
        true
    );

INSERT INTO users (
    name,
    role,
    points
) VALUES (
   'Samuel',
   'GUEST',
   0
);