import MaxWidthWrapper from '@/components/max-width-wrapper';
import CreateFormDialog from './_components/create-form-dialog';
import FormCard from './_components/form-card';

const FormsDashboard = () => {
  return (
    <>
      <div className="flex h-36 items-center border-b border-gray-200 bg-white">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">
              Forms
              <span className="text-gray-600 text-lg ml-2">(21)</span>
            </h1>
            <div>
              <CreateFormDialog />
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
      <div className="py-8">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FormCard />
            <FormCard />
            <FormCard />
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default FormsDashboard;
