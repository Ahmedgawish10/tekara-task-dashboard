"use client";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUsers } from "@/hooks/useUsers";
import { Label } from "@/components/ui/label";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const { users, isLoading, error, searchUsers, getUserStats, selectedUser, selectUser, clearSelectedUser, updateUser, successMessage } = useUsers();

  const filteredUsers = searchUsers(searchQuery);
  const stats = getUserStats();

  const handleEditClick = (user) => {
    selectUser(user);
  };

  const handleSaveEdit = async (userId, updatedData) => {
    await updateUser(userId, updatedData);
  };

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="main-dashboard">
      <div className="container mx-auto py-8 overflow-x-scroll">
        <div className="">
          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              {successMessage}
            </div>
          )}



          {filteredUsers.length > 0 ? (
            <>
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-center">
                <h1 className="text-3xl font-bold pb-2">Dashboard</h1>
                <div className="flex items-center  gap-4">
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[300px]"
                  />
                </div>
              </div>
              {/* Stats Cards */}
              <div className="grid p-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="transition-all cursor-pointer duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02] hover:border-primary/50 border border-transparent">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{filteredUsers.length}</div>
                  </CardContent>
                </Card>

                <Card className="transition-all cursor-pointer duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02] hover:border-primary/50 border border-transparent">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{filteredUsers.length}</div>
                  </CardContent>
                </Card>

                <Card className="transition-all cursor-pointer duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02] hover:border-primary/50 border border-transparent">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Companies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{filteredUsers.length}</div>
                  </CardContent>
                </Card>
              </div>
              {/* Users Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Users</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                      Loading users...
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>City</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers && (
                          <>
                            {filteredUsers.map((user) => (
                              <TableRow key={user?.id}>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.company.name}</TableCell>
                                <TableCell>{user.address.city}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>
                                  <Button
                                    className="cursor-pointer"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEditClick(user)}
                                  >
                                    Edit
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}

                          </>

                        )}

                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>

            </>


          ) : (<h2>No users Found</h2>)}



        </div>

        {/* Edit User Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-[#00000085] bg-opacity-50 flex items-center justify-center">
            <Card className="w-[500px]">
              <CardHeader>
                <CardTitle>Edit User</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <Label>Name</Label>
                    <Input
                      defaultValue={selectedUser.name}
                      onChange={(e) => {
                        selectUser({
                          ...selectedUser,
                          name: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      defaultValue={selectedUser.email}
                      onChange={(e) => {
                        selectUser({
                          ...selectedUser,
                          email: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button className="cursor-pointer" variant="outline" onClick={clearSelectedUser}>
                      Cancel
                    </Button>
                    <Button
                      className="cursor-pointer"
                      onClick={() =>
                        handleSaveEdit(selectedUser.id, selectedUser)
                      }
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
