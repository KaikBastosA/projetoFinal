import styles from './styles.module.css'

interface SlideTextProps {
    className?: string;
}

export default function SlideText({ className }: SlideTextProps) {
    return (
        <>
            <div className={`${styles.saleContent} ${className}`}>
                <h3>Promoção</h3>
                <h1>Natalina</h1>
                <p>Edição especial para toda a família aproveitar as noites de natal</p>
            </div>
        </>
    )
}