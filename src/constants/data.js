import { PROFILE } from './profile'


/* nav */
export const NAV_PAGES = [
    { key: 'home',       label: 'Home',        emoji: '🏠', icon: 'dog-love.webp' },
    { key: 'experience', label: 'Experiences',  emoji: '⭐' },
    { key: 'projects',   label: 'Projects',    emoji: '💻', icon: 'bingo-wink.png' },
    { key: 'resume',     label: 'Resume',      emoji: '📄' },
    { key: 'artwork',    label: 'Artworks',     emoji: '🎨' },
    { key: 'about',      label: 'About',       emoji: '🐶', icon: 'avatar1.png' },
]

export const TYPEWRITER_TITLES = PROFILE.titles

/* bio */
export const BIO = [
    "Hi 👋 I'm Weiting (you can call me Vicky)! I'm pursuing a Master's in Computer Science at Northeastern University, and I'm currently looking for Software Engineer opportunities for 2027.",

    "Before computer science, I earned a BFA in Animation & Computer Graphics 🎨 — years spent paying attention to how things look, move, and feel to the people using them. I care about both the technical and the human side of what I build, and I work well with both designers and engineers. I'm passionate about leveraging technology to solve real-world problems and continuously seeking opportunities to grow and contribute to innovative projects.",

    "I build full-stack web apps in React, backend services in Java/Spring and Node, and I've worked on a few NLP/ML projects too. I like taking something from a blank file all the way to a finished, working product that people actually enjoy using.",
]

/* experience */
export const EXPERIENCES = [
    {
        company: 'Huibo Robotics Technology Co., Ltd.', role: 'Software Engineer Intern', period: 'May 2025 – Sept 2025',
        emoji: '💻', color: 'pink', current: true,
        points: [
            'Designed a real-time robot status monitoring dashboard with React and WebSocket.',
            'Implemented APIs with Spring Boot to expose telemetry and control data.',
            'Stored robot telemetry logs and event records in PostgreSQL.',
        ],
    },

    {
        company: 'Deluxeton Homes LLC', role: 'Interior Designer', period: 'Jun 2023 – Aug 2024',
        emoji: '🏠', color: 'mint',
        points: [
            'Wrote Python automation scripts for material cost analysis & reporting',
            'Built detailed CAD drawings, floor plans and 3D models in Autodesk tools',
            'Presented design concepts to clients and iterated from feedback',
        ],
    },
    {
        company: 'Deluxeton Homes LLC', role: 'Web Developer', period: 'May 2022 – Aug 2022',
        emoji: '💻', color: 'caramel',
        points: [
            'Built responsive web pages with HTML, CSS & Bootstrap from design specs',
            'Created reusable page templates and UI components in JavaScript for consistency',
            'Developed back-end APIs and data models with Node.js and MongoDB',
            'Coordinated web asset art direction to keep brand visuals consistent',
        ],
    },
    {
        company: 'Dezure Development', role: 'Architectural Intern', period: 'May 2021 – Aug 2021',
        emoji: '📐', color: 'sky',
        points: [
            'Produced concept sketches and visual proposals from client briefs',
            'Researched materials, dimensions and specs; flagged early structural issues',
        ],
    },
    {
        company: 'First Fine Art & Design Academy', role: 'Teaching Assistant', period: 'May 2020 – Aug 2020',
        emoji: '👩‍🏫', color: 'pink',
        points: [
            'Gave 1-on-1 guidance on technical animation, adapting to each learner',
            'Helped professors build materials and run class sessions',
        ],
    },
]

