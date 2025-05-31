import { useState, useEffect } from 'react'

export const useUsers = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Try to get users from localStorage first
      const localUsers = localStorage.getItem('users')
      if (localUsers) {
        const parsedUsers = JSON.parse(localUsers)
        setUsers(parsedUsers || [])
        setIsLoading(false)
        return
      }

      // If no local users, fetch from API
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const data = await response.json()
      setUsers(data || [])
      // Save to localStorage
      localStorage.setItem('users', JSON.stringify(data))
    } catch (err) {
      setError(err.message)
      console.error('Error fetching users:', err)
      setUsers([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const searchUsers = (query) => {
    if (!query) return users
    
    const lowercaseQuery = query.toLowerCase()
    return users.filter(user =>
      user.name.toLowerCase().includes(lowercaseQuery) ||
      user.email.toLowerCase().includes(lowercaseQuery) ||
      user.company.name.toLowerCase().includes(lowercaseQuery)
    )
  }

  const getUserStats = () => {
    const companies = []
    users.forEach(user => {
      if (user?.company?.name && !companies.includes(user.company.name)) {
        companies.push(user.company.name)
      }
    })

    return {
      totalUsers: users.length,
      activeUsers: users.length,
      totalCompanies: companies.length
    }
  }

  const updateUser = async (userId, updatedData) => {
    try {
      setIsLoading(true)
      setError(null)

      // jsonplaceholder api dont have post reuest but jsut i smiluate the update endpoint
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })
      //if there is an error with the response throw an error
      if (!response.ok) {
        throw new Error('Failed to update user')
      }
      // Update the selected user in the users, map  func return the new array with the updated user
      const updatedUsers = users.map(user => 
        user.id === userId ? { ...user, ...updatedData } : user
      )
      setUsers(updatedUsers)
      //save the updared user and the rest of the users to local storage
       localStorage.setItem('users', JSON.stringify(updatedUsers))
      // show success message after admin update the user
       setSuccessMessage("User updated successfully!")
      // clear success message after 3 seconds
       setTimeout(() => setSuccessMessage(null), 3000)
      //  close the modal after update the user
      setSelectedUser(null)
    } catch (err) {
      setError(err.message)
      console.error('Error updating user:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectUser = (user) => {
    setSelectedUser(user)
  }

  const handleClearSelectedUser = () => {
    setSelectedUser(null)
  }

  return {
    users,
    isLoading,
    error,
    searchUsers,
    getUserStats,
    refreshUsers: fetchUsers,
    selectedUser,
    selectUser: handleSelectUser,
    clearSelectedUser: handleClearSelectedUser,
    updateUser,
    successMessage
  }
} 