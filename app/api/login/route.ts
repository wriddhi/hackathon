import { NextResponse } from 'next/server'
import { supabase } from '../../lib/supabase'

import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  const { roll, password } = await request.json()

  const { data: user, error } = await supabase.from('credentials').select('*').eq('roll', roll)

  if (user && user.length > 0) {
    if (user[0].password === password) {

      // Generate a token with user data and secret and save it in cookies
      const {data: authuser, error} = await supabase.from('users').select('*').eq('roll', roll)

      const token = jwt.sign({ user: authuser }, process.env.JWT_SECRET!, { expiresIn: '7d' })

      const headers = new Headers()
      headers.set('Set-Cookie', `${process.env.AUTH_TOKEN}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`)

      const response = new Response(
        JSON.stringify({
          ok: true,
          message: 'Logged in successfully',
        }), { headers })

      return response
    } else {
      return NextResponse.json({
        ok: false,
        message: 'Incorrect password',
      })
    }
  }

  return NextResponse.json({
    ok: false,
    message: 'User does not exist',
  })

}
