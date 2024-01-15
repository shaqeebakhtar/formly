import { Eye, LucideIcon, MousePointerClick, Percent } from 'lucide-react';

const FormAnalytics = ({
  views,
  submissions,
}: {
  views: number;
  submissions: number;
}) => {
  let submissionRate = 0;

  if (views > 0) {
    submissionRate = (submissions / views) * 100;
  }

  return (
    <>
      <div className="flex gap-4 items-center flex-wrap">
        <AnalyticsCard label={'Views'} value={views.toString()} icon={Eye} />
        <AnalyticsCard
          label={'Submissions'}
          value={submissions.toString()}
          icon={MousePointerClick}
        />
        <AnalyticsCard
          label={'Submission Rate'}
          value={submissionRate.toFixed(2) + '%'}
          icon={Percent}
        />
      </div>
    </>
  );
};

export default FormAnalytics;

const AnalyticsCard = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
}) => {
  return (
    <div className="flex-1 p-6 bg-card shadow rounded-md space-y-2">
      <div className="flex items-center space-x-2 text-gray-500">
        <Icon className="w-4 h-4" />
        <p>{label}</p>
      </div>
      <p className="font-medium text-3xl">{value}</p>
    </div>
  );
};
