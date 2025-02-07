export const categories = [
    { 
        id: 'experience',
        name: 'Experience',
        order: 1,
        questions: [
            {
                id: 'exp-1',
                question: "Describe your most challenging project and how you overcame obstacles.",
                answer: "Your answer here...",
                order: 1
            },
            {
                id: 'exp-2',
                question: "How do you handle tight deadlines and conflicting priorities?",
                answer: "I use Visual Studio Code as my primary development environment...",
                order: 2
            },
            {
                id: 'exp-3',
                question: "Tell me about a time you had to learn a new technology quickly.",
                answer: "Recently, I tackled performance issues in a large React application by implementing virtualization for long lists and optimizing render cycles through careful component memoization. This reduced load times by 60% and improved overall user experience.",
                order: 3
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
                answer: "I focus on key performance metrics like code splitting, lazy loading of images and components, minimizing bundle size, and using performance monitoring tools. I also implement caching strategies and optimize assets using modern image formats and compression techniques.",
                order: 2
            },
            {
                id: 'tech-3',
                question: "What are the benefits of using TypeScript over JavaScript?",
                answer: "I choose state management solutions based on project complexity. For simpler applications, I use React's built-in useState and useContext hooks. For larger applications, I implement Redux or Zustand, ensuring predictable state updates and efficient data flow.",
                order: 3
            },
            {
                id: 'tech-4',
                question: "Explain the differences between REST and GraphQL.",
                answer: "I ensure WCAG compliance by using semantic HTML, maintaining proper heading hierarchy, implementing ARIA labels, ensuring keyboard navigation, and testing with screen readers. I also use tools like axe for automated accessibility testing.",
                order: 4
            },
            {
                id: 'tech-5',
                question: "How do you optimize a slow-performing web application?",
                answer: "I implement a testing pyramid approach with unit tests using Jest, component testing with React Testing Library, integration tests, and end-to-end testing with Cypress. I focus on testing user behaviors rather than implementation details.",
                order: 5
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
                question: "Describe your approach to writing unit tests.",
                answer: "I begin with requirement analysis",
                order: 1
            },
            {
                id: 'work-2',
                question: "How do you handle code reviews and provide constructive feedback?",
                answer: "I follow Git Flow for version control, maintain clear commit messages, use feature branches, and implement PR templates. I emphasize thorough code reviews and maintain clear documentation for team collaboration.",
                order: 2
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
                answer: "I follow industry leaders on Twitter, read technical blogs, participate in developer communities, attend conferences when possible, and regularly experiment with new technologies through side projects.",
                order: 1
            },
            {
                id: 'background-2',
                question: "What personal projects have you worked on recently?",
                answer: "Recently, I've been exploring the React Server Components and how they change the approach to building React applications. I'm particularly interested in their impact on performance and developer experience.",
                order: 2
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
                answer: "I focus on data-driven discussions, create proof-of-concepts to demonstrate ideas, and always keep the project's goals in mind. I believe in finding consensus through open dialogue and respecting team members' perspectives.",
                order: 1
            },
            {
                id: 'collaboration-2',
                question: "How do you communicate technical concepts to non-technical stakeholders?",
                answer: "I regularly collaborate with design teams using tools like Figma, provide technical feedback on designs, and help bridge the gap between design and implementation. I value early involvement in the design process to ensure technical feasibility.",
                order: 2
            },
            {
                id: 'collaboration-3',
                question: "How do you handle disagreements about technical decisions?",
                answer: "I focus on data-driven discussions, create proof-of-concepts to demonstrate ideas, and always keep the project's goals in mind. I believe in finding consensus through open dialogue and respecting team members' perspectives.",
                order: 3
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