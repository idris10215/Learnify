import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ArrowLeft,
  Users,
  BookOpen,
  TrendingUp,
  Calendar,
  Download,
  Filter,
  Search
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';

interface TeacherAnalyticsProps {
  onNavigate: (page: string) => void;
}

const completionData = [
  { topic: 'React Basics', completion: 95, engagement: 87 },
  { topic: 'State Management', completion: 78, engagement: 82 },
  { topic: 'Event Handling', completion: 85, engagement: 90 },
  { topic: 'Component Props', completion: 92, engagement: 88 },
  { topic: 'Hooks', completion: 68, engagement: 75 },
  { topic: 'Advanced Patterns', completion: 45, engagement: 68 },
];

const engagementTrend = [
  { date: 'Jan 1', engagement: 65, active: 45 },
  { date: 'Jan 8', engagement: 72, active: 52 },
  { date: 'Jan 15', engagement: 78, active: 58 },
  { date: 'Jan 22', engagement: 75, active: 55 },
  { date: 'Jan 29', engagement: 82, active: 62 },
  { date: 'Feb 5', engagement: 88, active: 67 },
  { date: 'Feb 12', engagement: 85, active: 64 },
];

const difficultyDistribution = [
  { name: 'Beginner', value: 45, color: '#10B981' },
  { name: 'Intermediate', value: 35, color: '#2563EB' },
  { name: 'Advanced', value: 20, color: '#EF4444' },
];

const studentData = [
  { 
    id: 1, 
    name: 'Alex Johnson', 
    email: 'alex@email.com',
    pathsEnrolled: 3, 
    completion: 78, 
    avgQuizScore: 87,
    lastActive: '2 hours ago',
    status: 'active'
  },
  { 
    id: 2, 
    name: 'Sarah Wilson', 
    email: 'sarah@email.com',
    pathsEnrolled: 2, 
    completion: 92, 
    avgQuizScore: 94,
    lastActive: '1 day ago',
    status: 'active'
  },
  { 
    id: 3, 
    name: 'Mike Chen', 
    email: 'mike@email.com',
    pathsEnrolled: 4, 
    completion: 65, 
    avgQuizScore: 75,
    lastActive: '3 days ago',
    status: 'inactive'
  },
  { 
    id: 4, 
    name: 'Emma Davis', 
    email: 'emma@email.com',
    pathsEnrolled: 1, 
    completion: 34, 
    avgQuizScore: 82,
    lastActive: '5 hours ago',
    status: 'active'
  },
  { 
    id: 5, 
    name: 'John Smith', 
    email: 'john@email.com',
    pathsEnrolled: 3, 
    completion: 88, 
    avgQuizScore: 91,
    lastActive: '1 hour ago',
    status: 'active'
  },
];

export function TeacherAnalytics({ onNavigate }: TeacherAnalyticsProps) {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedPath, setSelectedPath] = useState('all');

  return (
    <div className="min-h-screen bg-secondary/20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => onNavigate('teacher-dashboard')}>
              <ArrowLeft size={20} className="mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'Roboto Mono, monospace' }}>
                Analytics Dashboard
              </h1>
              <p className="text-muted-foreground">Track student progress and engagement</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <select 
              className="px-3 py-2 border border-border rounded-md"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <Button variant="outline">
              <Download size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-shadow border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users size={16} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">73</div>
              <p className="text-xs text-success">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="card-shadow border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
              <TrendingUp size={16} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-success">+5% from last month</p>
            </CardContent>
          </Card>

          <Card className="card-shadow border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Paths</CardTitle>
              <BookOpen size={16} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">3 created this week</p>
            </CardContent>
          </Card>

          <Card className="card-shadow border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Quiz Score</CardTitle>
              <TrendingUp size={16} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-success">+3% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Topic Completion Rates */}
          <Card className="card-shadow border-0">
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Roboto Mono, monospace' }}>
                Topic Completion Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={completionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="topic" 
                      angle={-45}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completion" fill="#2563EB" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Engagement Trend */}
          <Card className="card-shadow border-0">
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Roboto Mono, monospace' }}>
                Student Engagement Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={engagementTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="engagement" 
                      stroke="#2563EB" 
                      fill="#2563EB" 
                      fillOpacity={0.3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="active" 
                      stroke="#10B981" 
                      fill="#10B981" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Difficulty Distribution */}
          <Card className="card-shadow border-0">
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Roboto Mono, monospace' }}>
                Course Difficulty Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={difficultyDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {difficultyDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="card-shadow border-0">
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Roboto Mono, monospace' }}>
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Alex completed "React Hooks" quiz</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Sarah enrolled in "Advanced JavaScript"</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Mike completed "Component State" topic</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Emma scored 94% on "React Basics" quiz</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student Performance Table */}
        <Card className="card-shadow border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle style={{ fontFamily: 'Roboto Mono, monospace' }}>
                Student Performance
              </CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="pl-10 pr-4 py-2 border border-border rounded-md"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter size={16} className="mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium">Student</th>
                    <th className="text-left py-3 px-4 font-medium">Paths Enrolled</th>
                    <th className="text-left py-3 px-4 font-medium">Completion %</th>
                    <th className="text-left py-3 px-4 font-medium">Avg Quiz Score</th>
                    <th className="text-left py-3 px-4 font-medium">Last Active</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((student) => (
                    <tr key={student.id} className="border-b border-border hover:bg-secondary/50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">{student.pathsEnrolled}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-secondary rounded-full">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${student.completion}%` }}
                            />
                          </div>
                          <span className="text-sm">{student.completion}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{student.avgQuizScore}%</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{student.lastActive}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={student.status === 'active' ? 'default' : 'secondary'}
                          className={student.status === 'active' ? 'success-bg' : ''}
                        >
                          {student.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}