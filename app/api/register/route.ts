import { NextResponse } from 'next/server'
import { supabase } from '../../lib/supabase'

export async function POST(request: Request) {
  const { roll, name, email, year, password, team, action } = await request.json()

  const { data: exisingUser, error } = await supabase.from('users').select('*').eq('roll', roll)
  const { data: exisingTeam, error: teamError } = await supabase.from('teams').select('*').eq('name', team)

  if (exisingUser && exisingUser.length > 0) {
    return NextResponse.json({
      ok: false,
      message: 'User with this roll already exists',
    })
  }

  if (exisingTeam && exisingTeam.length > 0) {

    // Team exists
    if (action === 'create') {
      return NextResponse.json({
        ok: false,
        message: 'Team with this name already exists',
      })

    } else if (action === 'join') {

      // Team full
      if (exisingTeam[0].members.length === 5) {
        return NextResponse.json({
          ok: false,
          message: 'Team is full',
        })
      }

      // All good, add user to team
      const { data: newUser, error: userError } = await supabase.from('users').insert([
        {
          roll,
          name,
          email,
          year,
          leader: false
        },
      ])

      if (userError) {
        return NextResponse.json({
          ok: false,
          message: 'Error while creating user',
        })
      }

      const { data: newCredential, error: credentialError } = await supabase.from('credentials').insert([
        {
          roll,
          password,
        },
      ])

      if (credentialError) {
        const { data: deletedUser, error: deleteUserError } = await supabase.from('users').delete().eq('roll', roll)
        return NextResponse.json({
          ok: false,
          message: 'Error while creating user',
        })
      }

      const { data: updatedTeam, error: updatedTeamError } = await supabase.from('teams').update({
        members: [...exisingTeam[0].members, roll]
      }).eq('name', team)

      if (updatedTeamError) {
        const { data: deletedUser, error: deleteUserError } = await supabase.from('users').delete().eq('roll', roll)
        const { data: deletedCredential, error: deletedCredentialError } = await supabase.from('credentials').delete().eq('roll', roll)
        return NextResponse.json({
          ok: false,
          message: 'Error while adding you to team',
        })
      }

      // User added to team, update user's team
      const { data: updatedUser, error: updatedUserError } = await supabase.from('users').update({ team: team }).eq('roll', roll)
      return NextResponse.json({
        ok: true,
        message: 'User created and added to team',
      })
    }
  } else {
    // Team does not exist

    if (action === 'join') {
      return NextResponse.json({
        ok: false,
        message: 'Team does not exist',
      })
    } else if (action === 'create') {

      const { data: newUser, error: userError } = await supabase.from('users').insert([
        {
          roll,
          name,
          email,
          year,
          leader: true
        },
      ])

      if (userError) {
        return NextResponse.json({
          ok: false,
          message: 'Error while creating user',
        })
      }

      const { data: newCredential, error: credentialError } = await supabase.from('credentials').insert([
        {
          roll,
          password,
        },
      ])

      if (credentialError) {
        const { data: deletedUser, error: deleteUserError } = await supabase.from('users').delete().eq('roll', roll)
        return NextResponse.json({
          ok: false,
          message: 'Error while creating user',
        })
      }

      const { data: newTeam, error: newTeamError } = await supabase.from('teams').insert([
        {
          name: team,
          members: [roll],
          leader: roll,
        },
      ])

      if (newTeamError) {
        const { data: deletedUser, error: deleteUserError } = await supabase.from('users').delete().eq('roll', roll)
        const { data: deletedCredential, error: deletedCredentialError } = await supabase.from('credentials').delete().eq('roll', roll)
        return NextResponse.json({
          ok: false,
          message: 'Error while creating team',
        })
      }

      // User added to team, update user's team
      const { data: updatedUser, error: updatedUserError } = await supabase.from('users').update({ team: team }).eq('roll', roll)
      return NextResponse.json({
        ok: true,
        message: 'User created and added to team',
      })
    }

  }
}