/* projects */
export const PROJECTS = [

    {
        title: 'Secure Reliable File Transfer', emoji: '🔐', year: '2026', color: 'mint',
        metric: 'raw sockets, from scratch',
        tags: ['Python', 'Raw Sockets', 'AES-GCM', 'HMAC'],
        blurb: 'A secure, reliable file-transfer protocol built on raw UDP sockets from scratch.',
        keywords: 'networking network programming computer networks socket programming sockets raw sockets udp tcp ip transport layer transport protocol protocol design custom protocol packet datagram header checksum sequence number acknowledgment ack retransmission timeout go-back-n sliding window reliability reliable delivery packet loss flow control cybersecurity security cryptography encryption decryption authenticated encryption aead aes aes-256 gcm symmetric encryption key exchange handshake psk pre-shared key hkdf key derivation hmac message authentication sha-256 sha256 md5 hashing hash verification integrity data integrity replay attack replay protection systems programming low level multithreading threads concurrency concurrent aws ec2 cloud distributed systems secure communication infosec',
        link: 'https://github.com/vickyliuwt/Secure_Reliable_File_Transfer',
        highlights: [
            'Constructed IP & UDP headers manually with SOCK_RAW sockets',
            'Reliability via checksums, sequence/ack numbers and timeout retransmission',
            'Security layer: PSK handshake, AES-GCM AEAD encryption and replay protection',
            'End-to-end SHA-256 verification; tested on AWS with 2–4% simulated packet loss',
        ],
    },
    {
        title: 'Quora Duplicate Questions', emoji: '🧠', year: '2026', color: 'caramel',
        metric: '81.67% accuracy',
        tags: ['Python', 'scikit-learn', 'PyTorch', 'NLP'],
        blurb: 'Detecting duplicate questions across 404K Quora pairs with three ML approaches.',
        keywords: 'machine learning ml deep learning artificial intelligence ai natural language processing nlp text classification semantic similarity sentence similarity duplicate detection paraphrase detection question pairs data science data mining feature engineering feature extraction model training benchmarking classification classifier supervised learning scikit-learn sklearn pytorch nltk gensim tf-idf tfidf logistic regression word2vec glove word embeddings embeddings siamese network siamese lstm lstm rnn recurrent neural network neural network accuracy auc roc recall precision evaluation metrics preprocessing pipeline python dataset large dataset',
        link: 'https://github.com/vickyliuwt/Duplicate_Question_Detection',
        highlights: [
            'TF-IDF + Logistic Regression with handcrafted features — 81.67% accuracy (best)',
            'Compared Word2Vec vs GloVe embeddings for semantic similarity',
            'Built a Siamese LSTM in PyTorch capturing word order',
            'Shared preprocessing pipeline with unit tests and an interactive demo',
        ],
    },
    {
        title: 'Kambaz LMS', emoji: '📚', year: '2025', color: 'peach',
        metric: 'live demo',
        tags: ['Next.js', 'React', 'TypeScript', 'Redux', 'Node.js', 'Express', 'MongoDB'],
        blurb: 'A full-stack Canvas-style learning-management system with role-based access for faculty and students.',
        keywords: 'full stack fullstack web development web application web app frontend front end backend back end mern mern stack rest restful rest api api crud http endpoints web services authentication authorization role based access control rbac access control routing protected routes login session state management redux redux toolkit react hooks spa single page application server side rendering ssr next.js react typescript node node.js express express.js mongodb mongodb atlas nosql database bootstrap react-bootstrap responsive design responsive ui learning management system lms education edtech canvas deployment vercel production git version control',
        link: 'https://kambaz-next-js-vicky-a6.vercel.app/Account/Signin',
        highlights: [
            'Next.js + React (TypeScript) front end with Redux Toolkit state and Bootstrap styling',
            'Node/Express REST API backed by MongoDB (Atlas), deployed to the web',
            'Auth and role-based access for faculty vs. students',
            'Courses, modules, assignments and grading flows end-to-end',
        ],
    },
    {
        title: 'Memer', emoji: '😹', year: '2025', color: 'sky',
        metric: 'native iOS · Firebase',
        tags: ['Swift', 'UIKit', 'Firebase', 'Firestore', 'MVC'],
        blurb: 'A native iOS meme generator and social app — pick a template or photo, drop on draggable text, then share to friends or a live trending feed.',
        keywords: 'ios ios development mobile mobile development mobile app native app native ios apple iphone app development swift uikit xcode mvc model view controller firebase firebase auth authentication firestore cloud firestore firebase storage real time realtime real-time database snapshot listeners cloud baas backend as a service social app social media social network feed trending chat messaging friend requests image processing image editing canvas draggable gestures pinch to zoom camera photo library sensors image rendering uigraphicsimagerenderer meme generator meme sessionmanager caching',
        link: 'https://github.com/vickyliuwt/Memer',
        highlights: [
            'Built in Swift/UIKit on a clean MVC architecture with hand-coded views (no storyboards)',
            'Meme editor with draggable, pinch-to-resize text overlays flattened via UIGraphicsImageRenderer',
            'Firebase Auth, Firestore & Storage power sign-up, saved memes, friend requests and a real-time meme chat',
            'Camera & photo-library capture (sensor integration), a reaction-based trending feed, and the iOS share sheet',
        ],
    },
    {
        title: 'Adventure Game Engine', emoji: '🗺️', year: '2025', color: 'mint',
        metric: 'MVC · 3 play modes',
        tags: ['Java', 'Swing', 'MVC', 'JSON', 'JUnit'],
        blurb: 'A text-and-graphics adventure game engine with an asynchronous, event-driven controller and three swappable interfaces.',
        keywords: 'java object oriented object-oriented programming oop ood design patterns software design software architecture architecture interface abstraction encapsulation mvc model view controller event driven event-driven asynchronous async callback observer pattern command pattern listener gui graphical user interface desktop app desktop application java swing swing awt ui game game engine game development gamedev text adventure interactive fiction batch mode cli command line command-line json serialization save load persistence state management junit unit testing testing test driven tdd exception handling error handling',
        link: 'https://github.com/vickyliuwt/Adventure_Game_Engine',
        highlights: [
            'Designed on a clean MVC split — an IGameModel core, an event-driven AsyncController, and views behind one IUserInterface',
            'Hand-built the full Java Swing GUI (room rendering, navigation, inventory, menus) without UI-designer tools',
            'Supported text, graphics and batch modes via command-line args, with save/restore across all three',
            'Replaced blocking loops with a CommandListener callback interface and graceful in-view exception handling',
        ],
    },
    {
        title: 'AnimHub', emoji: '🎬', year: '2026', color: 'pink', featured: false,
        metric: '68% faster search',
        tags: ['Java', 'Spring Boot', 'PostgreSQL', 'React', 'AWS', 'Docker', 'CI/CD'],
        blurb: 'An animation asset-management platform — upload, search, tag, and version control across distributed production teams.',
        keywords: 'backend back end full stack fullstack microservices service oriented layered architecture distributed distributed systems scalable scalability system design rest restful rest api api endpoints web services http crud java spring spring boot spring mvc database postgresql postgres sql relational database indexing gin index composite index query optimization performance latency search react frontend front end web app aws s3 cloudfront cdn cloud cloud computing object storage content delivery docker containers containerization ci cd ci/cd continuous integration continuous deployment continuous delivery github actions devops ec2 deployment rolling deployment asset management digital asset management dam version control versioning tagging animation pipeline media',
        link: '',
        highlights: [
            'Exposed 25+ RESTful endpoints on a layered Spring Boot service (upload, search, tagging, versioning)',
            'Modeled assets, versions & users in PostgreSQL with composite + GIN indexes — cut search latency 68% (420ms → 135ms) over a 10K+ asset catalog',
            'Served assets from AWS S3 with CloudFront CDN for fast preview & download',
            'Containerized with Docker, released via GitHub Actions CI/CD with rolling deploys to AWS EC2',
        ],
    },
    {
        title: 'NotifyFlow', emoji: '🔔', year: '2026', color: 'sky', featured: false,
        metric: 'burst-traffic ready',
        tags: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'MySQL', 'Kubernetes', 'AWS'],
        blurb: 'An event-driven notification service that publishes user activity to Kafka and delivers alerts asynchronously at scale.',
        keywords: 'backend back end distributed distributed systems microservices scalable scalability high availability system design event driven event-driven event driven architecture eda message queue message broker pub sub publish subscribe streaming async asynchronous decoupled java spring spring boot kafka apache kafka event streaming topics producer consumer redis caching cache in memory rate limiting deduplication throttling mysql sql relational database database indexing audit log retries notification notification service alerts messaging delivery kubernetes k8s eks pods autoscaling orchestration containers cloud native cloud-native aws lambda serverless cloud devops',
        link: '',
        highlights: [
            'Published user-activity events to Kafka topics for async, decoupled delivery',
            'Added Redis caching for deduplication + rate limiting to stop duplicate alerts under bursty load',
            'Persisted delivery status in MySQL with indexed queries for audit trails and automated retries',
            'Ran on AWS EKS with Kubernetes pod autoscaling; triggered AWS Lambda for async dispatch',
        ],
    },
    {
        title: 'PortfolioSpace', emoji: '🖼️', year: '2025', color: 'sun',
        metric: 'secure media streaming',
        tags: ['React', 'Node.js', 'Express', 'MongoDB', 'AWS S3', 'Agile'],
        blurb: 'A creative-portfolio web app for uploading and discovering animation & design work.',
        keywords: 'full stack fullstack mern mern stack web development web application web app frontend front end backend back end rest restful rest api api crud endpoints web services react node node.js express express.js mongodb nosql database schema keyword search search aws s3 object storage cloud presigned url signed url access control secure media streaming video streaming streaming reel agile scrum agile development sprint unit testing integration testing testing ci cd ci/cd github actions continuous integration portfolio media platform content platform upload discovery animation design portfolio',
        link: '',
        highlights: [
            'Built a React front end with a Node/Express backend for upload and discovery',
            'Modeled portfolios & profiles in MongoDB with flexible schemas + keyword search',
            'Configured AWS S3 with presigned-URL access control for secure reel streaming',
            'Shipped iteratively in Agile/Scrum with unit + integration tests in GitHub Actions',
        ],
    },
]

