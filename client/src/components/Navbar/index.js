import Brand from "../../images/brand.png";

function Navbar(props) {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item">
          <img src={Brand} alt="Logo"></img>
        </a>

        <a
          
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a  className="navbar-item">
            Home
          </a>

          <a  className="navbar-item">
            Documentation
          </a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a  className="navbar-link">
              More
            </a>

            <div className="navbar-dropdown">
              <a  className="navbar-item">
                About
              </a>
              <a  className="navbar-item">
                Jobs
              </a>
              <a  className="navbar-item">
                Contact
              </a>
              <hr className="navbar-divider"></hr>
              <a  className="navbar-item">
                Report an issue
              </a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a  className="button" onClick={props.ShowSignUpForm}>
                <strong>Sign up</strong>
              </a>
              <a  className="button is-light" onClick={props.ShowLoginForm}>
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
