import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Home, 
  Plus, 
  BookOpen, 
  BarChart3, 
  Settings, 
  Bell, 
  User,
  Upload,
  Brain,
  Users,
  TrendingUp,
  Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const engagementData = [
  { name: 'Mon', engagement: 65 },
  { name: 'Tue', engagement: 78 },
  { name: 'Wed', engagement: 82 },
  { name: 'Thu', engagement: 75 },
  { name: 'Fri', engagement: 90 },
  { name: 'Sat', engagement: 45 },
  { name: 'Sun', engagement: 32 },
];

const recentPaths = [
  { id: 1, title: 'Introduction to React', students: 24, progress: 78, status: 'active' },
  { id: 2, title: 'Advanced JavaScript', students: 18, progress: 65, status: 'active' },
  { id: 3, title: 'Web Design Principles', students: 31, progress: 92, status: 'completed' },
];

export default function TeacherDashboard({ onNavigate }) {
  return (
    <div className="flex h-screen bg-secondary/20">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-border card-shadow">
        <div className="p-6">
          <h2 className="text-xl font-bold text-primary font-mono">
            Learnify
          </h2>
          <p className="text-sm text-muted-foreground">Teacher Portal</p>
        </div>
        
        <nav className="px-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3 bg-primary/10 text-primary">
            <Home size={20} />
            Home
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3"
            onClick={() => onNavigate('create-path')}
          >
            <Plus size={20} />
            Create Path
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <BookOpen size={20} />
            Manage Paths
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3"
            onClick={() => onNavigate('analytics')}
          >
            <BarChart3 size={20} />
            Analytics
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Settings size={20} />
            Settings
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <div className="bg-white border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold font-mono">
              Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <User size={20} />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="card-shadow border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users size={16} className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">73</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="card-shadow border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Learning Paths</CardTitle>
                <BookOpen size={16} className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">3 created this week</p>
              </CardContent>
            </Card>

            <Card className="card-shadow border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Completion Rate</CardTitle>
                <TrendingUp size={16} className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-success">+5% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="card-shadow border-0">
            <CardHeader>
              <CardTitle className="font-mono">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  className="h-20 gradient-bg hover:opacity-90 flex-col gap-2"
                  onClick={() => onNavigate('create-path')}
                >
                  <Plus size={24} />
                  Create New Path
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Upload size={24} />
                  Upload PDF
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Brain size={24} />
                  Generate AI Quiz
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Student Engagement Chart */}
            <Card className="card-shadow border-0">
              <CardHeader>
                <CardTitle className="font-mono">Student Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="engagement" 
                        stroke="#2563EB" 
                        strokeWidth={2}
                        dot={{ fill: '#2563EB' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Learning Paths */}
            <Card className="card-shadow border-0">
              <CardHeader>
                <CardTitle className="font-mono">Recent Learning Paths</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPaths.map((path) => (
                    <div key={path.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{path.title}</h4>
                        <p className="text-sm text-muted-foreground">{path.students} students</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{path.progress}%</span>
                        <Badge variant={path.status === 'active' ? 'default' : 'secondary'}>
                          {path.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}