/* skills */
export const SKILLS = [
    'Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'C#', 'SQL', 'Go',
    'Spring Boot', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'FastAPI',
    'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Kafka',
    'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Figma',
]

/* stats */
export const STATS = [
    { num: '4.0',    label: 'GPA (4.0 scale)' },
    { num: '5+',      label: 'Projects built' },
    { num: '3+',      label: 'Roles held' },
    { num: '∞',      label: 'Dogs loved' },
]

/* categories */
export const ART_CATEGORIES = ['All', 'Drawing', 'Painting', 'Animation', 'Modeling', 'Design']

/* artwork */
export const ARTWORKS = [
    // Drawing
    { title: 'Sketch', category: 'Drawing',   medium: 'Graphite', year: '2024', img: 'artworks/11.jpg', size: '18in x 24in', emoji: '✏️', color: 'mint' },
    { title: 'Still Life',        category: 'Drawing',   medium: 'Graphite',         year: '2024', img: 'artworks/7.jpg', size: '18in x 24in', emoji: '🔍', color: 'sky' },
    { title: 'Sketch',       category: 'Drawing',   medium: 'Graphite',              year: '2024', img: 'artworks/5.jpg', size: '16in x 20in',  emoji: '🖊️', color: 'sun' },
    { title: 'Portrait', category: 'Drawing',   medium: 'Graphite', year: '2025', img: 'artworks/8.jpg', size: '18in x 24in',emoji: '✏️', color: 'mint' },
    { title: 'ScratchBoard', category: 'Drawing',   medium: 'ScratchBoard', year: '2024', img: 'artworks/1.jpg', size: '18in x 24in', emoji: '✏️', color: 'cream' },
    { title: 'ScratchBoard', category: 'Drawing',   medium: 'Color pencil', year: '2024', img: 'artworks/2.jpg', size: '24in x 36in', emoji: '✏️', color: 'sky' },
    { title: 'Charcoal', category: 'Drawing',   medium: 'Charcoal', year: '2023', img: 'artworks/4.jpg', size: '18in x 24in', emoji: '✏️', color: 'pink' },
    { title: 'Sketch', category: 'Drawing',   medium: 'Graphite', year: '2022', img: 'artworks/31.jpeg', size: '18in x 24in', emoji: '✏️', color: 'orange' },
    { title: 'Wilderness',    category: 'Painting',  medium: 'Digital paint',    year: '2025', img: 'artworks/6.jpg', size: '18in x 24in',    emoji: '🎨', color: 'sky' },
    { title: 'Aqua florals',    category: 'Painting',  medium: 'Color pencil',    year: '2018', img: 'artworks/32.jpg', size: '18in x 24in',   emoji: '🎨', color: 'pink-ink' },
    { title: 'Shells',    category: 'Painting',  medium: 'Color pencil',    year: '2018', img: 'artworks/15.jpg', size: '18in x 24in',   emoji: '🎨', color: 'pink-ink' },
    { title: 'ToyStory',    category: 'Painting',  medium: 'Color pencil',    year: '2018', img: 'artworks/34.jpg', size: '18in x 24in',   emoji: '🎨', color: 'pink-ink' },
    { title: 'Jellyfish',    category: 'Painting',  medium: 'Color pencil',    year: '2019', img: 'artworks/14.jpg', size: '18in x 24in',   emoji: '🎨', color: 'pink-ink' },

    // Painting
    { title: 'Duck Stamp',    category: 'Painting',  medium: 'Acrylic',    year: '2020', img: 'artworks/9.jpg', size: '9in x 12in',   emoji: '🎨', color: 'sky' },
    { title: 'Nature',    category: 'Painting',  medium: 'Oil painting',    year: '2025', img: 'artworks/13.jpg', size: '16in x 20in',   emoji: '🎨', color: 'peach' },
    { title: 'Dusk',       category: 'Painting',  medium: 'Acrylic',          year: '2024', img: 'artworks/20.jpg', size: '16in x 20in',  emoji: '🖌️', color: 'pink' },
    { title: 'Reflection',    category: 'Painting',  medium: 'Acrylic',    year: '2023', img: 'artworks/27.jpg', size: '16in x 20in',   emoji: '🎨', color: 'mint' },
    { title: 'Blossom',    category: 'Painting',  medium: 'Oil painting',    year: '2023', img: 'artworks/10.jpg', size: '18in x 24in',    emoji: '🎨', color: 'caramel' },
    { title: 'Bird',    category: 'Painting',  medium: 'Oil painting',    year: '2022', img: 'artworks/19.jpg', size: '16in x 20in',   emoji: '🎨', color: 'cream' },
    { title: 'Pattern',    category: 'Painting',  medium: 'Acrylic',    year: '2020', img: 'artworks/30.jpg', size: '24in x 36in',   emoji: '🎨', color: 'cream' },
    { title: 'Melody',    category: 'Painting',  medium: 'Watercolor',    year: '2019', img: 'artworks/3.jpg', size: '18in x 24in',   emoji: '🎨', color: 'sky' },
    { title: 'Spring',    category: 'Painting',  medium: 'Watercolor',    year: '2018', img: 'artworks/12.jpg', size: '18in x 24in',   emoji: '🎨', color: 'pink' },
    { title: 'Summer',    category: 'Painting',  medium: 'Watercolor',    year: '2018', img: 'artworks/17.jpg', size: '18in x 24in',   emoji: '🎨', color: 'pink-ink' },
    { title: 'Fall',    category: 'Painting',  medium: 'Watercolor',    year: '2018', img: 'artworks/26.jpg', size: '18in x 24in',   emoji: '🎨', color: 'pink-ink' },
    { title: 'Winter',    category: 'Painting',  medium: 'Watercolor',    year: '2018', img: 'artworks/18.jpg', size: '18in x 24in',   emoji: '🎨', color: 'pink-ink' },

    // Animation
    { title: 'Demo', category: 'Animation', medium: 'Animation', year: '2025', drive: '1uyMGea4vt5GySfjh4ZI-zdaJaNl4cIwd', size: '1080p', emoji: '🎬', color: 'caramel' },
    { title: 'The Sample',       category: 'Animation', medium: '3D animation',     year: '2024', drive: '1tSUY90laDGNBropuuu_uXDkOTlPESEU9',       size: '1080p', emoji: '🐾', color: 'mint' },
    { title: 'Rainbow',       category: 'Animation', medium: '3D animation',     year: '2024', drive: '1j1XcL4VDcR7ril33akNGV4qF03HBVaX7',       size: '1080p', emoji: '🐾', color: 'pink' },
    { title: 'Furnished',       category: 'Animation', medium: '3D animation',     year: '2024', drive: '1GjPvyVLDyarm9fuaI9ZyKOou5ndFZYHw',       size: '1080p', emoji: '🐾', color: 'pink' },
    { title: 'Shadow Glow',       category: 'Animation', medium: '2D animation',     year: '2024', drive: '17o8FGhDpsa3HyqavJ9aNKcIMwFmJS2Ud',       size: '1080p', emoji: '🐾', color: 'pink' },
]

