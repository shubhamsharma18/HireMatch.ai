import { useState } from 'react'
import '../styles/interview.scss'
import '../styles/interview_old.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useParams } from 'react-router-dom'
import Navbar from '../../auth/components/Navbar'
import Loader from '../../../ui/Loader'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    ) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    ) },
    { id: 'roadmap', label: 'Road Map', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>
    ) },
]

const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className='q-card'>
            <div className='q-card__header' onClick={() => setOpen(!open)}>
                <span className='q-card__index'>Q{index + 1}</span>
                <p className='q-card__question'>{item.question}</p>
                <span className={`q-card__chevron ${open ? 'open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </span>
            </div>
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag intention'>🎯 Intention</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='q-card__tag answer'>💡 Model Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => {
    if (!day) return <div className='roadmap-day error'>Invalid day data</div>
    
    const tasks = Array.isArray(day.tasks) ? day.tasks : []
    const dayNumber = day.day || '?'
    const focus = day.focus || 'No focus area specified'
    
    return (
        <div className='roadmap-day'>
            <div className='roadmap-day__header'>
                <span className='roadmap-day__badge'>Day {dayNumber}</span>
                <h3 className='roadmap-day__focus'>{focus}</h3>
            </div>
            <ul className='roadmap-day__tasks'>
                {tasks.length === 0 ? (
                    <li className='empty-tasks'>No specific tasks for this day</li>
                ) : (
                    tasks.map((task, i) => (
                        <li key={i}>
                            <span className='task-bullet'>✓</span>
                            {task}
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}

const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()

    if (loading) {
        return (
            <div className='interview-page'>
                <Navbar />
                <Loader fullScreen={true} text="Generating your personalized interview plan..." />
            </div>
        )
    }

    if (!report) {
        return (
            <div className='interview-page'>
                <Navbar />
                <div className='error-container'>
                    <Loader fullScreen={true} text="Unable to load the interview plan." />
                </div>
            </div>
        )
    }

    const scoreColor = report.matchScore >= 80 ? 'high' : report.matchScore >= 60 ? 'mid' : 'low'

    return (
        <div className='interview-page'>
            <Navbar />
            
            <div className='interview-container'>
                {/* Left Navigation */}
                <aside className='interview-sidebar-left'>
                    <div className='nav-header'>
                        <p className='nav-label'>Sections</p>
                    </div>
                    
                    <div className='nav-items'>
                        {NAV_ITEMS.map(item => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className='nav-icon'>{item.icon}</span>
                                <span className='nav-label-text'>{item.label}</span>
                            </a>
                        ))}
                    </div>

                    <button
                        onClick={() => getResumePdf(interviewId)}
                        className='download-btn'
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 16L12 8M12 16L8 12M12 16L16 12M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" fill="none"/>
                        </svg>
                        Download Report
                    </button>

                    
                     <div className='interview-mobile-top'>
                        <div className='mobile-tab-row'>
                            {NAV_ITEMS.map(item => (
                                <button
                                    key={item.id}
                                    className={`mobile-tab ${activeNav === item.id ? 'active' : ''}`}
                                    onClick={() => setActiveNav(item.id)}
                                >
                                    {item.label.replace(' Questions', '').replace(' Map', '')}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                
                <main className='interview-main-content'>
                   

                    {activeNav === 'technical' && (
                        <section id='technical' className='content-section'>
                            <div className='section-header'>
                                <h2>Technical Questions</h2>
                                <span className='question-count'>{report.technicalQuestions?.length || 0} questions</span>
                            </div>
                            <div className='questions-list'>
                                {report.technicalQuestions?.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section id='behavioral' className='content-section'>
                            <div className='section-header'>
                                <h2>Behavioral Questions</h2>
                                <span className='question-count'>{report.behavioralQuestions?.length || 0} questions</span>
                            </div>
                            <div className='questions-list'>
                                {report.behavioralQuestions?.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section id='roadmap' className='content-section'>
                            <div className='section-header'>
                                <h2>Preparation Roadmap</h2>
                                <span className='question-count'>{report.preparationPlan?.length || 0}-day plan</span>
                            </div>
                            <div className='roadmap-grid'>
                                {report.preparationPlan?.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                {/* Right Sidebar */}
                <aside className='interview-sidebar-right'>
                    {/* Match Score */}
                    <div className='score-card'>
                        <p className='score-label'>Match Score</p>
                        <div className={`score-ring ${scoreColor}`}>
                            <span className='score-value'>{report.matchScore}</span>
                            <span className='score-percent'>%</span>
                        </div>
                        <p className='score-message'>
                            {report.matchScore >= 80 ? 'Excellent match for this role!' : 
                             report.matchScore >= 60 ? 'Good match, some gaps to fill' : 
                             'Consider improving key skills'}
                        </p>
                    </div>

                    <div className='divider' />

                    {/* Skill Gaps */}
                    <div className='skill-gaps-card'>
                        <p className='skill-label'>Identified Skill Gaps</p>
                        <div className='skill-tags'>
                            {report.skillGaps?.map((gap, i) => (
                                <span key={i} className={`skill-tag ${gap.severity.toLowerCase()}`}>
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Interview