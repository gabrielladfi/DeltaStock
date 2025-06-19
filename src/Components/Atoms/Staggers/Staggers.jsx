/* eslint-disable react/prop-types */
import { gsap } from 'gsap';
import { useEffect } from 'react';
import './staggers.scss'

export const Staggers = ({ functionOnClick }) => {


    useEffect(() => {
        gsap.to('.box-gone', {
            opacity: 0,
            duration: 1.5,
            stagger: {
                each: 0.1,
                from: 'center',
            },
            ease: 'bounce.out',
            y: "50px",
            onComplete: functionOnClick
        })
    }, [])

    return (
        <div className="container-box-gone">
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone"></div>
            <div className="box-gone box-big"></div>
        </div>
    )
}
