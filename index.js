function Spa() {
  return (
      <HashRouter>
      <NavBar/>
      <UserContext.Provider value={{users:[{name: 'Jackie', email:'jackiechung1993@gmail.com', password:'secret', balance:100}]}}>
      <Route path="/" exact component ={Home} />
      <Route path="/CreateAccount/" component={CreateAccount} />
      <Route path="/alldata/" component={AllData} />
      <Route path="/login/" component={Login} />    
      </UserContext.Provider>
      </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);