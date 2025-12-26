import { useTranslation } from 'react-i18next';

export function useMPFeaturesData() {
  const { t } = useTranslation('common');

  const MPFeaturesData: IFeatureData[] = [
    {
      icon: '/assets/img/dummy/marketplaceStaticIcons/hugeBuyer.png',
      label: t('Huge Buyers'),
      content: t(
        'Get your product showcased to a huge range of customers, as everyday many user shops from us.'
      ),
    },
    {
      icon: '/assets/img/dummy/marketplaceStaticIcons/askQuestion.png',
      label: t('Got Stuck? Ask Questions'),
      content: t(
        'If you ever get stuck, let us know and we will help you with the best we have in minimum possible time.'
      ),
    },
    {
      icon: '/assets/img/dummy/marketplaceStaticIcons/quickPayments.png',
      label: t('Quick Payments'),
      content: t(
        'Once goods have been successfully delivered to respective customers, you can request for payout.'
      ),
    },
    {
      icon: '/assets/img/dummy/marketplaceStaticIcons/orders.png',
      label: t('Manage your Orders'),
      content: t(
        'Manage your orders at maximum ease and help customers to have a better shopping experience.'
      ),
    },
    {
      icon: '/assets/img/dummy/marketplaceStaticIcons/earnBadges.png',
      label: t('Earn Badges'),
      content: t(
        'Once you climb a milestone you get awarded with a badge, which make you look like more pro.'
      ),
    },
    {
      icon: '/assets/img/dummy/marketplaceStaticIcons/verified.png',
      label: t('Get Yourself Verified'),
      content: t(
        'Add a verified brooch to your profile by providing very necessary some business details and documents.'
      ),
    },
    {
      icon: '/assets/img/dummy/marketplaceStaticIcons/customizeProfile.png',
      label: t('Customize Profile'),
      content: t(
        'Customize your profile with information like profile logo, shop location, shipping and refund policies.'
      ),
    },
    {
      icon: '/assets/img/dummy/marketplaceStaticIcons/collection.png',
      label: t('Create your Own Collection'),
      content: t(
        'Add various products and create your own product collection that will be visible to customers.'
      ),
    },
    {
      icon: '/assets/img/dummy/marketplaceStaticIcons/addMedia.png',
      label: t('Add Media'),
      content: t(
        'Embed video YouTube to make your account more genuine and stand out in the queue.'
      ),
    },
    {
      icon: '/assets/img/dummy/marketplaceStaticIcons/addProducts.png',
      label: t('Add Unlimited Products'),
      content: t(
        'Add unlimited products which you want and fulfill your customers need.'
      ),
    },
  ];

  return { MPFeaturesData };
}

export interface IFeatureData {
  icon: string;
  label: string;
  content: string;
}

export default useMPFeaturesData;
