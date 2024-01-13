import Navbar from './_components/navbar';

const FormsDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Navbar />
      {children}
    </div>
  );
};

export default FormsDashboardLayout;
