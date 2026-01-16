'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Mail, MapPin } from "lucide-react"

// Mock extended user data
const USERS = [
    { id: 'user-1', name: 'Demo User', email: 'user@example.com', role: 'user', status: 'active', joined: '2023-10-15', totalBids: 15, wonAuctions: 3 },
    { id: 'user-2', name: 'Anna K.', email: 'anna@example.com', role: 'user', status: 'active', joined: '2023-11-02', totalBids: 42, wonAuctions: 8 },
    { id: 'user-3', name: 'Tomek W.', email: 'tomek@example.com', role: 'user', status: 'suspended', joined: '2023-12-10', totalBids: 5, wonAuctions: 0 },
    { id: 'user-4', name: 'Maria S.', email: 'maria@example.com', role: 'user', status: 'active', joined: '2024-01-05', totalBids: 23, wonAuctions: 2 },
    { id: 'user-5', name: 'Piotr M.', email: 'piotr@example.com', role: 'user', status: 'active', joined: '2024-01-15', totalBids: 67, wonAuctions: 12 },
    { id: 'admin-1', name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', joined: '2023-09-01', totalBids: 0, wonAuctions: 0 },
]

export default function UsersPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                <Button variant="outline">Export CSV</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Registered Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead className="text-right">Activity</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {USERS.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Mail className="h-3 w-3" /> {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.status === 'active' ? 'outline' : 'destructive'}>
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{user.joined}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="text-sm">
                                            <span className="font-bold">{user.wonAuctions}</span> wins
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {user.totalBids} bids
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
