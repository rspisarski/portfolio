import { categories, getAllQuestions } from '../data/questions';
import { useState, useEffect } from 'react';
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai';
import { HiMenu, HiX } from 'react-icons/hi';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import { motion, AnimatePresence } from 'framer-motion';

interface QuestionStatus {
    viewed: boolean;
    rating: 'positive' | 'negative' | null;
}

export default function Questions() {
    // Track active category (the one containing current question)
    const [activeCategory, setActiveCategory] = useState<string>('');
    // Track manually opened category (via clicking)
    const [manuallyOpenCategory, setManuallyOpenCategory] = useState<string | null>(null);
    
    const allQuestions = getAllQuestions();
    
    const [currentQuestionId, setCurrentQuestionId] = useState<string>(allQuestions[0].id);
    const [questionStatuses, setQuestionStatuses] = useState<Record<string, QuestionStatus>>({});
    const [direction, setDirection] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Load saved statuses after mount
    useEffect(() => {
        const saved = getLocalStorage('questionStatuses');
        if (saved) {
            setQuestionStatuses(JSON.parse(saved));
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
        setQuestionStatuses(prev => ({
            ...prev,
            [currentQuestionId]: { ...prev[currentQuestionId], viewed: true }
        }));
    }, [currentQuestionId]);

    // Update active category when current question changes
    useEffect(() => {
        const currentQuestion = allQuestions.find(q => q.id === currentQuestionId);
        if (currentQuestion) {
            const category = categories.find(c => 
                c.questions.some(q => q.id === currentQuestionId)
            );
            if (category) {
                setActiveCategory(category.id);
            }
        }
    }, [currentQuestionId]);

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
        setCurrentQuestionId(allQuestions[0].id);
        setDirection(0);
        setManuallyOpenCategory(null);
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
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="fixed top-4 left-4 z-50 p-2 bg-white/10 backdrop-blur-sm rounded-md md:hidden"
            >
                {isMobileMenuOpen ? (
                    <HiX className="w-6 h-6 text-white" />
                ) : (
                    <HiMenu className="w-6 h-6 text-white" />
                )}
            </button>

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-brand-dark-purple/20 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
            
            {/* Sidebar Navigation */}
            <motion.nav 
                className={`
                    fixed md:relative w-[300px] h-screen 
                    flex flex-col items-start justify-start 
                    bg-brand-dark-purple/90 p-4 overflow-y-auto z-40
                    md:translate-x-0
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
                initial={false}
                animate={{ 
                    x: isClient ? (isMobile ? (isMobileMenuOpen ? 0 : -300) : 0) : 0,
                    transition: { type: "spring", stiffness: 300, damping: 30 }
                }}
            >
                <div className="flex flex-col h-full w-full">
                    <div className="flex flex-col mt-16 md:mt-0 mb-24">
                        <h1 className="text-4xl">
                            <a href="/" className="hover:text-brand-purple dark:hover:text-brand-light-purple transition-colors">
                                <span className="font-bold">Richard</span> Pisasrski
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
                                    className="text-brand-white font-medium flex items-center w-full hover:text-brand-light-purple/80 transition-colors"
                                >
                                    <span className="mr-2">
                                        {isCategoryOpen(category.id) ? '▼' : '▶'}
                                    </span>
                                    {category.name}
                                </button>
                                
                                <ul className={`space-y-2 pl-8 border-l border-white/20 overflow-hidden transition-all duration-300 ${
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
                                                        className={`w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
                                                            !status.viewed ? 'border-white/20 bg-transparent' :
                                                            status.rating === 'positive' ? 'border-green-500 bg-green-500' :
                                                            status.rating === 'negative' ? 'border-red-500 bg-red-500' :
                                                            'border-white bg-white'
                                                        }`}
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => handleQuestionChange(question.id)}
                                                    className={`text-xs text-left w-full ${
                                                        currentQuestionId === question.id
                                                            ? 'text-brand-light-purple' 
                                                            : 'text-white/80 hover:text-white'
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

                    <button
                        onClick={handleReset}
                        className="mt-8 w-full px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-white/80 hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        Reset Progress
                    </button>
                </div>
            </motion.nav>            

            {/* Main Content */}
            <main className={`
                flex-1 flex-col h-screen overflow-y-auto p-8 
                flex items-center justify-center relative
                transition-[margin,width] duration-300
                md:ml-0 md:w-[calc(100%-300px)]
                w-full ml-0
            `}>
                <AnimatePresence mode="wait" custom={direction}>
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
                        <h2 className="text-2xl font-semibold mb-4">{currentQuestion?.question}</h2>
                        <p className="mb-6">{currentQuestion?.answer}</p>
                        
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleRating(currentQuestion!.id, 'positive')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 
                                    ${questionStatuses[currentQuestion!.id]?.rating === 'positive' 
                                        ? 'bg-green-500 text-white' 
                                        : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white'
                                    }`}
                            >
                                {questionStatuses[currentQuestion!.id]?.rating === 'positive' ? <AiFillLike /> : <AiOutlineLike />}
                                <span>Like</span>
                            </button>
                            <button
                                onClick={() => handleRating(currentQuestion!.id, 'negative')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 
                                    ${questionStatuses[currentQuestion!.id]?.rating === 'negative' 
                                        ? 'bg-red-500 text-white' 
                                        : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white'
                                    }`}
                            >
                                {questionStatuses[currentQuestion!.id]?.rating === 'negative' ? <AiFillDislike /> : <AiOutlineDislike />}
                                <span>Dislike</span>
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}
