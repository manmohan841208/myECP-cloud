// lib/auth.ts
export function isAuthenticated(): boolean {
    // Example: check localStorage or cookies
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('authToken')
    }
    return false
  }