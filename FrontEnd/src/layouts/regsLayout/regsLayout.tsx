import { Outlet } from "react-router-dom";
import s from './regsLayout.module.css'

export default function Layout(){
    return(
        <>
            <div className={s.backGround}>
                <Outlet></Outlet>
            </div>
        </>
    )
}