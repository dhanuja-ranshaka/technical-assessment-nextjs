import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  return <>
    <Navbar />
    <Link href="/login" className="login-button">
      Log in
    </Link>
  </>;
}
