export const currentUser = {
  name: 'Samuel',
  role: 'Invitado VIP',
  points: 125,
  avatar: null,
  rank: 2,
};

export const bingoCells = [
  { id: 1, icon: 'photo_camera', label: 'Foto Novios', points: 10, status: 'pending' },
  { id: 2, icon: 'local_bar', label: 'Brindis', points: 10, status: 'pending' },
  { id: 3, icon: 'check_circle', label: 'Completado', points: 15, status: 'completed' },
  { id: 4, icon: 'cake', label: 'Pastel', points: 20, status: 'pending' },
  { id: 5, icon: 'music_note', label: 'Baile', points: 15, status: 'pending' },
  { id: 6, icon: 'hourglass_empty', label: 'En revisión', points: 10, status: 'review' },
  { id: 7, icon: 'favorite', label: 'Beso', points: 10, status: 'pending' },
  { id: 8, icon: 'uploading', label: 'Subiendo...', points: 10, status: 'uploading' },
  { id: 9, icon: 'restaurant', label: 'Cena', points: 10, status: 'pending' },
  { id: 10, icon: 'diversity_3', label: 'Familia', points: 15, status: 'pending' },
  { id: 11, icon: 'emoji_people', label: 'Amigos', points: 10, status: 'pending' },
  { id: 12, icon: 'check_circle', label: 'Completado', points: 15, status: 'completed' },
  { id: 13, icon: 'star', label: 'Libre', points: 0, status: 'free' },
  { id: 14, icon: 'sentiment_very_satisfied', label: 'Risa', points: 10, status: 'pending' },
  { id: 15, icon: 'styler', label: 'Vestido', points: 15, status: 'pending' },
  { id: 16, icon: 'celebration', label: 'Fiesta', points: 10, status: 'pending' },
  { id: 17, icon: 'diamond', label: 'Anillo', points: 10, status: 'pending' },
  { id: 18, icon: 'auto_awesome', label: 'Luces', points: 10, status: 'pending' },
  { id: 19, icon: 'groups', label: 'Grupo', points: 10, status: 'pending' },
  { id: 20, icon: 'switch_account', label: 'Selfie', points: 10, status: 'pending' },
  { id: 21, icon: 'church', label: 'Ceremonia', points: 10, status: 'pending' },
  { id: 22, icon: 'local_florist', label: 'Flores', points: 10, status: 'pending' },
  { id: 23, icon: 'wine_bar', label: 'Vino', points: 10, status: 'pending' },
  { id: 24, icon: 'child_care', label: 'Niños', points: 10, status: 'pending' },
  { id: 25, icon: 'directions_car', label: 'Coche', points: 10, status: 'pending' },
];

export const galleryPhotos = [
  {
    id: 1,
    user: 'Ana M.',
    time: '10m',
    caption: 'novios',
    height: 260,
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJKMzVyOKAi5Fqv8vElfXnAdXgTVSSBAofLA8HFvXNN9pOVy5rJpkoozQS5R0AkZZOEa7kHgIH9CTFHSOS0upCRiLCXRXhfaGbyWZlubTEC7dMPKTwRMZv53rZGoKddhmvFuhWMca1-DnO0M4fSWI0a1NB4hNd3zhDM8cts2F-043FxZNES1tg_w9_0If_nctZ_lpHC8HIOK2N5_qIE9sMH7gbIE7QBN0AaibIRmGot9Q_kc73Y0Yy',
  },
  {
    id: 2,
    user: 'Carlos T.',
    time: '1h',
    caption: 'banquete',
    height: 320,
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtRzV5CAeSA-Pi_aIHeQM1fVltiDKSEMjV6QYRLlbl5U-2UHMuysssvDKUgrNc6pwazBskY3KketDeD1gmKCBmRtmAAsrG9io3VGXkzjtzkOH8AZ_sXdbQE5b6kD7QWeH_KO9KUXc8E_A43ceyeDkr148v0iEMfs7e402UxK4uz6LKoiW-p9nwSHU8RblflV04YUhSh5qukVvH1yppHXl5k5ItpF42RMku_hzy8ym5n1B4aYS_Yy_V',
  },
  {
    id: 3,
    user: 'Foto Studio',
    time: '2h',
    caption: 'banquete',
    height: 220,
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV18P6ME3biEWpLDpuNlPYNJANzjPD0XgMyKz22BtamzbIoSULnR_VlGA34mOlrg7ycHOskTYy6SFrvbUrNCXDegtgDG8T52VcY2gpJHnp7sTxL2mYgHLfxD4JM0bDUl83IHba1qV8dd5Eu6bQbNcgTTiq-_A6YZLyJeqkAKqt-MnjwJVm3vUCZOYonsBVHOymcUnFPzVHf70L9iprgT-enr7ybpbeNEyevfoTWDvidhQXlLmeMCr4',
  },
];

