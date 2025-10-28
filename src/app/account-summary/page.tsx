import ProtectedRoute from '@/templates/protectedroutes';
import NotAvailable from '../notAvailable';

export default function AccountSummary() {
  return (
    <ProtectedRoute>
      <div>
        <NotAvailable />
      </div>
    </ProtectedRoute>
  );
}
