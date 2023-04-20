import { redirect } from "next/dist/server/api-utils"
import { NextResponse } from "next/server"

export async function GET (request: Request) {
  const headers = new Headers()
  headers.set('Set-Cookie', `${process.env.AUTH_TOKEN}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`)

  console.log('GET /api/logout')
  
  const response = new Response(
    JSON.stringify({
      ok: true,
      message: 'Logged out successfully',
    }), { headers }
  )
  
  return response
}