export const leaderboard = [
  { rank: 1, name: 'Carlos R.', points: 550 },
  { rank: 2, name: 'Laura M.', points: 420 },
  { rank: 3, name: 'Ana G.', points: 390 },
  { rank: 4, name: 'Diego P.', points: 310 },
  { rank: 5, name: 'Tú', points: 285, isCurrentUser: true },
  { rank: 6, name: 'Sofía L.', points: 250 },
  { rank: 7, name: 'Miguel A.', points: 215 },
];

export const bingoChallenges = [
  {
    id: 1,
    icon: 'photo_camera',
    label: 'Foto con los novios',
    description: 'Consigue una foto en la que aparezcas con los novios.',
    points: 10,
  },
];

export const pendingModerationPhotos = [
  {
    id: 1,
    user: 'Maria Gonzalez',
    time: '10m',
    challenge: 'Foto con los novios',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCS1Tz5FbOYBLYzkco29qkOhgw31WpC7I-6BOAPJfMRZI9YV0jRlbHuJaTocLm56JbsnYmFL182BUNFWgtkHHjL0zhuSrL0m5WUx7zAufT53ftFEdVv_n-7cJWi7WU4V4niBIHq2kIC_5Rm6lzMpWgueuXLeKJemjQoLk7gxpFVjvllK5EnAxy_mXJcWmR_lbdxUOQavRv8vpQS5QgN1HnRJnKaLNdd-kw1lW4aA5wSuuHNGCqxXL4d',
  },
  {
    id: 2,
    user: 'Carlos Ruiz',
    time: '25m',
    challenge: 'Alguien llorando de felicidad',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8bx6WTFWTVtzcKGtKZ5hZ4-mh_BnEsSypduwjDVd-4p7yzZl_L-WvolVrozuCnL8ol4UEZgrNDxn8IK56d38Iomf_N0_Dckv9I6y2PzrJYkx5GhSvJTBpKsSMzz7goUerT1wrw-rEGL-moEice_4tvvRcCLwL33u0G09BZCUmlu-tLcLcL_Dq03elSi35QF2h9YWIoscGIaCdFnzsyVERoX0CRHqATr8d3A8jzNnIvrz2oSZPuBDG',
  },
  {
    id: 3,
    user: 'Ana Silva',
    time: '1h',
    challenge: 'Detalle de la decoración',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1SzsYHCTjLhvAucNpfr7kVO9wv4LFWJSqRIHN0KUZUOlBZH2HTDTQ2ofYPk9qRS2jvSpUuZ5FeysVS0T2qY3GtAu02-RsvlsxMz8o9IdCj1TF0h5OupxWMldav0OysjLMcxAAoj3XPr_SHEYqEPIQnwotevXUGiaI1z6uyci4FQQnRcP6cZdAR4LB5LTHtWAJI0mlZJaXEBVQEPRX1-JGRz6ALfR_e3BFBmsOxHfLmi8ovN5rbPni',
  },
];

export const bingoConfigChallenges = [
  { id: 1, icon: 'photo_camera', label: 'Take a selfie with the bride', points: 50, completion: 85 },
  { id: 2, icon: 'music_note', label: 'Dance with a stranger', points: 75, completion: 62 },
  { id: 3, icon: 'palette', label: 'Find someone wearing the same color', points: 30, completion: 41 },
];

export const adminUsers = [
  { id: 1, name: 'Carlos D.', email: 'carlos.d@email.com', photos: 28},
  { id: 2, name: 'Laura G.', email: 'laura.g@email.com', photos: 2},
  { id: 3, name: 'Roberto M.', email: 'roberto.m@email.com', photos: 3},
];
