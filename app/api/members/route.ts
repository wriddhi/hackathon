import { NextResponse } from 'next/server'
import { supabase } from '../../lib/supabase'

export async function POST(request: Request) {

  const { members }: { members: string[] } = await request.json()

  // Get all members

  const { data: allMembers, error } = await supabase.from('users').select('*')

  // Filter out members who are not in the team

  const filteredMembers = allMembers!.filter(member => members.includes(member.roll))

  return NextResponse.json({ members: filteredMembers })
}