/* capsules */
export const CAPSULES = [
    { icon: '💻', title: 'Full-Stack',     text: 'Comfortable across the whole stack.', rarity: 'blue' },
    { icon: '🚀', title: 'Ships Fast',      text: 'Loves shipping and iterating.',        rarity: 'blue' },
    { icon: '☕', title: 'Caffeine++',      text: 'Runs on coffee & curiosity.',          rarity: 'blue' },
    { icon: '🤝', title: 'Team Player',     text: 'Clear PRs, kind code reviews.',        rarity: 'blue' },
    { icon: '🧠', title: 'Problem Solver',  text: 'Lives for a good bug hunt.',           rarity: 'gold' },
    { icon: '🎨', title: 'Design Eye',      text: 'Cares how it looks and feels.',        rarity: 'gold' },
    { icon: '🎾', title: 'Playful',         text: 'Makes the work fun.',                  rarity: 'gold' },
    { icon: '🐾', title: 'Dog Lover',       text: 'Powered by puppy cuddles.',            rarity: 'red' },
    { icon: '🏆', title: 'Rare Drop!',      text: 'Hire me and find out 😉',              rarity: 'red' },
]

/* food rain */
export const FOOD_RAIN = ['🍰', '🍬', '🍭', '🦴', '🍩', '🧁', '🍡', '⭐', '💗']

