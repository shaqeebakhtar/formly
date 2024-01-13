import { AppRouter } from '@/trpc/routers/root';
import { createTRPCReact } from '@trpc/react-query';

export const api = createTRPCReact<AppRouter>();
