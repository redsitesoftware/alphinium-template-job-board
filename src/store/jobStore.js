import React, { createContext, useContext, useMemo, useReducer } from 'react'

const categoryColors = {
 Tech: '#2563EB',
 Marketing: '#7C3AED',
 Design: '#EC4899',
 Operations: '#059669',
}

const jobs = [
 {
 id: 'senior-react-developer',
 title: 'Senior React Developer',
 company: 'TechVision',
 emoji: '',
 category: 'Tech',
 location: 'Remote',
 salary: '$120-150k',
 employmentType: 'Full-time',
 postedDate: '2d ago',
 featured: true,
 description: 'Join TechVision to ship modern web products and mentor a fast-moving frontend squad building polished customer experiences.',
 requirements: ['5+ years with React and React Native', 'Strong TypeScript and component architecture experience', 'Comfort leading code reviews and mentoring engineers', 'Experience consuming REST or GraphQL APIs', 'Solid testing and performance optimization habits', 'Excellent remote communication skills'],
 benefits: ['Remote-first culture', 'Equity package', 'Annual learning budget', 'Home office stipend', 'Flexible work hours'],
 },
 {
 id: 'ui-ux-designer',
 title: 'UI/UX Designer',
 company: 'DesignLab',
 emoji: '',
 category: 'Design',
 location: 'Sydney',
 salary: '$90-110k',
 employmentType: 'Full-time',
 postedDate: '1d ago',
 featured: true,
 description: 'DesignLab is looking for a product-minded designer to craft intuitive interfaces and elevate our design system across web and mobile.',
 requirements: ['Strong Figma portfolio', 'Experience with design systems', 'User research and testing practice', 'Motion and prototyping skills', 'Clear storytelling for stakeholders'],
 benefits: ['Hybrid flexibility', 'Creative equipment budget', 'Conference tickets', 'Wellness allowance', 'Quarterly retreats'],
 },
 {
 id: 'digital-marketing-manager',
 title: 'Digital Marketing Manager',
 company: 'GrowthCo',
 emoji: '',
 category: 'Marketing',
 location: 'Melbourne',
 salary: '$85-100k',
 employmentType: 'Full-time',
 postedDate: '3d ago',
 featured: false,
 description: 'Own paid and organic growth programs for a B2B SaaS portfolio with a strong experimentation culture.',
 requirements: ['Performance marketing leadership', 'Analytics and attribution fluency', 'Campaign planning expertise', 'Copywriting and messaging strength', 'Stakeholder management'],
 benefits: ['Bonus program', 'Professional development budget', 'Extra leave day each quarter', 'Team lunches', 'Flexible start times'],
 },
 {
 id: 'product-manager',
 title: 'Product Manager',
 company: 'Alphinium',
 emoji: '',
 category: 'Tech',
 location: 'Remote',
 salary: '$130-160k',
 employmentType: 'Full-time',
 postedDate: '5d ago',
 featured: true,
 description: 'Lead roadmap discovery and delivery for Alphinium platform experiences, partnering closely with design, engineering, and customer success.',
 requirements: ['B2B SaaS product ownership', 'Strong discovery toolkit', 'Data-informed prioritization', 'Excellent written communication', 'Roadmap and execution rigor'],
 benefits: ['Remote team', 'Health stipend', 'Annual offsite', 'Generous parental leave', 'Home office support'],
 },
 {
 id: 'devops-engineer',
 title: 'DevOps Engineer',
 company: 'CloudScale',
 emoji: '️',
 category: 'Tech',
 location: 'Remote',
 salary: '$140-170k',
 employmentType: 'Full-time',
 postedDate: '1w ago',
 featured: false,
 description: 'Scale CI/CD, cloud infrastructure, and observability for a distributed engineering team serving global customers.',
 requirements: ['AWS or GCP production experience', 'Kubernetes and IaC expertise', 'SRE mindset', 'Security best practices', 'Automation and scripting confidence'],
 benefits: ['Equity package', 'Remote-first setup', 'Training budget', 'Wellbeing allowance', 'Modern tooling'],
 },
 {
 id: 'content-strategist',
 title: 'Content Strategist',
 company: 'ContentFirst',
 emoji: '️',
 category: 'Marketing',
 location: 'Brisbane',
 salary: '$70-85k',
 employmentType: 'Full-time',
 postedDate: '4d ago',
 featured: false,
 description: 'Shape editorial direction, SEO content, and thought leadership campaigns for a fast-growing media brand.',
 requirements: ['Editorial planning experience', 'SEO content writing expertise', 'Analytics literacy', 'Cross-functional collaboration', 'Sharp copy editing'],
 benefits: ['Remote Fridays', 'Learning budget', 'Paid volunteer day', 'Creative workshops', 'Flexible leave'],
 },
 {
 id: 'full-stack-developer',
 title: 'Full Stack Developer',
 company: 'StartupX',
 emoji: '',
 category: 'Tech',
 location: 'Sydney',
 salary: '$100-130k',
 employmentType: 'Full-time',
 postedDate: '6d ago',
 featured: false,
 description: 'Help StartupX build customer-facing features end to end across frontend apps, backend services, and integrations.',
 requirements: ['JavaScript or TypeScript across stack', 'API design experience', 'SQL and data modeling', 'Product-minded delivery', 'Startup pace comfort'],
 benefits: ['Equity upside', 'Central Sydney office', 'Tech allowance', 'Catered lunches', 'Mentorship program'],
 },
 {
 id: 'brand-designer',
 title: 'Brand Designer',
 company: 'VisualWorks',
 emoji: '',
 category: 'Design',
 location: 'Melbourne',
 salary: '$80-100k',
 employmentType: 'Full-time',
 postedDate: '2d ago',
 featured: false,
 description: 'Create bold brand systems, campaign assets, and visual storytelling across digital, motion, and print touchpoints.',
 requirements: ['Strong brand portfolio', 'Typography and layout expertise', 'Campaign concept development', 'Adobe Creative Suite proficiency', 'Presentation confidence'],
 benefits: ['Hybrid schedule', 'Creative toolkit budget', 'Studio events', 'Extended holidays', 'Mentorship'],
 },
 {
 id: 'growth-hacker',
 title: 'Growth Hacker',
 company: 'ScaleUp',
 emoji: '',
 category: 'Marketing',
 location: 'Remote',
 salary: '$80-110k',
 employmentType: 'Full-time',
 postedDate: '3d ago',
 featured: true,
 description: 'Experiment across funnels, onboarding, referral loops, and lifecycle marketing to unlock compounding user growth.',
 requirements: ['Rapid experimentation mindset', 'Lifecycle and retention expertise', 'SQL or analytics tools familiarity', 'Copy and landing page optimization', 'Strong growth reporting'],
 benefits: ['Remote flexibility', 'Performance bonus', 'Annual retreat', 'Learning stipend', 'Extra recharge days'],
 },
 {
 id: 'data-engineer',
 title: 'Data Engineer',
 company: 'DataFlow',
 emoji: '️',
 category: 'Tech',
 location: 'Remote',
 salary: '$130-160k',
 employmentType: 'Full-time',
 postedDate: '1d ago',
 featured: false,
 description: 'Build reliable data pipelines, warehouse models, and self-serve analytics foundations used across the business.',
 requirements: ['ETL and orchestration tools', 'Modern data warehouse expertise', 'Python or SQL excellence', 'Data quality ownership', 'Stakeholder collaboration'],
 benefits: ['Remote-first', 'Health allowance', 'Top-tier equipment', 'Growth pathways', 'Flexible hours'],
 },
 {
 id: 'operations-manager',
 title: 'Operations Manager',
 company: 'LogiCore',
 emoji: '��',
 category: 'Operations',
 location: 'Adelaide',
 salary: '$90-110k',
 employmentType: 'Full-time',
 postedDate: '5d ago',
 featured: false,
 description: 'Improve delivery workflows, vendor coordination, and operational reporting for a nationally distributed logistics team.',
 requirements: ['Process optimization experience', 'Team leadership', 'Vendor management', 'KPI reporting and forecasting', 'Operational risk awareness'],
 benefits: ['Leadership coaching', 'Travel allowance', 'Bonus structure', 'Flexible scheduling', 'Extra leave options'],
 },
 {
 id: 'social-media-manager',
 title: 'Social Media Manager',
 company: 'SocialBrand',
 emoji: '',
 category: 'Marketing',
 location: 'Remote',
 salary: '$60-75k',
 employmentType: 'Full-time',
 postedDate: '2d ago',
 featured: false,
 description: 'Own platform calendars, creator partnerships, and community engagement for a consumer lifestyle brand.',
 requirements: ['Platform-native campaign planning', 'Creator collaboration skills', 'Reporting on engagement metrics', 'Short-form content instincts', 'Community management empathy'],
 benefits: ['Remote team', 'Creator events', 'Mental health support', 'Flexible work week', 'Annual workshop budget'],
 },
 {
 id: 'backend-engineer',
 title: 'Backend Engineer',
 company: 'APIFirst',
 emoji: '️',
 category: 'Tech',
 location: 'Sydney',
 salary: '$110-140k',
 employmentType: 'Full-time',
 postedDate: '4d ago',
 featured: true,
 description: 'Design resilient APIs, event-driven services, and internal tooling that help product squads move faster with confidence.',
 requirements: ['Node.js or Go production systems', 'API design best practices', 'Observability and reliability skills', 'Database performance tuning', 'Strong peer collaboration'],
 benefits: ['Sydney hub', 'Annual bonus', 'Education budget', 'Flexible remote days', 'Modern engineering stack'],
 },
 {
 id: 'motion-designer',
 title: 'Motion Designer',
 company: 'AnimateCo',
 emoji: '',
 category: 'Design',
 location: 'Melbourne',
 salary: '$85-105k',
 employmentType: 'Full-time',
 postedDate: '1w ago',
 featured: false,
 description: 'Bring digital campaigns and product launches to life with motion systems, explainers, and social-first creative.',
 requirements: ['Strong motion reel', 'After Effects expertise', 'Storyboarding and concepting', 'Brand consistency focus', 'Cross-functional collaboration'],
 benefits: ['Hybrid studio setup', 'Creative subscriptions', 'Team events', 'Professional coaching', 'Flexible Fridays'],
 },
 {
 id: 'customer-success-manager',
 title: 'Customer Success Manager',
 company: 'SaaSPro',
 emoji: '',
 category: 'Operations',
 location: 'Remote',
 salary: '$75-95k',
 employmentType: 'Full-time',
 postedDate: '3d ago',
 featured: false,
 description: 'Guide customers from onboarding to expansion, aligning product adoption plans with measurable business outcomes.',
 requirements: ['Account management or CS background', 'Strong presentation skills', 'Renewal and expansion support', 'Customer empathy', 'Cross-team coordination'],
 benefits: ['Remote flexibility', 'Bonus on renewals', 'Learning allowance', 'Health stipend', 'Quarterly meetups'],
 },
 {
 id: 'engineering-manager',
 title: 'Engineering Manager',
 company: 'ScaleForce',
 emoji: '',
 category: 'Tech',
 location: 'Sydney',
 salary: '$160-200k',
 employmentType: 'Full-time',
 postedDate: '1d ago',
 featured: true,
 description: 'Lead a high-performing product engineering group, balancing technical strategy, delivery execution, and coaching.',
 requirements: ['People management experience', 'Engineering delivery leadership', 'Technical architecture fluency', 'Hiring and team growth focus', 'Excellent stakeholder communication'],
 benefits: ['Leadership budget', 'Annual bonus', 'Hybrid flexibility', 'Equity package', 'Executive coaching'],
 },
]

