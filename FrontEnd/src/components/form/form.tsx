
import React from 'react'
import s from './form.module.css'


export default function Form(props: {children: React.ReactNode}) {
    
    
    return (
        <div className={s.main_div}>
            <div className={s.sub_div}>
                {props.children}
            </div>
        
        </div>
    )
}