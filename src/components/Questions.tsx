import { categories, getAllQuestions } from '../data/questions';
import { useState, useEffect } from 'react';
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai';
import { HiMenu, HiX } from 'react-icons/hi';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';

interface QuestionStatus {
    viewed: boolean;
    rating: 'positive' | 'negative' | null;
}

// Add this helper function at the top of the file, outside the component
const getProgressCounts = (statuses: Record<string, QuestionStatus>) => {
    return Object.values(statuses).reduce(
        (acc, status) => {
            if (status.rating === 'positive') acc.likes++;
            if (status.rating === 'negative') acc.dislikes++;
            return acc;
        },
        { likes: 0, dislikes: 0 }
    );
};

export default function Questions() {
    const allQuestions = getAllQuestions();
    
    // Initialize states
    const [activeCategory, setActiveCategory] = useState<string>('');
    const [manuallyOpenCategory, setManuallyOpenCategory] = useState<string | null>(null);
    const [questionStatuses, setQuestionStatuses] = useState<Record<string, QuestionStatus>>({});
    const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);
    const [direction, setDirection] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showIntro, setShowIntro] = useState(true);

    // Move the mobile menu styles to a computed class string
    const mobileMenuClasses = `
        fixed md:relative w-[340px] h-screen border-r border-black/10 dark:border-brand-light-purple 
        flex flex-col items-start justify-start 
        dark:bg-brand-dark-purple/90 p-4 overflow-y-auto z-40
        bg-white
        md:translate-x-0
        transition-transform duration-300
        ${!isClient ? '-translate-x-full' : ''} // Hide by default until client-side JS runs
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
    `;

    // Load saved statuses and determine if intro should be shown
    useEffect(() => {
        const saved = getLocalStorage('questionStatuses');
        if (saved) {
            const savedStatuses = JSON.parse(saved);
            setQuestionStatuses(savedStatuses);
            
            // If there's saved progress, skip intro and go to last viewed question
            if (Object.keys(savedStatuses).length > 0) {
                setShowIntro(false);
                
                // Find the last viewed question or first unviewed question
                const lastViewedQuestion = allQuestions.find(q => 
                    savedStatuses[q.id]?.viewed && !savedStatuses[q.id]?.rating
                ) || allQuestions.find(q => !savedStatuses[q.id]?.viewed) || allQuestions[0];
                
                setCurrentQuestionId(lastViewedQuestion.id);
            }
        }
    }, []);

    // Save statuses to localStorage when they change
    useEffect(() => {
        if (Object.keys(questionStatuses).length > 0) {
            setLocalStorage('questionStatuses', JSON.stringify(questionStatuses));
        }
    }, [questionStatuses]);

    // Mark question as viewed when displayed
    useEffect(() => {
        if (currentQuestionId && !showIntro) {
            setQuestionStatuses(prev => ({
                ...prev,
                [currentQuestionId]: { ...prev[currentQuestionId], viewed: true }
            }));
        }
    }, [currentQuestionId, showIntro]);


    // Update active category only when not showing intro
    useEffect(() => {
        if (!showIntro && currentQuestionId) {
            const currentQuestion = allQuestions.find(q => q.id === currentQuestionId);
            if (currentQuestion) {
                const category = categories.find(c => 
                    c.questions.some(q => q.id === currentQuestionId)
                );
                if (category) {
                    setActiveCategory(category.id);
                }
            }
        }
    }, [currentQuestionId, showIntro]);

    // Handle initial client-side setup and resize events
    useEffect(() => {
        const checkMobile = () => {
            const isMobileView = window.innerWidth < 768;
            setIsMobile(isMobileView);
            if (!isMobileView) {
                setIsMobileMenuOpen(false);
            }
        };

        // Set initial states
        setIsClient(true);
        checkMobile();

        // Add resize listener
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Start the questions when intro is dismissed
    const handleStartQuestions = () => {
        setCurrentQuestionId(allQuestions[0].id);
        setShowIntro(false);
    };

    const handleQuestionChange = (newQuestionId: string) => {
        const orderedQuestions = categories.flatMap(category => 
            category.questions.filter(q => q.id === newQuestionId)
        );
        
        const currentIndex = orderedQuestions.findIndex(q => q.id === currentQuestionId);
        const newIndex = orderedQuestions.findIndex(q => q.id === newQuestionId);
        setDirection(newIndex > currentIndex ? 1 : -1);
        setCurrentQuestionId(newQuestionId);
        setManuallyOpenCategory(null);
        setIsMobileMenuOpen(false);
    };

    const handleRating = (questionId: string, rating: 'positive' | 'negative') => {
        setQuestionStatuses(prev => ({
            ...prev,
            [questionId]: { ...prev[questionId], rating }
        }));
        
        const currentIndex = allQuestions.findIndex(q => q.id === questionId);
        if (currentIndex < allQuestions.length - 1) {
            setTimeout(() => {
                handleQuestionChange(allQuestions[currentIndex + 1].id);
            }, 300);
        }
    };

    const handleReset = () => {
        setQuestionStatuses({});
        setCurrentQuestionId(null);
        setDirection(0);
        setManuallyOpenCategory(null);
        setShowIntro(true);
    };

    const toggleCategory = (categoryId: string) => {
        setManuallyOpenCategory(prev => prev === categoryId ? null : categoryId);
    };

    // Category is open if it's either active (contains current question) or manually opened
    const isCategoryOpen = (categoryId: string) => 
        categoryId === activeCategory || categoryId === manuallyOpenCategory;

    const currentQuestion = allQuestions.find(q => q.id === currentQuestionId);
    
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 500 : -500,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 500 : -500,
            opacity: 0
        })
    };

    return (
        <div className="flex h-screen relative">
            {/* Only show mobile menu button after client-side hydration */}
            {isClient && (
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="fixed top-4 left-4 z-50 p-2 bg-brand-dark-theme-bg/10 dark:bg-brand-purple/10 backdrop-blur-sm rounded-md md:hidden"
                >
                    {isMobileMenuOpen ? (
                        <HiX className="w-6 h-6 text-brand-light-theme-text dark:text-brand-dark-theme-text" />
                    ) : (
                        <HiMenu className="w-6 h-6 text-brand-light-theme-text dark:text-brand-dark-theme-text" />
                    )}


                </button>
            )}

            {/* Only show overlay after client-side hydration */}
            {isClient && isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-brand-dark-purple/20 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
            
            {/* Sidebar Navigation - Only show when not in intro */}
            {!showIntro && (
                <motion.nav 
                    className={mobileMenuClasses}
                    initial={false}
                    animate={{ 
                        x: isClient ? (isMobile ? (isMobileMenuOpen ? 0 : -340) : 0) : -340,
                        transition: { type: "spring", stiffness: 300, damping: 30 }
                    }}
                >
                    <div className="flex flex-col h-full w-full">
                        <div className="flex flex-col mt-16 md:mt-0 mb-24">
                            <h1 className="text-4xl">
                                <a href="/" className="hover:text-brand-purple dark:hover:text-brand-purple transition-colors">
                                    <span className="font-bold">Richard</span> Pisarski
                                </a>
                            </h1>
                            <p className="text-sm mt-2 transition-colors">
                                Frontend Developer
                            </p>
                            <p className="inline-flex items-center gap-2 text-sm transition-colors">
                                Detroit Metropolitan Area
                            </p>
                        </div>
                        
                        <div className="space-y-6 flex-grow">
                            {categories.map((category) => (
                                <div key={category.id} className="space-y-2">
                                    <button 
                                        onClick={() => toggleCategory(category.id)}
                                        className="dark:text-brand-dark-theme-text/80 dark:hover:text-brand-dark-theme-text/90 text-brand-light-theme-text hover:text-brand-light-theme-text/90  font-bold flex items-center w-full  transition-colors"
                                    >
                                        <span className="mr-2">
                                            {isCategoryOpen(category.id) ? '▼' : '▶'}

                                        </span>
                                        {category.name}
                                    </button>
                                    
                                    <ul className={`space-y-2 pl-8 border-l dark:border-white/20 border-black/10 overflow-hidden transition-all duration-300 ${
                                        isCategoryOpen(category.id) ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}>
                                        {category.questions.map((question) => {
                                            const status = questionStatuses[question.id] || { viewed: false, rating: null };
                                            return (
                                                <li 
                                                    key={question.id}
                                                    className="relative"
                                                >
                                                    <div className="absolute -left-[21px] top-1/2 -translate-y-1/2 flex items-center">
                                                        <div 
                                                            className={`w-3 h-3 rounded-full border transition-colors duration-300 ${
                                                                !status.viewed ? 'dark:border-white/20 border-black/10 bg-transparent' :
                                                                status.rating === 'positive' ? 'border-green-500 bg-green-500' :
                                                                status.rating === 'negative' ? 'border-red-500 bg-red-500' :
                                                                'dark:border-white dark:bg-white bg-black/10 border-black/10'
                                                            }`}
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={() => handleQuestionChange(question.id)}
                                                        className={`text-xs text-left w-full ${
                                                            currentQuestionId === question.id
                                                                ? 'text-brand-light-theme-text dark:text-brand-dark-theme-text' 
                                                                : status.rating
                                                                    ? 'text-brand-light-theme-text/50 hover:text-brand-light-theme-text/80 dark:text-brand-dark-theme-text/50 dark:hover:text-brand-dark-theme-text/80'
                                                                    : 'text-brand-light-theme-text/50 hover:text-brand-light-theme-text/80 dark:text-brand-dark-theme-text/50 dark:hover:text-brand-dark-theme-text/80'

                                                        } transition-colors duration-200`}
                                                    >
                                                        {question.question}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto mb-4 px-2 text-brand-light-theme-text dark:text-brand-dark-theme-text">
                            <div className="flex items-center text-sm gap-4">
                                <div className="flex items-center gap-1">
                                    <AiFillLike className="text-green-500" />
                                    <span>{getProgressCounts(questionStatuses).likes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <AiFillDislike className="text-red-500" />
                                    <span>{getProgressCounts(questionStatuses).dislikes}</span>
                                </div>
                                <div className="ml-auto">
                                    {Object.keys(questionStatuses).length}/{allQuestions.length} viewed
                                </div>
                            </div>
                        </div>

                        <Button onClick={handleReset} className="w-full">
                            Reset Progress
                        </Button>
                    </div>
                </motion.nav>            
            )}

            {/* Main Content */}
            <main className={`
                flex-1 flex-col h-screen overflow-y-auto p-8 
                flex items-center justify-center relative
                transition-[margin,width] duration-300
                ${!showIntro ? 'md:ml-0 md:w-[calc(100%-340px)]' : 'w-full'}
                w-full ml-0
            `}>
                {showIntro ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-2xl mx-auto px-4 md:px-0 text-center"
                    >
                        <h2 className="text-4xl font-bold mb-6">Let's get started!</h2>
                        <p className="text-xl mb-8 ">
                            This is an overview of my skills and experience. Here you will find out my work methods, views, and opinions.
                        </p>

                        <Button onClick={handleStartQuestions}>
                            Start Process
                        </Button>
                    </motion.div>
                ) : (
                    <AnimatePresence mode="wait" custom={direction}>
                        {currentQuestionId && (
                            <motion.div
                                key={currentQuestionId}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 400, damping: 35 },
                                    opacity: { duration: 0.15 }
                                }}
                                className="w-full max-w-2xl mx-auto px-4 md:px-0"
                            >
                                <h2 className="text-2xl font-semibold mb-6">{currentQuestion?.question}</h2>
                                <p className="mb-8">{currentQuestion?.answer}</p>
                                
                                <div className="flex gap-4 mb-10">
                                    <Button
                                        onClick={() => handleRating(currentQuestion!.id, 'positive')}
                                        variant={questionStatuses[currentQuestion!.id]?.rating === 'positive' ? 'success' : 'primary'}
                                        className="flex items-center gap-2"
                                    >
                                        {questionStatuses[currentQuestion!.id]?.rating === 'positive' ? <AiFillLike /> : <AiOutlineLike />}
                                        <span>Like</span>
                                    </Button>
                                    <Button
                                        onClick={() => handleRating(currentQuestion!.id, 'negative')}
                                        variant={questionStatuses[currentQuestion!.id]?.rating === 'negative' ? 'danger' : 'primary'}
                                        className="flex items-center gap-2"
                                    >
                                        {questionStatuses[currentQuestion!.id]?.rating === 'negative' ? <AiFillDislike /> : <AiOutlineDislike />}
                                        <span>Dislike</span>
                                    </Button>
                                </div>
                                
                                {currentQuestion?.projects && currentQuestion.projects.length > 0 && (
                                    <div className="mt-6 mb-8">
                                        <h3 className="text-lg font-medium mb-6">Project Examples</h3>
                                        <div className="rounded-md overflow-hidden">
                                            <div className="divide-y divide-gray-200 dark:divide-brand-light-purple/20">
                                                {currentQuestion.projects.map((project, index) => (
                                                    <div key={index} className="py-4">
                                                        <div className="flex flex-col sm:flex-row sm:items-center">
                                                            <h4 className="font-medium text-base mb-3 sm:mb-0 sm:w-1/3">{project.title}</h4>
                                                            <div className="flex flex-wrap gap-3 sm:w-2/3 sm:justify-end">
                                                                <a 
                                                                    href={project.websiteUrl} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer"
                                                                    className="
                                                                        px-4 py-2 text-sm rounded-md transition-colors duration-200
                                                                        dark:bg-brand-dark-purple dark:border-brand-light-purple dark:text-brand-purple 
                                                                        bg-white border border-brand-light-purple text-brand-dark-purple 
                                                                        hover:bg-brand-purple hover:text-brand-dark-theme-text hover:border-brand-purple 
                                                                        dark:hover:bg-brand-purple dark:hover:text-brand-dark-theme-text dark:hover:border-brand-purple
                                                                    "
                                                                >
                                                                    View Live
                                                                </a>
                                                                {'projectUrl' in project && project.projectUrl && (
                                                                    <a 
                                                                        href={project.projectUrl}
                                                                        className="
                                                                            px-4 py-2 text-sm rounded-md transition-colors duration-200
                                                                            dark:bg-brand-dark-purple dark:border-brand-light-purple dark:text-brand-purple 
                                                                            bg-white border border-brand-light-purple text-brand-dark-purple 
                                                                            hover:bg-brand-purple hover:text-brand-dark-theme-text hover:border-brand-purple 
                                                                            dark:hover:bg-brand-purple dark:hover:text-brand-dark-theme-text dark:hover:border-brand-purple
                                                                        "
                                                                    >
                                                                        Project Details
                                                                    </a>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </main>
        </div>
    );
}
