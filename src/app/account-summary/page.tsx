import ProtectedRoute from '@/templates/protectedroutes';

export default function AccountSummary() {
  return (
    <ProtectedRoute>
      <div>Welcome to the account summary.</div>
    </ProtectedRoute>
  );
}
