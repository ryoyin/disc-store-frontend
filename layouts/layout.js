import Link from 'next/link'
import CategoryList from '../components/categoryList';

export default function Layout({user, categories, children}) {

  let signInButton = <SignInButton />;
  let signUpButton = <SignUpButton />;

  if(user) {
    signInButton = <SignOutButton />;
    signUpButton = <ProfileButton user={user} />;
  }

  return (    
    <>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous"></link>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/"><img src="/images/logo.jpeg" /></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>                
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Categories
                  </a>
                  {/* <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul> */}
                  <CategoryList categories={ categories } />
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">About</a>
                </li>
              </ul>
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn" type="submit">Search</button>

                { signUpButton }

                { signInButton }

              </form>
            </div>
          </div>
        </nav>
      </header>
      <main>
        { children }
      </main>
      <script src="/js/bootstrap.bundle.min.js"></script>
    </>
  )
}

const SignInButton = () => {
  return (
    <button className="btn text-nowrap">
      <Link href="/user/login">
        <a>Sign in</a>
      </Link>
    </button>
  )
}

const SignOutButton = () => {
  return (
    <button className="btn text-nowrap">
      <Link href="/user/logout">
        <a>Sign out</a>
      </Link>
    </button>
  )
}

const SignUpButton = () => {
  return (
    <button className="btn text-nowrap">
      <Link href="/user/register">
        <a>Sign up</a>
      </Link>
    </button>
  )
}

const ProfileButton = ({user}) => {
  return (
    <>
      <button className="btn text-nowrap">
        <Link href="/user">
          <a>{user.name}</a>
        </Link>
      </button>
      <Link href="/cart">
        <i className="fas fa-shopping-cart"></i>
      </Link>
    </>
  )
}