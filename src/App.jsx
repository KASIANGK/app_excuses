import { useState, useEffect } from 'react';
import VideoSection from './Components/VideoSection';
import { motion } from 'framer-motion';
import './App.css';
import categoryData from './data/excusesData.json';

export default function App() {
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [excuse, setExcuse] = useState(null);
    const [videoEnded, setVideoEnded] = useState(false);
    const [showArrow, setShowArrow] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [step, setStep] = useState(0); 
    const [showMainSection, setShowMainSection] = useState(true); 
    const [category, setCategory] = useState(null);
    const [level, setLevel] = useState(null);
    const [victim, setVictim] = useState(null); 
    const [context, setContext] = useState(null);
    const [isNextSectionVisible, setIsNextSectionVisible] = useState(false);
    const [arrowClicked, setArrowClicked] = useState(false); 
    const [videoSecondEnded, setVideoSecondEnded] = useState(false); 
    
    // Etat d'affichage video secondaire
    const handleSecondVideoEnd = () => {
        setVideoSecondEnded(true); 
    };

    // Fonction pour générer une excuse
    const generateExcuse = () => {
        console.log("Victime:", victim);
        console.log("Catégorie:", category);
        console.log("Niveau:", level);
    
        if (victim && category && level) {
            const victimData = categoryData[victim];
            console.log("Données victime:", victimData);
    
            if (victimData) {
                const categoryDataForVictim = victimData.category[category];
                console.log("Données catégorie pour victime:", categoryDataForVictim);
    
                if (categoryDataForVictim) {
                    const levelData = categoryDataForVictim[level];
                    console.log("Données niveau pour catégorie:", levelData);
    
                    if (levelData && levelData.length > 0) {
                        const randomIndex = Math.floor(Math.random() * levelData.length);
                        console.log("Excuse choisie:", levelData[randomIndex]);
                        setExcuse(levelData[randomIndex]); // Afficher l'excuse choisie
    
                        // Mettre à jour le step pour passer à l'étape 4
                        setStep(4); // Passer à l'étape 4 pour afficher l'excuse
                    } else {
                        setExcuse("Aucune excuse disponible pour ce niveau.");
                        console.log("Pas d'excuse disponible pour ce niveau.");
                    }
                } else {
                    setExcuse("Aucune excuse disponible pour cette catégorie.");
                    console.log("Pas de données pour cette catégorie.");
                }
            } else {
                setExcuse("Aucune excuse disponible pour cette victime.");
                console.log("Pas de données pour cette victime.");
            }
        } else {
            setExcuse("Veuillez remplir tous les critères pour générer une excuse.");
            console.log("Critères manquants : Victime, Catégorie ou Niveau");
        }
    };
    
    // Fonction pour générer une autre excuse
    const generateAnotherExcuse = () => {
        // Vérification des critères avant de générer l'excuse
        if (victim && category && level) {
            const victimData = categoryData[victim];
            if (victimData) {
                const categoryDataForVictim = victimData.category[category];
                if (categoryDataForVictim) {
                    const levelData = categoryDataForVictim[level];
                    if (levelData && levelData.length > 0) {
                        const randomIndex = Math.floor(Math.random() * levelData.length);
                        const newExcuse = levelData[randomIndex]; // Nouvelle excuse générée
                        setExcuse(newExcuse); // Mise à jour de l'excuse
                        console.log("Nouvelle excuse générée:", newExcuse); // Debugging
                    } else {
                        setExcuse("Aucune excuse disponible pour ce niveau.");
                    }
                }
            }
        } else {
            setExcuse("Veuillez remplir tous les critères pour générer une excuse.");
        }
    };
    
    // Survol sur btn arrow actif pendant 1.2sec 
    const handleMouseEnter = () => {
        setIsHovered(true);
        setTimeout(() => {
            setIsHovered(false);
        }, 1200); 
    };

    const handleMouseLeave = () => {
        setIsHovered(false); 
    };

    // Fonction pour gérer le choix du contexte après la sélection d'une relation
    const handleContextSelect = (selectedContext) => {
        setContext(selectedContext); 
        setStep(2); 
    };

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory); 
        setStep(3); 
    };

    const handleLevelSelect = (selectedLevel) => {
        console.log("level selected:", selectedLevel); 
        setLevel(selectedLevel); 
    };

    useEffect(() => {
        if (victim && category && level) {
            console.log("excuse generee : ", victim, category, level);
            generateExcuse();
        }
    }, [victim, category, level]);
    
    

    const handleVictimSelect = (selectedVictim) => {
        setVictim(selectedVictim); 
        setStep(2); 
    };

    const getVictimImage = (victim) => {
        if (victim) {
            const victimData = categoryData[victim];
            return victimData ? victimData.image : null; 
        }
        return null;
    };

    const handleVideoEnd = () => {
        setVideoEnded(true);
        setTimeout(() => {
            setShowArrow(true);
        }, 1000);
    };

    const handleCloseMainSection = () => {
        setShowMainSection(false); 
        setIsNextSectionVisible(false);
        setStep(0); 
        // Faire défiler la page vers la section vidéo (part-one)
        const videoSection = document.querySelector('.part-one');
        if (videoSection) {
            videoSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleReopenMainSection = () => {
        setShowMainSection(true); 
        setStep(1); 
        const partOneSection = document.querySelector('.part-one');
        if (partOneSection) {
            partOneSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === ' ' || event.key === 'Enter') {
                scrollToNextSection();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    const scrollToNextSection = () => {
        const nextSection = document.getElementById('next-section');
        if (nextSection) {
            window.scrollTo({
                top: nextSection.offsetTop,
                behavior: 'smooth'
            });
        }
        setShowMainSection(true);
        setIsNextSectionVisible(true);
        setStep(1); 
        if (arrowClicked) {
            setVideoSecondEnded(false); 
        } else {
            setArrowClicked(true); 
        }
    };


    // Fonction pour partager l'excuse via iMessage ou email
    const handleShare = () => {
        if (navigator.share) {
            // Si on est sur une plateforme mobile qui supporte `navigator.share()`
            navigator.share({
                title: 'Excuse générée',
                text: excuse, // Partage l'excuse
                url: window.location.href // URL de la page actuelle (pour le partage)
            }).then(() => {
                console.log('Partage effectué avec succès');
            }).catch((error) => {
                console.log('Erreur lors du partage :', error);
            });
        } else {
            // Si on est sur un desktop (pas de support `navigator.share`)
            const mailtoLink = `mailto:?subject=Excuse générée&body=${encodeURIComponent(excuse)}`;
            window.location.href = mailtoLink; // Ouvre le client mail par défaut
        }
    };

    return (
        <div className='app'
        style={{
            margin: '0 auto', // Centrer l'application horizontalement
            boxSizing: 'border-box',
        }}>   
            <div className="part-one-all">
                {!isNextSectionVisible ? (
                    <VideoSection
                        handleVideoEnd={handleVideoEnd}
                        showArrow={showArrow}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                        scrollToNextSection={scrollToNextSection}
                    />
                ) : (
                    <p></p>  
                )}
            </div>
            {/* Section Principale */}
            {videoEnded && showMainSection && (
                <div id="next-section" className={`main-section ${step > 0 ? 'visible' : 'hidden'}`}>
                    <div className='steps'>
                        {/* STEP 1 */}
                        {step === 1 && (
                            <div className="step1">
                                <div className='relation-title'>
                                    <h2 className="title">Choisis ta victime</h2>
                                </div>
                                <motion.div className="category-cards">
                                    {Object.keys(categoryData).map((victimKey) => (
                                        <motion.div
                                            key={victimKey}
                                            className="category-card"
                                            style={{
                                                backgroundImage: `url(${hoveredCard === victimKey ? categoryData[victimKey]['image-bis'] : categoryData[victimKey].image})`,
                                            }}
                                            onClick={() => handleVictimSelect(victimKey)}
                                            onMouseEnter={() => setHoveredCard(victimKey)} 
                                            onMouseLeave={() => setHoveredCard(null)} 
                                            initial={{ opacity: 0, y: -30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: 0.1,
                                                duration: 0.5,
                                                ease: 'easeOut'
                                            }}
                                        >
                                            <div className="category-overlay">
                                                <button>{victimKey}</button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        )}
                        {/* STEP 2 */}
                        {step === 2 && victim && (
                            <div>
                                <h2>Choisis une catégorie :</h2>
                                {categoryData[victim] && (
                                    <select onChange={(e) => handleCategorySelect(e.target.value)}>
                                        <option value="">Sélectionnez une catégorie</option>
                                        {Object.keys(categoryData[victim].category).map((categoryKey) => (
                                            <option key={categoryKey} value={categoryKey}>
                                                {categoryKey}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        )}
                        {/* STEP 3 */}
                        {step === 3 && category && (
                            <div>
                                <h2>Choisis un niveau :</h2>
                                {["Soft", "Fun", "Hardcore"].map((levelOption) => (
                                    <button key={levelOption} onClick={() => handleLevelSelect(levelOption)}>
                                        {levelOption}
                                    </button>
                                ))}
                            </div>
                        )}
                        {/* STEP 4 */}
                        {step === 4 && (
                            <>
                                <h1>Excuse générée :</h1>
                                <p>{excuse}</p>
                                <button onClick={generateAnotherExcuse}>Autre</button> 
                                <button onClick={handleShare}>Partager</button>
                            </>
                        )}
                    </div>
                    <div className="button-container">
                        <img 
                            src="./assets/restart.png" 
                            alt="Recommencer"
                            className="restart-button"
                            onClick={() => handleCloseMainSection()}
                        />
                    </div>
                </div>
            )}

            {arrowClicked && showMainSection && (
                <div className="second-video-section">
                    <video 
                        src="./assets/videoo2.mp4"
                        autoPlay
                        muted
                        onEnded={handleSecondVideoEnd}
                        preload="auto" // Précharge la vidéo pour un lancement plus fluide
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Assurez-vous que la vidéo remplit son conteneur
                    ></video>
                </div>
            )}

        </div>
    );
}


