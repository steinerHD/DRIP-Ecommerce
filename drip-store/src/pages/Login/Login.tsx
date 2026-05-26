import { useState }                              from 'react';
import { Link, useNavigate }                     from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc }                   from 'firebase/firestore';
import { auth, db }                              from '../../firebase/config';
import styles from './Login.module.scss';

const provider = new GoogleAuthProvider();

const Login = () => {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userRef = doc(db, 'users', result.user.uid);
      const snap    = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, {
          email:       result.user.email,
          displayName: result.user.displayName,
          role:        'user',
        });
      }
      navigate('/');
    } catch {
      setError('Google sign in failed.');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.imagePanel} />

      <div className={styles.formPanel}>
        <div className={styles.formWrap}>
          <p className={styles.welcome}>WELCOME BACK</p>
          <h1 className={styles.title}>Sign In</h1>

          <form onSubmit={handleLogin} className={styles.form}>
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
              <div className={styles.labelRow}>
                <label className={styles.label}>PASSWORD</label>
                <button type="button" className={styles.forgot}>Forgot password?</button>
              </div>
              <div className={styles.passWrap}>
                <input
                  className={styles.input}
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPass(s => !s)}
                >
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>

          <div className={styles.divider}><span>OR</span></div>

          <button onClick={handleGoogle} className={styles.googleBtn}>
            Continue with Google
          </button>

          <p className={styles.register}>
            Don't have an account?{' '}
            <Link to="/register" className={styles.registerLink}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;