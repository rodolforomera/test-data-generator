import './Menu.css'

function Menu() {
    return (
        <div className="menu">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline">Menu</span>
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li className="nav-item">
                        <a href="/" className="nav-link align-middle px-0">
                            <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                            <i className="fs-4 bi bi-plus-circle"></i> <span className="ms-1 d-none d-sm-inline">Cadastros</span></a>
                        <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                            <li className="w-100">
                                <a href="/bank" className="nav-link px-0"> <span className="d-none d-sm-inline">Bancos</span> </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi bi-file-earmark-spreadsheet"></i> <span className="ms-1 d-none d-sm-inline">Gerar Massa</span> </a>
                        <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                            <li className="w-100">
                                <a href="/arquivo1" className="nav-link px-0"> <span className="d-none d-sm-inline">Arquivo 1</span></a>
                            </li>
                            <li>
                                <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Arquivo 2</span> </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );

}

export default Menu;