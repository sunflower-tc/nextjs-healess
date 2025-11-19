const ProductItemData: TestimonialData[] = [
  {
    thumbnail: '/assets/img/user.png',
    name: 'Arthur Ward',
    location: 'Australia',
    rating: 4,
    content:
      'Appropriately expedite goal-oriented meta-services via B2C growth strategies. Interactively architect cross-media solutions without compelling.',
  },
  {
    thumbnail: '/assets/img/user.png',
    name: 'Arthur Ward',
    location: 'Australia',
    rating: 5,
    content:
      'Appropriately expedite goal-oriented meta-services via B2C growth strategies. Interactively architect cross-media solutions without compelling.',
  },
];

interface TestimonialData {
  thumbnail: string;
  name: string;
  location: string;
  rating: number;
  content: string;
}
export default ProductItemData;
