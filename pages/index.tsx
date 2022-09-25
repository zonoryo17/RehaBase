import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { supabase } from '../src/utils/supabaseClient'
import type { Session } from '../node_modules/@supabase/gotrue-js/src/lib/types'

const Home: NextPage = () => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div
      style={{
        minWidth: '100vw',
        minHeight: '100vh',
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {session ? <div>ログイン成</div> : <div>ログイン失敗</div>}
    </div>
  )
}

export default Home
