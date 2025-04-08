import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import './VideoSection.css';
import '../App.css'

const VideoSection = ({ handleVideoEnd, showArrow, handleMouseEnter, handleMouseLeave, scrollToNextSection }) => {
    const [letters, setLetters] = useState(['E', 'X', 'C', 'I', 'T']); 
    const [isVisible, setIsVisible] = useState(false);
    const [isTransformed, setIsTransformed] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isArrowVisible, setIsArrowVisible] = useState(false);
    const [isTransitionDone, setIsTransitionDone] = useState(false);
    const [hasElevatorAppeared, setHasElevatorAppeared] = useState(false);


    

    


    useEffect(() => {
        // Détecter la taille de l'écran
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 813); // Définir l'état si l'écran est petit
        };
        
        handleResize(); // Vérifier la taille de l'écran au montage
        window.addEventListener('resize', handleResize); // Ajouter l'écouteur d'événement

        return () => window.removeEventListener('resize', handleResize); // Nettoyer l'écouteur
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true); 

            setTimeout(() => {
                let index = 0;
                const steps = [
                    ['E', 'X', 'C', 'I', 'T'],  
                    ['E', 'X', 'C', 'I', 'T'],  
                    ['E', 'X', 'C', 'I', 'U', 'T'],
                    ['E', 'X', 'C', 'U', 'T', 'S'],
                    ['E', 'X', 'C', 'U', 'S', 'E'],
                ];

                const interval = setInterval(() => {
                    if (index < steps.length) {
                        setLetters(steps[index]);
                        index++;
                    } else {
                        clearInterval(interval);
                        setIsTransformed(true);
                    }
                }, 150); 
            }, 500); 
        }, 500);
    }, []);

    const scrollToElevator = () => {
        const elevatorSection = document.querySelector('.elevator');
        if (elevatorSection) {
            elevatorSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    

    return (
        <div className="video-section-container">
            <motion.div className="video-section">
                <video
                    src="./assets/intro.mp4"
                    // src="./assets/videooo.mp4"
                    autoPlay
                    muted
                    onEnded={handleVideoEnd}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                ></video>
            </motion.div>

            {/* Div avec Flexbox pour séparer texte et flèche */}
            <motion.div className="content-wrapper">
                <div className='empty-content'>
                    <h2>YOUR ULTIME</h2>
                    <div className='your-ultimate'>
                        <h1>EXCUSE GENERATOR</h1>
                        <img src='./assets/power.png' onClick={scrollToElevator} style={{ cursor: 'pointer' }} />
                    </div>
                </div>
                <div className="content">
                    {/* Section pour le texte */}
                    <motion.div className="text-section">
                        {isVisible && (
                            <motion.h1
                                className={`exit-text ${isTransformed ? 'distort' : ''}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }} 
                                transition={{ duration: isSmallScreen ? 0 : 0.8 }} 
                            >
                                {letters.map((letter, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }} 
                                        transition={{
                                            delay: index * 0.05,
                                            duration: 0.2,
                                            ease: "easeOut"
                                        }}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </motion.h1>
                        )}
                    </motion.div>

                    {/* Section pour la flèche */}
                    <motion.div 
                        className="arrow-section" 
          
                    >
                            <motion.div
                                className="scroll-arrow"
                                initial={{ x: '-100%', opacity: 0 }} 
                                animate={{ x: 0, opacity: 1 }} 
                                transition={{
                                    duration: isSmallScreen ? 0.8 : 1, 
                                    ease: "easeOut"
                                }}
                                onAnimationComplete={() => {
                                    console.log("✅ Animation terminée : la flèche est à sa place !");
                                    setIsTransitionDone(true);
                                }}
                            >
                                <button
                                    onClick={scrollToNextSection}
                                    className="kave-btn"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <span className="kave-line"></span>
                                    <img src="./assets/arrow.png" alt="Flèche" className="arrow-image" />
                                </button>
                                <p className='kave-p'></p>
                            </motion.div>

                    </motion.div>

                </div>
                <div className={`elevator ${hasElevatorAppeared ? 'show' : 'hide'}`}>
                    <img src='./assets/elevator5-wg.png' />
                </div>
            </motion.div>
        </div>
    );
};

export default VideoSection;
