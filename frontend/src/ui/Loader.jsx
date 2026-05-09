import React from 'react'
import './loader.scss'

const Loader = ({ type = 'spinner', text = 'Loading...', fullScreen = false, active = true }) => {
    if (!active) return null

    if (fullScreen) {
        return (
            <div className='loader-fullscreen'>
                <LoaderContent type={type} text={text} />
            </div>
        )
    }

    return <LoaderContent type={type} text={text} />
}

const LoaderContent = ({ type, text }) => {
    switch (type) {
        case 'spinner':
            return (
                <div className='loader loader--spinner'>
                    <div className='spinner'></div>
                    {text && <p className='loader-text'>{text}</p>}
                </div>
            )

        case 'dots':
            return (
                <div className='loader loader--dots'>
                    <div className='dot'></div>
                    <div className='dot'></div>
                    <div className='dot'></div>
                    {text && <p className='loader-text'>{text}</p>}
                </div>
            )

        case 'pulse':
            return (
                <div className='loader loader--pulse'>
                    <div className='pulse-ring'></div>
                    {text && <p className='loader-text'>{text}</p>}
                </div>
            )

        case 'wave':
            return (
                <div className='loader loader--wave'>
                    <div className='wave-bar'></div>
                    <div className='wave-bar'></div>
                    <div className='wave-bar'></div>
                    <div className='wave-bar'></div>
                    <div className='wave-bar'></div>
                    {text && <p className='loader-text'>{text}</p>}
                </div>
            )

        case 'skeleton':
            return (
                <div className='loader loader--skeleton'>
                    <div className='skeleton-header'></div>
                    <div className='skeleton-line'></div>
                    <div className='skeleton-line'></div>
                    <div className='skeleton-line short'></div>
                </div>
            )

        default:
            return (
                <div className='loader loader--spinner'>
                    <div className='spinner'></div>
                    {text && <p className='loader-text'>{text}</p>}
                </div>
            )
    }
}

// Page Loader Component
export const PageLoader = () => {
    return (
        <div className='page-loader'>
            <div className='page-loader__content'>
                <div className='logo-loader'>
                    <span className='logo-letter'>H</span>
                    <span className='logo-letter'>M</span>
                </div>
                <div className='progress-bar'>
                    <div className='progress-fill'></div>
                </div>
                <p>Loading your dashboard...</p>
            </div>
        </div>
    )
}

// Button Loader
export const ButtonLoader = () => {
    return (
        <div className='button-loader'>
            <div className='button-spinner'></div>
        </div>
    )
}

// Card Skeleton Loader
export const CardSkeleton = ({ count = 3 }) => {
    return (
        <div className='card-skeleton-container'>
            {[...Array(count)].map((_, i) => (
                <div key={i} className='card-skeleton'>
                    <div className='skeleton-avatar'></div>
                    <div className='skeleton-content'>
                        <div className='skeleton-title'></div>
                        <div className='skeleton-text'></div>
                        <div className='skeleton-text short'></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Loader