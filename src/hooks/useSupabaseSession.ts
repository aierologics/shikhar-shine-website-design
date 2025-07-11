import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

export function useSupabaseSession() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userLoading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const restoreSession = async () => {
      try {
        // First, try to get the session from Supabase
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (data?.session) {
          if (mounted) {
            setUser(data.session.user);
            setSession(data.session);
          }
        } else {
          // If no session, check localStorage for a token
          const storedToken = localStorage.getItem('sb-ditxulobyakqthrmgpps-auth-token');
          if (storedToken) {
            debugger;
            // If a token exists, try to refresh the session
            const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
            console.log('Session refreshed:', refreshData, 'Error:', refreshError);
            if (refreshError) throw refreshError;

            if (refreshData.session && mounted) {
              setUser(refreshData.session.user);
              setSession(refreshData.session);
            }
          }
        }
      } catch (error) {
        console.error('Error restoring session:', error);
        if (mounted) {
          setUser(null);
          setSession(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    restoreSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null);
        setSession(session ?? null);
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, session, userLoading };
}