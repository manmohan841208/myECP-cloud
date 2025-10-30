import ProtectedRoute from '@/templates/protectedroutes';
import NotAvailable from '../notAvailable';

export default function AccountSummary() {
  return (
    <ProtectedRoute>
      <div>
        <NotAvailable
          title="Account Summary"
          description="We're crafting something great. Stay tuned!"
        />
      </div>
    </ProtectedRoute>
  );
}
