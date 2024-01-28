function Login(){
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const ctx = React.useContext(UserContext);
  
    function validate(field, label) {
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
    }
  
    function handleLogin() {
      if (!validate(email, 'email')) return;
      if (!validate(password, 'password')) return;
      // Logic to check if the user exists and the password is correct
      setShow(false);
    }
  
    function clearForm(){
      setEmail('');
      setPassword('');
      setShow(true);
    }
  
    return (
     <Card
      bgcolor="primary"
      header="Login"
      status={status}
      body={show ? (
       <>
       <input type="input" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
       <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
       <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
       </>
      ) : (
        <>
        <h5>Success</h5>
        <button type="submit" className="btn btn-light" onClick={clearForm}>Log in with a different account</button>
        </>
      )
     }
     />
    )
  }