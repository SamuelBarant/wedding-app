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
    );

INSERT INTO users (
    id,
    name,
    role,
    points
)
VALUES (
   '11111111-1111-1111-1111-111111111111',
   'Samuel',
   'GUEST',
   0
);