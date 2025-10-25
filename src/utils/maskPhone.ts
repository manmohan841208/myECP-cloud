// utils/maskPhone.ts
export default function maskPhone(phone: string): string {
  if (!phone || phone.length < 4) return '******';
  return '******' + phone.slice(-4);
}