/* chat */
export const CHAT = {
    questions: [
        { key: 'about',        label: 'Who are you?' },
        { key: 'funfacts',     label: 'Fun facts? 🐾' },
        { key: 'whycode',      label: 'Why software?' },
        { key: 'experience',   label: 'Your experience?' },
        { key: 'projects',     label: 'What have you built?' },
        { key: 'skills',       label: 'Your tech stack?' },
        { key: 'teamwork',     label: 'How do you work in a team?' },
        { key: 'conflict',     label: 'Handling disagreements?' },
        { key: 'failure',      label: 'A time you failed?' },
        { key: 'leadership',   label: 'Leadership example?' },
        { key: 'whyhire',      label: 'Why should we hire you?' },
        { key: 'availability', label: 'Are you available?' },
        { key: 'contact',      label: 'How can we reach you?' },
    ],
    responses: {
        about: `Hi! I'm ${PROFILE.name} — a software developer with a twist: I started in animation (B.F.A. from SCAD) and moved into engineering, now finishing my M.S. in Computer Science at Northeastern (4.0 GPA). That design background means I care as much about how software feels as how it's built.\n\nAsk me about my experience, my projects, or how I work on a team.`,
        funfacts: `A few quick things about me 🐾\n\n🎨 Award-winning artist before I was an engineer — Gold Key & Silver Keys at the Scholastic Art Awards, plus a national first place in the Federal Junior Duck Stamp program.\n🎬 I've animated 6 SCAD films (animator, rigger, colorist, background artist) that screened at festivals from Boston to LA.\n🎓 4.0 GPA in my M.S. CS at Northeastern.\n🖌️ I can go from a Figma mockup to a shipped React feature without a handoff.\n🐶 Certified dog person — this whole site is basically a love letter to good pups.`,
        whycode: `I fell for software sideways. As an animator I kept writing little scripts to automate the boring, repetitive parts — and realized I loved the problem-solving more than the tweening. So I went all in on computer science.\n\nThe art background never left me: I like building things that are solid under the hood *and* feel good to use. Storytelling and system design aren't so different. 🐾`,
        experience: "I've built full-stack web features (Node.js + MongoDB, reusable React/JS components) as a Web Developer, written Python automation as a designer, and taught technical animation. That mix means I ship, I collaborate with non-engineers, and I sweat UX details.\n\nSee the Experience page for the full history and education.",
        projects: "A few favorites: a from-scratch Secure Reliable File Transfer protocol on raw sockets, and an NLP duplicate-question detector that hit 81.67% accuracy.\n\nOpen the Projects page and click any card for the technical details.",
        skills: "Languages: Python, Java, JavaScript, TypeScript, C++, C#, SQL, Go.\nBackend: Spring Boot, Node.js, Express, FastAPI.\nData & infra: PostgreSQL, MySQL, MongoDB, Redis, Kafka, AWS, Docker, Kubernetes, CI/CD.\nFrontend & design: React, Angular, Vue, Figma.\n\nI pick the right tool for the job and care about clean, well-tested code.",
        education: `I'm doing my M.S. in Computer Science at Northeastern University (2024–2026, 4.0 GPA), after a B.F.A. in Animation from SCAD (2023). Coursework spans Software Development, Algorithms, Database Systems, Web Technologies and Machine Learning.`,
        teamwork: "I keep changes small and reviewable, write clear PR descriptions, and document the *why* behind non-obvious decisions. I flag blockers early, and I try to leave both the codebase and the team a little better than I found them.",
        conflict: "When a team disagrees on a technical call, I replace opinions with evidence — a quick prototype or benchmark usually makes the trade-off obvious. Once we decide, I disagree-and-commit and keep it about the work, not egos.",
        failure: "Early on I shipped a change that caused a production issue. I owned it, wrote a short post-mortem, added tests for the edge case, and built a check to catch it earlier. It taught me to respect the gap between staging and production — and to make failures cheap to detect.",
        leadership: "I've led small initiatives — introducing a testing pattern, improving a deploy process, and mentoring newer teammates. I lead by example: write the first tests, pair with people, and make the good path the easy path instead of mandating process.",
        whyhire: "I ship — reliably and with care. I'm quick to learn, comfortable across the stack, and I communicate clearly. I bring an engineer's rigor and a designer's eye, so the things I build are both solid and pleasant to use (yes, including this dog-themed site 🐾).\n\nGive me a real problem and I'll turn it into something solid.",
        availability: `${PROFILE.availability}. I'm based in ${PROFILE.location} and open to on-site, hybrid, remote, or relocation. The fastest way to reach me is email — ${PROFILE.email}.`,
        frontend: "React and TypeScript are my primary tools. I care about accessible, responsive UI and smooth, purposeful interactions (this site is a small demo of that).",
        backend: "I build APIs in Java/Spring, Node.js and Python. I think about clear contracts, sensible error handling, caching, and observability from day one.",
        data: "PostgreSQL for relational data, MongoDB for flexible documents, Redis for caching. I profile before I optimize and add tests where correctness matters.",
        contact: `Email: ${PROFILE.email}\nLocation: ${PROFILE.location}\n\nMy GitHub is linked on the hero and the About page — I'd love to chat!`,
        fallback: `I'm ${PROFILE.name}, a software developer. Try asking about my experience, my projects, my tech stack, why you should hire me, or how I handle teamwork and setbacks.`,
    },
}

