import { useState } from 'react';
import '../assets/styles/Contact.scss';
import emailjs from '@emailjs/browser';
import SendIcon from '@mui/icons-material/Send';
import './Contact.scss'

function Contact() {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const sendEmail = (e: any) => {
    e.preventDefault();


    if (name !== '' && email !== '' && message !== '') {
      var senderParams = {
        name: name,
        email: email,
        message: message
      };

      console.log(senderParams);
        emailjs.send(
          'service_sum1g1d',  
          'template_8r4uhqe' ,
          senderParams, 
          '8JiEjPycLrJZYc2KD'
        )
        .then(
          (response) => {
            console.log('SUCCESS!', response.status, response.text);
          },
          (err) => {
            console.log('FAILED...', err);
          }
        );
      
      
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h1>Contact Me</h1>
          <p>Got a project waiting to be realized? Let's collaborate and make it happen!</p>
          <form onSubmit={sendEmail}className='form-flex user-box'>
            <div  className=''>
              <input required type="text" name='name'  placeholder="What's your name?" value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }} />
              <input type="email" required placeholder='email' value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}/>
            
            <textarea name="" placeholder="Send me any inquiries or" value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}></textarea>
            </div>
            <button className='butt'>Send {<SendIcon/>}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;