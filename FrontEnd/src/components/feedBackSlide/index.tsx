// FeedbackSlider.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import '/node_modules/swiper/swiper-bundle.min.css';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import FeedbackCard from '../feedbackCard';
import styles from './styles.module.css';

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
                const filteredFeedbacks = (response.data as Feedback[])
                    .filter(feedback => feedback.rating >= 4);
                setFeedbacks(filteredFeedbacks);
            })
            .catch(error => {
                console.error('Error fetching feedbacks:', error);
            });
    }, []);

    return (
<Swiper
    modules={[Navigation, Autoplay, Pagination]}
    spaceBetween={20}
    slidesPerView={2}
    loop={true}
    pagination={{ clickable: true }}
    navigation
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    className={styles.feedbackContainer}
>
    {feedbacks.map(feedback => (
        <SwiperSlide key={feedback.id}>
            <FeedbackCard feedback={feedback} />
        </SwiperSlide>
    ))}
</Swiper>


    );
}
