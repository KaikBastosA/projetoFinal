import { useParams } from "react-router-dom"

export default function Pijamas() {
    
    var type = useParams().type
    
    return (
        <div>
            <h1>PIJAMAS {type}</h1>
        </div>
    )
}