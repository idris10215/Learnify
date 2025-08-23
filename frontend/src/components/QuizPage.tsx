import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
  Target
} from 'lucide-react';

interface QuizPageProps {
  onNavigate: (page: string) => void;
}

const quizData = {
  title: 'React State Management Quiz',
  topic: 'Component State Management',
  timeLimit: 10, // minutes
  totalQuestions: 5,
  questions: [
    {
      id: 1,
      question: 'What is the primary purpose of the useState hook in React?',
      options: [
        'To fetch data from an API',
        'To manage local component state',
        'To handle routing between pages',
        'To optimize component performance'
      ],
      correct: 1,
      explanation: 'useState is specifically designed to add and manage state in functional components.'
    },
    {
      id: 2,
      question: 'When you call a state setter function, what happens to the component?',
      options: [
        'Nothing happens',
        'The component immediately updates',
        'The component is scheduled to re-render',
        'The component is destroyed and recreated'
      ],
      correct: 2,
      explanation: 'React schedules a re-render when state changes, which happens asynchronously.'
    },
    {
      id: 3,
      question: 'What is "lifting state up" in React?',
      options: [
        'Moving state from a child component to its parent',
        'Increasing the value of a state variable',
        'Moving state to a global store',
        'Creating state in the highest component'
      ],
      correct: 0,
      explanation: 'Lifting state up means moving state to a common parent to share it between siblings.'
    },
    {
      id: 4,
      question: 'How should you update state that depends on the previous state value?',
      options: [
        'setState(prevState + 1)',
        'setState(state + 1)',
        'setState(prevState => prevState + 1)',
        'setState(() => state + 1)'
      ],
      correct: 2,
      explanation: 'Use the functional update pattern to ensure you get the latest state value.'
    },
    {
      id: 5,
      question: 'What happens if you directly mutate state in React?',
      options: [
        'The component will re-render normally',
        'React will throw an error',
        'The component might not re-render',
        'The state will be reset to its initial value'
      ],
      correct: 2,
      explanation: 'Direct mutation can prevent React from detecting changes and triggering re-renders.'
    }
  ]
};

export function QuizPage({ onNavigate }: QuizPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quizData.timeLimit * 60); // in seconds
  const [quizStarted, setQuizStarted] = useState(false);

  const currentQ = quizData.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quizData.questions.length - 1;
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizData.questions[index].correct) {
        correct++;
      }
    });
    return Math.round((correct / quizData.questions.length) * 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-yellow-600';
    return 'text-destructive';
  };

  const retakeQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizStarted(false);
    setTimeRemaining(quizData.timeLimit * 60);
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-secondary/20 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="card-shadow border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={32} className="text-primary" />
              </div>
              <CardTitle className="text-2xl" style={{ fontFamily: 'Roboto Mono, monospace' }}>
                {quizData.title}
              </CardTitle>
              <p className="text-muted-foreground">{quizData.topic}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{quizData.totalQuestions}</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{quizData.timeLimit}</div>
                  <div className="text-sm text-muted-foreground">Minutes</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Instructions:</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Read each question carefully</li>
                  <li>• Select the best answer from the options</li>
                  <li>• You can navigate back to previous questions</li>
                  <li>• Complete all questions before submitting</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => onNavigate('topic-view')}
                  className="flex-1"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Topic
                </Button>
                <Button 
                  className="gradient-bg hover:opacity-90 flex-1"
                  onClick={() => setQuizStarted(true)}
                >
                  Start Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const correct = selectedAnswers.filter((answer, index) => 
      answer === quizData.questions[index].correct
    ).length;

    return (
      <div className="min-h-screen bg-secondary/20 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <Card className="card-shadow border-0 mb-6">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy size={40} className="text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Roboto Mono, monospace' }}>
                Quiz Completed!
              </h1>
              <p className="text-xl mb-4">
                Your Score: <span className={`font-bold ${getScoreColor(score)}`}>{score}%</span>
              </p>
              <p className="text-muted-foreground">
                You got {correct} out of {quizData.questions.length} questions correct
              </p>
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <div className="space-y-4 mb-6">
            {quizData.questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correct;
              
              return (
                <Card key={question.id} className="card-shadow border-0">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle size={24} className="text-success mt-1" />
                      ) : (
                        <XCircle size={24} className="text-destructive mt-1" />
                      )}
                      <div className="flex-1">
                        <CardTitle className="text-base">
                          Question {index + 1}: {question.question}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-3 rounded-lg border ${
                            optionIndex === question.correct
                              ? 'bg-success/10 border-success text-success'
                              : optionIndex === userAnswer && !isCorrect
                              ? 'bg-destructive/10 border-destructive text-destructive'
                              : 'bg-secondary/50 border-border'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {optionIndex === question.correct && (
                              <CheckCircle size={16} />
                            )}
                            {optionIndex === userAnswer && !isCorrect && (
                              <XCircle size={16} />
                            )}
                            <span>{option}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-3 bg-blue-50 border-l-4 border-primary rounded">
                      <p className="text-sm">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => onNavigate('topic-view')}
              className="flex-1"
            >
              Back to Topic
            </Button>
            <Button 
              variant="outline" 
              onClick={retakeQuiz}
              className="flex-1"
            >
              <RotateCcw size={16} className="mr-2" />
              Retake Quiz
            </Button>
            <Button 
              className="gradient-bg hover:opacity-90 flex-1"
              onClick={() => onNavigate('student-dashboard')}
            >
              Continue Learning
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/20 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Quiz Header */}
        <Card className="card-shadow border-0 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold" style={{ fontFamily: 'Roboto Mono, monospace' }}>
                {quizData.title}
              </h1>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock size={14} />
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Question {currentQuestion + 1} of {quizData.questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} />
            </div>
          </CardContent>
        </Card>

        {/* Question */}
        <Card className="card-shadow border-0 mb-6">
          <CardHeader>
            <CardTitle className="text-lg">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-white hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-primary bg-primary'
                          : 'border-muted'
                      }`}
                    />
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <Button 
            className="gradient-bg hover:opacity-90"
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
          >
            {isLastQuestion ? 'Submit Quiz' : 'Next Question'}
          </Button>
        </div>
      </div>
    </div>
  );
}