import { supabase } from "../../lib/supabase"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export async function GET(request: Request) {

  const token = cookies().get(process.env.AUTH_TOKEN!)?.value

  if (!token) return NextResponse.json({ user: null })

  const auth: any = jwt.verify(token!, process.env.JWT_SECRET!)

  if (!auth) return NextResponse.json({ user: null })

  const user = auth.user[0]

  const { data: team, error } = await supabase.from("teams").select("*").eq("name", user.team).single()

  return NextResponse.json({ user, team })
}