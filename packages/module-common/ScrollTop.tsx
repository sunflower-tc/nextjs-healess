import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { FC, useEffect, useState } from 'react';

const BackToTop: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  let timer: string | number | NodeJS.Timeout | undefined;

  const handleScroll = (): void => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }, 300);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <span
        onClick={scrollToTop}
        className={` lg:inline md:inline hidden z-10 cursor-pointer px-1.5 pt-0.5 icon-arrow-right-circle fixed bottom-0 bg-[rgba(8,8,8,0.57)] hover:bg-[rgba(8,8,8,0.63)]  text-3xl text-red-500 right-6`}
      >
        <ExpandLessIcon className="text-white font-semibold" />{' '}
      </span>
    )
  );
};

export default BackToTop;
