"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie'

export default function LoginPage() {
  const router = useRouter()
  // just i set this here for testing now!
  const [formData, setFormData] = useState({
    email: "Gawish@admin.com",
    password: "Ahmedgawish22$",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  //handle submit for login form
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      if (formData.email === "Gawish@admin.com" && formData.password === "Ahmedgawish22$") {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Set authentication cookie for the admin in cookie 7 days
        Cookies.set('auth_token', 'dummy_token', { expires: 7 })
        setIsLoading(false)
        router.push('/dashboard')
      } else {
        setError("Invalid credentials")
      }
    } catch (error) {
      setError("Login failed. Please try again.")
      setIsLoading(false)
    }
  }

  //handle change in the input fields for login form
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className='text-center'>Login</CardTitle>
          <CardDescription className='text-center'>Welcome back</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 text-sm text-red-500 bg-red-100 rounded-md">
                {error}
              </div>
            )}
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="mt-6">
              <Button 
                className="w-full cursor-pointer" 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </div>
                ) : "Sign In"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="flex items-center justify-between w-full text-sm">
            <Link href="#forgot-password" className="text-primary hover:underline">
              Forgot password?
            </Link>
            <Link href="#register" className="text-primary hover:underline">
              Create account
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
} 