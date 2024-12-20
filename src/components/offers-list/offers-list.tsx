import PlaceCard from '@components/place-card/place-card';
import { Offer } from 'app/types/offer';
import { OfferDetails } from 'app/types/offer-details';
import { useEffect, useState } from 'react';

type OffersListProps = {
  offers: Offer[] | OfferDetails[];
  onActiveOfferChange: (offerId: string | number | null) => void;
};

export default function OffersList({
  offers,
  onActiveOfferChange,
}: OffersListProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Offer | OfferDetails | null>(
    null
  );

  useEffect(() => {
    onActiveOfferChange(activeOffer ? activeOffer.id : null);
  }, [activeOffer, onActiveOfferChange]);

  const handleMouseEnter = (offer: Offer | OfferDetails) => {
    setActiveOffer(offer);
  };

  const handleMouseLeave = () => {
    setActiveOffer(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => handleMouseEnter(offer)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}
