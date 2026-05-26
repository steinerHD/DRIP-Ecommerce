import { useState }                                           from 'react';
import { Link, useNavigate }                                  from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile }      from 'firebase/auth';
import { doc, setDoc }                                        from 'firebase/firestore';
import { auth, db }                                           from '../../firebase/config';
import styles from './Register.module.scss';

const Register = () => {
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    setError('');
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      await setDoc(doc(db, 'users', result.user.uid), {
        email,
        displayName: name,
        role: 'user',
      });
      navigate('/');
    } catch {
      setError('Could not create account. Email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.imagePanel} />

      <div className={styles.formPanel}>
        <div className={styles.formWrap}>
          <p className={styles.welcome}>JOIN THE MOVEMENT</p>
          <h1 className={styles.title}>Create Account</h1>

          <form onSubmit={handleRegister} className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>FULL NAME</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>EMAIL ADDRESS</label>
              <input
                className={styles.input}
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>PASSWORD</label>
              <input
                className={styles.input}
                type="password"
                placeholder="Min. 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <p className={styles.login}>
            Already have an account?{' '}
            <Link to="/login" className={styles.loginLink}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;