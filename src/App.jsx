import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import categoryData from './data/excusesData.json';

export default function App() {
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [excuse, setExcuse] = useState(null);
    const [videoEnded, setVideoEnded] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const [showArrow, setShowArrow] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [step, setStep] = useState(0); // Étape 0 = cachée, 1 = choix relation, 2 = catégorie, 3 = excuse
    const [showMainSection, setShowMainSection] = useState(true); // Partie principale avec la vidéo
    const [category, setCategory] = useState(null);
    const [level, setLevel] = useState(null);
    const [victim, setVictim] = useState(null); // Victime choisie par l'utilisateur
    const [context, setContext] = useState(null);
    const [isNextSectionVisible, setIsNextSectionVisible] = useState(false);
    const [arrowClicked, setArrowClicked] = useState(false); // Pour savoir si la flèche a été cliquée
    const [videoSecondEnded, setVideoSecondEnded] = useState(false); // Pour savoir si la vidéo secondaire est terminée
    
    const handleSecondVideoEnd = () => {
        setVideoSecondEnded(true); // Marquer la vidéo secondaire comme terminée
    };

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
    

    const handleMouseEnter = () => {
        setIsHovered(true);
        setTimeout(() => {
            setIsHovered(false);
        }, 1200); // Délai de 3 secondes
    };

    const handleMouseLeave = () => {
        setIsHovered(false); // Réinitialiser immédiatement si la souris quitte
    };

    // Fonction pour gérer le choix du contexte après la sélection d'une relation
    const handleContextSelect = (selectedContext) => {
        setContext(selectedContext); // Met à jour le contexte
        setStep(2); // Passe à l'étape 2 pour afficher les catégories
    };

    // Fonction pour gérer la sélection de la catégorie dans l'étape 2
    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory); // Met à jour la catégorie choisie
        setStep(3); // Passe à l'étape 3 pour afficher les niveaux
    };

    const handleLevelSelect = (selectedLevel) => {
        console.log("Niveau sélectionné:", selectedLevel); // Vérifier que cette ligne s'affiche bien
        setLevel(selectedLevel); // Met à jour le niveau
    };

    useEffect(() => {
        if (victim && category && level) {
            console.log("Génération de l'excuse avec les valeurs suivantes : ", victim, category, level);
            generateExcuse();
        }
    }, [victim, category, level]);
    
    
    

    const handleVictimSelect = (selectedVictim) => {
        setVictim(selectedVictim); // Met à jour la victime
        setStep(2); // Passe à l'étape 2 pour sélectionner une catégorie
    };

    // Afficher l'image de la victime sélectionnée
    const getVictimImage = (victim) => {
        if (victim) {
            const victimData = categoryData[victim];
            return victimData ? victimData.image : null; // Retourner l'URL de l'image
        }
        return null;
    };

    const handleVideoEnd = () => {
        setVideoEnded(true);
        setShowNav(true);
        setTimeout(() => {
            setShowArrow(true);
        }, 1000);
    };

    const handleCloseMainSection = () => {
        setShowMainSection(false); // Masquer la section principale
        setIsNextSectionVisible(false);
        setStep(0); // Réinitialiser l'étape à 0 (revenir à la vidéo)
        
        // Faire défiler la page vers la section vidéo (part-one)
        const videoSection = document.querySelector('.part-one');
        if (videoSection) {
            videoSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleReopenMainSection = () => {
        setShowMainSection(true); // Afficher la section principale
        setStep(1); // Revenir à l'étape 1
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
        setStep(1); // Passer à l'étape suivante (relation)
        if (arrowClicked) {
            // Réinitialiser la vidéo et l'état une fois la flèche cliquée
            setVideoSecondEnded(false); // Réinitialiser la vidéo secondaire
        } else {
            // Si la flèche n'a pas encore été cliquée, on change l'état
            setArrowClicked(true); // Marquer la flèche comme cliquée
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
        <div className={`app ${isHovered ? 'blur-effect' : ''}`}
        style={{
            margin: '0 auto', // Centrer l'application horizontalement
            boxSizing: 'border-box',
        }}>   
            {!isNextSectionVisible ? (
            <div className='part-one'>       
                <motion.div className="video-section">
                    <video
                        src="./assets/videoo.mp4"
                        autoPlay
                        muted
                        onEnded={handleVideoEnd}
                        style={{ width: '100%', height: '100%', objectFit: 'cover'}}
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
                        <button
                            onClick={scrollToNextSection} // Use this function to handle arrow click
                            className="kave-btn"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >                        
                        <span className="kave-line"></span>
                            <img src="./assets/arrow.png" alt="Flèche" className="arrow-image" />
                        </button>
                    </motion.div>
                )}
            </div>  
            ) : (
                <p></p>  
            )}

            {/* Section Principale */}
            {videoEnded && showMainSection && (
                <div id="next-section" className={`main-section ${step > 0 ? 'visible' : 'hidden'}`}>
                    <button onClick={handleCloseMainSection} className="close-button">X</button>

                    {/* Étape 1 - Choisir une victime */}
                    {step === 1 && (
                        <div className="step1">
                            <motion.div className="category-cards">
                                {Object.keys(categoryData).map((victimKey) => (
                                    <motion.div
                                        key={victimKey}
                                        className="category-card"
                                        style={{
                                            backgroundImage: `url(${hoveredCard === victimKey ? categoryData[victimKey]['image-bis'] : categoryData[victimKey].image})`,
                                        }}
                                        onClick={() => handleVictimSelect(victimKey)}
                                        onMouseEnter={() => setHoveredCard(victimKey)} // Lorsque la souris entre sur une carte
                                        onMouseLeave={() => setHoveredCard(null)} // Lorsque la souris quitte la carte
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


                            <div className='relation-title'>
                                <h2 className="title">Choisis ta victime</h2>
                            </div>
                        </div>
                    )}

                    {step === 2 && victim && (
                    <div>
                        <h2>Choisis une catégorie :</h2>
                        {categoryData[victim] && Object.keys(categoryData[victim].category).map((categoryKey) => (
                        <button key={categoryKey} onClick={() => handleCategorySelect(categoryKey)}>
                            {categoryKey}
                        </button>
                        ))}
                    </div>
                    )}


                    {/* Étape 3 - Choisir un niveau */}
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


                    {/* Étape 4 - Affichage de l'excuse générée */}
                    {step === 4 && (
                        <>
                            <h1>Excuse générée :</h1>
                            <p>{excuse}</p>
                            <button onClick={() => setStep(1)}>Recommencer</button>
                            <button onClick={generateAnotherExcuse}>Autre</button> {/* Bouton pour générer une autre excuse */}
                            <button onClick={handleShare}>Partager</button>
                        </>
                    )}
                </div>
            )}

            {/* Vidéo secondaire */}
            {arrowClicked && showMainSection && (
                <div className="second-video-section">
                    <video 
                        src="./assets/videoo2.mp4"
                        autoPlay
                        muted
                        onEnded={handleSecondVideoEnd}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 1
                        }}
                    ></video>
                </div>
            )}

        </div>
    );
}





// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import './App.css';
// import categoryData from './data/excusesData.json';

// export default function App() {
//     const [isHovered, setIsHovered] = useState(false);
//     const [hoveredCard, setHoveredCard] = useState(null);
//     const [reason, setReason] = useState(null);
//     const [excuse, setExcuse] = useState(null);
//     const [videoEnded, setVideoEnded] = useState(false);
//     const [showNav, setShowNav] = useState(false);
//     const [showArrow, setShowArrow] = useState(false);
//     const [scrollPosition, setScrollPosition] = useState(0);
//     const [step, setStep] = useState(0); // Étape 0 = cachée, 1 = choix relation, 2 = catégorie, 3 = excuse
//     const [showMainSection, setShowMainSection] = useState(true); // Partie principale avec la vidéo
//     const [showMainSectionPartOne, setShowMainSectionPartOne] = useState(true);
//     const [arrowClicked, setArrowClicked] = useState(false); // Pour savoir si la flèche a été cliquée
//     const [videoSecondEnded, setVideoSecondEnded] = useState(false); // Pour savoir si la vidéo secondaire est terminée
//     const [category, setCategory] = useState(null);
//     const [isNextSectionVisible, setIsNextSectionVisible] = useState(false);
//     const [level, setLevel] = useState(null);
//     const [context, setContext] = useState(null);

//     const handleRandomExcuse = () => {
//         const allExcuses = Object.values(categoryData)
//             .flatMap(cat => 
//                 Object.values(cat.contextes)
//                     .flatMap(ctx => 
//                         Object.values(ctx.levels).flat()
//                     )
//             );

//         const randomExcuse = allExcuses[Math.floor(Math.random() * allExcuses.length)];
//         setExcuse(randomExcuse || "Je n'ai pas trouvé d'excuse.");
//         setStep(4); // Étape 4 : Affichage de l'excuse
//     };

//     const handleMouseEnter = () => {
//         setIsHovered(true);
//         setTimeout(() => {
//             setIsHovered(false);
//         }, 1200); // Délai de 3 secondes
//     };

//     const handleMouseLeave = () => {
//         setIsHovered(false); // Réinitialiser immédiatement si la souris quitte
//     };

//     // Fonction pour gérer le choix du contexte après la sélection d'une relation
//     const handleContextSelect = (selectedContext) => {
//         setContext(selectedContext);  // Met à jour le contexte
//         setStep(2); // Passe à l'étape 2 pour afficher les catégories
//     };

//     // Fonction pour gérer la sélection d'une catégorie dans l'étape 2
//     const handleCategorySelect = (selectedCategory) => {
//         setCategory(selectedCategory);  // Met à jour la catégorie choisie
//         setStep(3); // Passe à l'étape 3 pour afficher les niveaux
//     };

//     // Fonction pour gérer la sélection du niveau dans l'étape 3
//     const handleLevelSelect = (selectedLevel) => {
//         setLevel(selectedLevel);  // Met à jour le niveau choisi
//         setExcuse("Voici votre excuse parfaite !");  // Ici vous pouvez générer une excuse en fonction du niveau
//         setStep(4); // Affiche l'excuse
//     };


//     const handleCategoryStep3 = (selectedCategory) => {
//         setCategory(selectedCategory);
//         setStep(3); // Passer directement à l'étape 3
//     };

//     const handleReasonSelect = (selectedReason) => {
//         setReason(selectedReason);
//         setStep(3); // Passer à l'étape 3 (excuse)
//         setExcuse("Voici votre excuse parfaite !");
//     };

//     const handleVideoEnd = () => {
//         setVideoEnded(true);
//         setShowNav(true);
//         setTimeout(() => {
//             setShowArrow(true);
//         }, 1000);
//     };

//     const handleCloseMainSection = () => {
//         setShowMainSection(false); // Masquer la section principale
//         setIsNextSectionVisible(false);
//         setStep(0); // Réinitialiser l'étape à 0 (revenir à la vidéo)
        
//         // Faire défiler la page vers la section vidéo (part-one)
//         const videoSection = document.querySelector('.part-one');
//         if (videoSection) {
//             videoSection.scrollIntoView({ behavior: 'smooth' });
//         }
//     };

//     const handleReopenMainSection = () => {
//         setShowMainSection(true); // Afficher la section principale
//         setIsNextSectionVisible(false);

//         // Faire défiler la page vers la div `.part-one`
//         const partOneSection = document.querySelector('.part-one');
//         if (partOneSection) {
//             partOneSection.scrollIntoView({ behavior: 'smooth' });
//         }
//     };

//     const handleSecondVideoEnd = () => {
//         setVideoSecondEnded(true); // Marquer la vidéo secondaire comme terminée
//     };

//     useEffect(() => {
//         const handleKeyDown = (event) => {
//             if (event.key === ' ' || event.key === 'Enter') {
//                 scrollToNextSection();
//             }
//         };

//         window.addEventListener('keydown', handleKeyDown);

//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//         };
//     }, []);

//     const scrollToNextSection = () => {
//         const nextSection = document.getElementById('next-section');
//         if (nextSection) {
//             window.scrollTo({
//                 top: nextSection.offsetTop,
//                 behavior: 'smooth'
//             });
//         }
//         setShowMainSection(true);
//         setIsNextSectionVisible(true);
//         setStep(1); // Passer à l'étape suivante (relation)
//         if (arrowClicked) {
//             // Réinitialiser la vidéo et l'état une fois la flèche cliquée
//             setVideoSecondEnded(false); // Réinitialiser la vidéo secondaire
//         } else {
//             // Si la flèche n'a pas encore été cliquée, on change l'état
//             setArrowClicked(true); // Marquer la flèche comme cliquée
//         }
//     };

//     return (
//         <div className={`app ${isHovered ? 'blur-effect' : ''}`}
//         style={{
//             margin: '0 auto', // Centrer l'application horizontalement
//             boxSizing: 'border-box',
//         }}>   
//             {!isNextSectionVisible ? (
//             <div className='part-one'>       
//                 <motion.div className="video-section">
//                     <video
//                         src="./assets/videoo.mp4"
//                         autoPlay
//                         muted
//                         onEnded={handleVideoEnd}
//                         style={{ width: '100%', height: '100%', objectFit: 'cover'}}
//                     ></video>
//                 </motion.div>
//                 {showNav && (
//                     <motion.div
//                         className="navbar"
//                         initial={{ y: -50 }}
//                         animate={{ y: 0 }}
//                         transition={{ duration: 0.5 }}
//                     >
//                         <h2>Menu</h2>
//                     </motion.div>
//                 )}
//                 {showArrow && (
//                     <motion.div
//                         className="scroll-arrow"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 0.5 }}
//                     >
//                         <button
//                             onClick={scrollToNextSection} // Use this function to handle arrow click
//                             className="kave-btn"
//                             onMouseEnter={handleMouseEnter}
//                             onMouseLeave={handleMouseLeave}
//                         >                        
//                         <span className="kave-line"></span>
//                             <img src="./assets/arrow.png" alt="Flèche" className="arrow-image" />
//                         </button>
//                     </motion.div>
//                 )}
//             </div>  
//             ) : (
//                 <p></p>  
//             )}
//             {/* Section Principale */}
//             {videoEnded && showMainSection && ( 
//                 <div id="next-section" className={`main-section ${step > 0 ? 'visible' : 'hidden'}`}>
//                     <button onClick={handleCloseMainSection} className="close-button">X</button>

//                     {step === 1 && (
//                         <div className="step1">
//                             <div className="category-cards">
//                                 {Object.keys(categoryData).map((cat, index) => (
//                                     <motion.div
//                                         key={cat}
//                                         className="category-card"
//                                         style={{
//                                             backgroundImage: `url(${hoveredCard === cat ? categoryData[cat]['image-bis'] : categoryData[cat].image})`,
//                                         }}
//                                         onMouseEnter={() => setHoveredCard(cat)}
//                                         onMouseLeave={() => setHoveredCard(null)}
//                                         onClick={() => handleContextSelect(cat)}
//                                         // onClick={() => handleCategorySelect(cat)}
//                                         initial={{ opacity: 0, y: -30 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         transition={{
//                                             delay: 1 + index * 0.1,
//                                             duration: 0.5,
//                                             ease: 'easeOut'
//                                         }}
//                                     >
//                                         <div className="category-overlay">
//                                             <button>{cat}</button>
//                                         </div>
//                                     </motion.div>
//                                 ))}
//                             </div>
//                             <div className='relation-title'>
//                                 <h2 className="title">Choisis ta victime</h2>
//                             </div>
//                         </div>
//                     )}

//                     {/* Etape 2 - Choisir une catégorie en fonction du contexte */}
//                     {step === 2 && context && (
//                         <div>
//                             <h2>Choisis une catégorie :</h2>
//                             {categoryData[context]?.contextes && Object.keys(categoryData[context]?.contextes).map((ctx) => (
//                                 <div key={ctx}>
//                                     <h3>{ctx}</h3>
//                                     {categoryData[context].contextes[ctx]?.categories.map((cat) => (
//                                         <button key={cat.name} onClick={() => handleCategorySelect(cat.name)}>
//                                             {cat.name}
//                                         </button>
//                                     ))}
//                                 </div>
//                             ))}
//                         </div>
//                     )}

//                     {/* Etape 3 - Choisir un niveau (Soft, Fun, Hardcore) */}
//                     {step === 3 && category && (
//                         <div>
//                             <h2>Choisis un niveau :</h2>
//                             {["Soft", "Fun", "Hardcore"].map((levelOption) => (
//                                 <button key={levelOption} onClick={() => handleLevelSelect(levelOption)}>
//                                     {levelOption}
//                                 </button>
//                             ))}
//                         </div>
//                     )}


//                     {step === 4 && (
//                         <>
//                             <h1>Excuse générée :</h1>
//                             <p>{excuse}</p>
//                             <button onClick={() => setStep(1)}>Recommencer</button>
//                         </>
//                     )}
//                 </div>
//             )}
//             {/* Vidéo secondaire */}
//             {arrowClicked && showMainSection && (
//                 <div className="second-video-section">
//                     <video 
//                         src="./assets/videoo2.mp4"
//                         autoPlay
//                         muted
//                         onEnded={handleSecondVideoEnd}
//                         style={{
//                             width: '100%',
//                             height: '100%',
//                             objectFit: 'cover',
//                             position: 'absolute',
//                             top: 0,
//                             left: 0,
//                             zIndex: 1
//                         }}
//                     ></video>
//                 </div>
//             )}
//         </div>
//     );
// }













// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import './App.css';
// import categoryData from './data/excusesData.json';

// export default function App() {
//     const [isHovered, setIsHovered] = useState(false);
//     const [hoveredCard, setHoveredCard] = useState(null);
//     const [reason, setReason] = useState(null);
//     const [excuse, setExcuse] = useState(null);
//     const [videoEnded, setVideoEnded] = useState(false);
//     const [showNav, setShowNav] = useState(false);
//     const [showArrow, setShowArrow] = useState(false);
//     const [scrollPosition, setScrollPosition] = useState(0);
//     const [step, setStep] = useState(0); // Étape 0 = cachée, 1 = choix relation, 2 = catégorie, 3 = excuse
//     const [showMainSection, setShowMainSection] = useState(true); // Partie principale avec la vidéo
//     const [showMainSectionPartOne, setShowMainSectionPartOne] = useState(true);
//     const [arrowClicked, setArrowClicked] = useState(false); // Pour savoir si la flèche a été cliquée
//     const [videoSecondEnded, setVideoSecondEnded] = useState(false); // Pour savoir si la vidéo secondaire est terminée
//     const [category, setCategory] = useState(null);
//     const [isNextSectionVisible, setIsNextSectionVisible] = useState(false);
//     const [level, setLevel] = useState(null);
//     const [context, setContext] = useState(null);
    
//     const handleContextSelect = (selectedContext) => {
//         setContext(selectedContext);
//         setStep(3); // Passer à l'étape 3 (choix de la catégorie ou du niveau)
//     };
    


// const handleRandomExcuse = () => {
//     const allExcuses = Object.values(categoryData)
//         .flatMap(cat => 
//             Object.values(cat.contextes)
//                 .flatMap(ctx => 
//                     Object.values(ctx.levels).flat()
//                 )
//         );

//     const randomExcuse = allExcuses[Math.floor(Math.random() * allExcuses.length)];
//     setExcuse(randomExcuse || "Je n'ai pas trouvé d'excuse.");
//     setStep(4); // Étape 4 : Affichage de l'excuse
// };

    
    
//     // Gérer l'effet de flou
//     const handleMouseEnter = () => {
//         setIsHovered(true);

//         // Effacer l'effet de flou après 3 secondes
//         setTimeout(() => {
//             setIsHovered(false);
//         }, 1200); // Délai de 3 secondes
//     };

//     const handleMouseLeave = () => {
//         setIsHovered(false); // Réinitialiser immédiatement si la souris quitte
//     };

//     const handleCategorySelect = (selectedCategory) => {
//         setCategory(selectedCategory);
//         setStep(2); // Passer à l'étape 2 (choix de catégorie)
//     };

    

//     const handleReasonSelect = (selectedReason) => {
//         setReason(selectedReason);
//         setStep(3); // Passer à l'étape 3 (excuse)
//         setExcuse("Voici votre excuse parfaite !");
//     };

//     const handleVideoEnd = () => {
//         setVideoEnded(true);
//         setShowNav(true);
//         setTimeout(() => {
//             setShowArrow(true);
//         }, 1000);
//     };

//     const handleCloseMainSection = () => {
//         setShowMainSection(false); // Masquer la section principale
//         setIsNextSectionVisible(false);
//         setStep(0); // Réinitialiser l'étape à 0 (revenir à la vidéo)
        
//         // Faire défiler la page vers la section vidéo (part-one)
//         const videoSection = document.querySelector('.part-one');
//         if (videoSection) {
//             videoSection.scrollIntoView({ behavior: 'smooth' });
//         }
//     };
    

//     const handleReopenMainSection = () => {
//         setShowMainSection(true); // Afficher la section principale
//         setIsNextSectionVisible(false);
    
//         // Faire défiler la page vers la div `.part-one`
//         const partOneSection = document.querySelector('.part-one');
//         if (partOneSection) {
//             partOneSection.scrollIntoView({ behavior: 'smooth' });
//         }
//     };
    

//     // Fonction pour gérer la fin de la deuxième vidéo
//     const handleSecondVideoEnd = () => {
//         setVideoSecondEnded(true); // Mark the second video as ended
//     };

//     // Gestion des événements pour les touches Space et Enter
//     useEffect(() => {
//         const handleKeyDown = (event) => {
//             if (event.key === ' ' || event.key === 'Enter') {
//                 scrollToNextSection();
//             }
//         };

//         window.addEventListener('keydown', handleKeyDown);

//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//         };
//     }, []);

//     const scrollToNextSection = () => {
//         const nextSection = document.getElementById('next-section');
//         if (nextSection) {
//             window.scrollTo({
//                 top: nextSection.offsetTop,
//                 behavior: 'smooth'
//             });
//         }
//         setShowMainSection(true); 
//         setIsNextSectionVisible(true)
//         setStep(1); // Passer à l'étape suivante (relation)
//         if (arrowClicked) {
//             // Réinitialiser la vidéo et l'état une fois la flèche cliquée
//             setVideoSecondEnded(false); // Réinitialiser la vidéo secondaire
//         } else {
//             // Si la flèche n'a pas encore été cliquée, on change l'état
//             setArrowClicked(true); // Marquer la flèche comme cliquée
//         }
//     };

//     return (
//         <div className={`app ${isHovered ? 'blur-effect' : ''}`}
//         style={{
//             // width: windowWidth > 806 ? '806px' : `${windowWidth}px`,
//             margin: '0 auto', // Centrer l'application horizontalement
//             boxSizing: 'border-box',
//         }}>   

//             {console.log('isNextSectionVisible:', isNextSectionVisible)}
//             {!isNextSectionVisible ? (
//             <div className='part-one'>       
//                 <motion.div
//                     className="video-section"
//                     // initial={{ opacity: 1 }}
//                     // animate={{ opacity: scrollPosition < 100 ? 1 : 0 }}
//                     // transition={{ duration: 1 }}
//                 >
//                     <video
//                         src="./assets/videoo.mp4"
//                         autoPlay
//                         muted
//                         onEnded={handleVideoEnd}
//                         style={{ width: '100%', height: '100%', objectFit: 'cover'}}
//                     ></video>
//                 </motion.div>

//                 {showNav && (
//                     <motion.div
//                         className="navbar"
//                         initial={{ y: -50 }}
//                         animate={{ y: 0 }}
//                         transition={{ duration: 0.5 }}
//                     >
//                         <h2>Menu</h2>
//                     </motion.div>
//                 )}

//                 <div className='space'>
//                     <p></p>
//                 </div>

//                 {showArrow && (
//                     <motion.div
//                         className="scroll-arrow"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 0.5 }}
//                     >
//                         <button
//                             onClick={scrollToNextSection} // Use this function to handle arrow click
//                             className="kave-btn"
//                             onMouseEnter={handleMouseEnter}
//                             onMouseLeave={handleMouseLeave}
//                         >                        
//                         <span className="kave-line"></span>
//                             <img src="./assets/arrow.png" alt="Flèche" className="arrow-image" />
//                         </button>
//                     </motion.div>
//                 )}
//             </div>  
//             ) : (
//                 <p></p>  
//             )}
//             {/* Section Principale */}
//             {videoEnded && showMainSection && ( // Vérifier si showMainSection est true avant d'afficher la section
//                 <div id="next-section" className={`main-section ${step > 0 ? 'visible' : 'hidden'}`}>
//                     {console.log("La section principale est affichée avec step =", step)}
//                     <button onClick={handleCloseMainSection} className="close-button">X</button> {/* Bouton de fermeture */}

//                     {step === 1 && (
//                         <div className="step1">
//                             <div className="category-cards">
//                                 {Object.keys(categoryData).map((cat, index) => (
//                                     <motion.div
//                                         key={cat}
//                                         className="category-card"
//                                         style={{
//                                             backgroundImage: `url(${hoveredCard === cat ? categoryData[cat]['image-bis'] : categoryData[cat].image})`,
//                                         }}
//                                         onMouseEnter={() => setHoveredCard(cat)}
//                                         onMouseLeave={() => setHoveredCard(null)}
//                                         onClick={() => handleCategorySelect(cat)}
//                                         initial={{ opacity: 0, y: -30 }}  // Position initiale en haut
//                                         animate={{ opacity: 1, y: 0 }}    // Final: visible et à sa place
//                                         transition={{
//                                             delay: 1 + index * 0.1,  // Délai de 3 secondes avant de commencer, et délai progressif pour chaque carte
//                                             duration: 0.5,           // Durée de l'animation (0.5s pour chaque carte)
//                                             ease: 'easeOut'          // Transition douce
//                                         }}
//                                     >
//                                         <div className="category-overlay">
//                                             <button>{cat}</button>
//                                         </div>
//                                     </motion.div>
                                    
//                                 ))}
//                             </div>
//                             <div className='relation-title'>
//                                 <h2 className="title">Choisis ta victime</h2>
//                             </div>
//                         </div>
//                     )}

//                     {step === 2 && (
//                         <>
//                             <h1>Choisis un contexte</h1>
//                             {Object.keys(categoryData[category]?.contextes || {}).map((context) => (
//                                 <button
//                                     key={context}
//                                     onClick={() => handleContextSelect(context)}
//                                 >
//                                     {context}
//                                 </button>
//                             ))}
//                         </>
//                     )}

//                     {step === 3 && (
//                         <div>
//                             <h2>Choisis une catégorie :</h2>
//                             <table>
//                                 <thead>
//                                     <tr>
//                                         <th>Catégorie</th>
//                                         <th>Sélectionner</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {categoryData[category]?.contextes[context]?.categories.map((cat) => (
//                                         <tr key={cat}>
//                                             <td>{cat}</td>
//                                             <td>
//                                                 <button onClick={() => handleCategorySelect(cat)}>✔️</button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                     <tr>
//                                         <td><em>Autre (Excuse aléatoire)</em></td>
//                                         <td>
//                                             <button onClick={handleRandomExcuse}>➡️</button>
//                                         </td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}




//                     {step === 4 && (
//                         <>
//                             <h1>Excuse générée :</h1>
//                             <p>{excuse}</p>
//                             <button onClick={() => setStep(1)}>Recommencer</button>
//                         </>
//                     )}


//             {/* Vidéo secondaire */}
//             {arrowClicked && showMainSection && (
//                 <div className="second-video-section">
//                     <video 
//                         src="./assets/videoo2.mp4"
//                         autoPlay
//                         muted
//                         onEnded={handleSecondVideoEnd}
//                         style={{
//                             width: '100%',
//                             height: '100%',
//                             objectFit: 'cover',
//                             position: 'absolute',
//                             top: 0,
//                             left: 0,
//                             zIndex: 1
//                         }}
//                     ></video>
//                 </div>
//             )}
//         </div>
//     );
// }







