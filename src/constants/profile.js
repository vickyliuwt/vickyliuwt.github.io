

const LINKEDIN_URL = 'https://www.linkedin.com/in/weitingliu033/'

export const PROFILE = {
  name: 'Weiting Liu',

  // headlines
  titles: [
    'Software Developer',
    'Full-Stack Engineer',
    'Animator-turned-Engineer',
    'React & Java Developer',
    'Dog Lover',
  ],

  educationLine: 'M.S. Computer Science @ Northeastern · B.F.A. Animation @ SCAD',

  tagline: "Let's build something people love to use.",

  valueProp:
    'Full-stack developer with a design background. I build reliable products in Java/Spring, React and AWS — and I care as much about how software feels as how it is built.',

  openToWork: true,

  availability: 'Open to 2026 Coop / Intern · 2027 New Grad / full-time roles',

  greeting: 'Welcome to my portfolio 🐾',


  email: 'liu.weiting@northeastern.edu',
  phone: '(678) 558-1669',
  location: 'Boston, MA',

  github: 'https://github.com/vickyliuwt',
  githubUser: 'vickyliuwt',
  linkedin: LINKEDIN_URL,
  // show linkedin
  hasLinkedIn: !!LINKEDIN_URL && !LINKEDIN_URL.includes('your-linkedin'),

  resume: 'Weiting_Liu.pdf',

  // footer
  year: '2026',
  footerNote: 'Built with React & 🐾',
}

// email service
const WEB3FORMS_KEY = '63053d49-9932-41ae-bca5-eb909f96263b' // web3forms key
const FORMSPREE_ID = '' // formspree id

export const CONTACT_CONFIG = {
  web3formsKey: WEB3FORMS_KEY,
  hasWeb3Forms: !!WEB3FORMS_KEY && WEB3FORMS_KEY.length > 10,
  formspreeId: FORMSPREE_ID,
  hasFormspree: !!FORMSPREE_ID && !FORMSPREE_ID.includes('your-form-id'),
}
