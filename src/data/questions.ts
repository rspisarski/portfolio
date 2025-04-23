export const categories = [
    { 
        id: 'wordpress',
        name: 'WordPress Development',
        order: 1,
        questions: [
            {
                id: 'wp-1',
                question: "Describe your experience with developing custom WordPress plugins and themes.",
                answer: "I've developed numerous custom WordPress plugins and themes focused on creating reusable components that enhance site functionality. My approach emphasizes clean, maintainable code that separates concerns and follows WordPress best practices. I particularly enjoy building modular theme systems where components can be shared across different implementations while maintaining unique styling per brand.",
                order: 1
            },
            {
                id: 'wp-2',
                question: "What strategies do you use to optimize WordPress site performance?",
                answer: "My performance optimization strategy includes implementing efficient database queries, setting up proper caching mechanisms (page, object, and browser caching), optimizing images through compression and lazy loading, minifying CSS/JS files, and leveraging CDNs. I regularly conduct performance audits to identify bottlenecks and implement solutions like critical CSS loading and deferred JavaScript execution.",
                order: 2
            },
            {
                id: 'wp-3',
                question: "How do you approach creating reusable components in WordPress?",
                answer: "I leverage Advanced Custom Fields (ACF) to build reusable components through flexible content fields and repeaters. This approach allows me to create a consistent component library where each module has standardized settings for spacing, colors, and content options. By using ACF, I empower content editors to build pages with drag-and-drop simplicity while maintaining design consistency. The components remain flexible across different implementations while sharing a unified codebase and styling architecture.",
                order: 3
            }
        ]
    },
    {
        id: 'templates',
        name: 'Templates & Data Management',
        order: 2,
        questions: [
            {
                id: 'temp-1',
                question: "Explain your approach to creating versatile templates for landing pages.",
                answer: "I develop templates with modular sections that can be mixed and matched based on campaign needs. Each template is built with conversion principles in mind—clear visual hierarchy, prominent CTAs, and appropriate whitespace. I implement a system of content fields that marketing teams can easily populate without touching code, while ensuring the design remains cohesive regardless of content length or image choices.",
                order: 1
            },
            {
                id: 'temp-2',
                question: "How do you handle data formatting for imports across multiple landing pages?",
                answer: "I create standardized data structures with clear documentation on required fields and formats. For imports, I develop preprocessing scripts that validate and transform incoming data to match template requirements, handling edge cases like missing fields or oversized content. This approach allows marketing teams to work with familiar tools like spreadsheets while ensuring the data integrates seamlessly with our landing page system.",
                order: 2
            },
            {
                id: 'temp-3',
                question: "Describe your experience with building page import workflows.",
                answer: "I've managed hundreds of locations and products through efficient CSV import processes. I create templated Excel sheets with clear formatting requirements and column structures that match our WordPress data model. This approach allows non-technical team members to maintain large datasets while ensuring data consistency. I implement server-side validation during imports to catch formatting errors and data inconsistencies, which significantly reduces post-import troubleshooting and maintenance requirements.",
                order: 3
            }
        ]
    },
    {
        id: 'technical',
        name: 'Technical Skills & SEO',
        order: 3,
        questions: [
            {
                id: 'tech-1',
                question: "How do you implement SEO best practices in WordPress development?",
                answer: "I integrate SEO throughout development with proper semantic HTML structure, optimized site architecture, mobile responsiveness, and clean URL structures. I implement schema markup for rich snippets, create XML sitemaps, and ensure technical SEO elements like minimized server response times and proper redirects are in place. When marketing teams provide SEO plans, I ensure their implementation is technically sound and follows best practices.",
                order: 1
            },
            {
                id: 'tech-2',
                question: "Explain how you'd build a modular component system in WordPress that could be shared across multiple brand sites.",
                answer: "I'd implement a parent-child theme architecture with a custom plugin containing shared functionality. Components would be developed as Gutenberg blocks with configuration options for brand-specific styling. I'd create a centralized asset management system to prevent duplication while allowing for brand-specific overrides, and use custom post types with standardized meta fields to ensure data consistency while maintaining flexibility.",
                order: 2
            },
            {
                id: 'tech-3',
                question: "What methods do you use to ensure cross-browser compatibility and responsive design?",
                answer: "I follow mobile-first methodology with fluid layouts and flexible grids. I implement progressive enhancement, starting with solid HTML and adding features based on browser support. I use feature detection rather than browser detection, set breakpoints based on content rather than devices, and test extensively across browser matrices. For complex interfaces, I create component-specific responsive behaviors rather than relying solely on global breakpoints.",
                order: 3
            }
        ]
    },
    {
        id: 'collaboration',
        name: 'Collaboration & Process',
        order: 4,
        questions: [
            {
                id: 'collab-1',
                question: "How do you collaborate with marketing teams to implement their analytics requirements?",
                answer: "I work closely with marketing teams to understand their analytics needs and implement their tracking plans accurately. This involves setting up event tracking, conversion goals, and custom dimensions in various analytics platforms. I ensure proper data layer implementation for tag management systems, verify tracking accuracy through testing, and document implementation details so marketing teams can confidently analyze the data they receive.",
                order: 1
            },
            {
                id: 'collab-2',
                question: "Describe your approach to receiving and implementing design feedback for web projects.",
                answer: "I approach design feedback collaboratively while working within established brand guidelines. When feedback is provided, I implement the requested changes efficiently, but if I notice potential conflicts with brand standards, I address these concerns constructively. I focus on maintaining a collaborative approach with clients and team members to ensure landing pages maintain brand consistency while meeting specific project goals. This balance between accommodating feedback and preserving brand integrity leads to both client satisfaction and cohesive design outcomes.",
                order: 2
            },
            {
                id: 'collab-3',
                question: "How do you manage multiple web development projects simultaneously while meeting deadlines?",
                answer: "I use project management tools to track tasks and dependencies, implement time blocking for focused development work, and maintain detailed documentation to minimize context-switching. I prioritize based on both urgency and impact, identify potential bottlenecks early, and communicate proactively about timeline adjustments when necessary. I've developed reusable code libraries to accelerate common development tasks while maintaining quality.",
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