import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';

export default function App() {
    const [category, setCategory] = useState(null);
    const [reason, setReason] = useState(null);
    const [excuse, setExcuse] = useState(null);
    const [videoEnded, setVideoEnded] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const [showArrow, setShowArrow] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [step, setStep] = useState(0); // Étape 0 = cachée, 1 = choix relation, 2 = catégorie, 3 = excuse
    const [showMainSection, setShowMainSection] = useState(true); // Nouvelle variable d'état pour contrôler la visibilité de la section principale

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
        setStep(2); // Passer directement à l'étape 2 (choix de catégorie)
    };

    const handleReasonSelect = (selectedReason) => {
        setReason(selectedReason);
        setStep(3); // Passer à l'étape 3 (excuse)
        setExcuse("Voici votre excuse parfaite !");
    };

    const handleVideoEnd = () => {
        console.log("La vidéo est terminée.");
        setVideoEnded(true);
        setShowNav(true);
        setTimeout(() => {
            setShowArrow(true);
        }, 1000);
    };

    const handleScroll = () => {
        setScrollPosition(window.scrollY);
        console.log("Position du scroll :", window.scrollY);
        const nextSection = document.getElementById('next-section');
        if (nextSection) {
            const sectionTop = nextSection.getBoundingClientRect().top;
            console.log("Position de la section principale :", sectionTop);
            if (sectionTop < window.innerHeight / 2) {
                setStep(1);
            } else if (window.scrollY < 100) { 
                setStep(0); // Mettre à zéro correctement
            }            
        }
    };

    const handleCloseMainSection = () => {
        setShowMainSection(false); // Masquer la section principale
    };

    const handleReopenMainSection = () => {
        setShowMainSection(true); // Réouvrir la section principale
        setStep(1); // Remettre l'étape à 1 pour permettre la sélection de la relation
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToNextSection = () => {
        console.log("La flèche a été cliquée.");
        const nextSection = document.getElementById('next-section');
        if (nextSection) {
            window.scrollTo({
                top: nextSection.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="app">
            <motion.div
                className="video-section"
                initial={{ opacity: 1 }}
                animate={{ opacity: scrollPosition < 100 ? 1 : 0 }}
                transition={{ duration: 1 }}
            >
                <video
                    src="/assets/video-main.mp4"
                    autoPlay
                    muted
                    onEnded={handleVideoEnd}
                    style={{ width: '100%' }}
                ></video>
            </motion.div>

            {showNav && (
                <motion.div
                    className="navbar"
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2>Menu</h2>
                </motion.div>
            )}

            {showArrow && (
                <motion.div
                    className="scroll-arrow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <button onClick={scrollToNextSection}>&#8595;</button>
                </motion.div>
            )}

            {/* Section Principale */}
            {videoEnded && showMainSection && ( // Vérifier si showMainSection est true avant d'afficher la section
                <div id="next-section" className={`main-section ${step > 0 ? 'visible' : 'hidden'}`}>
                    {console.log("La section principale est affichée avec step =", step)}
                    <button onClick={handleCloseMainSection} className="close-button">X</button> {/* Bouton de fermeture */}

                    {step === 1 && (
                        <>
                            <h1>Sélectionnez la nature de la relation</h1>
                            {["Boss", "Amis", "Famille"].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => handleCategorySelect(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h1>Choisissez une catégorie d'excuse</h1>
                            {["Simple", "Drôle", "Hardcore"].map((reason) => (
                                <button
                                    key={reason}
                                    onClick={() => handleReasonSelect(reason)}
                                >
                                    {reason}
                                </button>
                            ))}
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <h1>Excuse générée :</h1>
                            <p>{excuse}</p>
                            <button onClick={() => setStep(1)}>Recommencer</button>
                        </>
                    )}
                </div>
            )}

            {/* Ajouter une flèche pour rouvrir la section */}
            {!showMainSection && (
                <div className="reopen-button">
                    <button onClick={handleReopenMainSection}>Réouvrir la section principale</button>
                </div>
            )}
        </div>
    );
}
