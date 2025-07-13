import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useRefreshToken = () => {
  // Function to refresh the session token
  const refresh = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) {
        console.error('Error refreshing session:', error);
        return null;
      }
      return data.session;
    } catch (err) {
      console.error('Unexpected error refreshing session:', err);
      return null;
    }
  };

  // Optionally, you can add an effect to refresh token periodically
  useEffect(() => {
    const interval = setInterval(() => {
      refresh();
    }, 15 * 60 * 1000); // Refresh every 15 minutes

    return () => clearInterval(interval);
  }, []);

  return { refresh };
};

export default useRefreshToken;
