import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Home, 
  BookOpen, 
  Brain, 
  TrendingUp, 
  Settings, 
  Bell, 
  User,
  Play,
  Clock,
  Award,
  Target
} from 'lucide-react';

const activePaths = [
  { 
    id: 1, 
    title: 'Introduction to React', 
    instructor: 'Dr. Smith',
    progress: 68, 
    totalTopics: 12,
    completedTopics: 8,
    nextTopic: 'Component State Management',
    difficulty: 'Beginner'
  },
  { 
    id: 2, 
    title: 'Advanced JavaScript', 
    instructor: 'Prof. Johnson',
    progress: 45, 
    totalTopics: 15,
    completedTopics: 7,
    nextTopic: 'Async/Await Patterns',
    difficulty: 'Advanced'
  },
  { 
    id: 3, 
    title: 'Web Design Principles', 
    instructor: 'Ms. Chen',
    progress: 23, 
    totalTopics: 8,
    completedTopics: 2,
    nextTopic: 'Color Theory',
    difficulty: 'Intermediate'
  },
];

const suggestedTopics = [
  { id: 1, title: 'CSS Grid Layout', category: 'Web Design', duration: '45 min' },
  { id: 2, title: 'React Hooks Deep Dive', category: 'React', duration: '60 min' },
  { id: 3, title: 'API Integration', category: 'JavaScript', duration: '30 min' },
];

export default function StudentDashboard({ onNavigate }) {
  return (
    <div className="flex h-screen bg-secondary/20">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-border card-shadow">
        <div className="p-6">
          <h2 className="text-xl font-bold text-primary font-mono">
            Learnify
          </h2>
          <p className="text-sm text-muted-foreground">Student Portal</p>
        </div>
        
        <nav className="px-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3 bg-primary/10 text-primary">
            <Home size={20} />
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <BookOpen size={20} />
            My Paths
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Brain size={20} />
            Quizzes
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <TrendingUp size={20} />
            Progress
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
            <div>
              <h1 className="text-2xl font-semibold font-mono">
                Welcome back, Alex!
              </h1>
              <p className="text-muted-foreground">Ready to continue learning?</p>
            </div>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="card-shadow border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Paths Enrolled</CardTitle>
                <BookOpen size={16} className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">2 in progress</p>
              </CardContent>
            </Card>

            <Card className="card-shadow border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
                <Clock size={16} className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-success">+8 this week</p>
              </CardContent>
            </Card>

            <Card className="card-shadow border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle>
                <Brain size={16} className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">Average score: 87%</p>
              </CardContent>
            </Card>

            <Card className="card-shadow border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                <Award size={16} className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">2 new this month</p>
              </CardContent>
            </Card>
          </div>

          {/* Resume Learning */}
          <Card className="card-shadow border-0 bg-gradient-to-r from-primary/5 to-success/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 font-mono">
                    Continue Learning
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Resume "Introduction to React" - Component State Management
                  </p>
                  <div className="flex items-center gap-4">
                    <Progress value={68} className="w-48" />
                    <span className="text-sm font-medium">68% Complete</span>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="gradient-bg hover:opacity-90"
                  onClick={() => onNavigate('topic-view')}
                >
                  <Play size={20} className="mr-2" />
                  Resume Learning
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Learning Paths */}
            <Card className="card-shadow border-0">
              <CardHeader>
                <CardTitle className="font-mono">My Active Paths</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activePaths.map((path) => (
                    <div key={path.id} className="p-4 bg-secondary/50 rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{path.title}</h4>
                          <p className="text-sm text-muted-foreground">by {path.instructor}</p>
                        </div>
                        <Badge variant="outline">{path.difficulty}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Progress value={path.progress} className="flex-1" />
                        <span className="text-sm font-medium">{path.progress}%</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {path.completedTopics}/{path.totalTopics} topics
                        </span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onNavigate('topic-view')}
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Suggested Topics */}
            <Card className="card-shadow border-0">
              <CardHeader>
                <CardTitle className="font-mono">Suggested Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suggestedTopics.map((topic) => (
                    <div key={topic.id} className="p-4 bg-secondary/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{topic.title}</h4>
                        <Badge variant="secondary">{topic.category}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock size={14} />
                          {topic.duration}
                        </span>
                        <Button size="sm" variant="outline">
                          Start Learning
                        </Button>
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