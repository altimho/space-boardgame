import { inferAsyncReturnType } from '@trpc/server';
import { UserCookieName } from '../../shared/constants';

const parseCookies = (cookies: string) =>
  cookies.split(';').reduce((res, item) => {
    const [name, value] = item.split('=');
    res[name.trim()] = value.trim();

    return res;
  }, {} as Record<string, string>);

const userDataFromCookies = (cookies: string) => {
  const { [UserCookieName.Id]: id, [UserCookieName.Name]: name } = parseCookies(cookies);

  return {
    id,
    name,
  };
};

export async function createContext<Router>({ req }: { req: { headers: { cookie?: string } } }) {
  return {
    user: userDataFromCookies(req.headers.cookie ?? ''),
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
