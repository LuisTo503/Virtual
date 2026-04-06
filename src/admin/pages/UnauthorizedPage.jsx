import { Link } from 'react-router-dom'

export default function UnauthorizedPage() {
  return (
    <div className="admin-auth">
      <div className="admin-auth__card">
        <h1>Acceso no autorizado</h1>
        <p>Esta ruta se usara cuando la validacion de rol admin este activa.</p>
        <Link className="admin-auth__link" to="/admin/login">Volver al acceso admin</Link>
      </div>
    </div>
  )
}
