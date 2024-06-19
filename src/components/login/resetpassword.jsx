import React,{useState} from 'react'
import { auth } from '../firebaseInit';


function Resetpassword() {
    const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    try {
      await auth.sendPasswordResetEmail(email);
      setMessage('Password reset email sent! Check your inbox.');
    } catch (error) {
      setError('Failed to send password reset email. Please try again.');
      console.error('Error sending password reset email:', error);
    }
  };
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100" id='whcon'>
          <h1>Click On Send Email button to reset your password </h1>
          <form onSubmit={handlePasswordReset}>
            <div>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <button className="login100-form-btn">Send Email</button>
          </form>
          {message && <p>{message}</p>}
          {error && <p>{error}</p>}
        </div>
      </div>
      <style jsx>{`
        #whcon{
        padding-top: 20px;
        }
      `}</style>
    </div>  
    )
}

export default Resetpassword