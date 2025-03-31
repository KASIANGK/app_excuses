import { useState, useEffect, useRef } from 'react';
import VideoSection from './Components/VideoSection';
import { motion } from 'framer-motion';
import './App.css';
import categoryData from './data/excusesData.json';

export default function App() {
    const [isHovered, setIsHovered] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const [isVideoEnded, setIsVideoEnded] = useState(false); 
    const [step, setStep] = useState(0); 
    const [hoveredCard, setHoveredCard] = useState(null);
    const [category, setCategory] = useState(null);
    const [level, setLevel] = useState(null);
    const [victim, setVictim] = useState(null); 
    const [excuse, setExcuse] = useState(null);
    const [letters, setLetters] = useState(['E', 'X', 'C', 'I', 'T']); 
    const [isVisible, setIsVisible] = useState(false);
    const [isTransformed, setIsTransformed] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isArrowVisible, setIsArrowVisible] = useState(false);
    const [isTransitionDone, setIsTransitionDone] = useState(false);
    const [hasElevatorAppeared, setHasElevatorAppeared] = useState(false);
    const [showArrow, setShowArrow] = useState(false);
    const carouselRef = useRef(null);
    const [isStepOne, setIsStepOne] = useState(false)
    const [showVideoSection, setShowVideoSection] = useState(true); 
    const [isNextSectionVisible, setIsNextSectionVisible] = useState(false);
    const [showSteps, setShowSteps] = useState(false);

    const handleCloseMainSection = () => {
        // Si on est à l'étape 0, on ne doit pas réduire l'étape, on garde la vidéo visible.
        if (step > 0) {
            setStep(step - 1);  // Revenir à l'étape précédente
        } else {
            setStep(0);  // Retour à la vidéo si déjà à l'étape 0
        }
        // Réinitialiser les états spécifiques à chaque étape
        setIsStepOne(false);  // Ne pas afficher step-one immédiatement
        setIsVideoEnded(false);  // Réinitialiser l'état de la vidéo
        setIsVisible(false);  // Réinitialiser l'animation du texte
        setShowSteps(false);  // Cache les steps
        setStep(0);           // Retour à la vidéo
        setIsStepOne(false);  // Réinitialise le step-one pour ne pas l'afficher immédiatement
        setIsVideoEnded(false);  // Réinitialise l'état de la vidéo
        setIsVisible(false);      // Réinitialise l'animation de texte, si nécessaire
    
        // Redémarre la vidéo et tout le reste, tu peux le faire avec un délai ou autre
        setTimeout(() => {
            // Relancer la vidéo ou tout autre comportement ici
        }, 1000); // Ajuste ce délai si nécessaire
    };
    

    useEffect(() => {
        setTimeout(() => {
            const arrow = document.querySelector('.arrow-image');
            const powerImage = document.querySelector('.app-title-second img');
    
            if (arrow) {
                arrow.addEventListener('click', scrollToNextSection);
                console.log("✅ Flèche réactivée !");
            }
            if (powerImage) {
                powerImage.addEventListener('click', scrollToElevator);
                console.log("✅ Image power réactivée !");
            }
    
            return () => {
                if (arrow) arrow.removeEventListener('click', scrollToNextSection);
                if (powerImage) powerImage.removeEventListener('click', scrollToElevator);
            };
        }, 500);
    }, [step]);
    
    

    // Animation de la flèche
    useEffect(() => {
        if (isVisible) {
            setTimeout(() => {
                setIsArrowVisible(true);  // La flèche devient visible après l'animation du texte
            }, 500); // Délai de 3 secondes pour que la flèche apparaisse après l'animation du texte
        }
    }, [isVisible]);

    useEffect(() => {
        // Détecter la taille de l'écran
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 813); // Définir l'état si l'écran est petit
        };
        
        handleResize(); // Vérifier la taille de l'écran au montage
        window.addEventListener('resize', handleResize); // Ajouter l'écouteur d'événement

        return () => window.removeEventListener('resize', handleResize); // Nettoyer l'écouteur
    }, []);


    // Fonction pour animer le carrousel en continu
    useEffect(() => {
        const scrollInterval = setInterval(() => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });  // Défiler de 300px
        }
        }, 15000);  // Le carrousel défile toutes les 3 secondes

        return () => clearInterval(scrollInterval);  // Nettoyer l'intervalle quand le composant est démonté
    }, []);


    const scrollToElevator = () => {
        const elevatorSection = document.querySelector('.elevator');
        if (elevatorSection) {
            elevatorSection.scrollIntoView({ behavior: 'smooth' });
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


    useEffect(() => {
        // Détecter la taille de l'écran
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 813); // Définir l'état si l'écran est petit
        };
        
        handleResize(); // Vérifier la taille de l'écran au montage
        window.addEventListener('resize', handleResize); // Ajouter l'écouteur d'événement

        return () => window.removeEventListener('resize', handleResize); // Nettoyer l'écouteur
    }, []);

    const handleVideoEnd = () => {
        setVideoEnded(true);
        setTimeout(() => {
            setShowArrow(true);
        }, 1000);
    };

    const handleVideoEndSecond = () => {
        setIsVideoEnded(true);  
        setTimeout(() => {
            setIsStepOne(true);
        }, 100);
      };


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


    const scrollToNextSection = () => {
        setShowSteps(true); // Affiche la section steps
        setStep(1); // Assure que step 1 est bien actif
    };
    

    const handleVictimSelect = (selectedVictim) => {
        setVictim(selectedVictim);
        setStep(2);
    };

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
        setStep(3);
    };

    const handleLevelSelect = (selectedLevel) => {
        setLevel(selectedLevel);
        generateExcuse(selectedLevel);
    };

    const scrollToSteps = () => {
        setShowSteps(true);
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
        <div className='app'>
            <div className="video-container">
                <div className='app-title'>
                    <h2>YOUR ULTIME</h2>
                    <div className='app-title-second'>
                        <h1>EXCUSE GENERATOR</h1>
                        <img src='./assets/power.png' onClick={scrollToElevator} />
                    </div>
                </div>
                {/* Vidéo en arrière-plan */}
                <video
                    src="./assets/videooo.mp4"
                    autoPlay
                    muted
                    className="background-video"
                ></video>
            </div>

            {/* Contenu de départ, centré sur la vidéo */}
            <div className={`container-wrapper ${step > 0 ? 'hidden' : ''}`}>                <div className="container">
                    {/* Section pour le texte */}
                    <div className='container-empty'>
                        <p></p>
                    </div>
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
                    {isArrowVisible && (
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
                    )}

                </div>
                <div className={`elevator`}>
                    <img src='./assets/elevator5-wg.png' />
                </div>
            </div>

            {/* Steps (caché au début, apparaît après clic) */}
            <div className={`steps ${showSteps ? 'visible' : ''}`}>
                {step > 0 && (
                    <motion.div 
                        className={`video-container next-section step-${step}`} 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 0.5 }}
                    >
                        {step === 1 && (
                            <motion.div 
                                className="step-one"
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                transition={{ duration: 0.5 }}
                                // animate={{ opacity: isStepOne ? 1 : 0 }}  
                            >
                                {/* Ajout de la vidéo en arrière-plan */}
                                <video 
                                    src="./assets/videooo2.mp4"
                                    autoPlay
                                    muted
                                    preload="auto"
                                    className="background-video step1-bg-video"
                                    onEnded={handleVideoEndSecond}
                                ></video>
                                {isStepOne && (
                                    <div className='step1-container'>
                                        <div className='step-title'>
                                            <h2 className="title">Choisis ta victime</h2>
                                            <div className="button-container">
                                                <img 
                                                    src="./assets/restart.png" 
                                                    alt="Recommencer"
                                                    className="restart-button"
                                                    onClick={() => handleCloseMainSection()}
                                                />
                                            </div>
                                        </div>
                                        <div className={`step1-txt ${hoveredCard ? 'hovered' : ''}`}>
                                            <p>C’est l’heure de faire un choix crucial... Qui va être l’heureux(se) élu(e) de ton plan machiavélique ?</p>
                                        </div>
                                        <motion.div className="carousel-container">
                                            <motion.div className="category-cards" ref={carouselRef}>
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
                                        </motion.div>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {step === 2 && (
                            <div className="step2">
                                <video 
                                    src="./assets/videooo2.mp4"
                                    autoPlay
                                    muted
                                    preload="auto"
                                    className="background-video step1-bg-video"
                                    onEnded={handleVideoEndSecond}
                                ></video>
                                <h2 className="title">Choisis le contexte</h2>
                                <div className="button-container">
                                    <img 
                                        src="./assets/restart.png" 
                                        alt="Recommencer"
                                        className="restart-button"
                                        onClick={() => handleCloseMainSection()}
                                    />
                                </div>
                                <select className="styled-select" onChange={(e) => handleCategorySelect(e.target.value)}>
                                    <option value="">Sélectionne un contexte</option>
                                    {Object.keys(categoryData[victim]?.category || {}).map((catKey) => (
                                        <option key={catKey} value={catKey}>{catKey}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="step3">
                                <video 
                                    src="./assets/videooo2.mp4"
                                    autoPlay
                                    muted
                                    preload="auto"
                                    className="background-video step1-bg-video"
                                    onEnded={handleVideoEndSecond}
                                ></video>
                                <h2 className="title">Choisis le level</h2>
                                <div className="button-container">
                                    <img 
                                        src="./assets/restart.png" 
                                        alt="Recommencer"
                                        className="restart-button"
                                        onClick={() => handleCloseMainSection()}
                                    />
                                </div>
                                {['Soft', 'Fun', 'Hardcore'].map((levelOption) => (
                                    <button className='boutons' key={levelOption} onClick={() => handleLevelSelect(levelOption)}>
                                        {levelOption}
                                    </button>
                                ))}
                            </div>
                        )}

                        {step === 4 && (
                            <div className='excuse-generee'>
                                <h1>Voici ton excuse chacal !</h1>
                                <div className="button-container">
                                    <img 
                                        src="./assets/restart.png" 
                                        alt="Recommencer"
                                        className="restart-button"
                                        onClick={() => handleCloseMainSection()}
                                    />
                                </div>
                                <p>{excuse}</p>
                                <button onClick={generateAnotherExcuse}>Autre</button> 
                                <button onClick={handleShare}>Partager</button>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}


