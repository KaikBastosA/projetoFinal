// FeedbackSlider.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import '/node_modules/swiper/swiper-bundle.min.css';
import { Navigation, Autoplay } from 'swiper/modules';
import styles from './styles.module.css';
import star from '../../assets/full-star.svg';
import halfStar from '../../assets/half-star.svg';
import emptyStar from '../../assets/Empty-Star.svg';

interface Feedback {
    id: string;
    name: string;
    description: string;
    rating: number;
}

export default function FeedbackSlider() {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3333/all-feedbacks')
            .then(response => {
                const filteredFeedbacks = (response.data as Feedback[]).filter(feedback => feedback.rating >= 4);
                setFeedbacks(filteredFeedbacks);
            })
            .catch(error => {
                console.error('Error fetching feedbacks:', error);
            });
    }, []);

    return (
        <Swiper
            modules={[Navigation, Autoplay]}
            loop={true}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className={styles.feedbackContainer}
            breakpoints={{
                1024: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 2,
                },
                480: {
                    slidesPerView: 1,
                },
            }}
        >
            {feedbacks.map(feedback => (
                <SwiperSlide key={feedback.id}>
                    <FeedbackCard feedback={feedback} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

interface FeedbackCardProps {
    feedback: Feedback;
}

function FeedbackCard({ feedback }: FeedbackCardProps) {
    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        return (
            <>
                {Array.from({ length: fullStars }).map((_, index) => (
                    <img key={index} src={star} alt="star" />
                ))}
                {hasHalfStar && <img src={halfStar} alt="half-star" />}
                {fullStars < 5 && !hasHalfStar && <img src={emptyStar} alt="empty-star" />}
            </>
        );
    };

    return (
        <div className={styles.feedbackCardContainer}>
        <div className={styles.feedbackCard}>
            <h3>{feedback.name}</h3>
            <div className={styles.stars}>
                {renderStars(feedback.rating)}
            </div>
            <p>{feedback.description}</p>
        </div>
        </div>
    );
}
