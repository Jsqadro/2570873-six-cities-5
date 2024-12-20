import { createReducer, createSelector } from '@reduxjs/toolkit';
import { Offers } from '../../src/app/types/offer';
import { OfferDetails } from '../../src/app/types/offer-details';
import { Reviews } from '../../src/app/types/review';
import { AuthorizationStatus, SortOptions } from '../const';
import { changeCity, requireAuthorization, sendReview, setOfferDetails, setOfferInDetailsDataLoadingStatus, setOffersList, setSortOption, setUserEmail, updateOfferFavoriteStatus } from './action';

type StateType = {
  city: string;
  offersList: Offers;
  selectedOffer: {
    offerInfo: OfferDetails | null;
    nearbyOffers: Offers;
    reviews: Reviews;
  };
  sortOption: SortOptions;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersDataLoading: boolean;
  userEmail: string | null;
  isOfferInDetailsDataLoading: boolean;
  favoritesCount: number;
};

const initialState: StateType = {
  city: 'Paris',
  offersList: [],
  selectedOffer: {
    offerInfo: null,
    nearbyOffers: [],
    reviews: [],
  },
  sortOption: SortOptions.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
  userEmail: null,
  isOfferInDetailsDataLoading: false,
  favoritesCount: 0,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setOffersList, (state, action) => {
      state.offersList = action.payload;
    })
    .addCase(sendReview, (state, {payload}) => {
      state.selectedOffer.reviews.push(payload);
    })
    .addCase(setOfferDetails, (state, {payload}) => {
      state.selectedOffer = {
        offerInfo: payload.offerInfo,
        nearbyOffers: payload.nearestOffers,
        reviews: payload.reviews
      };
    })
    .addCase(setSortOption, (state, { payload }) => {
      state.sortOption = payload;
    })
    .addCase(setUserEmail, (state, { payload }) => {
      state.userEmail = payload;
    })
    .addCase(setOfferInDetailsDataLoadingStatus, (state, action) => {
      state.isOfferInDetailsDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, { payload }) => {
      state.authorizationStatus = payload;
    })
    .addCase(updateOfferFavoriteStatus, (state, { payload }) => {
      const { id, isFavorite } = payload;

      const updateFavoriteStatus = (offers: Offers) => {
        const offerIndex = offers.findIndex((offer) => offer.id === id);
        if (offerIndex !== -1) {
          offers[offerIndex].isFavorite = isFavorite;
        }
      };

      updateFavoriteStatus(state.offersList);
      updateFavoriteStatus(state.selectedOffer.nearbyOffers);

      state.favoritesCount = state.offersList.filter((offer) => offer.isFavorite).length;
    });
});


export const selectFilteredAndSortedOffers = createSelector(
  [
    (state: StateType) => state.offersList,
    (state: StateType) => state.city,
    (state: StateType) => state.sortOption,
  ],
  (offersList, city, sortOption) => {
    const filteredOffers = offersList.filter((offer) => offer.city.name === city);
    switch (sortOption) {
      case SortOptions.PriceLowToHigh:
        return [...filteredOffers].sort((a, b) => a.price - b.price);
      case SortOptions.PriceHighToLow:
        return [...filteredOffers].sort((a, b) => b.price - a.price);
      case SortOptions.TopRated:
        return [...filteredOffers].sort((a, b) => b.rating - a.rating);
      default:
        return filteredOffers;
    }
  }
);
