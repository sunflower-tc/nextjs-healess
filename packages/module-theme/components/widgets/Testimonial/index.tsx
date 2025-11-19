// import { Trans } from '@lingui/macro';
// import TestimonialData from '@utils/TestimonialData';
// import dynamic from 'next/dynamic';
// import Containers from '../../ui/Container';
// import { TestimonialPlaceHolder } from '../placeholders';
// const TestimonialItem = dynamic(() => import('./TestimonialData'));
// const Info = dynamic(() => import('../../elements/Info'));

// const Testimonial = ({ loading }: any) => {
//   const responsive = {
//     superLargeDesktop: {
//       breakpoint: { max: 4000, min: 3000 },
//       items: 3,
//     },
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 2,
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 0 },
//       items: 1,
//     },
//   };
//   return (
//     <div className="pb-[1.2rem] bg-testimonialBg">
//       <Containers>
//         {loading ? (
//           <TestimonialPlaceHolder />
//         ) : (
//           <>
//             <Info
//               heading="Testimonials"
//               sx={{ paddingBottom: 0.75, paddingTop: 1.3 }}
//             >
//               <Trans>
//                 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
//                 aliquam et blanditiis deserunt eius illo.
//               </Trans>
//             </Info>
//             <Carousel
//               swipeable={true}
//               draggable={true}
//               showDots={true}
//               responsive={responsive}
//               ssr={true} // means to render carousel on server-side.
//               infinite={true}
//               autoPlaySpeed={1000}
//               keyBoardControl={true}
//               customTransition="all 0.75s ease-in"
//               transitionDuration={100}
//               containerClass="carousel-container"
//               removeArrowOnDeviceType={[
//                 'tablet',
//                 'mobile',
//                 'desktop',
//                 'superLargeDesktop',
//               ]}
//               rewindWithAnimation={true}
//               renderButtonGroupOutside={true}
//               dotListClass="custom-dot-list-style"
//               itemClass="carousel-item-padding-40-px"
//             >
//               {TestimonialData.map((data, index) => (
//                 <TestimonialItem
//                   key={index}
//                   thumbnail={data.thumbnail}
//                   name={data.name}
//                   rating={data.rating}
//                   location={data.location}
//                   content={data.content}
//                 />
//               ))}
//             </Carousel>
//           </>
//         )}
//       </Containers>
//     </div>
//   );
// };
// export default Testimonial;

export default function index() {
  return <div>index</div>;
}
