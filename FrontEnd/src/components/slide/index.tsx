import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './styles.module.css';
import '/node_modules/swiper/swiper-bundle.min.css';
import slideImg1 from '../../assets/slide-photo1.png';
import slideImg2 from '../../assets/slide-photo2.png';
import { Navigation, Autoplay } from 'swiper/modules';
import leftArrow from '../../assets/back-arrow.svg';
import rightArrow from '../../assets/foward-arrow.svg';

export default function Slide() {
    return (
        <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        loop={true}
        navigation={{
          nextEl: `.${styles.swiperButtonNext}`,
          prevEl: `.${styles.swiperButtonPrev}`,
        }}
      >
        <SwiperSlide className={`swiper-slide ${styles.swiperSlide}`}>
          <img src={slideImg1} alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide className={`swiper-slide ${styles.swiperSlide}`}>
          <img src={slideImg2} alt="Slide 2" />
        </SwiperSlide>
        <div className={styles.swiperButtonPrev}><img src={leftArrow} alt="" /></div>
        <div className={styles.swiperButtonNext}><img src={rightArrow} alt="" /></div>
      </Swiper>
      
  );
};