/* skill bars */
export const SKILL_LEVELS = [
    { stack: 'Frontend / UI',   pct: 90 },
    { stack: 'Backend / APIs',  pct: 85 },
    { stack: 'Databases',       pct: 80 },
    { stack: 'Cloud / DevOps',  pct: 74 },
    { stack: 'Design',          pct: 92 },
]

/* education */
export const EDUCATION = [
    {
        school: 'Northeastern University', degree: 'M.S. in Computer Science',
        period: 'Sep 2024 – May 2027', location: 'Boston, MA', emoji: '🎓', color: 'sky',
        points: [
            'Coursework: Software Development, Algorithms, Database Systems, Web Technologies, Machine Learning, Scalable Distributed Systems ',
        ],
    },
    {
        school: 'Savannah College of Art and Design', degree: 'B.F.A. in Animation',
        period: 'Jun 2023', location: 'Atlanta, GA', emoji: '🎨', color: 'pink',
        points: ['Coursework: Character Animation, Tech Animation, Programming, Life Drawing, Collaborative Projects'],
    },
]

/* highlights */
export const CERTIFICATIONS = [
    { title: '4.0 GPA', issuer: 'M.S. Computer Science · Northeastern University', year: '2024–2026', link: '', emoji: '🎓', color: 'sky' },
    { title: 'Engineer + Artist', issuer: 'B.F.A. Animation (SCAD) → full-stack engineering', year: '', link: '', emoji: '🎨', color: 'pink' },
]

