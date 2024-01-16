'use client';
import { useEffect, useState } from 'react';
import Dashboard from './_components/dashboard';

const FormsDashboard = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return <Dashboard />;
};

export default FormsDashboard;
