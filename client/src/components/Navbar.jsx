import * as Icon from 'react-bootstrap-icons';
import Avatar from './Avatar';


function Navbar() {

    return <>
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <Icon.ChatLeftTextFill size={30} />
                </a>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="/" className="nav-link px-2 link-dark">Home</a></li>
                    <li><a href="/create" className="nav-link px-2 link-dark">Create</a></li>
                    <li><a href="#" className="nav-link px-2 link-dark">Pricing</a></li>
                    <li><a href="#" className="nav-link px-2 link-dark">FAQs</a></li>
                    <li><a href="#" className="nav-link px-2 link-dark">About</a></li>
                </ul>
                <Avatar />

            </header>
        </div>
    </>;
}

export default Navbar;