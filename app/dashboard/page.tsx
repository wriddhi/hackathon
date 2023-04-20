"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

const getInfo = async () => {
  const { user, team } = await axios.get('/api/user').then(res => res.data)

  const { members } = await axios.post('/api/members', {
    members: team.members
  }).then(res => res.data)

  console.log(user, team, members)

  return { user, team, members }
}


export default function Dashboard() {

  const [user, setUser] = useState(null)
  const [team, setTeam] = useState(null)
  const [members, setMembers] = useState<string[]>([])

  const [tab, setTab] = useState('you')

  const router = useRouter()

  useEffect(() => {
    getInfo().then(({ user, team, members }) => {
      setUser(user)
      setTeam(team)
      setMembers(members)
    })

    return () => {
      setUser(null)
      setTeam(null)
      setMembers([])
    }
  }, [])

  const logout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const res = await axios.get('/api/logout').then(res => res.data)

    if (res.ok) {
      router.push('/login')
    }
  }

  return (
    user && team &&
    <main className="w-full flex flex-col justify-center items-center p-8">
      <button
        onClick={logout}
        className="bg-white font-extrabold btn text-black p-2 ml-auto w-fit text-outline-black tracking-widest hover:bg-white transition-all mb-20"
      >
        Logout
      </button>
      <div className="tabs w-2/3 mx-auto">
        {
          ["you", "team"].map(opt => {
            return (
              <button
                key={opt}
                onClick={() => { setTab(opt) }}
                className={`tab tab-lg tab-lifted ${tab === opt ? "tab-active text-black" : "text-white bg-stone-100/20"} flex-1 text-3xl uppercase`}
              >
                {opt}
              </button>
            )
          })
        }
      </div>
      <div className="outline-1 outline-white/30 bg-white/10 outline w-2/3 mx-auto rounded-b-box">
        {
          tab === 'you' ? (
            <div className="card">
              {
                Object.keys(user).map(key => {
                  return (
                    key !== "leader" &&
                    <div className="card-body" key={key}>
                      <h2 className="card-title capitalize">{key}</h2>
                      <p className="card-subtitle bg-black rounded-md p-2">{user[key]}</p>
                    </div>
                  )
                })
              }
            </div>
          ) : (
            <div className="card">
              {
                Object.keys(team).map(key => {
                  return (
                    key !== 'members' ? (
                      <div className="card-body" key={key}>
                        <h2 className="card-title capitalize">{key}</h2>
                        <p className="card-subtitle bg-black rounded-md p-2">
                          {
                            key === 'leader' && user['leader'] == true ? (
                              <span className="text-green-500">You</span>
                            ) : (
                              team[key]
                            )
                          }
                        </p>
                      </div>
                    ) : members.length > 0 && (
                      <div className="overflow-x-auto card-body">
                        <h2 className="card-title capitalize">{key}</h2>
                        <table className="table w-full">
                          {/* head */}
                          <thead>
                            <tr>
                              <th className="bg-black text-white">S.No.</th>
                              {
                                Object.keys(members[0]).map(key => {
                                  return (
                                    key !== 'leader' && key !== 'team' &&
                                    <th className="bg-black text-white" key={key}>{key}</th>
                                  )
                                })
                              }
                              <th className="bg-black text-white" >Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              members.map((member, i) => {
                                return (
                                  <tr key={i}>
                                    <td className="bg-black text-white">{i + 1}.</td>
                                    {
                                      Object.keys(member).map(key => {
                                        return (
                                          key !== 'name' ? (
                                            key !== 'leader' && key !== 'team' &&
                                            // @ts-ignore
                                            <td className="bg-black text-white" key={key}>{member[key]}</td>
                                          ) : (
                                            <td className="bg-black text-white" key={key}>
                                              {
                                                // @ts-ignore
                                                member['name'] == user['name'] ? (
                                                  <span className="flex justify-between items-center">
                                                    {
                                                      // @ts-ignore
                                                      member['name']
                                                    }
                                                    <div className="badge badge-accent badge-outline">You</div>
                                                  </span>
                                                ) : (
                                                  // @ts-ignore
                                                  member['name']
                                                )
                                              }
                                            </td>
                                          )
                                        )
                                      })
                                    }
                                    <td className="bg-black text-white">
                                      {
                                        // @ts-ignore
                                        member['leader'] == true ? (
                                          <span className="text-green-500">Leader</span>
                                        ) : (
                                          <span className="text-amber-500">Member</span>
                                        )
                                      }
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </table>
                      </div>
                    )
                  )
                })
              }
            </div>
          )
        }
      </div>
    </main>
  )
}