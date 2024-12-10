export const Setting = {
  PlacesCount: 312,
};

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export enum CardType {
  Regular = 'cities__card',
  Nearest = 'near-places__card',
  Favorites = 'favorites__card',
}

export const CardImageWrapperClass = {
  [CardType.Regular]: 'cities__image-wrapper',
  [CardType.Nearest]: 'near-places__image-wrapper',
  [CardType.Favorites]: 'favorites__image-wrapper',
};

export const MapClassName = {
  Offer: 'offer__map map',
  Main: 'cities__map map',
};

export const Cities = [
  {
    name: 'Paris',
    id: 1,
  },
  {
    name: 'Cologne',
    id: 2,
  },
  {
    name: 'Brussels',
    id: 3,
  },
  {
    name: 'Amsterdam',
    id: 4,
  },
  {
    name: 'Hamburg',
    id: 5,
  },
  {
    name: 'Dusseldorf',
    id: 6,
  },
];
