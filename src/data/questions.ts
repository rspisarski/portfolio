export const categories = [
    { 
        id: 'experience',
        name: 'Experience',
        order: 1,
        questions: [
            {
                id: 'exp-1',
                question: "How many years of experience do you have?",
                answer: "Your answer here...",
                order: 1
            },
            {
                id: 'exp-2',
                question: "What is your preferred development environment?",
                answer: "I use Visual Studio Code as my primary development environment...",
                order: 2
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
                question: "What technologies do you specialize in?",
                answer: "Your answer here...",
                order: 1
            },
            {
                id: 'tech-2',
                question: "How do you optimize website performance and loading times?",
                answer: "I focus on key performance metrics like code splitting, lazy loading of images and components, minimizing bundle size, and using performance monitoring tools. I also implement caching strategies and optimize assets using modern image formats and compression techniques.",
                order: 2
            },
            {
                id: 'tech-3',
                question: "How do you approach responsive design and mobile-first development?",
                answer: "I start with mobile layouts first and progressively enhance the design for larger screens using CSS media queries. I utilize modern CSS features like Flexbox and Grid, along with responsive units (rem, vh/vw) to ensure consistent layouts across devices.",
                order: 3,
                category: "Technical Skills"
            },
            {
                id: 'tech-4',
                question: "How do you handle state management in React applications?",
                answer: "I choose state management solutions based on project complexity. For simpler applications, I use React's built-in useState and useContext hooks. For larger applications, I implement Redux or Zustand, ensuring predictable state updates and efficient data flow.",
                order: 4,
                category: "Technical Skills"
            },
            {
                id: 'tech-5',
                question: "What's your experience with CSS preprocessors and which do you prefer?",
                answer: "I'm experienced with both Sass and Less, but prefer Sass for its extensive features and community support. However, with modern CSS features and tools like PostCSS, I often opt for vanilla CSS with Tailwind CSS for rapid development.",
                order: 5,
                category: "Technical Skills"

            },
            {
                id: 'tech-6',
                question: "How do you implement accessibility in your web applications?",
                answer: "I ensure WCAG compliance by using semantic HTML, maintaining proper heading hierarchy, implementing ARIA labels, ensuring keyboard navigation, and testing with screen readers. I also use tools like axe for automated accessibility testing.",
                order: 6,
                category: "Technical Skills"
            },
            {
                id: 'tech-7',
                question: "Describe a challenging technical problem you solved recently",
                answer: "Recently, I tackled performance issues in a large React application by implementing virtualization for long lists and optimizing render cycles through careful component memoization. This reduced load times by 60% and improved overall user experience.",
                order: 7,
                category: "Work Process"
            },
            {
                id: 'tech-8',
                question: "How do you debug frontend issues in production environments?",
                answer: "I use a combination of error tracking tools like Sentry, browser DevTools, and logging strategies. I also implement source maps for production debugging and utilize monitoring tools to track user interactions and error patterns.",
                order: 8,
                category: "Work Process"
            },
            {
                id: 'tech-9',
                question: "What's your approach to cross-browser compatibility issues?",
                answer: "I use tools like Browserlist and PostCSS to ensure CSS compatibility, implement feature detection rather than browser detection, and maintain a comprehensive testing strategy across different browsers using tools like BrowserStack.",
                order: 9,
                category: "Work Process"
            },
            {
                id: 'tech-10',
                question: "How do you handle API integration and error states?",
                answer: "I implement robust error handling using try-catch blocks, display meaningful error messages to users, and implement retry mechanisms where appropriate. I also use tools like React Query for efficient API state management and caching.",
                order: 10,
                category: "Work Process"
            },
            {
                id: 'tech-11',
                question: "Tell me about a time you had to refactor complex legacy code",
                answer: "I led a project to modernize a jQuery-based application to React, implementing the strangler pattern to gradually replace functionality while maintaining business operations. This included setting up automated tests and documentation to ensure smooth transition.",
                order: 11,
                category: "Work Process"
            },
            {
                id: 'tech-12',
                question: "What's your typical workflow when starting a new feature?",
                answer: "I begin with requirement analysis, create technical specifications, break down tasks into smaller components, and implement with a TDD approach where appropriate. I maintain regular communication with stakeholders and document my progress.",
                order: 12,
                category: "Work Process"
            },
            {
                id: 'tech-13',
                question: "How do you ensure code quality in your projects?",
                answer: "I use ESLint and Prettier for code formatting, implement pre-commit hooks, write unit and integration tests, and conduct regular code reviews. I also follow established coding standards and maintain comprehensive documentation.",
                order: 13,
                category: "Work Process"
            },
            {
                id: 'tech-14',
                question: "What testing strategies do you implement in frontend development?",
                answer: "I implement a testing pyramid approach with unit tests using Jest, component testing with React Testing Library, integration tests, and end-to-end testing with Cypress. I focus on testing user behaviors rather than implementation details.",
                order: 14,
                category: "Work Process"
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
                question: "How do you handle version control and collaborate with other developers?",
                answer: "I follow Git Flow for version control, maintain clear commit messages, use feature branches, and implement PR templates. I emphasize thorough code reviews and maintain clear documentation for team collaboration.",
                order: 15,
                category: "Collaboration"
            },
            {
                id: 'work-2',
                question: "What's your approach to documentation?",
                answer: "I maintain up-to-date README files, use JSDoc for code documentation, create Storybook stories for components, and keep a centralized wiki for project knowledge. I believe in 'documentation as code' and keep it close to the relevant code.",
                order: 16,
                category: "Collaboration"
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
                question: "How do you stay updated with frontend development trends?",
                answer: "I follow industry leaders on Twitter, read technical blogs, participate in developer communities, attend conferences when possible, and regularly experiment with new technologies through side projects.",
                order: 17,
                category: "Background"
            },
            {
                id: 'background-2',
                question: "What's the most interesting thing you've learned recently?",
                answer: "Recently, I've been exploring the React Server Components and how they change the approach to building React applications. I'm particularly interested in their impact on performance and developer experience.",
                order: 18,
                category: "Background"
            },
            {
                id: 'background-3',
                question: "Where do you see frontend development heading in the next few years?",
                answer: "I see increased adoption of edge computing, continued evolution of meta-frameworks like Next.js, and greater emphasis on performance and accessibility. I also expect AI-driven development tools to play a larger role.",
                order: 19,
                category: "Background"
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
                question: "How do you handle disagreements about technical decisions?",
                answer: "I focus on data-driven discussions, create proof-of-concepts to demonstrate ideas, and always keep the project's goals in mind. I believe in finding consensus through open dialogue and respecting team members' perspectives.",
                order: 20,
                category: "Collaboration"
            },
            {
                id: 'collaboration-2',
                question: "What's your experience working with designers and UX teams?",
                answer: "I regularly collaborate with design teams using tools like Figma, provide technical feedback on designs, and help bridge the gap between design and implementation. I value early involvement in the design process to ensure technical feasibility.",
                order: 21,
                category: "Collaboration"
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