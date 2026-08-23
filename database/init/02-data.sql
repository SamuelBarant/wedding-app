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
        'Foto con los padres de la novia',
        'Consigue una foto junto a los padres de la novia.',
        20,
        'family_restroom',
        TRUE
    ),
    (
        'Foto con los padres del novio',
        'Consigue una foto junto a los padres del novio.',
        20,
        'family_restroom',
        TRUE
    ),
    (
        'Alguien levantando su copa',
        'Captura a un invitado levantando su copa durante la celebración.',
        10,
        'local_bar',
        TRUE
    ),
    (
        'Dos personas brindando',
        'Haz una foto de dos invitados brindando juntos.',
        15,
        'celebration',
        TRUE
    ),
    (
        'Grupo de amigos',
        'Consigue una foto de un grupo de amigos juntos.',
        15,
        'groups',
        TRUE
    ),
    (
        'Tres generaciones',
        'Encuentra y fotografía a personas de tres generaciones diferentes.',
        30,
        'family_history',
        TRUE
    ),
    (
        'Alguien con los brazos arriba',
        'Captura a alguien celebrando con los brazos levantados.',
        10,
        'celebration',
        TRUE
    ),
    (
        'Baile en pareja',
        'Haz una foto de dos personas bailando juntas.',
        15,
        'nightlife',
        TRUE
    ),
    (
        'Alguien haciendo el tonto',
        'Captura a un invitado haciendo el tonto para la foto.',
        10,
        'mood',
        TRUE
    ),
    (
        'Selfie grupal',
        'Consigue una foto tipo selfie con varios invitados.',
        15,
        'photo_camera',
        TRUE
    ),
    (
        'Foto desde atrás',
        'Haz una foto de los novios o invitados desde detrás.',
        10,
        'photo',
        TRUE
    ),
    (
        'La pista de baile llena',
        'Captura la pista de baile llena de invitados.',
        20,
        'music_note',
        TRUE
    ),
    (
        'Alguien saltando',
        'Haz una foto de alguien saltando.',
        15,
        'sports_handball',
        TRUE
    ),
    (
        'Una sonrisa enorme',
        'Encuentra a alguien con una sonrisa enorme y hazle una foto.',
        10,
        'sentiment_very_satisfied',
        TRUE
    ),
    (
        'Foto de los zapatos',
        'Haz una foto de unos zapatos llamativos de algún invitado.',
        5,
        'steps',
        TRUE
    ),
    (
        'Un vestido espectacular',
        'Captura un vestido de invitada que destaque especialmente.',
        10,
        'checkroom',
        TRUE
    ),
    (
        'Una corbata o pajarita',
        'Haz una foto de un invitado con una corbata o pajarita.',
        5,
        'person',
        TRUE
    ),
    (
        'Alguien con gafas de sol',
        'Encuentra a alguien llevando gafas de sol.',
        10,
        'visibility',
        TRUE
    ),
    (
        'Una foto divertida',
        'Haz una foto que consiga hacer reír al equipo de la boda.',
        20,
        'mood',
        TRUE
    ),
    (
        'Foto de las alianzas',
        'Haz una foto de las alianzas de los novios.',
        25,
        'favorite',
        TRUE
    ),
    (
        'El ramo',
        'Haz una foto del ramo de la novia.',
        15,
        'local_florist',
        TRUE
    ),
    (
        'El banquete',
        'Haz una foto de la mesa del banquete.',
        10,
        'restaurant',
        TRUE
    ),
    (
        'Un plato espectacular',
        'Captura uno de los platos de la celebración.',
        10,
        'restaurant',
        TRUE
    ),
    (
        'El postre',
        'Haz una foto del postre antes de que desaparezca.',
        10,
        'cake',
        TRUE
    ),
    (
        'La tarta nupcial',
        'Haz una foto de la tarta de boda.',
        20,
        'cake',
        TRUE
    ),
    (
        'Alguien comiendo',
        'Captura a un invitado disfrutando de la comida.',
        5,
        'restaurant',
        TRUE
    ),
    (
        'Una copa en primer plano',
        'Haz una foto de una copa en primer plano durante la celebración.',
        10,
        'local_bar',
        TRUE
    ),
    (
        'Un brindis multitudinario',
        'Captura un brindis en el que participen varias personas.',
        20,
        'celebration',
        TRUE
    ),
    (
        'La decoración',
        'Haz una foto de algún elemento especial de la decoración.',
        10,
        'auto_awesome',
        TRUE
    ),
    (
        'Las flores',
        'Captura una composición de flores de la boda.',
        10,
        'local_florist',
        TRUE
    ),
    (
        'Una vela',
        'Haz una foto de una vela o elemento de iluminación decorativo.',
        5,
        'light_mode',
        TRUE
    ),
    (
        'Las luces',
        'Captura las luces decorativas de la celebración.',
        10,
        'lightbulb',
        TRUE
    ),
    (
        'Un detalle de la mesa',
        'Haz una foto de un pequeño detalle de una mesa.',
        5,
        'table_restaurant',
        TRUE
    ),
    (
        'Una foto espontánea',
        'Captura a alguien sin que esté posando para la cámara.',
        15,
        'photo_camera',
        TRUE
    ),
    (
        'Alguien mirando a cámara',
        'Haz una foto de un invitado mirando directamente a cámara.',
        5,
        'face',
        TRUE
    ),
    (
        'Una foto en pareja',
        'Haz una foto de dos invitados juntos.',
        10,
        'people',
        TRUE
    ),
    (
        'Cuatro personas juntas',
        'Consigue una foto en la que aparezcan al menos cuatro invitados.',
        15,
        'groups',
        TRUE
    ),
    (
        'Una foto de cinco',
        'Consigue una foto en la que aparezcan al menos cinco invitados.',
        20,
        'groups',
        TRUE
    ),
    (
        'Un abrazo',
        'Captura un abrazo entre dos invitados.',
        15,
        'volunteer_activism',
        TRUE
    ),
    (
        'Un abrazo grupal',
        'Captura un abrazo entre tres o más personas.',
        20,
        'groups',
        TRUE
    ),
    (
        'Alguien saludando',
        'Haz una foto de alguien saludando a cámara.',
        5,
        'waving_hand',
        TRUE
    ),
    (
        'Una pose divertida',
        'Consigue que alguien haga una pose divertida.',
        10,
        'accessibility_new',
        TRUE
    ),
    (
        'Alguien haciendo un corazón',
        'Haz una foto de alguien formando un corazón con las manos.',
        15,
        'favorite',
        TRUE
    ),
    (
        'Una foto con gafas',
        'Haz una foto junto a alguien que lleve gafas.',
        5,
        'eyeglasses',
        TRUE
    ),
    (
        'Alguien con sombrero',
        'Encuentra a alguien llevando sombrero o algún accesorio en la cabeza.',
        15,
        'face',
        TRUE
    ),
    (
        'Un accesorio divertido',
        'Haz una foto de alguien utilizando un accesorio divertido de la boda.',
        10,
        'celebration',
        TRUE
    ),
    (
        'El DJ',
        'Haz una foto del DJ durante la celebración.',
        15,
        'music_note',
        TRUE
    ),
    (
        'La música',
        'Captura un momento relacionado con la música de la boda.',
        10,
        'music_note',
        TRUE
    ),
    (
        'Alguien cantando',
        'Haz una foto de alguien cantando.',
        15,
        'mic',
        TRUE
    ),
    (
        'Un baile inesperado',
        'Captura un momento de baile inesperado o divertido.',
        20,
        'directions_run',
        TRUE
    ),
    (
        'Un paso de baile',
        'Haz una foto de alguien haciendo un paso de baile llamativo.',
        15,
        'directions_run',
        TRUE
    ),
    (
        'El momento más divertido',
        'Captura el momento más divertido que encuentres durante la boda.',
        25,
        'sentiment_very_satisfied',
        TRUE
    ),
    (
        'Una mirada cómplice',
        'Captura una mirada cómplice entre dos personas.',
        20,
        'visibility',
        TRUE
    ),
    (
        'Una mirada romántica',
        'Haz una foto de una pareja mirándose de forma romántica.',
        20,
        'favorite',
        TRUE
    ),
    (
        'Una risa contagiosa',
        'Captura a dos personas riéndose juntas.',
        15,
        'sentiment_very_satisfied',
        TRUE
    ),
    (
        'Una lágrima',
        'Captura un momento de emoción durante la celebración.',
        20,
        'water_drop',
        TRUE
    ),
    (
        'Un momento emotivo',
        'Haz una foto de un momento especialmente emotivo.',
        20,
        'favorite',
        TRUE
    ),
    (
        'Los novios bailando',
        'Haz una foto de los novios bailando juntos.',
        30,
        'music_note',
        TRUE
    ),
    (
        'Los novios abrazándose',
        'Captura un abrazo entre los novios.',
        25,
        'favorite',
        TRUE
    ),
    (
        'Los novios riendo',
        'Haz una foto de los novios riéndose juntos.',
        20,
        'sentiment_very_satisfied',
        TRUE
    ),
    (
        'Los novios saludando',
        'Haz una foto de los novios saludando a los invitados.',
        15,
        'waving_hand',
        TRUE
    ),
    (
        'Los novios con amigos',
        'Consigue una foto de los novios junto a un grupo de amigos.',
        25,
        'groups',
        TRUE
    ),
    (
        'Los novios con la familia',
        'Consigue una foto de los novios junto a familiares.',
        25,
        'family_restroom',
        TRUE
    ),
    (
        'Foto de grupo familiar',
        'Haz una foto de varios familiares juntos.',
        20,
        'family_restroom',
        TRUE
    ),
    (
        'Alguien felicitando a los novios',
        'Captura a un invitado felicitando a los novios.',
        15,
        'celebration',
        TRUE
    ),
    (
        'Un abrazo a los novios',
        'Haz una foto de alguien abrazando a uno de los novios.',
        15,
        'favorite',
        TRUE
    ),
    (
        'Un brindis por los novios',
        'Captura un brindis dedicado a los novios.',
        20,
        'local_bar',
        TRUE
    ),
    (
        'Una foto de espaldas',
        'Haz una foto de alguien interesante desde atrás.',
        5,
        'photo',
        TRUE
    ),
    (
        'Una foto en movimiento',
        'Captura a alguien en movimiento.',
        10,
        'directions_run',
        TRUE
    ),
    (
        'Una foto desenfocada a propósito',
        'Haz una foto creativa utilizando el desenfoque.',
        15,
        'blur_on',
        TRUE
    ),
    (
        'Una foto desde arriba',
        'Haz una foto tomada desde un punto elevado.',
        15,
        'photo',
        TRUE
    ),
    (
        'Una foto desde abajo',
        'Haz una foto tomada desde un ángulo bajo.',
        15,
        'photo',
        TRUE
    ),
    (
        'Una sombra',
        'Haz una foto creativa utilizando una sombra.',
        15,
        'wb_sunny',
        TRUE
    ),
    (
        'Un reflejo',
        'Captura a alguien o algo mediante un reflejo.',
        20,
        'water',
        TRUE
    ),
    (
        'Una foto con una ventana',
        'Haz una foto utilizando una ventana como parte de la composición.',
        10,
        'window',
        TRUE
    ),
    (
        'El lugar de celebración',
        'Haz una foto del lugar donde se celebra la boda.',
        10,
        'location_on',
        TRUE
    ),
    (
        'La entrada',
        'Haz una foto de la entrada al lugar de celebración.',
        10,
        'door_front',
        TRUE
    ),
    (
        'Un cartel de la boda',
        'Haz una foto de algún cartel relacionado con la boda.',
        10,
        'signpost',
        TRUE
    ),
    (
        'Los nombres de los novios',
        'Captura algún lugar donde aparezcan los nombres de los novios.',
        10,
        'badge',
        TRUE
    ),
    (
        'La fecha de la boda',
        'Encuentra y fotografía la fecha de la boda.',
        15,
        'event',
        TRUE
    ),
    (
        'Un número',
        'Haz una foto de algún número relacionado con la celebración.',
        5,
        'numbers',
        TRUE
    ),
    (
        'Un detalle dorado',
        'Encuentra y fotografía algún detalle de color dorado.',
        10,
        'auto_awesome',
        TRUE
    ),
    (
        'Un detalle blanco',
        'Encuentra y fotografía algún detalle de color blanco.',
        5,
        'circle',
        TRUE
    ),
    (
        'Un detalle rosa',
        'Encuentra y fotografía algún detalle de color rosa.',
        10,
        'circle',
        TRUE
    ),
    (
        'Algo brillante',
        'Haz una foto de algo que destaque por ser brillante.',
        10,
        'auto_awesome',
        TRUE
    ),
    (
        'Una foto al atardecer',
        'Si el momento lo permite, captura una foto durante el atardecer.',
        25,
        'wb_twilight',
        TRUE
    ),
    (
        'El cielo',
        'Haz una foto bonita del cielo durante la celebración.',
        10,
        'cloud',
        TRUE
    ),
    (
        'Una foto con naturaleza',
        'Captura algún elemento natural que rodee la celebración.',
        10,
        'park',
        TRUE
    ),
    (
        'Un árbol',
        'Haz una foto de un árbol que esté cerca de la celebración.',
        5,
        'park',
        TRUE
    ),
    (
        'Una flor',
        'Haz una foto de una flor que encuentres durante la boda.',
        5,
        'local_florist',
        TRUE
    ),
    (
        'Alguien usando el móvil',
        'Captura a alguien utilizando su teléfono durante la celebración.',
        5,
        'smartphone',
        TRUE
    ),
    (
        'Una foto de una foto',
        'Haz una foto de alguien que esté haciendo una foto.',
        15,
        'photo_camera',
        TRUE
    ),
    (
        'El fotógrafo',
        'Haz una foto del fotógrafo trabajando.',
        15,
        'photo_camera',
        TRUE
    ),
    (
        'Alguien grabando',
        'Captura a alguien grabando un vídeo.',
        10,
        'videocam',
        TRUE
    ),
    (
        'Una foto inesperada',
        'Haz una foto de algo que no esperabas encontrar durante la boda.',
        20,
        'surprise',
        TRUE
    ),
    (
        'Una foto que represente la boda',
        'Haz una foto que para ti represente perfectamente el ambiente de la boda.',
        30,
        'auto_awesome',
        TRUE
    ),
    (
        'La foto más original',
        'Consigue una foto especialmente original y creativa.',
        30,
        'lightbulb',
        TRUE
    ),
    (
        'Una foto que haga reír',
        'Haz una foto que provoque una carcajada al verla.',
        25,
        'sentiment_very_satisfied',
        TRUE
    ),
    (
        'Una foto con un desconocido',
        'Hazte una foto con alguien que acabes de conocer en la boda.',
        20,
        'person_add',
        TRUE
    ),
    (
        'Conoce a alguien nuevo',
        'Haz una foto junto a alguien que no conocías antes de la boda.',
        20,
        'person_add',
        TRUE
    ),
    (
        'Una foto con alguien de otra mesa',
        'Haz una foto junto a alguien que esté sentado en otra mesa.',
        15,
        'groups',
        TRUE
    ),
    (
        'Una foto con alguien de la familia',
        'Haz una foto junto a un familiar de cualquiera de los novios.',
        15,
        'family_restroom',
        TRUE
    ),
    (
        'Una foto con un niño',
        'Haz una foto junto a uno de los niños invitados.',
        15,
        'child_care',
        TRUE
    ),
    (
        'Una foto con una persona mayor',
        'Haz una foto junto a una persona mayor invitada a la boda.',
        15,
        'elderly',
        TRUE
    ),
    (
        'Una foto con alguien que lleve rojo',
        'Haz una foto junto a alguien que lleve alguna prenda roja.',
        10,
        'person',
        TRUE
    ),
    (
        'Una foto con alguien que lleve azul',
        'Haz una foto junto a alguien que lleve alguna prenda azul.',
        10,
        'person',
        TRUE
    ),
    (
        'Una foto con alguien que lleve negro',
        'Haz una foto junto a alguien que lleve alguna prenda negra.',
        10,
        'person',
        TRUE
    ),
    (
        'La mejor pose',
        'Consigue una foto con una pose espectacular.',
        20,
        'accessibility_new',
        TRUE
    ),
    (
        'Todos mirando a cámara',
        'Consigue una foto de un grupo en la que todos miren a cámara.',
        20,
        'photo_camera',
        TRUE
    ),
    (
        'Nadie mirando a cámara',
        'Consigue una foto espontánea en la que nadie mire a cámara.',
        20,
        'photo',
        TRUE
    ),
    (
        'Una foto con movimiento',
        'Haz una foto en la que el movimiento sea parte de la composición.',
        15,
        'motion_photos_on',
        TRUE
    ),
    (
        'Una foto artística',
        'Haz una fotografía especialmente artística o creativa.',
        25,
        'palette',
        TRUE
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