/* real estate */
export const REAL_ESTATE_PROJECTS = [
    { name: 'Walton Creek Estates', location: 'GA', role: 'Interior Design', emoji: '🏡', color: 'peach', link: 'https://www.deluxeton.com/communitie/walton-creek-estates' },
    { name: 'The Retreat at Caney Creek', location: 'GA', role: 'Interior Design', emoji: '🏘️', color: 'mint', link: 'https://www.deluxeton.com/communitie/the-retreat-at-caney-creek' },
    { name: 'Ebenezer Pond', location: 'GA', role: 'Sales and Marketing', emoji: '🏞️', color: 'sky', link: 'https://www.deluxeton.com/communitie/ebenezer-pond' },
    { name: 'The Hive', location: 'GA', role: 'Logo Design', emoji: '🐝', color: 'sun', link: 'https://thehiveliving.com/' },
    { name: 'Pepperpike Court', location: 'GA', role: 'Web Design', emoji: '💻', color: 'sky', link: 'https://www.oaktreestoneproperties.com/pepperpike-court' },
    { name: 'Victoria Oaks', location: 'GA', role: 'Logo Design', emoji: '🏘️', color: 'mint', link: '' },

    { name: 'The Grove at Blue Ridge', location: 'GA', role: 'Interior Design', emoji: '🏙️', color: 'pink', link: 'https://www.blueridgemountains.com/directory/the-grove-at-blue-ridge/' },
]

