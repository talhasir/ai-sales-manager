// Mock authentication helper using client-side session storage
// This is NOT production-ready, just for MVP purposes

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem('authenticated') === 'true';
}

export function login(email: string, password: string): boolean {
  // Mock login - accepts any credentials
  sessionStorage.setItem('authenticated', 'true');
  sessionStorage.setItem('userEmail', email);
  return true;
}

export function logout(): void {
  sessionStorage.removeItem('authenticated');
  sessionStorage.removeItem('userEmail');
}

export function getUserEmail(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('userEmail');
}

