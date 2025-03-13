import styles from './styles.module.css';
import { Link } from 'react-router-dom';

export default function FeedbackButton() {
    return (
        <div className={styles.feedbackButton}>
            <Link to="/reg/feedback">
                <button className={styles.button}>Também quero dar um feedback!</button>
            </Link>
        </div>
    );
}