export const categories = [
    { 
        id: 'experience',
        name: 'Experience',
        order: 1,
        questions: [
            {
                id: 'exp-1',
                question: "Describe your transition from WordPress to more modern front-end technologies.",
                answer: "Your answer here...",
                order: 1
            },
            {
                id: 'exp-2',
                question: "How do you handle tight deadlines and conflicting priorities?",
                answer: "Your answer here...",
                order: 2
            },
            {
                id: 'exp-3',
                question: "Tell me about a time you had to learn a new technology quickly.",
                answer: "Your answer here...",
                order: 3
            },
            {
                id: 'exp-4',
                question: "How has your design background influenced your approach to front-end development?",
                answer: "Your answer here...",
                order: 4
            },
            {
                id: 'exp-5',
                question: "What's your experience with component-based architecture?",
                answer: "Your answer here...",
                order: 5
            }
        ]
    },
    {
        id: 'technical',
        name: 'Technical Skills',
        order: 2,
        questions: [
            {
                id: 'tech-1',
                question: "Explain the difference between `==` and `===` in JavaScript.",
                answer: "Your answer here...",
                order: 1
            },
            {
                id: 'tech-2',
                question: "Describe the concept of closures in JavaScript.",
                answer: "Your answer here...",
                order: 2
            },
            {
                id: 'tech-3',
                question: "What are the benefits of using React or similar frameworks over vanilla JavaScript?",
                answer: "Your answer here...",
                order: 3
            },
            {
                id: 'tech-4',
                question: "Explain how you'd implement responsive design without using a framework.",
                answer: "Your answer here...",
                order: 4
            },
            {
                id: 'tech-5',
                question: "How do you optimize a slow-performing web application?",
                answer: "Your answer here...",
                order: 5
            },
            {
                id: 'tech-6',
                question: "Describe your experience with CSS preprocessors and which one you prefer.",
                answer: "Your answer here...",
                order: 6
            },
            {
                id: 'tech-7',
                question: "How would you manage state in a complex React application?",
                answer: "Your answer here...",
                order: 7
            }
        ]
    },
    {
        id: 'work',
        name: 'Work Process',
        order: 3,
        questions: [
            {
                id: 'work-1',
                question: "Describe your approach to testing front-end code.",
                answer: "Your answer here...",
                order: 1
            },
            {
                id: 'work-2',
                question: "How do you handle code reviews and provide constructive feedback?",
                answer: "Your answer here...",
                order: 2
            },
            {
                id: 'work-3',
                question: "Walk me through your development process from receiving a design to deploying the finished product.",
                answer: "Your answer here...",
                order: 3
            },
            {
                id: 'work-4',
                question: "How do you approach debugging complex front-end issues?",
                answer: "Your answer here...",
                order: 4
            }
        ]
    },
    {
        id: 'background',
        name: 'Background',
        order: 4,
        questions: [
            {
                id: 'background-1',
                question: "What are your favorite resources for staying up-to-date with the latest frontend technologies?",
                answer: "Your answer here...",
                order: 1
            },
            {
                id: 'background-2',
                question: "What personal projects have you worked on recently?",
                answer: "Your answer here...",
                order: 2
            },
            {
                id: 'background-3',
                question: "How has your design degree influenced your approach to front-end development?",
                answer: "Your answer here...",
                order: 3
            },
            {
                id: 'background-4',
                question: "What motivated you to transition from WordPress to JavaScript frameworks?",
                answer: "Your answer here...",
                order: 4
            }
        ]
    },
    {
        id: 'collaboration',
        name: 'Collaboration',
        order: 5,
        questions: [
            {
                id: 'collaboration-1',
                question: "Describe a time you had to work with a difficult team member.",
                answer: "Your answer here...",
                order: 1
            },
            {
                id: 'collaboration-2',
                question: "How do you communicate technical concepts to non-technical stakeholders?",
                answer: "Your answer here...",
                order: 2
            },
            {
                id: 'collaboration-3',
                question: "How do you handle disagreements about technical decisions?",
                answer: "Your answer here...",
                order: 3
            },
            {
                id: 'collaboration-4',
                question: "How do you collaborate with designers to ensure successful implementation of UI/UX?",
                answer: "Your answer here...",
                order: 4
            }
        ]
    },
    {
        id: 'frameworks',
        name: 'JavaScript Frameworks',
        order: 6,
        questions: [
            {
                id: 'frameworks-1',
                question: "Compare React, Vue, and Angular. Which do you prefer and why?",
                answer: "Your answer here...",
                order: 1
            },
            {
                id: 'frameworks-2',
                question: "Explain the concept of virtual DOM and its benefits.",
                answer: "Your answer here...",
                order: 2
            },
            {
                id: 'frameworks-3',
                question: "How do you handle routing in a single-page application?",
                answer: "Your answer here...",
                order: 3
            },
            {
                id: 'frameworks-4',
                question: "Describe your experience with Next.js or similar meta-frameworks.",
                answer: "Your answer here...",
                order: 4
            },
            {
                id: 'frameworks-5',
                question: "How do you approach learning a new JavaScript framework?",
                answer: "Your answer here...",
                order: 5
            }
        ]
    }
] as const;

// Helper function to get all questions in display order
export const getAllQuestions = () => {
    return categories.flatMap(category => 
        category.questions.map(question => ({
            ...question,
            category: category.name
        }))
    );
};