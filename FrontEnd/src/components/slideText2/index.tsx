import styles from './styles.module.css'

interface SlideTextProps {
    className?: string;
}

export default function SlideText({ className }: SlideTextProps) {
    return (
        <>
            <div className={`${styles.saleContent} ${className}`}>
                <h3>Promoção</h3>
                <h1>Valentine's</h1>
                <p>Para presentear o seu amor com os melhores sonhos no Valentine's day</p>
            </div>
        </>
    )
}