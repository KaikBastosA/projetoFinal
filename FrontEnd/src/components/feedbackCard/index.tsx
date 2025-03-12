// FeedbackCard.tsx
import styles from './styles.module.css';
import star from '../../assets/full-star.svg';

interface Feedback {
    id: string;
    name: string;
    description: string;
    rating: number;
}

export default function FeedbackCard({ feedback }: { feedback: Feedback }) {
    return (
        <div className={styles.feedbackCard}>
            <h3>{feedback.name}</h3>
            <div className={styles.stars}>
                {Array.from({ length: Math.floor(feedback.rating) }).map((_, index) => (
                    <img key={index} src={star} alt="star" />
                ))}
                {feedback.rating % 1 ? <img src={star} alt="half-star" /> : null}
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime illo natus numquam corporis sapiente quae rerum eum vel nostrum reprehenderit quam necessitatibus qui facere labore, enim nam possimus pariatur libero.</p>
        </div>
    );
}