const initialState = {
 phase: 'login',
 selectedJob: null,
 categoryFilter: 'All',
 locationFilter: 'All',
 jobs,
 applications: {},
 postedJobs: [],
}

const JobContext = createContext(null)

function jobReducer(state, action) {
 switch (action.type) {
 case 'SET_PHASE':
 return { ...state, phase: action.phase }
 case 'COMPLETE_LOGIN':
 return { ...state, phase: 'home' }
 case 'OPEN_JOB':
 return { ...state, phase: 'job', selectedJob: action.jobId }
 case 'GO_HOME':
 return { ...state, phase: 'home', selectedJob: null }
 case 'OPEN_POST_JOB':
 return { ...state, phase: 'post-job', selectedJob: null }
 case 'OPEN_EMPLOYER_DASHBOARD':
 return { ...state, phase: 'employer-dashboard', selectedJob: null }
 case 'SET_APPLICATION_STATUS': {
 const existing = state.applications[action.jobId]
 if (!existing) return state
 const updated = Array.isArray(existing)
  ? existing.map((a) => a.applicantKey === action.applicantKey ? { ...a, status: action.status } : a)
  : { ...existing, status: action.status }
 return { ...state, applications: { ...state.applications, [action.jobId]: updated } }
 }
 case 'SET_CATEGORY_FILTER':
 return { ...state, categoryFilter: action.value }
 case 'SET_LOCATION_FILTER':
 return { ...state, locationFilter: action.value }
 case 'SUBMIT_APPLICATION':
 return {
 ...state,
 applications: {
 ...state.applications,
 [action.jobId]: {
 submittedAt: new Date().toISOString(),
 ...action.payload,
 },
 },
 }
 case 'POST_JOB': {
 const newJob = {
 id: `posted-${Date.now()}`,
 title: action.payload.title,
 company: action.payload.company,
 emoji: '',
 category: action.payload.category,
 location: action.payload.location,
 salary: `$${action.payload.salaryMin}-$${action.payload.salaryMax}k`,
 employmentType: 'Full-time',
 postedDate: 'Just now',
 featured: true,
 description: action.payload.description,
 requirements: ['Role requirements to be confirmed', 'Strong communication skills', 'Ability to collaborate cross-functionally', 'Experience relevant to the role', 'Results-driven mindset'],
 benefits: ['Fast publishing workflow', 'Lead capture ready', 'Flexible hiring setup', 'Demo listing included', 'High-visibility placement'],
 }
 return {
 ...state,
 jobs: [newJob, ...state.jobs],
 postedJobs: [newJob, ...state.postedJobs],
 phase: 'post-job',
 }
 }
 default:
 return state
 }
}

