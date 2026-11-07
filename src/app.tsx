import { useEffect, useState } from 'react';
import DesktopApp from './desktop/app';
import MobileApp from './MobileApp';
import PolicyPage, { getPolicySlug } from './pages/PolicyPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import StudentDashboard from './pages/StudentDashboard';
import InstituteDashboard from './pages/InstituteDashboard';
import OfficerDashboard from './pages/OfficerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserHomePage from './pages/UserHomePage';

/**
 * The approved desktop and Android experiences intentionally use separate
 * component trees. Policy pages, authentication, and role dashboards are
 * shared by both experiences and use independent paths.
 */
const DESKTOP_QUERY = '(min-width: 1024px)';

function useDesktopViewport(): boolean {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia(DESKTOP_QUERY).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    const updateViewport = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateViewport);
    return () => mediaQuery.removeEventListener('change', updateViewport);
  }, []);

  return isDesktop;
}

export function App() {
  const isDesktop = useDesktopViewport();
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const updatePathname = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', updatePathname);
    return () => window.removeEventListener('popstate', updatePathname);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setPathname(path);
  };

  // Dedicated Authentication Pages
  if (pathname === '/login' || pathname === '/signin') {
    return (
      <LoginPage
        onNavigateHome={() => navigateTo('/')}
        onNavigateSignUp={() => navigateTo('/signup')}
      />
    );
  }

  if (pathname === '/signup' || pathname === '/register') {
    return (
      <SignUpPage
        onNavigateHome={() => navigateTo('/')}
        onNavigateLogin={() => navigateTo('/login')}
      />
    );
  }

  // 0. Dedicated User Home Page (Home Page for Users / Students)
  if (pathname === '/user-home' || pathname === '/home' || pathname === '/user/home' || pathname === '/user') {
    return (
      <UserHomePage
        onNavigateHome={() => navigateTo('/')}
        onNavigateDashboard={() => navigateTo('/dashboard/student')}
        onSignOut={() => navigateTo('/login')}
      />
    );
  }

  // 1. Student / User Account Dashboard
  if (pathname === '/dashboard/student' || pathname === '/account') {
    return (
      <StudentDashboard
        onNavigateHome={() => navigateTo('/')}
        onSignOut={() => navigateTo('/login')}
      />
    );
  }

  // 2. Institute Account Dashboard
  if (pathname === '/dashboard/institute') {
    return (
      <InstituteDashboard
        onNavigateHome={() => navigateTo('/')}
        onSignOut={() => navigateTo('/login')}
      />
    );
  }

  // 3. District Officer Account Dashboard
  if (pathname === '/dashboard/officer') {
    return (
      <OfficerDashboard
        onNavigateHome={() => navigateTo('/')}
        onSignOut={() => navigateTo('/login')}
      />
    );
  }

  // 4. Admin Dashboard
  if (pathname === '/dashboard/admin' || pathname === '/admin') {
    return (
      <AdminDashboard
        onNavigateHome={() => navigateTo('/')}
        onSignOut={() => navigateTo('/login')}
      />
    );
  }

  // Generic /dashboard dispatcher
  if (pathname === '/dashboard') {
    let savedRole = 'Student';
    try {
      const raw = localStorage.getItem('vps_authenticated_user');
      if (raw) {
        const parsed = JSON.parse(raw);
        savedRole = parsed.role || 'Student';
      }
    } catch {
      // fallback
    }

    if (savedRole === 'Admin') {
      return <AdminDashboard onNavigateHome={() => navigateTo('/')} onSignOut={() => navigateTo('/login')} />;
    }
    if (savedRole === 'Institute') {
      return <InstituteDashboard onNavigateHome={() => navigateTo('/')} onSignOut={() => navigateTo('/login')} />;
    }
    if (savedRole === 'District Officer') {
      return <OfficerDashboard onNavigateHome={() => navigateTo('/')} onSignOut={() => navigateTo('/login')} />;
    }
    return <StudentDashboard onNavigateHome={() => navigateTo('/')} onSignOut={() => navigateTo('/login')} />;
  }

  const policySlug = getPolicySlug(pathname);
  if (policySlug) return <PolicyPage slug={policySlug} />;
  return isDesktop ? <DesktopApp /> : <MobileApp />;
}

export default App;
