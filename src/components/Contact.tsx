import { useState, FormEvent } from 'react';
import '../assets/styles/Contact.scss';
import emailjs from '@emailjs/browser';
import SendIcon from '@mui/icons-material/Send';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import './Contact.scss'

type Status = 'idle' | 'sending' | 'success' | 'error';

const WHATSAPP_LINK = 'https://wa.me/+255621381584';

function Contact() {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [projectType, setProjectType] = useState<string>('');
  const [timeline, setTimeline] = useState<string>('');
  const [budget, setBudget] = useState<string>('');
  const [status, setStatus] = useState<Status>('idle');

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === '' || email === '' || message === '') return;

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // Misconfigured environment (missing REACT_APP_EMAILJS_* vars) --
      // fail loudly in the console instead of silently pretending to send.
      console.error('EmailJS is not configured: missing REACT_APP_EMAILJS_* environment variables.');
      setStatus('error');
      return;
    }

    setStatus('sending');

    try {
      await emailjs.send(serviceId, templateId, {
        name,
        email,
        message,
        project_type: projectType || 'Not specified',
        timeline: timeline || 'Not specified',
        budget: budget || 'Not specified',
      }, publicKey);
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      setProjectType('');
      setTimeline('');
      setBudget('');
    } catch (err) {
      console.error('EmailJS send failed', err);
      setStatus('error');
    }
  };

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h1>Contact Me</h1>
          <p>Have a project in mind? Send a message or WhatsApp me. I reply within 24 hours.</p>
          <form onSubmit={sendEmail} className='form-flex user-box'>
            <div className='inputs-row'>
              <div className='input-field'>
                <input required type="text" name='name' placeholder="What's your name?" value={name}
                  onChange={(e) => setName(e.target.value)} />
              </div>
              <div className='input-field'>
                <input type="email" required placeholder='Your email' value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className='select-row'>
              <div className='input-field select-field'>
                <label htmlFor="project_type">What do you need?</label>
                <select id="project_type" value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}>
                  <option value="">Select...</option>
                  <option value="AI assistant">AI assistant</option>
                  <option value="Web app or dashboard">Web app or dashboard</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Something else">Something else</option>
                </select>
              </div>
              <div className='input-field select-field'>
                <label htmlFor="timeline">Timeline</label>
                <select id="timeline" value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}>
                  <option value="">Select...</option>
                  <option value="As soon as possible">As soon as possible</option>
                  <option value="Within 1 to 3 months">Within 1 to 3 months</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
              <div className='input-field select-field'>
                <label htmlFor="budget">Budget (optional)</label>
                <select id="budget" value={budget}
                  onChange={(e) => setBudget(e.target.value)}>
                  <option value="">Select...</option>
                  <option value="Under $500">Under $500</option>
                  <option value="$500 to $2,000">$500 to $2,000</option>
                  <option value="Over $2,000">Over $2,000</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>
            </div>
            <div className='textarea-field'>
              <textarea required placeholder="Your message..." value={message}
                onChange={(e) => setMessage(e.target.value)} />
            </div>

            <div className="contact-actions">
              <button className='butt' type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send'} <SendIcon />
              </button>
              <a className='butt whatsapp-btn' href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                WhatsApp me <WhatsAppIcon />
              </a>
            </div>

            <div role="status" aria-live="polite" className="form-status">
              {status === 'success' && (
                <p className="form-feedback form-success">
                  Message sent — thanks! I'll get back to you within 24 hours.
                </p>
              )}
              {status === 'error' && (
                <p className="form-feedback form-error">
                  Something went wrong sending that message. Please try again, or message me
                  directly on <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">WhatsApp</a>.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