export function JobProvider({ children }) {
 const [state, dispatch] = useReducer(jobReducer, initialState)

 const value = useMemo(() => {
 const selectedJobDetails = state.jobs.find((job) => job.id === state.selectedJob) || null

 return {
 state,
 categoryColors,
 selectedJobDetails,
 actions: {
 goHome: () => dispatch({ type: 'GO_HOME' }),
 openJob: (jobId) => dispatch({ type: 'OPEN_JOB', jobId }),
 openPostJob: () => dispatch({ type: 'OPEN_POST_JOB' }),
 setCategoryFilter: (value) => dispatch({ type: 'SET_CATEGORY_FILTER', value }),
 setLocationFilter: (value) => dispatch({ type: 'SET_LOCATION_FILTER', value }),
 submitApplication: (jobId, payload) => dispatch({ type: 'SUBMIT_APPLICATION', jobId, payload }),
 postJob: (payload) => dispatch({ type: 'POST_JOB', payload }),
 openEmployerDashboard: () => dispatch({ type: 'OPEN_EMPLOYER_DASHBOARD' }),
 setApplicationStatus: (jobId, applicantKey, status) => dispatch({ type: 'SET_APPLICATION_STATUS', jobId, applicantKey, status }),
 completeLogin: () => dispatch({ type: 'COMPLETE_LOGIN' }),
 },
 }
 }, [state])

 return <JobContext.Provider value={value}>{children}</JobContext.Provider>
}

export function useJobStore() {
 const context = useContext(JobContext)
 if (!context) {
 throw new Error('useJobStore must be used within JobProvider')
 }
 return context
}
