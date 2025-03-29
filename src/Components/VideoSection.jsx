import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './VideoSection.css';

const VideoSection = ({ handleVideoEnd, showArrow, handleMouseEnter, handleMouseLeave, scrollToNextSection }) => {
    const [letters, setLetters] = useState(['E', 'X', 'C', 'I', 'T']); // 🔹 Départ à EXCIT
    const [isVisible, setIsVisible] = useState(false);
    const [isTransformed, setIsTransformed] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

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
            setIsVisible(true); // Apparition progressive de EXCIT

            setTimeout(() => {
                let index = 0;
                const steps = [
                    ['E', 'X', 'C', 'I', 'T'],  // 🔹 EXCIT (attente ici)
                    ['E', 'X', 'C', 'I', 'T'],  // 🔹 EXCIT (reste encore un peu)
                    ['E', 'X', 'C', 'I', 'U', 'T'],
                    ['E', 'X', 'C', 'U', 'T', 'S'],
                    ['E', 'X', 'C', 'U', 'S', 'E'], // 🔹 EXCUSE (final)
                ];

                const interval = setInterval(() => {
                    if (index < steps.length) {
                        setLetters(steps[index]);
                        index++;
                    } else {
                        clearInterval(interval);
                        setIsTransformed(true);
                    }
                }, 150); // 🔥 Transformation rapide après l'attente
            }, 500); // ⏳ EXCIT reste visible 500ms avant transformation
        }, 500);
    }, []);

    return (
        <div className="part-one">
            <motion.div className="video-section">
                <video
                    src="./assets/videoo.mp4"
                    autoPlay
                    muted
                    onEnded={handleVideoEnd}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                ></video>
            </motion.div>

            <motion.div className="content-wrapper">
                {isVisible && (
                    <motion.h1
                        className={`exit-text ${isTransformed ? 'distort' : ''}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }} // Pas d'animation pour les petits écrans
                        transition={{ duration: isSmallScreen ? 0 : 0.8 }} // Pas de transition si petit écran
                    >
                        {letters.map((letter, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }} // Pas d'animation pour les petits écrans
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

                {showArrow && isTransformed && (
                    <motion.div
                        className="scroll-arrow"
                        initial={{ x: '-100%', opacity: 0 }} // Départ de la flèche à gauche (hors de l'écran)
                        animate={{ x: 0, opacity: 1 }} // Arrive à sa position normale (0)
                        transition={{
                            duration: isSmallScreen ? 0.8 : 1, // Durée plus rapide sur petits écrans
                            ease: "easeOut"
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
                    </motion.div>
                )}

            </motion.div>
        </div>
    );
};

export default VideoSection;






// import { motion } from 'framer-motion';
// import { useState, useEffect } from 'react';
// import './VideoSection.css';

// const VideoSection = ({ handleVideoEnd, showArrow, handleMouseEnter, handleMouseLeave, scrollToNextSection }) => {
//     const [letters, setLetters] = useState(['E', 'X', 'C', 'I', 'T']); // 🔹 Départ à EXCIT
//     const [isVisible, setIsVisible] = useState(false);
//     const [isTransformed, setIsTransformed] = useState(false);

//     useEffect(() => {
//         setTimeout(() => {
//             setIsVisible(true); // Apparition progressive de EXCIT

//             setTimeout(() => {
//                 let index = 0;
//                 const steps = [
//                     ['E', 'X', 'C', 'I', 'T'],  // 🔹 EXCIT (attente ici)
//                     ['E', 'X', 'C', 'I', 'T'],  // 🔹 EXCIT (reste encore un peu)
//                     ['E', 'X', 'C', 'I', 'U', 'T'],
//                     ['E', 'X', 'C', 'U', 'T', 'S'],
//                     ['E', 'X', 'C', 'U', 'S', 'E'], // 🔹 EXCUSE (final)
//                 ];

//                 const interval = setInterval(() => {
//                     if (index < steps.length) {
//                         setLetters(steps[index]);
//                         index++;
//                     } else {
//                         clearInterval(interval);
//                         setIsTransformed(true);
//                     }
//                 }, 150); // 🔥 Transformation rapide après l'attente
//             }, 500); // ⏳ EXCIT reste visible 500ms avant transformation
//         }, 500);
//     }, []);

//     return (
//         <div className="part-one">
//             <motion.div className="video-section">
//                 <video
//                     src="./assets/videoo.mp4"
//                     autoPlay
//                     muted
//                     onEnded={handleVideoEnd}
//                     style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                 ></video>
//             </motion.div>

//             <motion.div className="content-wrapper">
//                 {isVisible && (
//                     <motion.h1
//                         className={`exit-text ${isTransformed ? 'distort' : ''}`}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 0.8 }} // 🔹 Apparition fluide sans mouvement horizontal
//                     >
//                         {letters.map((letter, index) => (
//                             <motion.span
//                                 key={index}
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{
//                                     delay: index * 0.05, // 🔥 Apparition rapide des lettres
//                                     duration: 0.2,
//                                     ease: "easeOut"
//                                 }}
//                             >
//                                 {letter}
//                             </motion.span>
//                         ))}
//                     </motion.h1>
//                 )}

//                 {showArrow && isTransformed && (
//                     <motion.div
//                         className="scroll-arrow"
//                         initial={{ x: -100, opacity: 0 }}
//                         animate={{ x: 0, opacity: 1 }}
//                         transition={{ duration: 1, ease: "easeOut" }}
//                     >
//                         <button
//                             onClick={scrollToNextSection}
//                             className="kave-btn"
//                             onMouseEnter={handleMouseEnter}
//                             onMouseLeave={handleMouseLeave}
//                         >
//                             <span className="kave-line"></span>
//                             <img src="./assets/arrow.png" alt="Flèche" className="arrow-image" />
//                         </button>
//                     </motion.div>
//                 )}
//             </motion.div>
//         </div>
//     );
// };

// export default VideoSection;








// import { motion } from 'framer-motion';
// import { useState, useEffect } from 'react';
// import './VideoSection.css';

// const VideoSection = ({ handleVideoEnd, showArrow, handleMouseEnter, handleMouseLeave, scrollToNextSection }) => {
//     const [letters, setLetters] = useState(['E', 'X', 'I', 'T']);
//     const [isVisible, setIsVisible] = useState(false);
//     const [isTransformed, setIsTransformed] = useState(false);

//     useEffect(() => {
//         setTimeout(() => {
//             setIsVisible(true);

//             setTimeout(() => {
//                 let index = 0;
//                 const steps = [
//                     ['E', 'X', 'C', 'I', 'T'],
//                     ['E', 'X', 'C', 'I', 'U', 'T'],
//                     ['E', 'X', 'C', 'U', 'T', 'S'],
//                     ['E', 'X', 'C', 'U', 'S', 'E'],
//                 ];

//                 const interval = setInterval(() => {
//                     if (index < steps.length) {
//                         setLetters(steps[index]);
//                         index++;
//                     } else {
//                         clearInterval(interval);
//                         setIsTransformed(true);
//                     }
//                 }, 100); // 🔥 Intervalle réduit pour transformation rapide
//             }, 300);
//         }, 500);
//     }, []);

//     return (
//         <div className="part-one">
//             <motion.div className="video-section">
//                 <video
//                     src="./assets/videoo.mp4"
//                     autoPlay
//                     muted
//                     onEnded={handleVideoEnd}
//                     style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                 ></video>
//             </motion.div>

//             <motion.div className="content-wrapper">
//                 {isVisible && (
//                     <motion.h1
//                         className={`exit-text ${isTransformed ? 'distort' : ''}`}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 1 }}
//                     >
//                         {letters.map((letter, index) => (
//                             <motion.span
//                                 key={index}
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{
//                                     delay: index * 0.05, // 🔥 Apparition plus rapide
//                                     duration: 0.2,
//                                     ease: "easeOut"
//                                 }}
//                             >
//                                 {letter}
//                             </motion.span>
//                         ))}
//                     </motion.h1>
//                 )}

//                 {showArrow && isTransformed && (
//                     <motion.div
//                         className="scroll-arrow"
//                         initial={{ x: -200, opacity: 0 }}
//                         animate={{ x: 0, opacity: 1 }}
//                         transition={{ duration: 1, ease: "easeOut" }}
//                     >
//                         <button
//                             onClick={scrollToNextSection}
//                             className="kave-btn"
//                             onMouseEnter={handleMouseEnter}
//                             onMouseLeave={handleMouseLeave}
//                         >
//                             <span className="kave-line"></span>
//                             <img src="./assets/arrow.png" alt="Flèche" className="arrow-image" />
//                         </button>
//                     </motion.div>
//                 )}
//             </motion.div>
//         </div>
//     );
// };

// export default VideoSection;


