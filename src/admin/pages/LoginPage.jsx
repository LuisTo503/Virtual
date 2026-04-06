import { ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className="admin-auth">
      <div className="admin-auth__card">
        <ShieldCheck size={26} />
        <h1>Acceso admin</h1>
        <p>La autenticacion real se conectara en la siguiente fase. Por ahora se deja el punto de entrada del modulo.</p>
        <Link className="admin-auth__link" to="/admin/overview">Entrar al panel</Link>
      </div>
    </div>
  )
}
