import NotAvailable from '@/app/notAvailable';

console.log('shi');

export default function ProductPage() {
  return (
    <div>
      <NotAvailable
        title="Products"
        description="We're crafting something great. Stay tuned!"
      />
    </div>
  );
}
