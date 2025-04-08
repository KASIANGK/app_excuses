import { useState, useEffect, useRef } from 'react';
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
    const [showArrow, setShowArrow] = useState(false);
    const carouselRef = useRef(null);
    const [showSteps, setShowSteps] = useState(false);
    const [isStepOne, setIsStepOne] = useState(false);
    const [isStepTwo, setIsStepTwo] = useState(false);
    const [isStepThree, setIsStepThree] = useState(false);
    const [isStepFour, setIsStepFour] = useState(false);

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
        }, 3);
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

    const videoRef = useRef(null);
    const videoSegments = {
        0: [0, 0.9],   // intro
        1: [1.5, 2.7],   // step 1
        2: [3, 4.004],   // step 2
        3: [4.2, 6],   // step 3
        4: [6.2, 8],   // step 4 / outro
      };

      
      
      setTimeout(() => {
        setIsStepOne(true);
    }, 3000); // 3000ms = 3s

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const [start, end] = videoSegments[step];

        const handleTimeUpdate = () => {
            // Si la vidéo atteint la fin du segment pour l'étape actuelle
            if (video.currentTime >= end) {
                video.pause(); // Arrêter la vidéo

                // Pour chaque étape, déclencher l'apparition du contenu après 3 secondes
                if (step === 1) {
                    setTimeout(() => {
                        setIsStepOne(true);
                    }, 3200);
                }

                if (step === 2) {
                    setTimeout(() => {
                        setIsStepTwo(true);
                    }, 100);
                }

                if (step === 3) {
                    setTimeout(() => {
                        setIsStepThree(true);
                    }, 50);
                }

                if (step === 4) {
                    setTimeout(() => {
                        setIsStepFour(true);
                    }, 10);
                }
            }
        };

        // Réinitialiser la vidéo à l'heure de début du segment
        video.currentTime = start;
        video.play(); // Lire la vidéo

        // Écoute l'événement timeupdate pour savoir quand la vidéo atteint la fin du segment
        video.addEventListener('timeupdate', handleTimeUpdate);

        // Nettoyer l'écouteur quand le composant est démonté ou que l'étape change
        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [step]); // Relancer à chaque changement de step


    const [isOpen, setIsOpen] = useState(false);

    // Récupération des catégories en fonction du "victim"
    const categories = Object.keys(categoryData[victim]?.category || {});
  
    const handleSelect = (category) => {
      handleCategorySelect(category);
      setIsOpen(false);  // Fermer la liste des options après sélection
    };
  
      // Réinitialiser isVisible lorsque l'utilisateur quitte l'étape 0
    useEffect(() => {
        if (step > 0) {
        setIsVisible(false); // Cacher le texte une fois que l'utilisateur quitte step 0
        } else {
        setIsVisible(true);  // Garder le texte visible quand on est encore sur step 0
        }
    }, [step]); // Ce useEffect dépend de la valeur de `step`

    return (
        <div className='app'>
            <div className="video-container">
            {step === 0 && (
                <div className='app-title'>
                    <h2>YOUR ULTIME</h2>
                    <div className='app-title-second'>
                        <h1>EXCUSE GENERATOR</h1>
                        <img src='./assets/power.png' onClick={scrollToElevator} />
                    </div>
                </div>
            )}
                {/* Vidéo en arrière-plan */}
                <video
                ref={videoRef}
                src="./assets/timeline-ogg.mp4"
                autoPlay={false}
                muted
                preload="auto"
                playsInline
                className="background-video"
                />
            </div>


            {/* Contenu de départ, centré sur la vidéo */}
            <div className={`container-wrapper ${step > 0 ? 'hidden' : ''}`}>                <div className="container">
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
                    <img src='./assets/elevator-11.png' />
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
                            >
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

                        {step === 2 && isStepTwo && ( 
                            <motion.div className="step-two" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                                <div className="step2">
                                    <div className='steps-title-div'>
                                        <h2 className="title">Choisis le contexte</h2>
                                        <div className="button-container">
                                            <img 
                                                src="./assets/restart.png" 
                                                alt="Recommencer"
                                                className="restart-button"
                                                onClick={() => handleCloseMainSection()}
                                            />
                                        </div>
                                    </div>
                                    <div className="custom-select-container" style={{ position: 'relative', width: '200px' }}>
                                        <div
                                            className="custom-select-box"
                                            onClick={() => setIsOpen(!isOpen)}
                                        >
                                            SELECTIONNE UN CONTEXTE
                                        </div>

                                        {isOpen && (
                                            <div
                                            className="custom-select-options styled-select"
                                            style={{
                                                position: 'absolute',
                                                top: '100%',
                                                left: 0,
                                                right: 0,
                                                backgroundColor: '#006400', // Vert foncé
                                                zIndex: 10,
                                                borderRadius: '4px',
                                            }}
                                            >
                                            {categories.map((catKey) => (
                                                <div
                                                key={catKey}
                                                onClick={() => handleSelect(catKey)}
                                                style={{
                                                    backgroundColor: '#1F3A2E', // Vert foncé
                                                    color: 'white',
                                                    cursor: 'pointer',
                                                }}
                                                onMouseEnter={(e) => (e.target.style.backgroundColor = '#D3D3D3')} // Hover : gris clair
                                                onMouseLeave={(e) => (e.target.style.backgroundColor = '#1F3A2E')} // Hover : vert foncé
                                                >
                                                {catKey}
                                                </div>
                                            ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && isStepThree && (
                            <motion.div className="step-three" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                                <div className="step3">
                                    <div className='steps-title-div'>
                                        <h2 className="title">Choisis le level</h2>
                                        <div className="button-container">
                                            <div className="restart-wrapper">
                                                <img 
                                                src="./assets/restart.png" 
                                                alt="Recommencer"
                                                className="restart-button"
                                                onClick={() => handleCloseMainSection()}
                                                />
                                                <span className="restart-text">restart</span>
                                            </div>
                                        </div>

                                        {/* <div className="button-container">
                                            <img 
                                                src="./assets/restart.png" 
                                                alt="Recommencer"
                                                className="restart-button"
                                                onClick={() => handleCloseMainSection()}
                                            />
                                        </div> */}
                                    </div>
                                    <div className='step3-btn'>
                                        {['Soft', 'Fun', 'Hardcore'].map((levelOption) => (
                                            <button className='boutons' key={levelOption} onClick={() => handleLevelSelect(levelOption)}>
                                                {levelOption}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>               
                        )}

                        {step === 4 && isStepFour && (
                            <motion.div className="step-four" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                                <div className='excuse-generee'>
                                    <h1>VOICI TON EXCUSE CHACAL !</h1>
                                    <p>{excuse}</p>
                                    <div className='step4-btn'>
                                        <button className="boutons" onClick={generateAnotherExcuse}>Autre</button> 
                                        <button className="boutons" onClick={handleShare}>Partager</button>
                                        <div className="button-container">
                                            <img 
                                                src="./assets/restart.png" 
                                                alt="Recommencer"
                                                className="restart-button"
                                                onClick={() => handleCloseMainSection()}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>               

                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}


