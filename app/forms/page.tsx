import { getServerSession } from 'next-auth';
import Dashboard from './_components/dashboard';
import { redirect } from 'next/navigation';

const FormsDashboard = async () => {
  const session = await getServerSession();

  if (!session?.user) {
    redirect('/register');
  }

  return <Dashboard />;
};

export default FormsDashboard;
