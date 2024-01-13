import { Icons } from '@/components/icons';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import Link from 'next/link';
import SearchInput from './search-input';

const Navbar = () => {
  return (
    <div className="sticky left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-2.5">
              <Icons.logo className="w-6 h-6" />
              <span className="font-semibold text-xl">Formly</span>
            </div>
          </Link>
          <SearchInput />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