export const FILM_CREDITS = [
    { title: 'Rainbow', roles: ['Production Manager', 'Animator'], emoji: '🌈', color: 'pink' },
    { title: 'The Sample', roles: ['Animator', 'Colorist', 'Clean-up Artist'], emoji: '🎞️', color: 'sky' },
    { title: 'A Shadows Glow', roles: ['Background Artist'], emoji: '🌘', color: 'caramel' },
    { title: 'Furnished', roles: ['Animator', 'Modeler','Rigger'], emoji: '🪑', color: 'mint' },
    { title: 'Jellyfish', roles: ['Background Artist'], emoji: '🪼', color: 'sun' },
    { title: 'Reverse', roles: ['Animator', 'Modeler', 'Texture Artist'], emoji: '🔁', color: 'peach' },
]

export const AWARDS = [
    { title: 'Film: The Rainbow', emoji: '🌈', color: 'pink', items: ['KidFilm Family Festival (Dallas, TX)', 'Semi-Finalist — New York Animation Film Awards (NYAFA)'] },
    { title: 'A Shadow Glow', emoji: '🌘', color: 'sky', link: 'https://www.ashadowsglow.com/', items: [
            'AltFF Alternative Film Festival — Winner, Best Action/Adventure Short (Dec 2023)',
            'DisOrient Asian American Film Festival of Oregon — Nominated, Best Animation (Mar 2024)',
            'Boston Underground Film Festival — Official Selection (Mar 2024)',
            'Minneapolis St. Paul International Film Festival — Official Selection (Apr 2024)',
            'VC Film Fest / LAAPFF, Los Angeles — Official Selection (May 2024)',
            'ASIFA-East Animation Festival — Official Selection (Apr 2024)',
            'Science Fiction & Fantasy Short Film Festival, Seattle — Official Selection (Jun 2024)',
            'New York City Independent Film Festival — Official Selection (Jun 2024)',
            'Dumbo Film Festival, New York — Semi-Finalist (Jun 2024)',
            'The Flight Deck Film Festival, New York — Official Selection (Jun 2024)',
            'Comic-Con International Independent Film Festival, San Diego — Official Selection (Jul 2024)',
            'Brooklyn SciFi Film Festival — Official Selection (Oct 2024)',
            'Philadelphia Asian American Film Festival — Official Selection (Nov 2024)',
            'Los Angeles Animation Festival — Honorable Mention (Dec 2024)',
            'FOCUS Wales Film Festival, UK — Finalist (May 2025)',
        ] },
    { title: 'Federal Junior Duck Stamp Conservation Program', emoji: '🦆', color: 'mint', items: ['First Place'] },
    { title: 'American Society of Marine Artists', emoji: '🌊', color: 'sky', items: ['Honorable Mention'] },
    { title: 'Scholastic Art & Writing Awards — 2017', emoji: '✍️', color: 'peach', items: ['Honorable Mention'] },
    { title: 'Scholastic Art & Writing Awards — 2015', emoji: '🥈', color: 'caramel', items: ['Two Silver Keys'] },
    { title: 'Scholastic Art & Writing Awards — 2014', emoji: '🥇', color: 'sun', items: ['Gold Key'] },
    { title: '2014 American Art Awards', emoji: '🏅', color: 'pink', items: ['Fifth Place'] },
]

/* strengths */
export const WHAT_I_DO = [
    '⚡ Build responsive, accessible front ends in React & TypeScript',
    '🛠️ Design and ship REST APIs and data models in Java/Spring & Node',
    '☁️ Deploy with Docker, Kubernetes, AWS and CI/CD pipelines',
    '🎨 Bring a designer’s eye and animation background to every interface',
]

export const TESTIMONIALS = []